import '@rainbow-me/rainbowkit/styles.css'
import type { NextPage } from 'next'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '../utils/supabase'

type User = {
  name: string
}

const Home: NextPage = () => {
  const [message, setMessage] = useState()
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState('')
  const { address } = useAccount()
  const { data: signature, isSuccess, signMessage } = useSignMessage()

  const sign = async () => {
    try {
      const res = await fetch(`/api/getNonce`, {
        method: 'POST',
        body: JSON.stringify({ walletAddress: address }),
      })
      const { nonce } = await res.json()
      setMessage(nonce.toString())
      signMessage({ message: nonce.toString() })
    } catch (err) {
      console.log(err)
    }
  }

  const login = useCallback(async () => {
    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        body: JSON.stringify({ walletAddress: address, signature, message }),
      })
      const { token } = await res.json()
      setToken(token)
      const { data } = await getSupabase(token).from('users').select('*').single()
      setUser(data)
    } catch (err) {
      console.log(err)
    }
  }, [address, message, signature])

  useEffect(() => {
    if (isSuccess) {
      login()
    }
  }, [isSuccess, signature, login])

  return (
    <div className="text-white bg-black w-full h-screen p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Banana Splitz 🍌</h1>
        <ConnectButton />
      </div>

      <div className="flex flex-col space-y-4 items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-md"
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

export default Home
