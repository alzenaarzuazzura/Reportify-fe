import { Form } from "antd"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import dayjs from "dayjs"

import { createBulk, checkExisting } from "@reportify/services/api/attendance"
import { currentSchedule as fetchCurrentSchedule, studentByClass } from "@reportify/services/api/combo"
import { TAttendanceBulkPostData } from "@reportify/types"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"
import { TStudentAttendance } from "../formContent/BulkAttendance"

type TCurrentScheduleData = {
    id: number
    label: string
    day: string
    time: string
    class_name: string
    subject_name: string
    id_teaching_assignment: number
    id_class: number
} | null

// Extended schedule response from API
type TScheduleApiResponse = {
    value: number
    label: string
    day?: string
    time?: string
    class_name?: string
    subject_name?: string
    id_teaching_assignment?: number
    id_class?: number
}

// Student from combo API
type TStudentComboResponse = {
    value: number
    label: string
    nis?: string
}

const useAttendanceCreate = () => {
    const navigate = useNavigate()
    const intl = useIntl()
    const [formInstance] = Form.useForm()
    const { showMessage } = usePopupMessage()
    
    const [currentSchedule, setCurrentSchedule] = useState<TCurrentScheduleData>(null)
    const [scheduleLoading, setScheduleLoading] = useState(true)
    const [scheduleError, setScheduleError] = useState(false)
    const [noScheduleMessage, setNoScheduleMessage] = useState('')
    
    const [students, setStudents] = useState<TStudentAttendance[]>([])
    const [studentsLoading, setStudentsLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    
    // State for existing attendance check
    const [alreadyRecorded, setAlreadyRecorded] = useState(false)

    // Fetch current schedule on mount
    useEffect(() => {
        const fetchSchedule = async () => {
            setScheduleLoading(true)
            setScheduleError(false)
            setNoScheduleMessage('')
            try {
                const data = await fetchCurrentSchedule()
                if (data && Array.isArray(data) && data.length > 0) {
                    const schedule = data[0] as TScheduleApiResponse
                    const scheduleData: TCurrentScheduleData = {
                        id: schedule.value,
                        label: schedule.label,
                        day: schedule.day || '',
                        time: schedule.time || '',
                        class_name: schedule.class_name || '',
                        subject_name: schedule.subject_name || '',
                        id_teaching_assignment: schedule.id_teaching_assignment || 0,
                        id_class: schedule.id_class || 0,
                    }
                    setCurrentSchedule(scheduleData)
                    
                    // Check if attendance already exists for this schedule today
                    const today = dayjs().format('YYYY-MM-DD')
                    const exists = await checkExisting(scheduleData.id, today)
                    setAlreadyRecorded(exists)
                } else {
                    setScheduleError(true)
                    setNoScheduleMessage('Tidak ada jadwal mengajar saat ini. Pastikan Anda memiliki jadwal yang sesuai dengan hari dan jam sekarang.')
                }
            } catch (error) {
                console.log('No current schedule found')
                setScheduleError(true)
                setNoScheduleMessage('Tidak ada jadwal mengajar saat ini. Pastikan Anda memiliki jadwal yang sesuai dengan hari dan jam sekarang.')
            } finally {
                setScheduleLoading(false)
            }
        }
        fetchSchedule()
    }, [])

    // Fetch students when schedule is loaded
    useEffect(() => {
        const fetchStudents = async () => {
            if (!currentSchedule?.id_class) return
            
            setStudentsLoading(true)
            try {
                const data = await studentByClass({ id_class: currentSchedule.id_class })
                if (data && Array.isArray(data)) {
                    const studentList: TStudentAttendance[] = data.map((s) => ({
                        id: s.value as number,
                        name: s.label as string,
                        nis: (s as TStudentComboResponse).nis || '',
                        status: 'hadir' as const, // Default all to present
                        note: ''
                    }))
                    setStudents(studentList)
                }
            } catch (error) {
                console.error('Failed to fetch students', error)
            } finally {
                setStudentsLoading(false)
            }
        }
        fetchStudents()
    }, [currentSchedule?.id_class])

    // Handle individual student change
    const onStudentChange = useCallback((studentId: number, field: 'status' | 'note', value: string) => {
        setStudents(prev => prev.map(s => 
            s.id === studentId 
                ? { ...s, [field]: value }
                : s
        ))
    }, [])

    // Set all students to same status
    const onSetAllStatus = useCallback((status: 'hadir' | 'izin' | 'alfa') => {
        setStudents(prev => prev.map(s => ({ ...s, status })))
    }, [])

    // Submit bulk attendance
    const onSubmit = useCallback(
        async () => {
            if (!currentSchedule || students.length === 0) return

            setSubmitting(true)
            try {
                const today = dayjs().format('YYYY-MM-DD')
                
                const bulkData: TAttendanceBulkPostData = {
                    attendances: students.map(s => ({
                        id_student: s.id,
                        id_teaching_assignment: currentSchedule.id_teaching_assignment,
                        id_schedule: currentSchedule.id,
                        date: today,
                        status: s.status,
                        note: s.note || undefined
                    }))
                }
                
                await createBulk(bulkData)
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successcreate' },
                        { thing: `Absensi ${students.length} siswa` }
                    ),
                    () => navigate('/teacher/attendance')
                )
            } catch (error) {
                showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
            } finally {
                setSubmitting(false)
            }
        },
        [currentSchedule, students, intl, navigate, showMessage]
    )

    const onCancel = useCallback(() => navigate('/attendance'), [navigate])

    return { 
        formInstance, 
        onSubmit, 
        onCancel,
        currentSchedule,
        scheduleLoading,
        scheduleError,
        noScheduleMessage,
        students,
        studentsLoading,
        onStudentChange,
        onSetAllStatus,
        submitting,
        alreadyRecorded
    }
}

export default useAttendanceCreate
