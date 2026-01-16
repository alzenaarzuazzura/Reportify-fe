import apiReportify from '@reportify/services/api';
import { TLoginRequest, TLoginResponseData } from '@reportify/types';

export const authService = {
  login: async (data: TLoginRequest): Promise<TLoginResponseData> => {
    
    const response = await apiReportify.post<TLoginResponseData>('/auth/login', data);
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
