import { MenuItem } from '@reportify/types';
import { menuAdmin, menuTeacher, } from '@reportify/services/menu/index';

export type UserRole = 'admin' | 'teacher';

export const getMenuByRole = (role?: UserRole): MenuItem[] => {
  switch (role) {
    case 'admin':
      return menuAdmin;
    case 'teacher':
      return menuTeacher;
    default:
      return [];
  }
};
