import '@rainbow-me/rainbowkit/styles.css'
import type { NextPage } from 'next'
import Cookies from 'js-cookie'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { useSupabaseQuery } from '../src/hooks/useSupabaseQuery'

const Login: NextPage = () => {
  const [nonce, setNonce] = useState()
  const { address } = useAccount()
  const { data: signature, isSuccess, signMessage } = useSignMessage()
  const accessToken = Cookies.get('token')

  const { data: user, refetch } = useSupabaseQuery((supabase) => supabase().from('users').select('*').single(), {
    queryKey: ['user'],
    enabled: false,
  })

  const sign = async () => {
    try {
      const res = await fetch(`/api/getNonce`, {
        method: 'POST',
        body: JSON.stringify({ walletAddress: address }),
      })
      const { nonce } = await res.json()
      setNonce(nonce.toString())
      signMessage({ message: nonce.toString() })
    } catch (err) {
      console.log(err)
    }
  }

  const login = useCallback(async () => {
    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify({ walletAddress: address, signature, message: nonce }),
      })
      const { token } = await res.json()
      Cookies.set('token', token)
    } catch (err) {
      console.log(err)
    }
  }, [address, nonce, signature])

  useEffect(() => {
    if (isSuccess) {
      login()
    }
  }, [isSuccess, signature, login])

  useEffect(() => {
    if (accessToken) {
      refetch()
    }
  }, [accessToken, refetch])

  return (
    <div className="text-black bg-yellow-100 w-full h-screen p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Banana Splitz 🍌</h1>
        <ConnectButton />
      </div>

      <div className="flex flex-col space-y-4 items-center">
        <button
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded max-w-md"
          onClick={sign}
        >
          Login with wallet
        </button>

        {user ? (
          <p>
            Hello {user.name.substring(0, 4)}...{user.name.substring(user.name.length - 4, user.name.length)}
          </p>
        ) : (
          <p>No user yet</p>
        )}
      </div>
    </div>
  )
}

export default Login
