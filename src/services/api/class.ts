import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TClassData, TClassListParams, TClassListResponse, TClassPostData } from '@reportify/types';

export const getList = async (params?: TClassListParams): Promise<TClassListResponse> => {
    const res = await api.get<TClassListResponse>('/classes', { params })
    return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/classes/${id}`)
  return res.data
};

export const create = async (data: TClassPostData): Promise<TResponseData<TClassData>> => {
  const res = await api.post<TResponseData<TClassData>>('/classes', data)
  return res.data
}

export const getById = async (id: number): Promise<TResponseData<TClassData>> => {
  const res = await api.get<TResponseData<TClassData>>(`/classes/${id}`);
  return res.data;
};

export const update = async (payload: TUpdateWithIDPayload<TClassPostData>): Promise<TResponseData<TClassData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TClassData>>(
    `/classes/${id}`,
    data,
  )
  return res.data
}