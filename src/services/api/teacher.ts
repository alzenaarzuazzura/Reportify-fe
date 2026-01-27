import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TTeacherData, TTeacherPostData, TTeacherListParams, TTeacherListResponse } from '@reportify/types/data/teacher';

export const getList = async (params?: TTeacherListParams): Promise<TTeacherListResponse> => {
	const res = await api.get<TTeacherListResponse>('/users', { params })
	return res.data
}

export const getById = async (id: number): Promise<TResponseData<TTeacherData>> => {
  const res = await api.get<TResponseData<TTeacherData>>(`/users/${id}`);
  return res.data;
};

export const create = async (data: TTeacherPostData): Promise<TResponseData<TTeacherData>> => {
  const res = await api.post<TResponseData<TTeacherData>>('/users', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TTeacherPostData>): Promise<TResponseData<TTeacherData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TTeacherData>>(
    `/users/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/users/${id}`)
  return res.data
};

export const sendPasswordSetup = async (id: number): Promise<TBaseResponse> => {
  const res = await api.post<TBaseResponse>(`/users/${id}/send-password-setup`)
  return res.data
};

export const importFromExcel = async (file: File): Promise<TResponseData<any>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await api.post<TResponseData<any>>('/users/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
