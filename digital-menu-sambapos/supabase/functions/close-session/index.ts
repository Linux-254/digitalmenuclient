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

    const { session_id, table_id } = await req.json();

    if (!session_id && !table_id) {
      return new Response(
        JSON.stringify({ error: 'session_id or table_id required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let session = null;
    if (session_id) {
      const { data } = await supabase.from('table_sessions').select('*').eq('id', session_id).single();
      session = data;
    } else {
      const { data } = await supabase.from('table_sessions').select('*').eq('table_id', table_id).eq('status', 'open').maybeSingle();
      session = data;
    }

    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Active session not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Close session
    await supabase
      .from('table_sessions')
      .update({ status: 'closed', closed_at: new Date().toISOString() })
      .eq('id', session.id);

    // Free table
    await supabase
      .from('tables')
      .update({ status: 'available' })
      .eq('id', session.table_id);

    return new Response(
      JSON.stringify({ success: true, message: 'Table session closed successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Error closing session' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
