import { HTMLAttributes } from 'react'

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  defaultSrc: string
}

const Image = ({ src, defaultSrc, ...props }: ImageProps) => {
  const handleError = (event) => {
    if (event.target) {
      event.target.src = defaultSrc
    }
  }

  return (
    <img src={src || defaultSrc} onError={handleError} {...props} />
  )
}

export default Image
