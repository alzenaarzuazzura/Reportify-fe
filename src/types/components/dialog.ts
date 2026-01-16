import { ButtonProps } from "antd"
import { ReactNode } from "react"

type TNodeElement = JSX.Element | ReactNode

type TDlgButton = {
	text?: string
	props?: ButtonProps
	handler?: () => void
}

export type TBaseDialogMessage = {
	icon?: JSX.Element | string | boolean
	title?: string
	subtitle?: string | TNodeElement
	message?: string | string[] | TNodeElement
	primaryButton?: TDlgButton
	secondaryButton?: TDlgButton
}

export type TDialogMessageParams = TBaseDialogMessage & {
	closeDialog: () => void
}

export type TDefaultDialogMessage = TBaseDialogMessage & {
	primaryButton?: TDlgButton
	isError?: boolean
}

export type TActionDialogMessage = TDefaultDialogMessage & {
	menuId: string
}

export type TCustomDialogMessage = TDefaultDialogMessage & {
	defaultIcon?: boolean
}

export type TDlgDeleteState = {
	visible: boolean
	onDelete?: () => Promise<void> | void
	localId?: string | number
	messageId?: string
}

export type TDialogDeleteParams = {
	open: boolean
	onOk: () => void
	onCancel: () => void
	localId: string | number
	messageId?: string
}