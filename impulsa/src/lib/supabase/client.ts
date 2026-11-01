import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  if (!browserClient) {
    browserClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
};
