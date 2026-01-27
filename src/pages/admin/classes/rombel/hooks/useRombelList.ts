import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { deleteById, getList } from '@reportify/services/api/rombel'

import { getTableSortOrder } from '@reportify/utils/Help'

import { TStateSetter, TRombelData, TRombelListParams, TTableOnChange } from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'rombel'] }

const useRombelList = (
  dataFilter: TRombelListParams,
  page: number,
  pageSize: number,
  setDataFilter: TStateSetter<TRombelListParams>,
  resetPage: () => void,	
) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  // Fetch data
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['dataList', 'rombel', dataFilter],
    queryFn: () => getList(dataFilter),
  })

  // Assign filter helper
  const assignFilter = useCallback(
    (values: Partial<TRombelListParams>) => {
      setDataFilter((prev) => ({ ...prev, ...values }))
      queryClient.removeQueries(QUERY_KEY)
    },
    [queryClient]
  )

  // Sync pagination with filter
  useEffect(() => {
    if (dataFilter.page !== page || dataFilter.limit !== pageSize) {
      assignFilter({ page: page, limit: pageSize })
    }
  }, [page, pageSize, assignFilter, dataFilter])

  // Delete handler
  const { deleteData } = useDeleteData({
    localeId: 'menu.rombel',
    deleteFn: deleteById,
    onSucces: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    },
    onError: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })

  // Reset filter handler
  const resetFilter = () => {
    formInstance.resetFields()
    resetPage()
    setDataFilter((prev) => ({ 
      ...prev, 
      order: '',
      sort: 'asc'
    }))
  }

  // Table change handler (for sorting)
  const handleTableChange: TTableOnChange<TRombelData> = (_pagination, _filters, sorter) => {
    const sortFilter = getTableSortOrder(sorter)
    assignFilter(sortFilter)
  }

  const isLoadingData = isFetching || isLoading

  return {
    data,
    isLoadingData,
    deleteData,
    handleTableChange,
    resetFilter,
    refetch: () => queryClient.invalidateQueries(QUERY_KEY),
  }
}

export default useRombelList
