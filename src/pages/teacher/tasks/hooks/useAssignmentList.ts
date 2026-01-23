import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { deleteById, getList } from '@reportify/services/api/assignment'

import { TAssignmentListData, TAssignmentListParams, TStateSetter } from '@reportify/types'
import { useIntl } from 'react-intl'
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'

const QUERY_KEY = { queryKey: ['dataList', 'assignment'] }

const useAssignmentList = (
	dataFilter: TAssignmentListParams,
	setDataFilter: TStateSetter<TAssignmentListParams>,
	resetPage: () => void,	
) => {
	const [formInstance] = Form.useForm()
	const queryClient = useQueryClient()
	const intl = useIntl()
	const { showMessage } = usePopupMessage()

	// Fetch data
	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['dataList', 'assignment', dataFilter],
		queryFn: () => getList(),
	})

	// Assign filter helper
	const assignFilter = useCallback(
		(values: Partial<TAssignmentListParams>) => {
			setDataFilter((prev) => ({ ...prev, ...values }))
			queryClient.removeQueries(QUERY_KEY)
		},
		[queryClient, setDataFilter]
	)

	// Delete handler
	const [isDeleting, setIsDeleting] = useState(false)
	
	const deleteData = useCallback(
		async (id: number) => {
			setIsDeleting(true)
			try {
				await deleteById(id)
				showMessage(
					'success',
					intl.formatMessage(
						{ id: 'dlgmsg.successdel' },
						{ thing: intl.formatMessage({ id: 'field.assignment' }) },
					),
					() => {
						queryClient.invalidateQueries(QUERY_KEY)
					},
				)
			} catch (error) {
				showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
			} finally {
				setIsDeleting(false)
			}
		},
		[intl, showMessage, queryClient],
	)

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

	const onFilter = () => {
		resetPage()
		const values = formInstance.getFieldsValue()
		assignFilter(values)
	}

	const isLoadingData = isFetching || isLoading

	return {
		deleteData,
		onSearch,
		onFilter,
		resetFilter,
		data,
		formInstance,
		isLoadingData,
		isDeleting,
		refetch: () => queryClient.invalidateQueries(QUERY_KEY),
	}
}

export default useAssignmentList
