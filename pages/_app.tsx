import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { injectedWallet, metaMaskWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SupabaseQueryProvider } from '../src/context/SupabaseQueryProvider'
import { getClientSupabase } from '../src/utils/supabase'

const { chains, provider } = configureChains([chain.mainnet], [publicProvider()])

const wallets = [
  injectedWallet({ chains }),
  metaMaskWallet({ chains }),
  coinbaseWallet({ chains, appName: 'BananaSplitz' }),
  walletConnectWallet({ chains }),
]

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets,
  },
])

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <SupabaseQueryProvider client={getClientSupabase}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>{' '}
        </SupabaseQueryProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
