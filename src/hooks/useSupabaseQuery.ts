import { useQuery, UseQueryOptions } from 'react-query'
import { execute, QueryCreator } from '../utils/supabase-query'
import { useClient } from './useClient'

export function useSupabaseQuery<T = any>(
  queryCreator: QueryCreator,
  options?: UseQueryOptions<T> & { queryKey?: string | unknown[] }
) {
  const { client } = useClient()
  const query = queryCreator(client)

  return useQuery<T>(options?.queryKey ?? [query._table], () => execute(query))
}
