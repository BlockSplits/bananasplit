import { createClient } from '@supabase/supabase-js'
import Cookies from 'js-cookie'

const getSupabase = (access_token?: string) =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
    {
      global: {
        headers: {
          Authorization: access_token ? `Bearer ${access_token}` : '',
        },
      },
    }
  )

const getClientSupabase = () => {
  const accessToken = Cookies.get('token')

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_ANON_KEY as string,
    {
      global: {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      },
    }
  )
}

export { getSupabase, getClientSupabase }
