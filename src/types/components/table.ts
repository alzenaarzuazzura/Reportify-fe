import { TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { HTMLAttributeAnchorTarget } from "react";
import { To } from "react-router-dom";

export type TTableSorter<RecordType = AnyObject> =
	| SorterResult<RecordType>
	| SorterResult<RecordType>[]

export type TTableOnChange<RecordType = AnyObject> = (
	pagination: TablePaginationConfig,
	filters: Record<string, FilterValue | null>,
	sorter: TTableSorter<RecordType>,
) => void

export type TTableSortFilter = {
	order: string
	sort: 'asc' | 'desc'
}

export type TTableLink = {
	to?: To
	children?: string
	onClick?: () => void
	replace?: boolean
	target?: HTMLAttributeAnchorTarget
}