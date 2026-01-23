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

// Generate student_assignments after creating assignment
export const generateStudentAssignments = async (assignmentId: number): Promise<any> => {
  const res = await api.post(`/assignments/${assignmentId}/generate-students`)
  return res.data
}

// Get completion status with detailed student info
export const getCompletionStatus = async (assignmentId: number): Promise<any> => {
  const res = await api.get(`/assignments/${assignmentId}/completion-status`)
  return res.data
}

// Update student assignment (status & note)
export const updateStudentAssignment = async (studentAssignmentId: number, data: TStudentAssignmentUpdateData): Promise<any> => {
  const res = await api.put(`/assignments/student-assignments/${studentAssignmentId}`, data)
  return res.data
}
