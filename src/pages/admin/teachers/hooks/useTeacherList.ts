import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

import useDeleteData from '@reportify/hooks/mutations/useDeleteData'

import { getTableSortOrder } from '@reportify/utils/Help'
import { deleteById, getList } from '@reportify/services/api/teacher'

import {
	TStateSetter,
	TTeacherListData,
	TTeacherListParams,
} from '@reportify/types'
import { TTableOnChange } from '@reportify/types/components/table'

const QUERY_KEY = { queryKey: ['dataList', 'teacher'] }

const useTeacherList = (
	dataFilter: TTeacherListParams,
	page: number,
	pageSize: number,
	setDataFilter: TStateSetter<TTeacherListParams>,
	resetPage: () => void,	
) => {
	const [formInstance] = Form.useForm()
	const queryClient = useQueryClient()

	// Fetch data
	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['dataList', 'teacher', dataFilter],
		queryFn: () => getList(dataFilter),
	})

	// Assign filter helper
	const assignFilter = useCallback(
		(values: Partial<TTeacherListParams>) => {
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
		localeId: 'field.teacher',
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
			role: undefined,
			order: '',
			sort: 'asc'
		}))
	}

	// Table change handler (for sorting)
	const handleTableChange: TTableOnChange<TTeacherListData> = (_pagination, _filters, sorter) => {
		const sortFilter = getTableSortOrder(sorter)
		assignFilter(sortFilter)
	}

	const onFilter = () => {
		resetPage()
		const values = formInstance.getFieldsValue()
		const role = values.role?.value || null
		delete values?.role

		const fieldsValue = {
			...values,
			role
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

export default useTeacherList
