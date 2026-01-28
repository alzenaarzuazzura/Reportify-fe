import { useQuery } from '@tanstack/react-query';
import api from '@reportify/services/api';

import { TResponseData } from '@reportify/types';
import { ProfileInfo as ProfileInfoComponent } from '@reportify/components/Profile';

type TUser = {
  id: number
  name: string
  email: string
  phone: string | null
  role: string
  created_at: string
}

const ProfileInfo = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get<TResponseData<TUser>>('/profile');
      return res.data;
    },
  });

  return (
    <ProfileInfoComponent
      user={data?.data}
      isLoading={isLoading}
      // Teacher tidak perlu alert message
    />
  );
};

export default ProfileInfo;
