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

    const { qr_token, table_no, party_size = 2 } = await req.json();

    if (!qr_token && !table_no) {
      return new Response(
        JSON.stringify({ error: 'qr_token or table_no required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Lookup table
    let tableQuery = supabase.from('tables').select('*');
    if (qr_token) {
      tableQuery = tableQuery.eq('qr_token', qr_token);
    } else {
      tableQuery = tableQuery.eq('table_no', String(table_no).padStart(2, '0'));
    }

    const { data: table, error: tableErr } = await tableQuery.single();
    if (tableErr || !table) {
      return new Response(
        JSON.stringify({ error: 'Table not found for given QR token or number' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check for existing open session
    const { data: existingSession } = await supabase
      .from('table_sessions')
      .select('*')
      .eq('table_id', table.id)
      .eq('status', 'open')
      .maybeSingle();

    if (existingSession) {
      return new Response(
        JSON.stringify({
          success: true,
          session: existingSession,
          table,
          message: 'Existing open session retrieved'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create new session
    const { data: newSession, error: sessionErr } = await supabase
      .from('table_sessions')
      .insert({
        table_id: table.id,
        party_size,
        status: 'open',
        opened_at: new Date().toISOString()
      })
      .select()
      .single();

    if (sessionErr) throw sessionErr;

    // Update table status to occupied
    await supabase
      .from('tables')
      .update({ status: 'occupied' })
      .eq('id', table.id);

    return new Response(
      JSON.stringify({
        success: true,
        session: newSession,
        table,
        message: 'New table session opened'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Internal error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
