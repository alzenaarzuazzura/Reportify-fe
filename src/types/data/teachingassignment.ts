import { FormInstance } from "antd"
import { TResponseData, TResponseList } from "../api"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TTeachingAssignmentGeneralParams = {
    viewMode: boolean
    formInstance: FormInstance
    excludeId?: number
}

export type TTeachingAssignmentListForm = {
    search: string
    id_user: TLabelValue
    id_class: TLabelValue
    id_subject: TLabelValue
}

export type TTeachingAssignmentTransForm = Omit<TTeachingAssignmentListForm, 'search'>

export type TTeachingAssignmentListParams = TPaginationFilter & Partial<TTeachingAssignmentListForm>

export type TTeachingAssignmentListData = {
    id: number
    id_user: TLabelValue
    id_class: TLabelValue
    id_subject: TLabelValue
}

export type TTeachingAssignmentData = TTeachingAssignmentListData

export type TTeachingAssignmentPostData = {
    id_user: number | undefined
    id_class: number | undefined
    id_subject: number | undefined
}

export type TTeachingAssignmentListResponse = TResponseList<TTeachingAssignmentListData>

export type TTeachingAssignmentResponse = TResponseData<TTeachingAssignmentData>
