import Connected from './connected'
import Assets from './assets'
import Chart from './chart'
import TotalValue from './total-value'
import ConntectWalletDialog from '@/components/connect-wallet-dialog'
import WalletContainer from '@/context/wallet-context'
import { useEffect, useState } from 'react'
import TokenPriceContainer from '@/context/token-price-context'
import { ethers, formatEther, formatUnits } from 'ethers'
import { ERC20_ABI } from '@/global/oracle'
import { CHAIN_INFO } from '@/global/chain'
import toast from 'react-hot-toast'
import { sleep } from '@/utils'

const Home = () => {
  const [isOpenConnectDialog, setIsOpenConnectDialog] = useState(false)
  const { balance, account, setBalance, isConnect, disconnect, provider, chainId } = WalletContainer.useContainer()
  const { tokenAddressList, tokensInfo, updateToken } = TokenPriceContainer.useContainer()

  const chainInfo = CHAIN_INFO[chainId]

  // listen native token
  useEffect(() => {
    if (!isConnect) return
    if (!account) return

    let previousBalance = balance
    const listen = async () => {
      await sleep(0.3)
      const rawCurrentBalance = await provider.getBalance(account)
      const currBalance = Number(formatEther(rawCurrentBalance))

      if (currBalance !== previousBalance) {
        setBalance(Number(currBalance))
        const type = currBalance > previousBalance ? 'Receive' : 'Send'
        const amount = currBalance - previousBalance
        toast.success(`${type} ${chainInfo.coin?.name}: ${Math.abs(amount)}`, { style: { wordBreak: 'break-all' }})
        previousBalance = currBalance
      }
    }

    provider.on('block', listen)
    return () => { provider.off('block', listen) }
  }, [isConnect, provider, account, balance])

  // listen erc20 transfer
  useEffect(() => {
    if (!isConnect) return

    const contractList = [] as any
    tokenAddressList.forEach(address => {
      const tokenContract = new ethers.Contract(address, ERC20_ABI, provider)
      const listen = tokenContract.on('Transfer', async (from, to, amount) => {
        if (from === account || to === account) {
          updateToken(address)
          const type = from === account ? 'Send' : 'Receive'
          toast.success(`${type} ${tokensInfo[address]?.symbol}: ${formatUnits(amount, tokensInfo[address].decimals)}`, { style: { wordBreak: 'break-all' }})
        }
      })

      contractList.push({ contract: tokenContract, listen })
    })

    return () => contractList.forEach(item => { item.contract.removeAllListeners('Transfer') })
  }, [isConnect, provider, tokensInfo])

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

        <div className="mb-10 flex items-stretch gap-4">
          <Chart />
          <TotalValue />
          <Connected />
        </div>
      </div>


      <ConntectWalletDialog isOpen={isOpenConnectDialog} onClose={() => setIsOpenConnectDialog(false)} />
    </>
  )
}

export default Home
