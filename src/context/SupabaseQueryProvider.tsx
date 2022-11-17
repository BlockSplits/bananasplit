import { SupabaseClient } from '@supabase/supabase-js'
import { Dispatch, SetStateAction } from 'react'
import { context } from '../hooks/useClient'

type Provider = {
  children: React.ReactNode
  client: () => SupabaseClient | undefined
}

export function SupabaseQueryProvider({ children, client }: Provider) {
  return <context.Provider value={{ client }}>{children}</context.Provider>
}
