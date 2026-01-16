import { useEffect, useState } from 'react'

/**
 * Hook untuk debounce value
 * Berguna untuk mengurangi jumlah API calls saat user mengetik
 * 
 * @param value - Value yang akan di-debounce
 * @param delay - Delay dalam milliseconds (default: 500ms)
 * @returns Debounced value
 * 
 * @example
 * const debouncedSearch = useDebounce(searchValue, 500)
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
