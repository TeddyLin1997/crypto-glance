import { useEffect, useState } from 'react'
import { ethers, BrowserProvider, formatEther, Signer } from 'ethers'
import { CHAIN_INFO } from '@/global/chain'
import { checksumAddress } from '@/utils'
import { createContainer } from 'unstated-next'

const initWalletContext = {
  provider: new BrowserProvider(window.ethereum),
  chainId: 0,
  account: '',
  balance: 0,
  isConnect: false,
  isSigner: false,
  signer: null,
  connect: () => Promise.resolve(),
  switchChain: () => Promise.resolve(),
}

const useWallet = () => {
  // proxy provider
  const [ethereum, setEthereum] = useState<any>(undefined)

  // connect account
  const [account, setAccount] = useState(initWalletContext.account)
  const connect = async (proxyProvider: any) => {
    if (!proxyProvider) return
    try {

      const accounts = await proxyProvider.request({ method: 'eth_requestAccounts' })
      setAccount(checksumAddress(accounts[0]))
      setIsConnect(true)
      setEthereum(proxyProvider)

      const chainId = await proxyProvider.request({ method: 'eth_chainId' })
      setChainId(parseInt(chainId))
    } catch (connectError) {
      console.error('Failed to connect:', connectError)
    }
  }

  // switch chain
  const [chainId, setChainId] = useState(initWalletContext.chainId)
  const switchChain = async (newChainId: number) => {
    if (!ethereum) return
    const chainInfo = CHAIN_INFO[newChainId]

    requestChain()

    async function requestChain () {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${newChainId.toString(16)}` }],
        })
        setChainId(newChainId)
      } catch (error) {
        if ((error as any).message.includes('wallet_addEthereumChain')) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${chainInfo.id.toString(16)}`,
              chainName: chainInfo.name,
              nativeCurrency: {
                name: chainInfo.coin.name,
                symbol: chainInfo.coin.name,
                decimals: 18,
              },
              rpcUrls: [chainInfo.rpc],
              blockExplorerUrls: [chainInfo.explorer],
            }],
          })

          setChainId(newChainId)
        }
      }
    }
  }

  useEffect(() => {
    if (!ethereum) return

    function handleChainChanged (chainId: string) {setChainId(parseInt(chainId)) }
    function handleAccountChanged (accounts: string[]) { setAccount(checksumAddress(accounts[0] || '')) }

    ethereum.on('chainChanged', handleChainChanged)
    ethereum.on('accountsChanged', handleAccountChanged)
    return () => {
      ethereum.removeListener('chainChanged', handleChainChanged)
      ethereum.removeListener('accountsChanged', handleAccountChanged)
    }
  }, [ethereum])

  // provider
  const [isConnect, setIsConnect] = useState(false)
  const [provider, setProvider] = useState(initWalletContext.provider)

  useEffect(() => {
    if (!CHAIN_INFO[chainId]) return
    if (!ethereum) return

    const rpcProvider = new ethers.BrowserProvider(ethereum)

    rpcProvider.getNetwork()
      .then((network) => {
        console.log('connect blockchain success:', network.name)
      })
      .catch((error) => {
        console.error('connect blockchain error:', error)
      })

    setProvider(rpcProvider)
  }, [chainId, ethereum])

  // balance
  const [balance, setBalance] = useState(initWalletContext.balance)
  useEffect(() => {
    if (isConnect && account) getBalance()
    async function getBalance () {
      const balanceInWei = await provider.getBalance(account)
      const balanceInEth = Number(formatEther(balanceInWei))
      setBalance(Math.round(balanceInEth * 10000) / 10000) // 只留四位小數)
    }
  }, [account, provider, isConnect, ethereum])

  // signer
  const [isSigner, setisSigner] = useState(initWalletContext.isSigner)
  const [signer, setSigner] = useState<Signer | null>(initWalletContext.signer)

  useEffect(() => {
    setisSigner(false)
    setSigner(null)

    provider.getSigner().then(res => {
      setisSigner(true)
      setSigner(res)
    })
  }, [provider, account, chainId, ethereum])

  // disconnect
  const disconnect = () => {
    setAccount(initWalletContext.account)
    setChainId(initWalletContext.chainId)
    setBalance(initWalletContext.balance)
    setProvider(new BrowserProvider(ethereum))
    setIsConnect(false)
  }

  return { isSigner, signer, account, chainId, provider, balance, isConnect, connect, switchChain, disconnect }
}

const WalletContainer = createContainer(useWallet)

export default WalletContainer
