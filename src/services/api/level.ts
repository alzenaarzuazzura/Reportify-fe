import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TLevelData, TLevelTransForm, TLevelListParams, TLevelListResponse } from '@reportify/types';

export const getList = async (params?: TLevelListParams): Promise<TLevelListResponse> => {
  const res = await api.get<TLevelListResponse>('/levels', { params })
  return res.data
}

export const getById = async (id: string | number): Promise<TLevelData> => {
  const res = await api.get<TResponseData<TLevelData>>(`/levels/${id}`);
  if (res.data && typeof res.data === 'object' && 'data' in res.data) {
    return (res.data as TResponseData<TLevelData>).data;
  }
  return res.data as unknown as TLevelData;
};

export const create = async (data: TLevelTransForm): Promise<TResponseData<TLevelData>> => {
  const res = await api.post<TResponseData<TLevelData>>('/levels', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TLevelData>): Promise<TResponseData<TLevelData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TLevelData>>(
    `/levels/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/levels/${id}`)
  return res.data
};
