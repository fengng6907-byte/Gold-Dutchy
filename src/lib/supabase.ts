import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseUrl =
  rawUrl && rawUrl.startsWith('https://') ? rawUrl : 'https://placeholder.supabase.co'
const supabaseAnon =
  rawKey && rawKey.startsWith('eyJ') ? rawKey : 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnon)
