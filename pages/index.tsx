import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const Home: NextPage = () => {
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
            <div className="flex items-center lg:order-2">
              <Link href={'/login'}>
                <div className="cursor-pointer text-gray-800 bg-orange-50 hover:bg-orange-150 ring-2 ring-gray-800 focus:ring-2 focus:ring-orange-300 font-regular rounded-lg text-sm px-2 lg:px-2 py-1 lg:py-1 mr-2 focus:outline-none flex items-center rounded-2xl">
                  <span>Login with wallet</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <section>
        <div className="mx-auto max-w-screen-xl">
          <h1
            className="w-full text-7xl mt-60 mb-10 text-gray-800 font-bold text-center px-40"
            style={{ lineHeight: '100px' }}
          >
            Easiest way to{' '}
            <span className="inline">
              <span className="absolute z-0">
                <Image src="/split.png" alt="split" width={129} height={106} />
              </span>
              <span className="relative">split</span>
            </span>{' '}
            bills with web3 frens
          </h1>
          <div className="w-full flex justify-center">
            <button className="text-gray-800 bg-yellow-400 hover:bg-yellow-300 ring-2 ring-gray-500 px-10 py-1 rounded-2xl">
              Connect wallet
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex mt-10">
            <div className="flex-1 flex justify-center">
              <div>
                <Image src="/blocks.png" alt="split" width={56} height={52} />
                <h2 className="font-bold">Create Group</h2>
                <p>Organize with a group. Add your frens.</p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div>
                <Image src="/blocks.png" alt="split" width={56} height={52} />
                <h2 className="font-bold">Add expense</h2>
                <p>You can create a group. Add friends. Add expenses.</p>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div>
                <Image src="/blocks.png" alt="split" width={56} height={52} />
                <h2 className="font-bold">Settle debts</h2>
                <p>You can settle debts with 1 transaction. USDC or DAI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
