import api from '@reportify/services/api';
import { TBaseResponse, TResponseList } from '@reportify/types';
import { TChangePassword, TLoginHistory, TLoginHistoryParams } from '@reportify/types/data/profile';

export const changePassword = async (data: TChangePassword): Promise<TBaseResponse> => {
  const res = await api.post<TBaseResponse>('/profile/change-password', data);
  return res.data;
};

export const getLoginHistory = async (params: TLoginHistoryParams): Promise<TResponseList<TLoginHistory>> => {
  const res = await api.get<TResponseList<TLoginHistory>>('/profile/login-history', { params });
  return res.data;
};
