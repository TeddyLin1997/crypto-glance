import Connect from './connect'
import Assets from './assets'
import Chart from './chart'
import TotalValue from './total-value'
import ConntectWalletDialog from '@/components/connect-wallet-dialog'
import WalletContainer from '@/context/wallet-context'
import { useState } from 'react'

const Home = () => {
  const [isOpenConnectDialog, setIsOpenConnectDialog] = useState(false)
  const { account, isConnect, disconnect } = WalletContainer.useContainer()

  return (
    <>
      <div className="mx-auto py-3 px-10 max-w-screen-xl">

        <header className="mb-2 flex">
          <div className="py-2 font-bold text-lg">Asset Management</div>
          <div className="ml-auto">
            { isConnect ?
              <div className="flex items-center gap-4">
                <span className="font-bold text-lg">{`${account.slice(0, 6)}......${account.slice(-6)}`}</span>
                <div className="p-1 font-bold border cursor-pointer hover:bg-white hover:text-black" onClick={disconnect}>
                  Disconnect
                </div>
              </div>
              :
              <div className="p-2 font-bold border rounded cursor-pointer hover:bg-white hover:text-black" onClick={() => setIsOpenConnectDialog(true)}>
                Connect Wallet
              </div>
            }

          </div>
        </header>

        <Assets />

        <div className="flex items-center gap-4">
          <Chart />
          <TotalValue />
          <Connect />
        </div>
      </div>


      <ConntectWalletDialog isOpen={isOpenConnectDialog} onClose={() => setIsOpenConnectDialog(false)} />
    </>
  )
}

export default Home
