import { useEffect, useMemo, useState } from 'react'
import { createContainer } from 'unstated-next'
import WalletContainer from './wallet-context'
import { ethers, formatUnits } from 'ethers'
import { AAVE_PRICE_ORACLE_ADDRESS, AAVE_PRICE_ORACLE_ABI, ERC20_ABI } from '@/global/oracle'

const tokenMap = {} as { [address: string]: TokenInfo }

const useTokenPrice = () => {
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

  // crypto summary
  const [tokensInfo, setTokensInfo] = useState<typeof tokenMap>({})
  const updateToken = async (address: string) => {
    const tokenInfo = await getTokenInfo(address)
    setTokensInfo(prev => ({ ...prev, [address]: tokenInfo }))
  }

  useEffect(() => {
    if (!isConnect) return
    tokenAddressList.forEach(async (address: string) => {
      if (!tokensInfo[address]) updateToken(address)
    })
  }, [isConnect, tokenAddressList])

  return { tokenAddressList, addToken, tokensInfo, getTokenInfo }
}

const TokenPriceContainer = createContainer(useTokenPrice)

export default TokenPriceContainer
