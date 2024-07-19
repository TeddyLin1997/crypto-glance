import { useState, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

export default function ProgressLinear() {
  const isLoading = false
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(isLoading ? 0 : 100)
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) return

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 30
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => clearInterval(timer)
  }, [isLoading])

  return (
    <div className="fixed top-14 w-full z-[101]">
      { isLoading && <LinearProgress variant="determinate" value={progress} /> }
    </div>
  )
}
