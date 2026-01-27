import { Dayjs } from "dayjs"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TAnnouncementGeneralParams = {
    viewMode: boolean
    createMode?: boolean
}

export type TAnnouncementListParams = TPaginationFilter & {
    search?: string
}

// Data from API
export type TAnnouncementData = {
    id: number
    id_user: number
    title: string
    content: string
    announcement_date: string
    created_at: string
    updated_at: string
    user: {
        id: number
        name: string
        email: string
    }
}

export type TAnnouncementListData = TAnnouncementData

// Form types
export type TAnnouncementTransForm = {
    title: string
    content: string
    announcement_date: Dayjs
}

// Post data to API
export type TAnnouncementPostData = {
    title: string
    content: string
    announcement_date: string
}
