// The client supplies only order_id. Server recomputes totals and blocks duplicate pending payments.
export default async function handler(_req: Request) { return new Response(JSON.stringify({ok:false,error:'Configure Supabase Edge Function secrets before use'}),{status:501,headers:{'content-type':'application/json'}}); }
