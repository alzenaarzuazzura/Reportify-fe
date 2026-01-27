import { Card, Descriptions, Spin, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import api from '@reportify/services/api';

import { useAuth } from '@reportify/contexts/AuthContext';
import { TResponseData } from '@reportify/types';
import AlertFormatted from '@reportify/components/Alert';
import { useNavigate } from 'react-router-dom';

type TUser = {
  id: number
  name: string
  email: string
  phone: string | null
  role: string
  created_at: string
  updated_at: string
}

const ProfileInfo = () => {
  const navigate = useNavigate()
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      const res = await api.get<TResponseData<TUser>>(`/users/${user?.id}`);
      return res.data;
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const profile = data?.data;

  return (
    <Card style={{ maxWidth: 800, margin: '0 auto', borderRadius: '12px' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Informasi Profile</h3>
        <p style={{ color: '#666', margin: 0 }}>
          Data profile Anda yang terdaftar di sistem
        </p>
      </div>

      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Nama Lengkap">
          <strong>{profile?.name}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {profile?.email}
        </Descriptions.Item>
        <Descriptions.Item label="No. Telepon">
          {profile?.phone || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color={profile?.role === 'admin' ? 'blue' : 'green'}>
            {profile?.role === 'admin' ? 'Admin' : 'Guru'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Terdaftar Sejak">
          {profile?.created_at ? dayjs(profile.created_at).format('DD MMMM YYYY') : '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Terakhir Diupdate">
          {profile?.updated_at ? dayjs(profile.updated_at).format('DD MMMM YYYY HH:mm') : '-'}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ 
        marginTop: 24, 
        padding: '16px',
        borderRadius: '8px',
      }}>
				<AlertFormatted
					id="msg.alert.profileinfo"
					thing="field.profile"
          onClick={() => navigate('/admin/teachers')}
					show
					style={{
						marginBottom: '20px',
					}}
				/>
      </div>
    </Card>
  );
};

export default ProfileInfo;
