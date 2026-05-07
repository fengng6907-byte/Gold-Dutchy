import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fall back to a structurally-valid URL so createBrowserClient doesn't throw
// during static generation when env vars are absent or still hold placeholder text.
const supabaseUrl =
  rawUrl && rawUrl.startsWith('https://') ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = rawKey && rawKey.startsWith('eyJ') ? rawKey : 'placeholder-anon-key'

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
