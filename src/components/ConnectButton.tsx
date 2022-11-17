import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

export const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
        return (
          <div className={!ready ? 'opacity-0 pointer-events-none select-none' : ''}>
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="cursor-pointer text-gray-800 bg-orange-50 hover:bg-orange-150 ring-2 ring-gray-800 focus:ring-2 focus:ring-orange-300 font-regular text-sm px-2 lg:px-2 py-1 lg:py-1 mr-2 focus:outline-none flex items-center rounded-2xl"
                  >
                    Connect Wallet
                  </button>
                )
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="cursor-pointer text-gray-800 bg-orange-50 hover:bg-orange-150 ring-2 ring-gray-800 focus:ring-2 focus:ring-orange-300 font-regular text-sm px-2 lg:px-2 py-1 lg:py-1 mr-2 focus:outline-none flex items-center rounded-2xl"
                  >
                    Wrong network
                  </button>
                )
              }
              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className="cursor-pointer text-gray-800 bg-orange-50 hover:bg-orange-150 ring-2 ring-gray-800 focus:ring-2 focus:ring-orange-300 font-regular text-sm px-2 lg:px-2 py-1 lg:py-1 mr-2 focus:outline-none flex items-center rounded-2xl"
                >
                  <span className="mr-2">
                    {account.ensAvatar && (
                      <Image
                        src={account.ensAvatar}
                        style={{ borderRadius: '15px' }}
                        alt="account ens avatar"
                        width={30}
                        height={30}
                      />
                    )}
                  </span>
                  <span>{account.displayName}</span>
                </button>
              )
            })()}
          </div>
        )
      }}
    </RainbowConnectButton.Custom>
  )
}
