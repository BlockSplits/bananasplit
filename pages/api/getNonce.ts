import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSupabase } from '../../utils/supabase'

type Data =
  | {
      nonce: number
    }
  | {
      error: string
    }

const supabase = getSupabase(process.env.SUPABASE_SERVICE_ROLE as string)

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const nonce = Math.floor(Math.random() * 10000)

    const { walletAddress } = await JSON.parse(req.body)
    const { data, error: getUserError } = await supabase.from('users').select('*').eq('address', walletAddress)
    if (getUserError) throw new Error('getUserError: ' + getUserError.message)

    if (data.length > 0) {
      const { error: updateUserError } = await supabase.from('users').update({ nonce: nonce }).eq('id', data[0].id)
      if (updateUserError) throw new Error('updateUserError: ' + updateUserError.message)
    } else {
      const { error: createUserError } = await supabase
        .from('users')
        .insert({ address: walletAddress, nonce: nonce, name: walletAddress })
      if (createUserError) throw new Error('createUserError: ' + createUserError.message)
    }

    return res.status(200).json({ nonce })
  } catch ({ message }) {
    return res.status(400).json({ error: message as string })
  }
}
