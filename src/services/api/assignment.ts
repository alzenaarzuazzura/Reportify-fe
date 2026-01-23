import api from '@reportify/services/api';
import { TAssignmentData, TAssignmentPostData, TStudentAssignmentUpdateData, TUpdateWithIDPayload } from '@reportify/types';

export const getList = async (): Promise<TAssignmentData[]> => {
	const res = await api.get<TAssignmentData[]>('/assignments')
	return res.data
}

export const getById = async (id: number): Promise<TAssignmentData> => {
  const res = await api.get<TAssignmentData>(`/assignments/${id}`);
  return res.data;
};

export const create = async (data: TAssignmentPostData): Promise<TAssignmentData> => {
  const res = await api.post<TAssignmentData>('/assignments', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TAssignmentPostData>): Promise<TAssignmentData> => {
  const { id, data } = payload
  const res = await api.put<TAssignmentData>(
    `/assignments/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<{ message: string }> => {
  const res = await api.delete(`/assignments/${id}`)
  return res.data
};

export const updateStudentAssignment = async (id: number, data: TStudentAssignmentUpdateData): Promise<any> => {
  const res = await api.put(`/assignments/student-assignments/${id}`, data)
  return res.data
}
