import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

function getUrl() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL
  return raw?.startsWith('https://') ? raw : 'https://placeholder.supabase.co'
}
function getAnonKey() {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return raw?.startsWith('eyJ') ? raw : 'placeholder-anon-key'
}
function getServiceKey() {
  const raw = process.env.SUPABASE_SERVICE_ROLE_KEY
  return raw?.startsWith('eyJ') ? raw : 'placeholder-service-key'
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(getUrl(), getAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Server component — ignore cookie setting errors
        }
      },
    },
  })
}

export async function createServiceClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(getUrl(), getServiceKey(), {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll() {},
    },
  })
}
