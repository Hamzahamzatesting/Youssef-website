import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Supabase env vars are missing. Copy admin/.env.example to admin/.env.local and fill in your project's URL/anon key."
  );
}

// Not parameterized with the hand-written Database type: every query result
// in features/* is already explicitly cast to its type from @/types/database,
// so the generic buys no extra safety here while its Row/Insert/Update
// inference is fragile to hand-maintain without the Supabase CLI's generated
// types. Regenerate real types later with `supabase gen types typescript`.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
