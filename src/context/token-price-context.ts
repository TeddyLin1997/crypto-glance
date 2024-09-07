import { useEffect, useMemo, useState } from 'react'
import { createContainer } from 'unstated-next'
import WalletContainer from './wallet-context'
import { ethers, formatUnits } from 'ethers'
import { AAVE_PRICE_ORACLE_ADDRESS, AAVE_PRICE_ORACLE_ABI, ERC20_ABI } from '@/global/oracle'
import { CHAIN_INFO } from '@/global/chain'

const tokenMap = {} as { [address: string]: TokenInfo }

const useTokenPrice = () => {
  const { chainId } = WalletContainer.useContainer()
  const { provider, account, isConnect } = WalletContainer.useContainer()

  // get token info(price)
  const AAVEOracleContract = useMemo(() => new ethers.Contract(AAVE_PRICE_ORACLE_ADDRESS, AAVE_PRICE_ORACLE_ABI, provider), [provider])
  const getTokenInfo = async (tokenAddress: string) => {
    const tokenPrice = await AAVEOracleContract.getAssetPrice(tokenAddress).then(rawPrice => Number(rawPrice) / 1e8)

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    const [rawBalance, name, symbol, decimals] = await Promise.all([
      tokenContract.balanceOf(account),
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals()
    ])

    return {
      name: name,
      symbol: symbol,
      decimals: decimals,
      balance: formatUnits(rawBalance, decimals),
      price: tokenPrice,
    }
  }

  // token address list
  const [tokenAddressList, setTokenAddressList] = useState<Array<string>>([])
  useEffect(() => {
    setTokenAddressList(JSON.parse(localStorage.getItem('tokenAddressList') || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem('tokenAddressList', JSON.stringify(tokenAddressList))
  }, [tokenAddressList])

  const addToken = (address: string) => setTokenAddressList(prev => [...prev, address])

  // nativetoken
  const chainInfo = CHAIN_INFO[chainId]
  const [nativeTokenPrice, setNativeTokenPrice] = useState(0)

  const getNativeTokenPrice = async () => {
    const tokenInfo = await getTokenInfo(chainInfo.nativeTokenAddress || '')
    setNativeTokenPrice(tokenInfo.price)
  }
  useEffect(() => {
    if (chainId) getNativeTokenPrice()
  }, [chainId])

  // crypto summary
  const [tokensInfo, setTokensInfo] = useState<typeof tokenMap>({})
  const updateToken = async (address: string) => {
    const tokenInfo = await getTokenInfo(address)
    setTokensInfo(prev => ({ ...prev, [address]: tokenInfo }))
  }

  // update change token list
  useEffect(() => {
    if (!isConnect) return
    tokenAddressList.forEach(async (address: string) => {
      if (!tokensInfo[address]) updateToken(address)
    })
  }, [isConnect, tokenAddressList])

  // update change account
  useEffect(() => {
    if (!isConnect) return
    tokenAddressList.forEach(async (address: string) => updateToken(address))
  }, [isConnect, account])

  // total value
  const [totalValue, setTotalValue] = useState(0)

  return { tokenAddressList, addToken, tokensInfo, getTokenInfo, totalValue, setTotalValue, nativeTokenPrice, updateToken }
}

const TokenPriceContainer = createContainer(useTokenPrice)

export default TokenPriceContainer
