import { FormInstance } from "antd"
import { TResponseData, TResponseList } from "../api"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TClassGeneralParams = {
    viewMode: boolean
    formInstance: FormInstance
}

export type TClassListForm = {
    search: string
    id_level: TLabelValue
    id_major: TLabelValue
    id_rombel: TLabelValue
}

export type TClassTransForm = Omit<TClassListForm, 'search'>

export type TClassListParams = TPaginationFilter & Partial<TClassListForm>

export type TClassListData = {
    id: number
    id_level: TLabelValue
    id_major: TLabelValue
    id_rombel: TLabelValue
}

export type TClassData = {
    id: number
    id_level: TLabelValue
    id_major: TLabelValue
    id_rombel: TLabelValue
    students?: any[]
}

export type TClassPostData = {
    id_level: number | undefined
    id_major: number | undefined
    id_rombel: number | undefined
}

export type TClassListResponse = TResponseList<TClassListData>

export type TClassResponse = TResponseData<TClassData>