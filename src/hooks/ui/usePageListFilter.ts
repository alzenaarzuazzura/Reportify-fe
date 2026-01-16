import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const usePageListFilter = <T>(
  name: string,
  defaultFilter: T,
  columnToggleFilter: Record<string, boolean> = {},
) => {
  const location = useLocation()
  const navigationType = useNavigationType() 

  const [initialFilter] = useState<T>(() => {
    if (navigationType === 'POP') {
      const stored = sessionStorage.getItem(name)
      if (stored) {
        try {
          return { ...defaultFilter, ...JSON.parse(stored) }
        } catch {
          sessionStorage.removeItem(name)
        }
      }
    }
    return { ...defaultFilter, ...columnToggleFilter }
  })

  const [dataFilter, setDataFilter] = useState<T>(initialFilter)

  const saveFiltertoStorage = useCallback(() => {
    if (navigationType === 'PUSH') {
      sessionStorage.setItem(name, JSON.stringify(dataFilter))
    }
  }, [dataFilter, name, navigationType])

  useEffect(() => {
    saveFiltertoStorage()
  }, [location, saveFiltertoStorage])

  return [dataFilter, setDataFilter, initialFilter] as const
}

export default usePageListFilter
