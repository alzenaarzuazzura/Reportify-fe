import { FormInstance } from "antd"
import { TResponseData, TResponseList } from "../api"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TClassGeneralParams = {
    viewMode: boolean
    formInstance: FormInstance
}

export type TClassGeneral = {
    id: number
    search: string
    id_level: TLabelValue
    id_major: TLabelValue
    id_rombel: TLabelValue    
}

export type TClassListForm = Omit<TClassGeneral, 'id'>

export type TClassTransForm = Omit<TClassGeneral, 'search' | 'id'> & { students?: TClassStudentData[] }

export type TClassListParams = TPaginationFilter & Partial<TClassListForm>

export type TClassListData = Omit<TClassGeneral, 'search'>

export type TClassData = TClassListData & {
    students?: TClassStudentData[]
}

export type TClassPostData = {
    id_level: number | undefined
    id_major: number | undefined
    id_rombel: number | undefined
}

export type TClassListResponse = TResponseList<TClassListData>

export type TClassResponse = TResponseData<TClassData>

export type TClassStudentData = {
    id: number
    nis: string
    name: string
    parent_telephone: string
    student_telephone?: string
}