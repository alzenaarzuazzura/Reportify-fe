import api from '@reportify/services/api';
import { TBaseResponse, TResponseData, TUpdateWithIDPayload } from '@reportify/types';
import { TRoomData, TRoomTransForm, TRoomListParams, TRoomListResponse } from '@reportify/types';

export const getList = async (params?: TRoomListParams): Promise<TRoomListResponse> => {
  const res = await api.get<TRoomListResponse>('/rooms', { params })
  return res.data
}

export const getById = async (id: string | number): Promise<TRoomData> => {
  const res = await api.get<TResponseData<TRoomData>>(`/rooms/${id}`);
  if (res.data && typeof res.data === 'object' && 'data' in res.data) {
    return (res.data as TResponseData<TRoomData>).data;
  }
  return res.data as unknown as TRoomData;
};

export const create = async (data: TRoomTransForm): Promise<TResponseData<TRoomData>> => {
  const res = await api.post<TResponseData<TRoomData>>('/rooms', data)
  return res.data
}

export const update = async (payload: TUpdateWithIDPayload<TRoomData>): Promise<TResponseData<TRoomData>> => {
  const { id, data } = payload
  const res = await api.put<TResponseData<TRoomData>>(
    `/rooms/${id}`,
    data,
  )
  return res.data
}

export const deleteById = async (id: number): Promise<TBaseResponse> => {
  const res = await api.delete(`/rooms/${id}`)
  return res.data
};
