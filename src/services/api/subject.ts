import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TSubjectData, TSubjectPostData, TSubjectTransForm, TSubjectListParams, TSubjectListResponse } from '@reportify/types/data/subject';

export const getList = async (params?: TSubjectListParams): Promise<TSubjectListResponse> => {
	const res = await api.get<TSubjectListResponse>('/subjects', { params })
	return res.data
}

export const getById = async (id: string | number): Promise<TSubjectData> => {
  const res = await api.get<TResponseData<TSubjectData>>(`/subjects/${id}`);
  if (res.data && typeof res.data === 'object' && 'data' in res.data) {
    return (res.data as TResponseData<TSubjectData>).data;
  }
  return res.data as unknown as TSubjectData;
};

export const create = async (data: TSubjectTransForm): Promise<TResponseData<TSubjectData>> => {
  const res = await api.post<TResponseData<TSubjectData>>('/subjects', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TSubjectPostData>): Promise<TResponseData<TSubjectData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TSubjectData>>(
    `/subjects/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/subjects/${id}`)
  return res.data
};
