import type { NextApiRequest, NextApiResponse } from 'next'
import jwt, { Secret } from 'jsonwebtoken'
import { ethers } from 'ethers'
import { getSupabase } from '../../src/utils/supabase'

type Data =
  | {
      token: string
    }
  | {
      error: string
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { walletAddress, signature, message } = await JSON.parse(req.body)

    const account = ethers.utils.verifyMessage(message, signature)

    if (account != walletAddress) throw new Error('Wrong account.')

    const { data: user, error } = await getSupabase(process.env.SUPABASE_SERVICE_ROLE as string)
      .from('users')
      .select('*')
      .eq('address', walletAddress)
      .eq('nonce', message)
      .single()
    if (error) throw new Error(error.message)

    const token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000 + 60 * 60),
        user_id: user?.id,
      },
      process.env.SUPABASE_JWT_SECRET as Secret
    )

    return res.status(200).json({ token })
  } catch ({ message }) {
    return res.status(400).json({ error: message as string })
  }
}
