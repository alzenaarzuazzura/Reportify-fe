import { Card, Select, Input, Tag, Spin, Empty, Result, Button } from "antd"
import { useIntl } from "react-intl"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"

const { Option } = Select

export type TStudentAttendance = {
    id: number
    name: string
    nis: string
    status: 'hadir' | 'izin' | 'alfa'
    note: string
}

export type TCurrentScheduleInfo = {
    id: number
    label: string
    day: string
    time: string
    class_name: string
    subject_name: string
    id_teaching_assignment: number
    id_class: number
} | null

type TBulkAttendanceProps = {
    currentSchedule: TCurrentScheduleInfo
    scheduleLoading: boolean
    scheduleError: boolean
    noScheduleMessage?: string
    students: TStudentAttendance[]
    studentsLoading: boolean
    onStudentChange: (studentId: number, field: 'status' | 'note', value: string) => void
    onSetAllStatus: (status: 'hadir' | 'izin' | 'alfa') => void
    alreadyRecorded?: boolean
}

const BulkAttendance = ({
    currentSchedule,
    scheduleLoading,
    scheduleError,
    noScheduleMessage,
    students,
    studentsLoading,
    onStudentChange,
    onSetAllStatus,
    alreadyRecorded = false
}: TBulkAttendanceProps) => {
    const intl = useIntl()
    const navigate = useNavigate()

    // Loading state
    if (scheduleLoading) {
        return (
            <div className="text-center py-5">
                <Spin size="large" />
                <p className="mt-3">Mendeteksi jadwal mengajar saat ini...</p>
            </div>
        )
    }

    // No schedule found
    if (scheduleError || !currentSchedule) {
        return (
            <Result
                status="warning"
                icon={<Icon icon="lucide:calendar-off" style={{ fontSize: 64, color: '#faad14' }} />}
                title="Tidak Ada Jadwal Mengajar"
                subTitle={noScheduleMessage || "Anda tidak memiliki jadwal mengajar pada waktu ini. Pastikan jadwal Anda sudah diatur sesuai hari dan jam saat ini."}
                extra={
                    <Button type="primary" onClick={() => navigate('/attendance')}>
                        Kembali ke Daftar Absensi
                    </Button>
                }
            />
        )
    }

    // Already recorded attendance
    if (alreadyRecorded) {
        return (
            <Result
                status="info"
                icon={<Icon icon="lucide:check-circle" style={{ fontSize: 64, color: '#52c41a' }} />}
                title="Absensi Sudah Tercatat"
                subTitle={
                    <div>
                        <p>Absensi untuk jadwal ini pada hari ini sudah tercatat.</p>
                        <Card size="small" className="mt-3" style={{ display: 'inline-block' }}>
                            <div className="d-flex align-items-center gap-2">
                                <Tag color="green">{currentSchedule.day}</Tag>
                                <Tag color="blue">{currentSchedule.time}</Tag>
                                <strong>{currentSchedule.subject_name}</strong>
                                <span>-</span>
                                <span>{currentSchedule.class_name}</span>
                            </div>
                        </Card>
                    </div>
                }
                extra={
                    <Button type="primary" onClick={() => navigate('/attendance')}>
                        Lihat Daftar Absensi
                    </Button>
                }
            />
        )
    }

    return (
        <div>
            {/* Schedule Info Card */}
            <Card 
                size="small" 
                className="mb-3" 
                style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}
            >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Tag color="green">{currentSchedule.day}</Tag>
                        <Tag color="blue">{currentSchedule.time}</Tag>
                        <span><strong>{currentSchedule.subject_name}</strong></span>
                        <span>-</span>
                        <span>{currentSchedule.class_name}</span>
                    </div>
                    <div className="text-muted">
                        <small>{students.length} siswa</small>
                    </div>
                </div>
            </Card>

            {/* Quick Actions - Set all status */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <span className="text-muted">Set semua:</span>
                <Tag 
                    color="green" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSetAllStatus('hadir')}
                >
                    <Icon icon="lucide:check" className="me-1" />
                    Hadir
                </Tag>
                <Tag 
                    color="orange" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSetAllStatus('izin')}
                >
                    <Icon icon="lucide:clock" className="me-1" />
                    Izin
                </Tag>
                <Tag 
                    color="red" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSetAllStatus('alfa')}
                >
                    <Icon icon="lucide:x" className="me-1" />
                    Alfa
                </Tag>
            </div>

            {/* Students Loading */}
            {studentsLoading && (
                <div className="text-center py-4">
                    <Spin />
                    <p className="mt-2 text-muted">Memuat daftar siswa...</p>
                </div>
            )}

            {/* No Students */}
            {!studentsLoading && students.length === 0 && (
                <Empty description="Tidak ada siswa di kelas ini" />
            )}

            {/* Student Cards */}
            {!studentsLoading && students.length > 0 && (
                <div className="row g-2">
                    {students.map((student, index) => (
                        <div key={student.id} className="col-12">
                            <Card 
                                size="small"
                                className="student-attendance-card"
                                style={{
                                    borderLeft: `4px solid ${
                                        student.status === 'hadir' ? '#52c41a' :
                                        student.status === 'izin' ? '#faad14' : '#ff4d4f'
                                    }`
                                }}
                            >
                                <div className="row align-items-center g-2">
                                    {/* Number & Name */}
                                    <div className="col-12 col-md-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-secondary">{index + 1}</span>
                                            <div>
                                                <div className="fw-medium">{student.name}</div>
                                                <small className="text-muted">{student.nis}</small>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="col-6 col-md-3">
                                        <Select
                                            value={student.status}
                                            onChange={(value) => onStudentChange(student.id, 'status', value)}
                                            style={{ width: '100%' }}
                                            size="small"
                                        >
                                            <Option value="hadir">
                                                <span className="text-success">
                                                    <Icon icon="lucide:check" className="me-1" />
                                                    {intl.formatMessage({ id: 'field.statushadir' })}
                                                </span>
                                            </Option>
                                            <Option value="izin">
                                                <span className="text-warning">
                                                    <Icon icon="lucide:clock" className="me-1" />
                                                    {intl.formatMessage({ id: 'field.statusizin' })}
                                                </span>
                                            </Option>
                                            <Option value="alfa">
                                                <span className="text-danger">
                                                    <Icon icon="lucide:x" className="me-1" />
                                                    {intl.formatMessage({ id: 'field.statusalfa' })}
                                                </span>
                                            </Option>
                                        </Select>
                                    </div>

                                    {/* Note */}
                                    <div className="col-6 col-md-5">
                                        <Input
                                            value={student.note}
                                            onChange={(e) => onStudentChange(student.id, 'note', e.target.value)}
                                            placeholder="Catatan (opsional)"
                                            size="small"
                                            allowClear
                                        />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BulkAttendance
