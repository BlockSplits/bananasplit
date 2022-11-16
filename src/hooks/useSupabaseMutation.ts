import { useClient } from './useClient'
import { useMutation, UseMutationOptions } from 'react-query'
import { QueryCreator } from '../utils/supabase-query'

export function useSupabaseMutation<T = any>(options?: UseMutationOptions<T>) {
  const { client } = useClient()

  return useMutation(
    (queryCreator: QueryCreator) =>
      new Promise<any>((res, rej) => {
        queryCreator(client).then((d: any) => {
          if (d.error) {
            return rej(d.error)
          }
          return res(d.data)
        })
      }),
    options as any
  )
}
