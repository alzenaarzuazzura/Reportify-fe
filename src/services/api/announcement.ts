import api from '@reportify/services/api';
import { TAnnouncementData, TAnnouncementPostData, TUpdateWithIDPayload } from '@reportify/types';

export const getList = async (): Promise<TAnnouncementData[]> => {
	const res = await api.get<TAnnouncementData[]>('/announcements/my')
	return res.data
}

export const getById = async (id: number): Promise<TAnnouncementData> => {
  const res = await api.get<TAnnouncementData>(`/announcements/${id}`);
  return res.data;
};

export const create = async (data: TAnnouncementPostData): Promise<TAnnouncementData> => {
  const res = await api.post<TAnnouncementData>('/announcements', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TAnnouncementPostData>): Promise<TAnnouncementData> => {
  const { id, data } = payload
  const res = await api.put<TAnnouncementData>(
    `/announcements/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<{ message: string }> => {
  const res = await api.delete(`/announcements/${id}`)
  return res.data
};
