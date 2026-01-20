import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TScheduleData, TScheduleListParams, TScheduleListResponse, TSchedulePostData } from '@reportify/types';

export const getList = async (params?: TScheduleListParams): Promise<TScheduleListResponse> => {
    const res = await api.get<TScheduleListResponse>('/schedules', { params })
    return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/schedules/${id}`)
  return res.data
};

export const create = async (data: TSchedulePostData): Promise<TResponseData<TScheduleData>> => {
  const res = await api.post<TResponseData<TScheduleData>>('/schedules', data)
  return res.data
}

export const getById = async (id: number): Promise<TResponseData<TScheduleData>> => {
  const res = await api.get<TResponseData<TScheduleData>>(`/schedules/${id}`);
  return res.data;
};

export const update = async (payload: TUpdateWithIDPayload<TSchedulePostData>): Promise<TResponseData<TScheduleData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TScheduleData>>(
    `/schedules/${id}`,
    data,
  )
  return res.data
}
