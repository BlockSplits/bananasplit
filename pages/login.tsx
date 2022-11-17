import '@rainbow-me/rainbowkit/styles.css'
import type { NextPage } from 'next'
import Cookies from 'js-cookie'

import { ConnectButton } from '../src/components/ConnectButton'
//import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { useCallback, useEffect, useState } from 'react'
import { useSupabaseQuery } from '../src/hooks/useSupabaseQuery'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

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
    <div className="w-full h-screen">
      <Head>
        <title>Banana Splitz</title>
        <link rel="icon" href="/banana-splitz.png" />
      </Head>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 pt-6">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href={'/'}>
              <a className="flex items-center">
                <Image
                  src="/banana-splitz.png"
                  className="mr-3 h-6 sm:h-9"
                  alt="Banana splitz Logo"
                  width={50}
                  height={50}
                />
              </a>
            </Link>
            <ConnectButton />
          </div>
        </nav>
      </header>
      <section>
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
      </section>
    </div>
  )
}

export default Login
