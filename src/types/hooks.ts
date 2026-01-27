import { MutationFunction, MutationKey, QueryFunction, QueryKey } from "@tanstack/react-query"
import { TBaseResponse } from "./api"
import { TComboFetchParams, TSelectAjaxData } from "./components/combo"

export type TCreateDataParams<TData, TParams, TError> = {
	key?: MutationKey
	menuId?: string
	menu: string
	createFn: MutationFunction<TData, TParams>
	onSuccess?: (data?: TData) => void
	onError?: (data?: TData, error?: TError) => void
	onLater?: (data: TData) => void
	redirectWhenSuccess?: boolean
	baseRoute: 'admin' | 'teacher'
}

export type TUpdateDataParams<TData, TParams, TError> = {
	key?: MutationKey
	menuId?: string
	menu: string
	updateFn: MutationFunction<TData, TParams>
	onSuccess?: (data?: TData) => void
	onError?: (data?: TData, error?: TError) => void
	onLater?: (data: TData & { goTo: 'create' | 'view' }) => void
	baseRoute: 'admin' | 'teacher'
}

export type TDeleteDataParams = {
	localeId: string
	deleteFn: (id: number) => Promise<TBaseResponse>
	key?: MutationKey
	onSucces?: () => void
	onError?: () => void
}

export type TPaginationParams = {
	initialPage?: number
	initialPageSize?: number
}

export type TPageQueryParams<TData, TError> = {
	key: QueryKey
	queryFn: QueryFunction<TData, QueryKey, TError>
	onSuccess?: (data?: TData) => void
	onError?: (data?: TData, error?: TError) => void
}

export type TUseSelectAjax = {
	fetchFn: (params: TComboFetchParams) => Promise<TSelectAjaxData[]>
	onCreate?: () => void
	onDropdownVisibleChange?: (open: boolean) => void
	debounceTimeout?: number
	minimInputLength?: number
	loadOnce?: boolean
}

export type TVisibilityClient = {
	isVisible: boolean
	setVisible: (value: boolean) => void
}