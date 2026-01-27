import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { deleteById, getList } from '@reportify/services/api/major'

import { getTableSortOrder } from '@reportify/utils/Help'

import { TStateSetter, TMajorListParams, TTableOnChange, TMajorData } from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'major'] }

const useMajorList = (
    dataFilter: TMajorListParams,
    page: number,
    pageSize: number,
    setDataFilter: TStateSetter<TMajorListParams>,
    resetPage: () => void,	
) => {
    const [formInstance] = Form.useForm()
    const queryClient = useQueryClient()

    // Fetch data
    const { data, isFetching, isLoading } = useQuery({
        queryKey: ['dataList', 'major', dataFilter],
        queryFn: () => getList(dataFilter),
    })

    // Assign filter helper
    const assignFilter = useCallback(
        (values: Partial<TMajorListParams>) => {
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
        localeId: 'menu.major',
        deleteFn: deleteById,
        onSucces: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        },
        onError: () => {
            queryClient.invalidateQueries(QUERY_KEY)
        }
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
            order: '',
            sort: 'asc'
        }))
    }

    // Table change handler (for sorting)
    const handleTableChange: TTableOnChange<TMajorData> = (_pagination, _filters, sorter) => {
        const sortFilter = getTableSortOrder(sorter)
        assignFilter(sortFilter)
    }

    const isLoadingData = isFetching || isLoading

    return {
        data,
        formInstance,
        isLoadingData,
        deleteData,
        handleTableChange,
        onSearch,
        resetFilter,
        refetch: () => queryClient.invalidateQueries(QUERY_KEY),
    }
}

export default useMajorList
