import api from '@reportify/services/api';
import { TResponseData } from '@reportify/types';
import {
  TAttendanceReport,
  TAssignmentReport,
  TReportParams,
  TNotificationReport
} from '@reportify/types/data/report';

export const getAttendanceReport = async (params: TReportParams): Promise<TResponseData<TAttendanceReport>> => {
  const res = await api.get<TResponseData<TAttendanceReport>>('/reports/attendance', { params });
  return res.data;
};

export const getAssignmentReport = async (params: TReportParams): Promise<TResponseData<TAssignmentReport>> => {
  const res = await api.get<TResponseData<TAssignmentReport>>('/reports/assignment', { params });
  return res.data;
};

export const getNotificationReport = async (params: TReportParams): Promise<TResponseData<TNotificationReport>> => {
  const res = await api.get<TResponseData<TNotificationReport>>('/reports/notification', { params });
  return res.data;
};
