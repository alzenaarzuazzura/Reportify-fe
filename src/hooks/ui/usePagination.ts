import { useState } from 'react'

import { TPaginationParams } from '@reportify/types'

const defaultPageSize = 20
const pageSizeOptions = [20, 50, 100]

const usePagination = ({
	initialPage = 1,
	initialPageSize = defaultPageSize,
}: TPaginationParams) => {
	const [page, setPage] = useState(initialPage)
	const [pageSize, setPageSize] = useState(initialPageSize)

	const onPageChange = (newPage: number) => setPage(newPage)

	const onPageSizeChange = (newPageSize: number) => setPageSize(newPageSize)

	const resetPage = () => setPage(1)

	return {
		page,
		pageSize,
		pageSizeOptions,
		onPageChange,
		onPageSizeChange,
		resetPage,
	}
}

export default usePagination
