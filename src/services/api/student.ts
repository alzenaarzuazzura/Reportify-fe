import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TStudentData, TStudentListParams, TStudentListResponse, TStudentPostData } from '@reportify/types/data/student';

export const getList = async (params?: TStudentListParams): Promise<TStudentListResponse> => {
  const res = await api.get<TStudentListResponse>('/students', { params })
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/students/${id}`)
  return res.data
};

export const create = async (data: TStudentPostData): Promise<TResponseData<TStudentData>> => {
  const res = await api.post<TResponseData<TStudentData>>('/students', data)
  return res.data
}

export const getById = async (id: number): Promise<TResponseData<TStudentData>> => {
  const res = await api.get<TResponseData<TStudentData>>(`/students/${id}`);
  return res.data;
};

export const update = async (payload: TUpdateWithIDPayload<TStudentPostData>): Promise<TResponseData<TStudentData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TStudentData>>(
    `/students/${id}`,
    data,
  )
  return res.data
}

export const importFromExcel = async (file: File): Promise<TResponseData<any>> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await api.post<TResponseData<any>>('/students/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}
