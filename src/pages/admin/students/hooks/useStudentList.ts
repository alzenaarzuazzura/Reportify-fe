import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { getTableSortOrder } from '@reportify/utils/Help'
import { deleteById, getList } from '@reportify/services/api/student'

import {
  TStateSetter,
  TStudentListData,
  TStudentListParams,
  TTableOnChange
} from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'student'] }

const useStudentList = (
  dataFilter: TStudentListParams,
  page: number,
  pageSize: number,
  setDataFilter: TStateSetter<TStudentListParams>,
  resetPage: () => void,	
) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  // Fetch data
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['dataList', 'student', dataFilter],
    queryFn: () => getList(dataFilter),
  })

  // Assign filter helper
  const assignFilter = useCallback(
    (values: Partial<TStudentListParams>) => {
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
    localeId: 'field.student',
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
      id_class: undefined,
      level: undefined,
      major: undefined,
      rombel: undefined,
      sortBy: '',
      order: 'asc'
    }))
  }

  // Table change handler (for sorting)
  const handleTableChange: TTableOnChange<TStudentListData> = (_pagination, _filters, sorter) => {
    const sortFilter = getTableSortOrder(sorter)
    assignFilter(sortFilter)
  }

  const onFilter = () => {
    resetPage()
    const values = formInstance.getFieldsValue()
    
    const fieldsValue: Partial<TStudentListParams> = {
      id_class: values.class?.value,
      level: values.level?.value,
      major: values.major?.value,
      rombel: values.rombel?.value,
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

export default useStudentList
