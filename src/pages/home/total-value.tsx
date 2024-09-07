
import TokenPriceContainer from '@/context/token-price-context'
import WalletContainer from '@/context/wallet-context'
import { formatAmount } from '@/utils'
import { useMemo } from 'react'

const TotalValue = () => {
  const { balance } = WalletContainer.useContainer()
  const { tokenAddressList, tokensInfo, nativeTokenPrice } = TokenPriceContainer.useContainer()

  const totalUsdValue = useMemo(() => {
    return tokenAddressList.reduce((acc, curr) => acc + Number(tokensInfo[curr]?.balance || 0) * Number(tokensInfo[curr]?.price || 0), Number(balance) * Number(nativeTokenPrice))
  }, [balance, nativeTokenPrice, tokenAddressList, tokensInfo])

  return (
    <section className="border">
      <article className="p-6">
        <div className="font-bold text-2xl">Total Asset Value</div>
        <div className="mt-1">The total USD value of your cryptocurrency holdings.</div>
      </article>

      <article className="p-6">
        <div className="text-4xl font-bold">{`$${formatAmount(totalUsdValue)}`}</div>
      </article>
    </section>
  )
}

export default TotalValue
