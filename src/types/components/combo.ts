import { SelectProps } from "antd"
import { ReactElement } from "react"
import { TLabelValue } from "../global"
import { LabeledValue } from "antd/es/select"

export type TSelectAjaxData = {
	value: number | string
	label: string
	children?: TSelectAjaxData[]
}

export type TComboFetchParams = {
	search?: string
	[index: string]: unknown
}

export type TBaseSelectValue = string | number | LabeledValue

export type TSelectValue = TBaseSelectValue | TBaseSelectValue[] | null

export type TSelectAjax<V extends TSelectValue> = Omit<SelectProps<V>, 'onSelect'> & {
	fetchFn: (params: TComboFetchParams) => Promise<TLabelValue<string | number>[]>
	onCreate?: () => void
	debounceTimeout?: number
	minimInputLength?: number
	loadOnce?: boolean
}

export type TSelectAjaxDropdown = {
	menu: ReactElement
	onCreate: () => void
}

export type TSelectAjaxNotFound = {
	isFetching: boolean
	inputRequired: number
}

export type TComboAjax<V extends TSelectValue> = Omit<TSelectAjax<V>, 'fetchFn' | 'onCreate'> & {
	isFilter?: boolean
	withCreate?: boolean
}