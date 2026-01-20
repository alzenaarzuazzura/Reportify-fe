import { ReactNode } from "react"

export type MenuItem = {
  key: string
  label: string        
  icon?: ReactNode
  path: string
}

export type ID = number

export type TLabelValue<V = ID> = {
	label: string
	value: V
}

export type TNameId<V = ID> = {
	name: string
	id: V
}

export type TParamsId = {
	id: string
}

export type TStateSetter<T = unknown> = React.Dispatch<React.SetStateAction<T>>