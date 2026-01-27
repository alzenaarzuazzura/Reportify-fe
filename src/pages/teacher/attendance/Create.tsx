import { Helmet } from "react-helmet-async"
import { useIntl } from "react-intl"
import { Button, DatePicker } from "antd"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"

import useAttendanceCreate from "./hooks/useAttendanceCreate"
import BulkAttendance from "./formContent/BulkAttendance"

const AttendanceCreate = () => {
  const intl = useIntl()

  const {
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
  } = useAttendanceCreate()

  // Check if form should be shown (has schedule, not already recorded)
  const canShowForm = currentSchedule && !scheduleError && !alreadyRecorded

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'attendance.create' })}</title>
      </Helmet>
      
      <div className='title-underline d-flex justify-content-between align-items-center flex-wrap gap-2'>
        <h5 className='fw-bold mb-0'>{intl.formatMessage({ id: 'attendance.create' })}</h5>
        {canShowForm && (
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">Tanggal:</span>
            <DatePicker 
              value={dayjs()} 
              disabled 
              format="DD MMMM YYYY"
              size="small"
            />
          </div>
        )}
      </div>
      
      <div className="card rounded p-3 mt-3">
        <BulkAttendance
          currentSchedule={currentSchedule}
          scheduleLoading={scheduleLoading}
          scheduleError={scheduleError}
          noScheduleMessage={noScheduleMessage}
          students={students}
          studentsLoading={studentsLoading}
          onStudentChange={onStudentChange}
          onSetAllStatus={onSetAllStatus}
          alreadyRecorded={alreadyRecorded}
        />

        {/* Action Buttons - only show if can fill form */}
        {canShowForm && students.length > 0 && (
          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <Button onClick={onCancel}>
              {intl.formatMessage({ id: 'button.cancel' })}
            </Button>
            <Button 
              type="primary" 
              onClick={onSubmit}
              loading={submitting}
              icon={<Icon icon="lucide:save" />}
            >
              Simpan Absensi ({students.length} siswa)
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export default AttendanceCreate