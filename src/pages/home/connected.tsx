import WalletContainer from '@/context/wallet-context'
import { truncateSlice } from '@/utils'

const Connected = () => {

  const { accounts } = WalletContainer.useContainer()

  return (
    <section className="border">
      <article className="p-6">
        <div className="font-bold text-2xl">Connected Wallet</div>
        <div className="mt-1">The wallet you're currently using to manage your assets.</div>
      </article>

      <article className="p-6 h-[420px] overflow-auto">
        {accounts.map(item => <div key={item} className="mb-4 p-3 border rounded">{truncateSlice(item)}</div>)}
      </article>
    </section>
  )
}

export default Connected
