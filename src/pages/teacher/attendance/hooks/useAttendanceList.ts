import { Form } from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { deleteById, getList } from '@reportify/services/api/attendance'
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'

import { TAttendanceListParams, TStateSetter } from '@reportify/types'

const QUERY_KEY = { queryKey: ['dataList', 'attendance'] }

const useAttendanceList = (
	dataFilter: TAttendanceListParams,
	page: number,
	pageSize: number,
	setDataFilter: TStateSetter<TAttendanceListParams>,
	resetPage: () => void,	
) => {
	const [formInstance] = Form.useForm()
	const queryClient = useQueryClient()
	const intl = useIntl()
	const { showMessage } = usePopupMessage()

	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['dataList', 'attendance', dataFilter],
		queryFn: () => getList(dataFilter),
	})

	const assignFilter = useCallback(
		(values: Partial<TAttendanceListParams>) => {
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
						{ thing: intl.formatMessage({ id: 'field.attendance' }) },
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

export default useAttendanceList