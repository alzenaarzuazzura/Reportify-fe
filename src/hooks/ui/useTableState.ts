import { useState, useCallback } from 'react'
import type { TablePaginationConfig } from 'antd'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'

export type TTableParams = {
	pagination: TablePaginationConfig
	sortField?: string
	sortOrder?: string
	filters?: Record<string, FilterValue | null>
}

export type TUseTableStateProps = {
	defaultPageSize?: number
	defaultCurrent?: number
}

/**
 * Hook global untuk manage table state (pagination, sorting, filtering)
 * Otomatis handle perubahan tanpa perlu refresh manual
 * 
 * @example
 * const { tableParams, handleTableChange, resetTable } = useTableState({
 *   defaultPageSize: 10,
 *   defaultCurrent: 1
 * })
 */
const useTableState = ({
	defaultPageSize = 10,
	defaultCurrent = 1,
}: TUseTableStateProps = {}) => {
	const [tableParams, setTableParams] = useState<TTableParams>({
		pagination: {
			current: defaultCurrent,
			pageSize: defaultPageSize,
			showSizeChanger: true,
			showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
		},
	})

	const handleTableChange = useCallback(
		(
			pagination: TablePaginationConfig,
			filters: Record<string, FilterValue | null>,
			sorter: SorterResult<any> | SorterResult<any>[],
		) => {
			setTableParams({
				pagination,
				filters,
				sortField: Array.isArray(sorter) ? undefined : sorter.field as string,
				sortOrder: Array.isArray(sorter) ? undefined : sorter.order as string,
			})
		},
		[],
	)

	const resetTable = useCallback(() => {
		setTableParams({
			pagination: {
				current: defaultCurrent,
				pageSize: defaultPageSize,
				showSizeChanger: true,
				showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
			},
		})
	}, [defaultCurrent, defaultPageSize])

	const setTotal = useCallback((total: number) => {
		setTableParams((prev) => ({
			...prev,
			pagination: {
				...prev.pagination,
				total,
			},
		}))
	}, [])

	return {
		tableParams,
		handleTableChange,
		resetTable,
		setTotal,
	}
}

export default useTableState
