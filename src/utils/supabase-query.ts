import type { PostgrestFilterBuilder, PostgrestSingleResponse } from '@supabase/postgrest-js'
import { SupabaseClient } from '@supabase/supabase-js'
import { UseMutationOptions, UseMutationResult } from 'react-query'

type GeneratedQuery = PostgrestFilterBuilder<any, any, any> & { _table?: string }

export type QueryCreator = (
  supabase: () => SupabaseClient
) => (PostgrestFilterBuilder<any, any, any> & { _table?: string }) | PromiseLike<PostgrestSingleResponse<any>>

export const execute = (query: GeneratedQuery) =>
  new Promise<any>(async (resolve, reject) => {
    const { data, error } = await query
    if (data) {
      resolve(data)
    } else {
      reject(error)
    }
  })

declare module 'react-query' {
  function useMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    queryCreator: QueryCreator,
    options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
  ): UseMutationResult<TData, TError, TVariables, TContext>
}
