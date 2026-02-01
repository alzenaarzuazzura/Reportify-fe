import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TTeachingAssignmentData, TTeachingAssignmentListParams, TTeachingAssignmentListResponse, TTeachingAssignmentPostData } from '@reportify/types';

export const getList = async (params?: TTeachingAssignmentListParams): Promise<TTeachingAssignmentListResponse> => {
    const res = await api.get<TTeachingAssignmentListResponse>('/teaching-assignments', { params })
    return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/teaching-assignments/${id}`)
  return res.data
};

export const create = async (data: TTeachingAssignmentPostData): Promise<TResponseData<TTeachingAssignmentData>> => {
  const res = await api.post<TResponseData<TTeachingAssignmentData>>('/teaching-assignments', data)
  return res.data
}

export const getById = async (id: number): Promise<TResponseData<TTeachingAssignmentData>> => {
  const res = await api.get<TResponseData<TTeachingAssignmentData>>(`/teaching-assignments/${id}`);
  return res.data;
};

export const update = async (payload: TUpdateWithIDPayload<TTeachingAssignmentPostData>): Promise<TResponseData<TTeachingAssignmentData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TTeachingAssignmentData>>(
    `/teaching-assignments/${id}`,
    data,
  )
  return res.data
}

type TCheckExistingResponse = {
  status: boolean
  message: string
  data: {
    exists: boolean
    assignment?: {
      id: number
      teacher: string
      class: string
      subject: string
    }
  }
}

export const checkExisting = async (id_class: number, id_subject: number, excludeId?: number): Promise<boolean> => {
  try {
    const res = await api.get<TCheckExistingResponse>('/teaching-assignments/check', {
      params: { id_class, id_subject, exclude_id: excludeId }
    })
    return res.data.data?.exists || false
  } catch {
    return false
  }
}
