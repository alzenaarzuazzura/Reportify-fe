import { TTableSorter, TTableSortFilter } from "@reportify/types/components/table"
import React from "react"

export const getTableSortOrder = <T>(sorter: TTableSorter<T>): TTableSortFilter => {
	if (!Array.isArray(sorter) && sorter.order) {
		const order = sorter.field?.toString() || ''
		const sort = sorter.order === 'ascend' ? 'asc' : 'desc'
		return { order, sort }
	}
	return { order: '', sort: 'asc' }
}

export const onEnter = (doEnter: () => void) => (event: React.KeyboardEvent) => {
	if (event.key === 'Enter') {
		doEnter()
	}
}