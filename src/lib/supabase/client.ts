import {
  createClient as createSupabaseClient,
  type SupabaseClient,
} from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

let browserClient: SupabaseClient<Database> | null = null;

export const createClient = () => {
  if (!browserClient) {
    browserClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
};
