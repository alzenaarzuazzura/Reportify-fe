import { AxiosError } from "axios"
import { TLabelValue } from "./global"

export type TBaseResponse = {
	message: string
	status: boolean
	code?: number
}

export type TResponseError<T = TBaseResponse> = AxiosError<T>

export type TResponseData<TData = unknown> = TBaseResponse & {
	data: TData
}

export type TResponseList<TData = unknown> = TBaseResponse & {
	data: TData[]
	pagination: {
		total: number
		page: number
		limit: number
		totalPages: number		
	}
}

export type TUpdateWithIDPayload<TData = unknown> = {
	id: number
	data: TData
}

export type TResponseCombo<
	T extends TLabelValue<string | number>[] = TLabelValue<string | number>[],
> = TResponseData<T>