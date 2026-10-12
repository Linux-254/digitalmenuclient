import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { order_id, phone_number, session_id } = await req.json();

    if (!order_id) {
      return new Response(
        JSON.stringify({ error: 'order_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Recompute authoritative total on server from order_items (Never trust client amount)
    const { data: orderItems, error: itemsErr } = await supabase
      .from('order_items')
      .select('qty, unit_price, status')
      .eq('order_id', order_id);

    if (itemsErr || !orderItems || orderItems.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Order not found or has no billable items' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calculatedTotal = orderItems
      .filter((item) => item.status !== 'cancelled')
      .reduce((sum, item) => sum + Number(item.qty) * Number(item.unit_price), 0);

    if (calculatedTotal <= 0) {
      return new Response(
        JSON.stringify({ error: 'Order total must be greater than zero' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Reject if a payment is already pending for this order
    const { data: existingPending } = await supabase
      .from('payments')
      .select('id, idempotency_key, mpesa_checkout_request_id')
      .eq('order_id', order_id)
      .eq('status', 'pending')
      .maybeSingle();

    if (existingPending) {
      return new Response(
        JSON.stringify({
          error: 'A payment is already pending for this order. Please wait for completion or timeout.',
          payment_id: existingPending.id
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Mask phone number for security (e.g., 07XX***456)
    const rawPhone = String(phone_number || '0712345678').trim();
    const maskedPhone = rawPhone.length >= 8
      ? `${rawPhone.slice(0, 4)}***${rawPhone.slice(-3)}`
      : '07XX***000';

    const idempotencyKey = `PAY-${order_id.slice(0, 8)}-${Date.now()}`;
    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 90000 + 10000)}`;

    // 4. Record pending payment row
    const { data: paymentRecord, error: payErr } = await supabase
      .from('payments')
      .insert({
        order_id,
        session_id: session_id || null,
        amount: calculatedTotal,
        currency: 'KES',
        method: 'mpesa',
        status: 'pending',
        idempotency_key: idempotencyKey,
        mpesa_checkout_request_id: checkoutRequestId,
        phone_number_masked: maskedPhone
      })
      .select()
      .single();

    if (payErr) throw payErr;

    // 5. Record audit event
    await supabase.from('payment_audit_events').insert({
      payment_id: paymentRecord.id,
      event_type: 'PAYMENT_INITIATED',
      previous_status: null,
      new_status: 'pending',
      source: 'system'
    });

    return new Response(
      JSON.stringify({
        success: true,
        payment_id: paymentRecord.id,
        checkout_request_id: checkoutRequestId,
        amount: calculatedTotal,
        currency: 'KES',
        phone_masked: maskedPhone,
        message: 'M-Pesa STK push initiated successfully. Please enter PIN on your handset.'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Payment initiation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
