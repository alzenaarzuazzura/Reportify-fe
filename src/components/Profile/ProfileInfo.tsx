import { Card, Descriptions, Spin, Tag } from 'antd';
import dayjs from 'dayjs';
import AlertFormatted from '@reportify/components/Alert';
import { formatPhoneDisplay } from '@reportify/utils/phoneFormatter';

type TUser = {
  id: number
  name: string
  email: string
  phone: string | null
  role: string
  created_at: string
}

type TProfileInfoProps = {
  user: TUser | undefined
  isLoading: boolean
  onAlertClick?: () => void
  alertMessage?: {
    id: string
    thing: string
  }
}

const ProfileInfo = ({ user, isLoading, onAlertClick, alertMessage }: TProfileInfoProps) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

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
          <strong>{user?.name}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {user?.email}
        </Descriptions.Item>
        <Descriptions.Item label="No. Telepon">
          {formatPhoneDisplay(user?.phone)}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          <Tag color={user?.role === 'admin' ? 'blue' : 'green'}>
            {user?.role === 'admin' ? 'Admin' : 'Guru'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Terdaftar Sejak">
          {user?.created_at ? dayjs(user.created_at).format('DD MMMM YYYY') : '-'}
        </Descriptions.Item>
      </Descriptions>

      {alertMessage && (
        <div style={{ 
          marginTop: 24, 
          padding: '16px',
          borderRadius: '8px',
        }}>
          <AlertFormatted
            id={alertMessage.id}
            thing={alertMessage.thing}
            onClick={onAlertClick}
            show
            style={{
              marginBottom: '20px',
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default ProfileInfo;
