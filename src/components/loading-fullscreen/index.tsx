import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'

interface LoadingFullscreenProps {
  open: boolean
}

const LoadingFullscreen = ({ open }: LoadingFullscreenProps) => {
  const [text, setText] = useState('.')
  useEffect(() => {
    const timer = setInterval(() => {
      setText(prev => prev.length === 5 ? '.' : prev += '.')
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <Backdrop open={open}>
      <div className="flex flex-col items-center">
        <CircularProgress />
        <div className="mt-6 font-bold">Wait Transaction Process {text}</div>
      </div>
    </Backdrop>
  )
}

export default LoadingFullscreen
