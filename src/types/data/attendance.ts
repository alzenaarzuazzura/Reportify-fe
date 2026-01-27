import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TAttendanceGeneralParams = {
    viewMode: boolean
    createMode?: boolean
}

export type TAttendanceListParams = TPaginationFilter & {
    search?: string
    date?: string
    status?: string
}

// Status options
export type TAttendanceStatus = 'hadir' | 'izin' | 'alfa'

// Student info from API
export type TStudentInfo = {
    id: number
    name: string
    nis: string
}

// Teaching assignment detail
export type TTeachingAssignmentInfo = {
    id: number
    id_user: number
    id_class: number
    id_subject: number
    subject: {
        id: number
        name: string
        code: string
    }
    class: {
        id: number
        id_level: number
        id_major: number
        id_rombel: number
        level: { id: number; name: string }
        major: { id: number; name: string; code: string }
        rombel: { id: number; name: string }
    }
}

// Schedule info
export type TScheduleInfo = {
    id: number
    id_teaching_assignment: number
    day: string
    start_time: string
    end_time: string
    room: string
}

// Data from API
export type TAttendanceData = {
    id: number
    id_student: number
    id_teaching_assignment: number
    id_schedule: number
    date: string
    status: TAttendanceStatus
    note: string | null
    created_at: string
    student: TStudentInfo
    teaching_assignment: TTeachingAssignmentInfo
    schedule: TScheduleInfo
}

export type TAttendanceListData = TAttendanceData

export type TAttendanceListResponse = {
    status: boolean
    message: string
    data: TAttendanceData[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}

// Form types
export type TAttendanceTransForm = {
    id_student: TLabelValue | undefined
    id_teaching_assignment: TLabelValue | undefined
    id_schedule: TLabelValue | undefined
    date: any
    status: TAttendanceStatus
    note: string
}

// Post data to API
export type TAttendancePostData = {
    id_student: number | undefined
    id_teaching_assignment: number | undefined
    id_schedule: number | undefined
    date: string
    status: TAttendanceStatus
    note?: string
}

// Bulk attendance
export type TAttendanceBulkItem = {
    id_student: number
    id_teaching_assignment: number
    id_schedule: number
    date: string
    status: TAttendanceStatus
    note?: string
}

export type TAttendanceBulkPostData = {
    attendances: TAttendanceBulkItem[]
}