import WalletContainer from '@/context/wallet-context'
import AddTokenDialog from '@/components/add-token-dialog'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import TokenPriceContainer from '@/context/token-price-context'
import { formatAmount } from '@/utils'
import { Button } from '@mui/material'
import { CHAIN_INFO } from '@/global/chain'

const AssetsTable = () => {
  const { balance, chainId } = WalletContainer.useContainer()
  const { tokenAddressList, addToken, tokensInfo, getTokenInfo } = TokenPriceContainer.useContainer()

  const chainInfo = CHAIN_INFO[chainId]

  const [nativeTokenPrice, setNativeTokenPrice] = useState(0)
  const getNativeTokenPrice = async () => {
    const tokenInfo = await getTokenInfo(chainInfo.nativeTokenAddress || '')
    setNativeTokenPrice(tokenInfo.price)
  }
  useEffect(() => { getNativeTokenPrice() }, [])

  // dialog
  const [isOpenAddTokenDialog, setIsOpenAddTokenDialog] = useState(false)

  const nativeToken: TokenInfo = {
    name: chainInfo?.coin?.name || '-',
    symbol: chainInfo?.coin?.name || '-',
    balance: String(balance),
    price: nativeTokenPrice,
  }

  return (
    <TableContainer>
      <div className="flex items-center">
        <span className="ml-auto mb-2 p-2 font-bold border rounded-md cursor-pointer hover:bg-white hover:text-black" onClick={() => setIsOpenAddTokenDialog(true)}>Add Token</span>
      </div>

      <AddTokenDialog isOpen={isOpenAddTokenDialog} onClose={() => setIsOpenAddTokenDialog(false)} addToken={addToken} />
      <Table className="w-full">
        <Thead>
          <Tr textAlign="left" className="border-b">
            <Th className="p-4">Assets</Th>
            <Th className="p-4">Amount</Th>
            <Th className="p-4">USD Value</Th>
            <Th className="p-4"><span className="opacity-0">send</span></Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* native token */}
          <Tr className="border-b">
            <Td className="p-4">{ `${nativeToken.name} ( ${nativeToken.symbol} )` }</Td>
            <Td className="p-4">{ nativeToken.balance }</Td>
            <Td className="p-4">${ formatAmount(Number(nativeToken.balance || 0) * Number(nativeToken.price || 0)) }</Td>
            <Td className="p-4">
              <Button variant="text">Send</Button>
            </Td>
          </Tr>

          { tokenAddressList.map((address) => (
            <Tr key={address} className="border-b">
              <Td className="p-4">{ `${tokensInfo[address]?.name || '-'} ( ${tokensInfo[address]?.symbol || '-'} )` }</Td>
              <Td className="p-4">{ tokensInfo[address]?.balance || '-' }</Td>
              <Td className="p-4">${ formatAmount(Number(tokensInfo[address]?.balance || 0) * Number(tokensInfo[address]?.price || 0)) }</Td>
              <Td className="p-4">
                <Button variant="text">Send</Button>
              </Td>
            </Tr>
          )) }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Assets = () => {

  return (
    <section className="mb-8 border">
      <article className="p-6">
        <div className="font-bold text-2xl">Your Assets</div>
        <div>Manage your cryptocurrency holdings with ease.</div>
      </article>

      <article className="p-6">
        <AssetsTable />
      </article>
    </section>
  )
}

export default Assets
