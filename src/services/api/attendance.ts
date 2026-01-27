import api from '@reportify/services/api';
import { TAttendanceData, TAttendancePostData, TAttendanceBulkPostData, TUpdateWithIDPayload, TBaseResponse, TAttendanceListParams, TAttendanceListResponse, TResponseData } from '@reportify/types';

export const getList = async (params?: TAttendanceListParams): Promise<TAttendanceListResponse> => {
  const res = await api.get<TAttendanceListResponse>('/attendances', { params })
  return res.data
}

export const getById = async (id: number): Promise<TAttendanceData> => {
  const res = await api.get<TResponseData<TAttendanceData>>(`/attendances/${id}`);
  return res.data.data;
};

export const create = async (data: TAttendancePostData): Promise<TAttendanceData> => {
  const res = await api.post<TResponseData<TAttendanceData>>('/attendances', data)
  return res.data.data
}

export const createBulk = async (data: TAttendanceBulkPostData): Promise<TAttendanceData[]> => {
  const res = await api.post<TResponseData<TAttendanceData[]>>('/attendances/bulk', data)
  return res.data.data
}

export const update = async (payload: TUpdateWithIDPayload<TAttendancePostData>): Promise<TAttendanceData> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TAttendanceData>>(
    `/attendances/${id}`,
    data,
  )
  return res.data.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/attendances/${id}`)
  return res.data
};

type TCheckExistingResponse = {
  status: boolean
  message: string
  exists: boolean
}

export const checkExisting = async (id_schedule: number, date: string): Promise<boolean> => {
  try {
    const res = await api.get<TCheckExistingResponse>('/attendances/check', {
      params: { id_schedule, date }
    })
    return res.data.exists || false
  } catch {
    return false
  }
}

export const getClassSessionSummary = async (id_schedule: number, date: string): Promise<any> => {
  const res = await api.get<TResponseData<any>>('/attendances/session-summary', {
    params: { id_schedule, date }
  });
  return res.data.data;
};

type TSendReportResponse = {
  status: boolean
  message: string
  summary: {
    total: number
    sent: number
    failed: number
  }
  sent: Array<{
    student: string
    phone: string
    status: string
  }>
  errors?: Array<{
    student: string
    phone?: string
    reason: string
  }>
}

export const sendReportToParents = async (id_schedule: number, date: string): Promise<TSendReportResponse> => {
  const res = await api.post<TSendReportResponse>('/attendances/send-report', {
    id_schedule,
    date
  });
  return res.data;
};