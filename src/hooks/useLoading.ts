import { useMemo, useState } from 'react'

const useLoading = () => {
  const [loading, setLoading] = useState(0)
  const isLoading = useMemo(() => loading !== 0, [loading])

  const load = () => setLoading(prev => prev + 1)
  const unload = () => setLoading(prev => Math.max(prev - 1, 0))

  return { isLoading, load, unload }
}

export default useLoading
