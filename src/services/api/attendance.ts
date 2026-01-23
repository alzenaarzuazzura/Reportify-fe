import api from '@reportify/services/api';
import { TAttendanceData, TAttendancePostData, TAttendanceBulkPostData, TUpdateWithIDPayload } from '@reportify/types';

// Response wrapper type
type TApiResponse<T> = {
  success: boolean
  data: T
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export const getList = async (): Promise<TAttendanceData[]> => {
	const res = await api.get<TApiResponse<TAttendanceData[]>>('/attendances')
	return res.data.data
}

export const getById = async (id: number): Promise<TAttendanceData> => {
  const res = await api.get<TApiResponse<TAttendanceData>>(`/attendances/${id}`);
  return res.data.data;
};

export const create = async (data: TAttendancePostData): Promise<TAttendanceData> => {
  const res = await api.post<TApiResponse<TAttendanceData>>('/attendances', data)
  return res.data.data
}

export const createBulk = async (data: TAttendanceBulkPostData): Promise<TAttendanceData[]> => {
  const res = await api.post<TApiResponse<TAttendanceData[]>>('/attendances/bulk', data)
  return res.data.data
}

export const update = async (payload: TUpdateWithIDPayload<TAttendancePostData>): Promise<TAttendanceData> => {
  const { id, data } = payload
  const res = await api.put<TApiResponse<TAttendanceData>>(
    `/attendances/${id}`,
    data,
  )
  return res.data.data
}

export const deleteById = async (id: number): Promise<{ message: string }> => {
  const res = await api.delete<TApiResponse<{ message: string }>>(`/attendances/${id}`)
  return res.data.data
};

// Check if attendance already exists for a schedule on a specific date
type TCheckExistingResponse = {
  success: boolean
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
