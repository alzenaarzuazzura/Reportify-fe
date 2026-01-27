import { Card, Switch, Input, Tag, Divider, Space, Spin } from "antd"
import { Icon } from "@iconify/react"
import { useState, useEffect } from "react"
import { getCompletionStatus } from "@reportify/services/api/assignment"

type TStudentWithStatus = {
    id: number // student_assignment id
    student_id: number
    student_name: string
    nis: string
    status: boolean
    completed_at?: string
    note: string
}

type TCompletionData = {
    total: number
    completed_count: number
    not_completed_count: number
    completed_students: Array<{
        id: number
        student_id: number
        student_name: string
        nis: string
        completed_at?: string
        note?: string
    }>
    not_completed_students: Array<{
        id: number
        student_id: number
        student_name: string
        nis: string
    }>
}

type TStudentSubmissionsProps = {
    assignmentId: number
    onUpdate: (studentAssignmentId: number, status: boolean, note: string) => Promise<void>
    viewMode?: boolean
}

const StudentSubmissions = ({ 
    assignmentId,
    onUpdate, 
    viewMode = false 
}: TStudentSubmissionsProps) => {
    const [updatingId, setUpdatingId] = useState<number | null>(null)
    const [students, setStudents] = useState<TStudentWithStatus[]>([])
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({ total: 0, completed: 0, notCompleted: 0 })

    // Fetch completion status
    const fetchCompletionStatus = async () => {
        setLoading(true)
        try {
            const response = await getCompletionStatus(assignmentId)
            const data: TCompletionData = response.data || response
            
            // Merge completed and not completed students
            const allStudents: TStudentWithStatus[] = [
                ...data.completed_students.map(s => ({
                    id: s.id,
                    student_id: s.student_id,
                    student_name: s.student_name,
                    nis: s.nis,
                    status: true,
                    completed_at: s.completed_at,
                    note: s.note || ''
                })),
                ...data.not_completed_students.map(s => ({
                    id: s.id,
                    student_id: s.student_id,
                    student_name: s.student_name,
                    nis: s.nis,
                    status: false,
                    note: ''
                }))
            ]
            
            setStudents(allStudents)
            setStats({
                total: data.total,
                completed: data.completed_count,
                notCompleted: data.not_completed_count
            })
        } catch (error) {
            console.error('Failed to fetch completion status:', error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetchCompletionStatus()
    }, [assignmentId])

    // Local state untuk notes
    const [notes, setNotes] = useState<Record<number, string>>({})
    
    // Initialize notes from students
    useEffect(() => {
        const initial: Record<number, string> = {}
        students.forEach(student => {
            initial[student.id] = student.note
        })
        setNotes(initial)
    }, [students])

    const handleStatusChange = async (student: TStudentWithStatus, newStatus: boolean) => {
        if (viewMode) return
        
        setUpdatingId(student.id)
        try {
            await onUpdate(student.id, newStatus, notes[student.id] || '')
            // Refresh data after update
            await fetchCompletionStatus()
        } finally {
            setUpdatingId(null)
        }
    }

    const handleNoteChange = (id: number, value: string) => {
        setNotes(prev => ({ ...prev, [id]: value }))
    }

    const handleNoteBlur = async (student: TStudentWithStatus) => {
        if (viewMode) return
        
        // Only update if note has changed
        if (notes[student.id] !== student.note) {
            setUpdatingId(student.id)
            try {
                await onUpdate(student.id, student.status, notes[student.id] || '')
                // Refresh data after update
                await fetchCompletionStatus()
            } finally {
                setUpdatingId(null)
            }
        }
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spin size="large" />
                <p className="mt-3">Memuat data siswa...</p>
            </div>
        )
    }

    return (
        <div>
            {/* Summary Card */}
            <Card size="small" className="mb-3" style={{ background: '#f5f5f5' }}>
                <Space size="large">
                    <div>
                        <Icon icon="lucide:users" style={{ fontSize: 16, marginRight: 8 }} />
                        <strong>Total Siswa:</strong> {stats.total}
                    </div>
                    <div>
                        <Icon icon="lucide:check-circle" style={{ fontSize: 16, marginRight: 8, color: '#52c41a' }} />
                        <strong>Sudah Mengumpulkan:</strong> 
                        <Tag color="success" className="ms-2">{stats.completed}</Tag>
                    </div>
                    <div>
                        <Icon icon="lucide:x-circle" style={{ fontSize: 16, marginRight: 8, color: '#ff4d4f' }} />
                        <strong>Belum Mengumpulkan:</strong> 
                        <Tag color="error" className="ms-2">{stats.notCompleted}</Tag>
                    </div>
                </Space>
            </Card>

            <Divider orientation="left">
                <Space>
                    <Icon icon="lucide:clipboard-check" />
                    Status Pengumpulan Siswa
                </Space>
            </Divider>

            {/* Student Cards Grid */}
            <div className="row">
                {students.map((student) => (
                    <div key={student.id} className="col-12 col-md-6 mb-3">
                        <Card
                            size="small"
                            loading={updatingId === student.id}
                            style={{
                                borderLeft: student.status ? '4px solid #52c41a' : '4px solid #ff4d4f',
                            }}
                        >
                            {/* Student Header */}
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div style={{ flex: 1 }}>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <Icon icon="lucide:user" style={{ fontSize: 16 }} />
                                        <strong>{student.student_name}</strong>
                                    </div>
                                    <div style={{ fontSize: 12, color: '#888' }}>
                                        NIS: {student.nis}
                                    </div>
                                </div>
                                <div>
                                    <Switch
                                        checked={student.status}
                                        onChange={(checked) => handleStatusChange(student, checked)}
                                        disabled={viewMode || updatingId === student.id}
                                        checkedChildren={<Icon icon="lucide:check" />}
                                        unCheckedChildren={<Icon icon="lucide:x" />}
                                    />
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-2">
                                {student.status ? (
                                    <Tag color="success" icon={<Icon icon="lucide:check-circle" className="me-1" />}>
                                        Sudah Mengumpulkan
                                    </Tag>
                                ) : (
                                    <Tag color="error" icon={<Icon icon="lucide:x-circle" className="me-1" />}>
                                        Belum Mengumpulkan
                                    </Tag>
                                )}
                            </div>

                            {/* Completed At */}
                            {student.completed_at && (
                                <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>
                                    <Icon icon="lucide:clock" className="me-1" />
                                    Dikumpulkan: {new Date(student.completed_at).toLocaleString('id-ID')}
                                </div>
                            )}

                            {/* Note Input */}
                            <Input.TextArea
                                value={notes[student.id]}
                                onChange={(e) => handleNoteChange(student.id, e.target.value)}
                                onBlur={() => handleNoteBlur(student)}
                                placeholder="Catatan (opsional)"
                                disabled={viewMode || updatingId === student.id}
                                rows={2}
                                style={{ fontSize: 13 }}
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentSubmissions