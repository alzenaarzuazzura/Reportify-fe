import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { getTableSortOrder } from '@reportify/utils/Help'
import { deleteById, getList } from '@reportify/services/api/schedule'

import {
  TStateSetter,
  TScheduleListData,
  TScheduleListParams,
} from '@reportify/types'
import { TTableOnChange } from '@reportify/types/components/table'

const QUERY_KEY = { queryKey: ['dataList', 'schedule'] }

const useScheduleList = (
  dataFilter: TScheduleListParams,
  page: number,
  pageSize: number,
  setDataFilter: TStateSetter<TScheduleListParams>,
  resetPage: () => void,	
) => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['dataList', 'schedule', dataFilter],
    queryFn: () => getList(dataFilter),
  })

  const assignFilter = useCallback(
    (values: Partial<TScheduleListParams>) => {
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
    localeId: 'menu.schedule',
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
      day: undefined,
      room: undefined,
      start_time: undefined,
      end_time: undefined,
      order: 'day',
      sort: 'asc'
    }))
  }

  const handleTableChange: TTableOnChange<TScheduleListData> = (_pagination, _filters, sorter) => {
    const sortFilter = getTableSortOrder(sorter)
    assignFilter(sortFilter)
  }

  const onFilter = () => {
    resetPage()
    const values = formInstance.getFieldsValue()
    const id_user = values.id_user?.value || null
    const id_class = values.id_class?.value || null
    const id_subject = values.id_subject?.value || null
    
    // Handle time range
    let start_time = null
    let end_time = null
    if (values.time_range && values.time_range.length === 2) {
      start_time = values.time_range[0]?.format('HH:mm') || null
      end_time = values.time_range[1]?.format('HH:mm') || null
    }

    delete values?.id_user
    delete values?.id_class
    delete values?.id_subject
    delete values?.time_range

    const fieldsValue = {
      ...values,
      id_user,
      id_class,
      id_subject,
      start_time,
      end_time,
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

export default useScheduleList
