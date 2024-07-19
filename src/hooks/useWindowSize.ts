import { useState, useEffect } from 'react'

enum Size {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState('')

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth

      if (windowWidth > 1024) {
        setWindowSize('large')
      } else if (windowWidth > 768) {
        setWindowSize('medium')
      } else {
        setWindowSize('small')
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { windowSize, Size }
}

export default useWindowSize

