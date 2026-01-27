import { Dayjs } from "dayjs"
import { TPaginationFilter } from "../components/filter"
import { TLabelValue } from "../global"

export type TAssignmentGeneralParams = {
    viewMode: boolean
    createMode?: boolean
}

export type TAssignmentListParams = TPaginationFilter & {
    search?: string
}

// Data from API (response structure based on controller)
export type TTeachingAssignmentDetail = {
    id: number
    id_user: number
    id_class: number
    id_subject: number
    user: {
        id: number
        name: string
        email: string
    }
    class: {
        id: number
        id_level: number
        id_major: number
        id_rombel: number
        level: {
            id: number
            name: string
        }
        major: {
            id: number
            name: string
            code: string
        }
        rombel: {
            id: number
            name: string
        }
    }
    subject: {
        id: number
        name: string
        code: string
    }
}

export type TStudentAssignment = {
    id: number
    id_student: number
    id_assignment: number
    status: boolean
    completed_at: string | null
    note: string | null
    student: {
        id: number
        name: string
        nis: string
    }
}

export type TAssignmentData = {
    id: number
    id_teaching_assignment: number
    assignment_title: string
    assignment_desc: string
    deadline: string
    created_at: string
    teaching_assignment: TTeachingAssignmentDetail
    student_assignments: TStudentAssignment[]
}

export type TAssignmentListData = TAssignmentData

// Form types
export type TAssignmentTransForm = {
    id_teaching_assignment: TLabelValue | undefined
    assignment_title: string
    assignment_desc: string
    deadline: Dayjs
    student_ids: number[]
}

// Post data to API
export type TAssignmentPostData = {
    id_teaching_assignment: number | undefined
    assignment_title: string
    assignment_desc: string
    deadline: string
    student_ids: number[]
}

// Update student assignment
export type TStudentAssignmentUpdateData = {
    status: boolean
    note?: string
}