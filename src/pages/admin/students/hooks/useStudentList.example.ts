/**
 * EXAMPLE: Student List Hook Implementation
 * 
 * Contoh implementasi hook untuk halaman Student List
 * menggunakan pattern yang sama dengan Teacher List
 */

import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'
import useTableState from '@reportify/hooks/ui/useTableState'
import usePageListFilter from '@reportify/hooks/ui/usePageListFilter'

// Types yang perlu dibuat
type TStudentFilter = {
  class?: string
  status?: 'active' | 'inactive'
}

type TStudentListParams = {
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
  class?: string
  status?: 'active' | 'inactive'
  page?: number
  limit?: number
}

type TStudentListData = {
  id: number
  name: string
  nis: string
  class: string
  status: 'active' | 'inactive'
}

type TResponseError = {
  message: string
}

// Mock API functions (perlu dibuat di services/api/student.ts)
const getList = async (params?: TStudentListParams): Promise<TStudentListData[]> => {
  // Implementation
  return []
}

const deleteById = async (id: number): Promise<{ success: boolean }> => {
  // Implementation
  return { success: true }
}

const QUERY_KEY = ['dataList', 'student']

const useStudentList = () => {
  const [formInstance] = Form.useForm()
  const queryClient = useQueryClient()

  const { tableParams, handleTableChange, setTotal } = useTableState({
    defaultPageSize: 10,
    defaultCurrent: 1,
  })

  // Gunakan usePageListFilter dengan type TStudentFilter
  const { filters, setSearch, updateFilter, resetFilters } = usePageListFilter<TStudentFilter>()

  // Build query params untuk backend
  const queryParams: TStudentListParams = {
    search: filters.search,
    sortBy: filters.sortBy,
    order: filters.order,
    class: filters.filters?.class,
    status: filters.filters?.status,
    page: tableParams.pagination.current,
    limit: tableParams.pagination.pageSize,
  }

  const { data, isFetching, isLoading } = useQuery<TStudentListData[], TResponseError>({
    queryKey: [...QUERY_KEY, queryParams],
    queryFn: () => getList(queryParams),
  })

  if (data && tableParams.pagination.total !== data.length) {
    setTotal(data.length)
  }

  const { deleteData } = useDeleteData({
    localeId: 'field.student',
    deleteFn: deleteById,
    onSucces: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  // Handler functions untuk UI
  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleClassFilter = (classValue: TStudentFilter['class']) => {
    updateFilter('class', classValue)
  }

  const handleStatusFilter = (status: TStudentFilter['status']) => {
    updateFilter('status', status)
  }

  const handleReset = () => {
    resetFilters()
    formInstance.resetFields()
  }

  const isLoadingData = isFetching || isLoading

  return {
    data,
    formInstance,
    isLoadingData,
    deleteData,
    tableParams,
    handleTableChange,
    filters,
    handleSearch,
    handleClassFilter,
    handleStatusFilter,
    handleReset,
    refetch: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  }
}

export default useStudentList
