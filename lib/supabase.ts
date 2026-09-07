import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Server-side Supabase client. The publishable (anon) key is designed to be
   public: Row Level Security limits it to INSERTing survey responses; individual
   rows cannot be read back, and aggregate counts are served through the
   metrics_* views only. It lives in env vars rather than the client bundle
   simply because nothing in the browser needs it any more. */

let client: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    client = null;
    return client;
  }

  try {
    client = createClient(url, key, { auth: { persistSession: false } });
  } catch {
    client = null;
  }
  return client;
}
