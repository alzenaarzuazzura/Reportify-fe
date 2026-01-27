import RequiredMark from "@reportify/components/RequiredMark"
import CmbTeachingAssignment from "@reportify/components/Combos/CmbTeachingAssignment"
import CmbSchedule from "@reportify/components/Combos/CmbSchedule"
import CmbStudent from "@reportify/components/Combos/CmbStudent"
import { TAttendanceGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form, DatePicker, Select, Input, Alert, Card, Tag } from "antd"
import { useIntl } from "react-intl"

const { Option } = Select

type TGeneralProps = TAttendanceGeneralParams & {
    currentSchedule?: {
        id: number
        label: string
        day: string
        time: string
        class_name: string
        subject_name: string
        id_teaching_assignment: number
        id_class: number
    } | null
    scheduleLoading?: boolean
    scheduleError?: boolean
}

type TGeneralExtendedProps = TGeneralProps & {
    editMode?: boolean
}

const General = ({ viewMode, createMode, currentSchedule, scheduleLoading, scheduleError, editMode = false }: TGeneralExtendedProps) => {
    const intl = useIntl()

    // For create mode - show auto-detected schedule info
    if (createMode) {
        return (
            <>
                {/* Info Jadwal Saat Ini */}
                {scheduleLoading && (
                    <Alert 
                        message="Mendeteksi jadwal mengajar saat ini..." 
                        type="info" 
                        showIcon 
                        className="mb-3"
                    />
                )}

                {scheduleError && (
                    <Alert 
                        message="Tidak ada jadwal mengajar saat ini" 
                        description="Anda tidak memiliki jadwal mengajar pada waktu ini. Silakan cek jadwal Anda atau tambah absensi secara manual."
                        type="warning" 
                        showIcon 
                        className="mb-3"
                    />
                )}

                {currentSchedule && (
                    <Card size="small" className="mb-3" style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                            <Tag color="green">{currentSchedule.day}</Tag>
                            <Tag color="blue">{currentSchedule.time}</Tag>
                            <span><strong>{currentSchedule.subject_name}</strong></span>
                            <span>-</span>
                            <span>{currentSchedule.class_name}</span>
                        </div>
                    </Card>
                )}

                {/* Hidden fields for schedule & teaching assignment - auto-filled */}
                <Form.Item name='id_schedule' hidden>
                    <Input />
                </Form.Item>
                <Form.Item name='id_teaching_assignment' hidden>
                    <Input />
                </Form.Item>

                {/* Tanggal Absensi - default hari ini, bisa diubah */}
                <Form.Item
                    name='date'
                    label={intl.formatMessage({ id: 'field.attendancedate' })}
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <DatePicker 
                        style={{ width: '100%' }} 
                        format="YYYY-MM-DD" 
                        disabled={!currentSchedule}
                    />
                </Form.Item>

                {/* Siswa - filtered by class from current schedule */}
                <Form.Item 
                    name='id_student' 
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.student' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <CmbStudent 
                        disabled={!currentSchedule}
                        fetchParams={currentSchedule ? { id_class: currentSchedule.id_class } : undefined}
                    />
                </Form.Item>

                {/* Status Kehadiran */}
                <Form.Item
                    name='status'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.attendancestatus' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                    initialValue="hadir"
                >
                    <Select placeholder="Pilih Status" disabled={!currentSchedule}>
                        <Option value="hadir">{intl.formatMessage({ id: 'field.statushadir' })}</Option>
                        <Option value="izin">{intl.formatMessage({ id: 'field.statusizin' })}</Option>
                        <Option value="alfa">{intl.formatMessage({ id: 'field.statusalfa' })}</Option>
                    </Select>
                </Form.Item>

                {/* Catatan */}
                <Form.Item
                    name='note'
                    label={intl.formatMessage({ id: 'field.note' })}
                >
                    <Input.TextArea 
                        rows={2}
                        placeholder="Catatan (opsional)" 
                        disabled={!currentSchedule}
                    />
                </Form.Item>
            </>
        )
    }

    // For view/edit mode - show all fields
    // In edit mode: only status and note are editable, others are protected
    const isProtected = viewMode || editMode

    return (
        <>
            {/* Penugasan Mengajar (Kelas + Mapel) */}
            <Form.Item 
                name='id_teaching_assignment' 
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.teachingassignment' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <CmbTeachingAssignment disabled={isProtected} />
            </Form.Item>

            {/* Jadwal */}
            <Form.Item 
                name='id_schedule' 
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.schedule' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <CmbSchedule disabled={isProtected} />
            </Form.Item>

            {/* Siswa */}
            <Form.Item 
                name='id_student' 
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.student' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <CmbStudent disabled={isProtected} />
            </Form.Item>

            {/* Tanggal Absensi */}
            <Form.Item
                name='date'
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.attendancedate' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <DatePicker style={{ width: '100%' }} disabled={isProtected} format="YYYY-MM-DD" />
            </Form.Item>

            {/* Status Kehadiran - Always editable in edit mode */}
            <Form.Item
                name='status'
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.attendancestatus' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Select placeholder="Pilih Status" disabled={viewMode}>
                    <Option value="hadir">{intl.formatMessage({ id: 'field.statushadir' })}</Option>
                    <Option value="izin">{intl.formatMessage({ id: 'field.statusizin' })}</Option>
                    <Option value="alfa">{intl.formatMessage({ id: 'field.statusalfa' })}</Option>
                </Select>
            </Form.Item>

            {/* Catatan - Always editable in edit mode */}
            <Form.Item
                name='note'
                label={intl.formatMessage({ id: 'field.note' })}
            >
                <Input.TextArea 
                    rows={3}
                    placeholder="Catatan (opsional)" 
                    disabled={viewMode}
                />
            </Form.Item>
        </>
    )
}

export default General