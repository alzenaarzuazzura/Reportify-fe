import { Card, Row, Col } from 'antd'
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  HomeOutlined,
} from '@ant-design/icons'

import useAdminDashboard from './hooks/useDashboardAdmin'

const AdminDashboard = () => {
  const {
    totalStudents,
    totalTeachers,
    totalSubjects,
    totalClasses,
  } = useAdminDashboard()

  const statsCards = [
    {
      title: 'Total Siswa',
      value: totalStudents,
      icon: <TeamOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(102, 126, 234, 0.2)',
      iconColor: '#667eea',
    },
    {
      title: 'Total Guru',
      value: totalTeachers,
      icon: <UserOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(240, 147, 251, 0.2)',
      iconColor: '#f093fb',
    },
    {
      title: 'Mata Pelajaran',
      value: totalSubjects,
      icon: <BookOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'rgba(79, 172, 254, 0.2)',
      iconColor: '#4facfe',
    },
    {
      title: 'Total Kelas',
      value: totalClasses,
      icon: <HomeOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      iconBg: 'rgba(67, 233, 123, 0.2)',
      iconColor: '#43e97b',
    },
  ]

  return (
    <div>
      <h1
        style={{
          marginBottom: 32,
          fontSize: '28px',
          fontWeight: 700,
          background:
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Dashboard Admin
      </h1>

      <Row gutter={[24, 24]}>
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
              styles={{ body: { padding: '24px' } }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>
                    {stat.title}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      background: stat.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                </div>

                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: stat.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.iconColor,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default AdminDashboard
