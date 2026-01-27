import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TRombelData, TRombelTransForm, TRombelListParams, TRombelListResponse } from '@reportify/types';

export const getList = async (params?: TRombelListParams): Promise<TRombelListResponse> => {
  const res = await api.get<TRombelListResponse>('/rombels', { params })
  return res.data
}

export const getById = async (id: string | number): Promise<TRombelData> => {
  const res = await api.get<TResponseData<TRombelData>>(`/rombels/${id}`);
  if (res.data && typeof res.data === 'object' && 'data' in res.data) {
    return (res.data as TResponseData<TRombelData>).data;
  }
  return res.data as unknown as TRombelData;
};

export const create = async (data: TRombelTransForm): Promise<TResponseData<TRombelData>> => {
  const res = await api.post<TResponseData<TRombelData>>('/rombels', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TRombelData>): Promise<TResponseData<TRombelData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TRombelData>>(
    `/rombels/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/rombels/${id}`)
  return res.data
};
