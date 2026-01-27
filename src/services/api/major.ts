import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TMajorData, TMajorTransForm, TMajorListParams, TMajorListResponse } from '@reportify/types';

export const getList = async (params?: TMajorListParams): Promise<TMajorListResponse> => {
  const res = await api.get<TMajorListResponse>('/majors', { params })
  return res.data
}

export const getById = async (id: string | number): Promise<TMajorData> => {
  const res = await api.get<TResponseData<TMajorData>>(`/majors/${id}`);
  if (res.data && typeof res.data === 'object' && 'data' in res.data) {
    return (res.data as TResponseData<TMajorData>).data;
  }
  return res.data as unknown as TMajorData;
};

export const create = async (data: TMajorTransForm): Promise<TResponseData<TMajorData>> => {
  const res = await api.post<TResponseData<TMajorData>>('/majors', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TMajorData>): Promise<TResponseData<TMajorData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TMajorData>>(
    `/majors/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/majors/${id}`)
  return res.data
};
