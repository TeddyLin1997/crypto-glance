import TokenPriceContainer from '@/context/token-price-context'
import WalletContainer from '@/context/wallet-context'
import ReactEcharts from 'echarts-for-react'
import { CHAIN_INFO } from '@/global/chain'

const Chart = () => {
  const { balance, chainId } = WalletContainer.useContainer()
  const { tokenAddressList, tokensInfo, nativeTokenPrice } = TokenPriceContainer.useContainer()

  const chainInfo = CHAIN_INFO[chainId]


  const pieData = tokenAddressList.map(address => ({
    name: tokensInfo[address]?.name || '-',
    value: Number(tokensInfo[address]?.balance || 0) * Number(tokensInfo[address]?.price || 0)
  }))

  const nativeTokenData = {
    name: chainInfo?.coin?.name || '-',
    value: Number(balance) * Number(nativeTokenPrice)
  }

  // 圓餅圖的配置
  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {d}%'
    },
    series: [
      {
        name: '資產價值',
        type: 'pie',
        radius: '50%',
        data: [ nativeTokenData, ...pieData ],
        label: { color: '#ffffff', fontWeight: 'bold' },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowColor: 'rgba(0, 0, 0, 1)'
          }
        }
      }
    ]
  })

  return (
    <section className="border">
      <article className="p-6">
        <div className="font-bold text-2xl">Asset Allocation</div>
        <div className="mt-1">Visualize the distribution of your cryptocurrency holdings.</div>
      </article>

      <article className="p-6">
        <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />;
      </article>
    </section>
  )
}

export default Chart
