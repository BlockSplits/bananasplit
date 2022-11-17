import { SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export const context = createContext<{
  client: () => SupabaseClient | undefined
}>({
  client: () => undefined,
})

export function useClient() {
  const { client } = useContext(context)
  if (!client) {
    throw new Error('Must be used inside SupabaseQueryProvider')
  }
  return { client }
}
