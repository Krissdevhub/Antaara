import { createClient } from '@supabase/supabase-js';

// Project default credentials for live Supabase PostgreSQL engine
const DEFAULT_SUPABASE_URL = 'https://lzzxykdqffmdtwqhjqlc.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_3_d7O7a00hHHLWAp-BsxoQ_gN5lvXRv';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  DEFAULT_SUPABASE_ANON_KEY;

const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && (supabaseAnonKey || supabaseServiceRoleKey)
);

// Active key prioritizes service role key on server-side operations if present, falling back to anon key
const activeKey = supabaseServiceRoleKey || supabaseAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, activeKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
