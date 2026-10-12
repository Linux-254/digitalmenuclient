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

    const { sync_id, status, pos_ticket_ref, error_message } = await req.json();

    if (!sync_id) {
      return new Response(JSON.stringify({ error: 'sync_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: logEntry, error } = await supabase
      .from('pos_sync_log')
      .update({
        status: status || 'success',
        pos_ticket_ref: pos_ticket_ref || null,
        error: error_message || null
      })
      .eq('id', sync_id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, log: logEntry }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
