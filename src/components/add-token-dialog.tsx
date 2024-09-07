import { Dialog, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

interface AddTokenDialogProps {
  isOpen: boolean
  onClose: () => void
  addToken: (address: string) => void
}

const AddTokenDialog = ({ isOpen, onClose, addToken }: AddTokenDialogProps) => {
  const [tokenAddressInput, setTokenAddressInput] = useState('')
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => setTokenAddressInput(event.target.value)
  useEffect(() => setTokenAddressInput(''), [isOpen])

  const confirm = () => {
    addToken(tokenAddressInput)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '18px', textAlign: 'center' }}>Add Token</DialogTitle>
      <DialogContent>
        <TextField value={tokenAddressInput} onChange={handleInput} className="!my-6 w-96" color="success" placeholder="0xAC15...." />

        <div className="flex items-center justify-end gap-4">
          <Button variant="outlined" color="success" onClick={confirm}>Confirm</Button>
          <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTokenDialog
