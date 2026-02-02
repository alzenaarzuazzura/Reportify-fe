import { Card, Descriptions, Spin, Tag } from 'antd'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'

import AlertFormatted from '@reportify/components/Alert'
import { formatPhoneDisplay } from '@reportify/utils/phoneFormatter'
import useProfileInfo from '@reportify/hooks/useProfileInfo'
import { TTeacherData } from '@reportify/types'

type TProfileInfoProps = {
  redirectPath?: string
  showAlert?: boolean
}

const ProfileInfo = ({
  redirectPath,
  showAlert = false,
}: TProfileInfoProps) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { data, isLoading } = useProfileInfo()

  const user: TTeacherData | undefined = data?.data
  const title = intl.formatMessage({ id: 'field.profileinfo' })

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    )
  }

  return (
    <>
      <Helmet title={title} />

      <div className="pt-4">
        <div className="title-underline">
          <h5 style={{ margin: 0 }}>{title}</h5>
        </div>
      </div>

      <Card style={{ maxWidth: 800, margin: '0 auto', borderRadius: '12px' }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#666', margin: 0 }}>
            Data profile Anda yang terdaftar di sistem
          </p>
        </div>

        {showAlert && redirectPath && (
          <div style={{ marginTop: 24, padding: '16px', borderRadius: '8px' }}>
            <AlertFormatted
              id="msg.alert.profileinfo"
              thing="field.profile"
              onClick={() => navigate(redirectPath)}
              show
              style={{ marginBottom: '20px' }}
            />
          </div>
        )}        

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
            {user?.created_at
              ? dayjs(user.created_at).format('DD MMMM YYYY')
              : '-'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  )
}

export default ProfileInfo
