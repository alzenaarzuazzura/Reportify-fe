import { TResponseData, TResponseList } from "../api"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TStudentGeneralParams = {
    viewMode: boolean
}

export type TStudentGeneral = {
    id: number
    search: string
    id_class: TLabelValue 
    level: number
    major: number
    rombel: number
    name: string
    nis: string
    parent_telephone: string
    student_telephone: string
}

export type TStudentListForm = Omit<TStudentGeneral, 'id'>

export type TStudentTransForm = Omit<TStudentGeneral, 'search' | 'id'>

export type TStudentListParams = TPaginationFilter & Partial<TStudentListForm>

export type TStudentListData = Omit<TStudentGeneral, 'search'>

export type TStudentData = TStudentListData

export type TStudentPostData = {
    id_class: number | undefined
    name: string
    nis: string
    parent_telephone: string
    student_telephone: string
}

export type TStudentListResponse = TResponseList<TStudentListData>

export type TStudentResponse = TResponseData<TStudentData>