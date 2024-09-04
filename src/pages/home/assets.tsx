import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'


const AssetsTable = () => {

  const data = [
    {
      icon: '',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 0.05,
      value: 2345,
    }
  ]

  return (
    <TableContainer>
      <Table className="w-full">
        <Thead>
          <Tr textAlign="left">
            <Th>Assets</Th>
            <Th>Amount</Th>
            <Th>USD Value</Th>
            <Th><span className="opacity-0">send</span></Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map(item => (
            <Tr key={item.symbol}>
              <Td>{ `${item.name} ( ${item.symbol} )` }</Td>
              <Td>{ item.amount }</Td>
              <Td>${ item.value }</Td>
              <Td>Send</Td>
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
