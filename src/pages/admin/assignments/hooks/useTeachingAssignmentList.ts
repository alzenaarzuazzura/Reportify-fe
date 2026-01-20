import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { getTableSortOrder } from '@reportify/utils/Help'
import { deleteById, getList } from '@reportify/services/api/teachingassignment'

import {
  TStateSetter,
  TTeachingAssignmentListData,
  TTeachingAssignmentListParams,
} from '@reportify/types'
import { TTableOnChange } from '@reportify/types/components/table'

const QUERY_KEY = { queryKey: ['dataList', 'teachingAssignment'] }

const useTeachingAssignmentList = (
  dataFilter: TTeachingAssignmentListParams,
  page: number,
  pageSize: number,
  setDataFilter: TStateSetter<TTeachingAssignmentListParams>,
  resetPage: () => void,	
) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['dataList', 'teachingAssignment', dataFilter],
    queryFn: () => getList(dataFilter),
  })

  const assignFilter = useCallback(
    (values: Partial<TTeachingAssignmentListParams>) => {
      setDataFilter((prev) => ({ ...prev, ...values }))
      queryClient.removeQueries(QUERY_KEY)
    },
    [queryClient, setDataFilter]
  )

  useEffect(() => {
    if (dataFilter.page !== page || dataFilter.limit !== pageSize) {
      assignFilter({ page: page, limit: pageSize })
    }
  }, [page, pageSize, assignFilter, dataFilter])

  const { deleteData } = useDeleteData({
    localeId: 'menu.teachingassignment',
    deleteFn: deleteById,
    onSucces: () => queryClient.invalidateQueries(QUERY_KEY),
    onError: () => queryClient.invalidateQueries(QUERY_KEY)
  })

  const onSearch = (value: string) => {
    resetPage()
    setDataFilter((prev) => ({ ...prev, search: value }))
  }

  const resetFilter = () => {
    formInstance.resetFields()
    resetPage()
    setDataFilter((prev) => ({ 
      ...prev, 
      search: '',
      id_user: undefined,
      id_class: undefined,
      id_subject: undefined,
      order: '',
      sort: 'asc'
    }))
  }

  const handleTableChange: TTableOnChange<TTeachingAssignmentListData> = (_pagination, _filters, sorter) => {
    const sortFilter = getTableSortOrder(sorter)
    assignFilter(sortFilter)
  }

  const onFilter = () => {
    resetPage()
    const values = formInstance.getFieldsValue()
    const id_user = values.id_user?.value || null
    const id_class = values.id_class?.value || null
    const id_subject = values.id_subject?.value || null

    delete values?.id_user
    delete values?.id_class
    delete values?.id_subject

    const fieldsValue = {
      ...values,
      id_user,
      id_class,
      id_subject,
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

export default useTeachingAssignmentList
