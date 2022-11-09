import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient

const getSupabase = (access_token: string) => {
  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
      {
        global: {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      }
    )
  }

  return supabase
}

export { getSupabase }
