import api from '@reportify/services/api';
import { TBaseResponse } from '@reportify/types';
import { TChangePassword } from '@reportify/types/data/profile';

export const changePassword = async (data: TChangePassword): Promise<TBaseResponse> => {
  const res = await api.post<TBaseResponse>('/profile/change-password', data);
  return res.data;
};
