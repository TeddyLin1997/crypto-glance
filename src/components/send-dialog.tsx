import TokenPriceContainer from '@/context/token-price-context'
import WalletContainer from '@/context/wallet-context'
import { ERC20_ABI } from '@/global/oracle'
import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { ethers, parseEther, parseUnits } from 'ethers'
import { ChangeEvent, useEffect, useState } from 'react'

interface ConntectWalletDialogProps {
  isOpen: boolean
  onClose: () => void
  targetToken: { name: string, symbol: string, address: string }
}

const ConntectWalletDialog = ({ isOpen, onClose, targetToken }: ConntectWalletDialogProps) => {
  const { signer } = WalletContainer.useContainer()
  const { tokensInfo, updateToken } = TokenPriceContainer.useContainer()

  const [toAddress, setToAddress] = useState('')
  const onToAddressChange = (event: ChangeEvent<HTMLInputElement>) => setToAddress(event.target.value)

  const [amount, setAmount] = useState('')
  const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)

  useEffect(() => {
    setToAddress('')
    setAmount('')
  }, [isOpen])

  // send
  const sendTransaction = (toAddress: string, amount: string) => {
    if (!targetToken.address) sendNativeToken(toAddress, amount)
    else sendErc20Token(targetToken.address, toAddress, amount)
    onClose()
  }

  // send native token
  const sendNativeToken = async (toAddress: string, amount: string) => {
    if (!signer) return

    const tx = { to: toAddress, value: parseEther(amount) }
    const transaction = await signer.sendTransaction(tx)
    await transaction.wait()
  }

  // send erc20 token
  const sendErc20Token = async (tokenAddress: string, toAddress: string, amount: string) => {
    if (!signer) return

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    const decimals = tokensInfo[tokenAddress].decimals
    const toAmount = parseUnits(amount, decimals)

    const transaction = await tokenContract.transfer(toAddress, toAmount)
    await transaction.wait()
    updateToken(tokenAddress)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>Send Token</DialogTitle>
      <DialogContent>
        <div>Token:</div>
        <div className="mb-6">{ `${targetToken.name} (${targetToken.symbol})` }</div>
        <div>To Address:</div>
        <TextField value={toAddress} onChange={onToAddressChange} className="!mb-6 w-96" color="success"  placeholder="Please input send address"/>
        <div>Amount:</div>
        <TextField value={amount} onChange={onAmountChange} className="!mb-6 w-96" color="success" placeholder="Please input send amount" />

        <div className="flex items-center justify-end gap-4">
          <Button variant="outlined" color="success" onClick={() => sendTransaction(toAddress, amount)}>Confirm</Button>
          <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>

    </Dialog>
  )
}

export default ConntectWalletDialog
