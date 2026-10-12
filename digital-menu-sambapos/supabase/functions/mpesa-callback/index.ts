import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const stkCallback = body?.Body?.stkCallback || body;
    const resultCode = stkCallback?.ResultCode;
    const checkoutRequestId = stkCallback?.CheckoutRequestID;
    const resultDesc = stkCallback?.ResultDesc || 'Callback received';

    if (!checkoutRequestId) {
      return new Response(JSON.stringify({ error: 'Missing CheckoutRequestID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Look up existing pending payment
    const { data: payment, error: payErr } = await supabase
      .from('payments')
      .select('*')
      .eq('mpesa_checkout_request_id', checkoutRequestId)
      .maybeSingle();

    if (payErr || !payment) {
      return new Response(JSON.stringify({ error: 'Matching payment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (payment.status !== 'pending') {
      // Idempotency: already processed
      return new Response(JSON.stringify({ message: 'Payment already processed' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isSuccess = resultCode === 0 || resultCode === '0';
    const newStatus = isSuccess ? 'success' : 'failed';

    // Extract receipt number if available
    let receiptNumber = null;
    const items = stkCallback?.CallbackMetadata?.Item || [];
    const receiptItem = items.find((i: { Name: string }) => i.Name === 'MpesaReceiptNumber');
    if (receiptItem && receiptItem.Value) {
      receiptNumber = String(receiptItem.Value);
    }

    // Update payment record
    await supabase
      .from('payments')
      .update({
        status: newStatus,
        mpesa_receipt_number: receiptNumber || (isSuccess ? `SHB${Date.now().toString().slice(-7)}` : null),
        raw_callback_payload: body,
        updated_at: new Date().toISOString(),
        verified_at: isSuccess ? new Date().toISOString() : null
      })
      .eq('id', payment.id);

    // Audit trail
    await supabase.from('payment_audit_events').insert({
      payment_id: payment.id,
      event_type: isSuccess ? 'MPESA_SUCCESS' : 'MPESA_FAILED',
      previous_status: 'pending',
      new_status: newStatus,
      source: 'webhook'
    });

    // If success, update order and session status
    if (isSuccess && payment.order_id) {
      await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', payment.order_id);
    }

    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: 'Accepted' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Callback error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
