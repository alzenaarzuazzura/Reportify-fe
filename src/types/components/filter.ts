import { FormInstance, FormItemProps, InputProps } from "antd"
import { Store } from "antd/es/form/interface"

export type TSortOrder = 'asc' | 'desc'

export type TPageListFilter<TFilter> = {
  search?: string
  filters?: TFilter
  sortBy?: string
  order?: TSortOrder
}

export type TItemFilterDrawer = {
	name: string
	picker: JSX.Element
	label?: string
	props?: FormItemProps
	pickerOnly?: boolean
}

export type TFilterDrawerHeader = { setOpen: (value: boolean) => void }

export type TFilterDrawerContent = { items: TItemFilterDrawer[] }

export type TFilterDrawerFooter = {
	setOpen: (value: boolean) => void
	onReset: () => void
	onFilter: () => void
}

export type TFilterDrawerProps = {
	formInstance: FormInstance
	initialValues?: Store
	items: TItemFilterDrawer[]
	open: boolean
	setOpen: (value: boolean) => void
	onReset: () => void
	onFilter: () => void
}

export type TSearchBarProps = InputProps & {
	searchName?: string
	formInstance: FormInstance
	onSearch: (value: string) => void
}

export type TSearchFilterProps = TSearchBarProps &
	Omit<TFilterDrawerProps, 'open' | 'setOpen'> & {
		useSearch?: boolean
	}

export type TPaginationFilter = {
	order: string
	sort: 'asc' | 'desc'
	page: number
	limit: number
}