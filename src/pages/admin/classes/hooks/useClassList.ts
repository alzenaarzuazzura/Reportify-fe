import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { getTableSortOrder } from '@reportify/utils/Help'
import { deleteById, getList } from '@reportify/services/api/class'

import {
  TStateSetter,
  TClassListData,
  TClassListParams,
} from '@reportify/types'
import { TTableOnChange } from '@reportify/types/components/table'

const QUERY_KEY = { queryKey: ['dataList', 'class'] }

const useClassList = (
  dataFilter: TClassListParams,
  page: number,
  pageSize: number,
  setDataFilter: TStateSetter<TClassListParams>,
  resetPage: () => void,	
) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  // Fetch data
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['dataList', 'class', dataFilter],
    queryFn: () => getList(dataFilter),
  })

  // Assign filter helper
  const assignFilter = useCallback(
    (values: Partial<TClassListParams>) => {
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
    localeId: 'field.class',
    deleteFn: deleteById,
    onSucces: () => queryClient.invalidateQueries(QUERY_KEY),
    onError: () => queryClient.invalidateQueries(QUERY_KEY)
  })

  // Search handler
  const onSearch = (value: string) => {
    resetPage()
    setDataFilter((prev) => ({ ...prev, search: value }))
  }

  // Reset filter handler
  const resetFilter = () => {
    formInstance.resetFields()
    resetPage()
    setDataFilter((prev) => ({ 
      ...prev, 
      search: '',
      level: null,
      major: null,
      rombel: null,
      order: '',
      sort: 'asc'
    }))
  }

  // Table change handler (for sorting)
  const handleTableChange: TTableOnChange<TClassListData> = (_pagination, _filters, sorter) => {
    const sortFilter = getTableSortOrder(sorter)
    assignFilter(sortFilter)
  }

  const onFilter = () => {
    resetPage()
    const values = formInstance.getFieldsValue()
    const level = values.level?.value || null
    const major = values.major?.value || null
    const rombel = values.rombel?.value || null

    delete values?.level
    delete values?.major
    delete values?.rombel

    const fieldsValue = {
      ...values,
      level,
      major,
      rombel,
    }
    assignFilter(fieldsValue)
  }

  const isLoadingData = isFetching || isLoading

  return {
    deleteData,
    onSearch,
    onFilter,
    resetFilter,
    handleTableChange,
    data,
    formInstance,
    isLoadingData,
    refetch: () => queryClient.invalidateQueries(QUERY_KEY),
  }
}

export default useClassList
