import { FormInstance } from "antd"
import { TResponseData, TResponseList } from "../api"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TScheduleGeneralParams = {
    viewMode: boolean
    formInstance: FormInstance
    excludeId?: number
}

export type TScheduleListForm = {
    search: string
    id_teaching_assignment: TLabelValue
    id_user: TLabelValue
    id_class: TLabelValue
    id_subject: TLabelValue
    day: string
    id_room: TLabelValue
    start_time: string
    end_time: string
}

export type TScheduleTransForm = {
    id_teaching_assignment: TLabelValue
    day: string
    start_time: string
    end_time: string
    id_room: TLabelValue
}

export type TScheduleListParams = TPaginationFilter & Partial<TScheduleListForm>

export type TScheduleListData = {
    id: number
    id_teaching_assignment: TLabelValue
    day: string
    start_time: string
    end_time: string
    id_room: TLabelValue
}

export type TScheduleData = TScheduleListData

export type TSchedulePostData = {
    id_teaching_assignment: number | undefined
    day: string | undefined
    start_time: string | undefined
    end_time: string | undefined
    id_room: number | undefined
}

export type TScheduleListResponse = TResponseList<TScheduleListData>

export type TScheduleResponse = TResponseData<TScheduleData>
