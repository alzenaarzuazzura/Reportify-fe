import api from '@reportify/services/api';
import { TResponseData } from '@reportify/types';
import {
  TAttendanceReport,
  TAssignmentReport,
  TTeacherActivityReport,
  TStudentPerformanceReport,
  TClassSummaryReport,
  TReportParams
} from '@reportify/types/data/report';

export const getAttendanceReport = async (params: TReportParams): Promise<TResponseData<TAttendanceReport>> => {
  const res = await api.get<TResponseData<TAttendanceReport>>('/reports/attendance', { params });
  return res.data;
};

export const getAssignmentReport = async (params: TReportParams): Promise<TResponseData<TAssignmentReport>> => {
  const res = await api.get<TResponseData<TAssignmentReport>>('/reports/assignment', { params });
  return res.data;
};

export const getTeacherActivityReport = async (params: TReportParams): Promise<TResponseData<TTeacherActivityReport>> => {
  const res = await api.get<TResponseData<TTeacherActivityReport>>('/reports/teacher-activity', { params });
  return res.data;
};

export const getStudentPerformanceReport = async (params: TReportParams): Promise<TResponseData<TStudentPerformanceReport>> => {
  const res = await api.get<TResponseData<TStudentPerformanceReport>>('/reports/student-performance', { params });
  return res.data;
};

export const getClassSummaryReport = async (params: TReportParams): Promise<TResponseData<TClassSummaryReport>> => {
  const res = await api.get<TResponseData<TClassSummaryReport>>('/reports/class-summary', { params });
  return res.data;
};
