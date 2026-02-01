export type TReportPeriod = {
  startDate: string
  endDate: string
}

export type TAttendanceStats = {
  total: number
  hadir: number
  sakit: number
  izin: number
  alpha: number
  attendanceRate: string
}

export type TAttendanceByStudent = {
  student: {
    id: number
    name: string
    nis: string
    class: string
  }
  total: number
  hadir: number
  sakit: number
  izin: number
  alpha: number
  attendanceRate: string
}

export type TAttendanceDetail = {
  id: number
  date: string
  status: string
  notes: string | null
  student: {
    id: number
    name: string
    nis: string
    class: string
  }
  subject: string
  teacher: string
  class: string
}

export type TAttendanceReport = {
  period: TReportPeriod
  statistics: TAttendanceStats
  byStudent: TAttendanceByStudent[]
  details: TAttendanceDetail[]
}

export type TAssignmentStats = {
  total: number
  withAssignment: number
  withoutAssignment: number
  completionRate: string
}

export type TAssignmentBySubject = {
  subject: {
    id: number
    name: string
  }
  total: number
  withAssignment: number
  withoutAssignment: number
  completionRate: string
}

export type TAssignmentDetail = {
  id: number
  date: string
  assignment: string | null
  hasAssignment: boolean
  subject: string
  teacher: string
  class: string
  totalStudents: number
  submittedCount: number
  notSubmittedCount: number
  submittedStudents: Array<{
    id: number
    nis: string
    name: string
    submittedAt: string
  }>
  notSubmittedStudents: Array<{
    id: number
    nis: string
    name: string
  }>
}

export type TAssignmentReport = {
  period: TReportPeriod
  statistics: TAssignmentStats
  bySubject: TAssignmentBySubject[]
  details: TAssignmentDetail[]
}

export type TTeacherActivityStats = {
  totalSchedules: number
  reportedSchedules: number
  unreportedSchedules: number
  reportingRate: string
}

export type TTeacherActivityByTeacher = {
  teacher: {
    id: number
    name: string
    email: string
  }
  totalSchedules: number
  reportedSchedules: number
  attendanceReports: number
  assignmentReports: number
  subjects: string[]
  reportingRate: string
}

export type TTeacherActivityDetail = {
  id: number
  date: string
  startTime: string
  endTime: string
  teacher: string
  subject: string
  class: string
  hasAttendance: boolean
  hasAssignment: boolean
  isReported: boolean
}

export type TTeacherActivityReport = {
  period: TReportPeriod
  statistics: TTeacherActivityStats
  byTeacher: TTeacherActivityByTeacher[]
  details: TTeacherActivityDetail[]
}

export type TStudentPerformanceReport = {
  period: TReportPeriod
  student: {
    id: number
    name: string
    nis: string
    class: string
  }
  attendance: {
    statistics: TAttendanceStats
    bySubject: Array<{
      subject: {
        id: number
        name: string
      }
      total: number
      hadir: number
      sakit: number
      izin: number
      alpha: number
      attendanceRate: string
    }>
  }
}

export type TClassSummaryStats = {
  totalStudents: number
  totalSchedules: number
  reportedSchedules: number
  totalAttendanceRecords: number
  totalAssignments: number
  reportingRate: string
}

export type TClassSummaryStudent = {
  student: {
    id: number
    name: string
    nis: string
  }
  total: number
  hadir: number
  sakit: number
  izin: number
  alpha: number
  attendanceRate: string
}

export type TClassSummaryReport = {
  period: TReportPeriod
  class: {
    id: number
    name: string
    totalStudents: number
  }
  statistics: TClassSummaryStats
  studentSummary: TClassSummaryStudent[]
}

export type TReportParams = {
  startDate: string
  endDate: string
  id_class?: number
  id_student?: number
  id_subject?: number
  id_teacher?: number
}

export type TNotificationByStudent = {
  student: {
    id: number
    nis: string
    name: string
    phone: string
  }
  class: string
  total: number
  sent: number
  notSent: number
  sentRate: string
}

export type TNotificationDetail = {
  id: string
  date: string
  student: {
    id: number
    nis: string
    name: string
    phone: string
  }
  class: string
  subject: string
  teacher: string
  attendanceStatus: string
  notificationSent: boolean
  notificationDate: string | null
}

export type TNotificationReport = {
  period: TReportPeriod
  statistics: {
    total: number
    sent: number
    notSent: number
    sentRate: string
  }
  byStudent: TNotificationByStudent[]
  details: TNotificationDetail[]
}
