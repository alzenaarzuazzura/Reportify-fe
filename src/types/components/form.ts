import { FormInstance } from "antd"

export type TFormTransParams<TFormData, TSubmitData = TFormData> = {
	formInstance: FormInstance<TFormData>
	onSubmit: (data: TSubmitData) => void
	onCancel: () => void
	initialValues?: TFormData
	viewMode?: boolean
	createMode?: boolean
}