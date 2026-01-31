import { Card, Row, Col, Typography, Tag, Button } from 'antd';
import { 
  ClockCircleOutlined, 
  BookOutlined, 
  HomeOutlined, 
  WhatsAppOutlined, 
  TeamOutlined, 
  FileTextOutlined, 
  NotificationOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  FileDoneOutlined,
  FileExclamationOutlined
} from '@ant-design/icons';
import useDashboardTeacher from './hooks/useDashboardTeacher';

const { Title, Text } = Typography;

const TeacherDashboard = () => {
  const { 
    currentTime, 
    activeSchedule, 
    sending, 
    handleSendReport,
    totalStudents,
    totalAssignments,
    totalAnnouncements,
    totalHadir,
    totalIzin,
    totalAlfa,
    totalStudentsCompleted,
    totalStudentsNotCompleted,
  } = useDashboardTeacher();

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
      title: 'Total Tugas',
      value: totalAssignments,
      icon: <FileTextOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'rgba(79, 172, 254, 0.2)',
      iconColor: '#4facfe',
    },
    {
      title: 'Total Pengumuman',
      value: totalAnnouncements,
      icon: <NotificationOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      iconBg: 'rgba(67, 233, 123, 0.2)',
      iconColor: '#43e97b',
    },
  ];

  const attendanceCards = [
    {
      title: 'Siswa Hadir',
      value: totalHadir,
      icon: <CheckCircleOutlined style={{ fontSize: 28 }} />,
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      iconBg: 'rgba(17, 153, 142, 0.2)',
      iconColor: '#11998e',
    },
    {
      title: 'Siswa Izin',
      value: totalIzin,
      icon: <ExclamationCircleOutlined style={{ fontSize: 28 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(240, 147, 251, 0.2)',
      iconColor: '#f093fb',
    },
    {
      title: 'Siswa Alfa',
      value: totalAlfa,
      icon: <CloseCircleOutlined style={{ fontSize: 28 }} />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      iconBg: 'rgba(250, 112, 154, 0.2)',
      iconColor: '#fa709a',
    },
  ];

  const assignmentCompletionCards = [
    {
      title: 'Sudah Mengerjakan',
      value: totalStudentsCompleted,
      icon: <FileDoneOutlined style={{ fontSize: 28 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(102, 126, 234, 0.2)',
      iconColor: '#667eea',
    },
    {
      title: 'Belum Mengerjakan',
      value: totalStudentsNotCompleted,
      icon: <FileExclamationOutlined style={{ fontSize: 28 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(240, 147, 251, 0.2)',
      iconColor: '#f093fb',
    },
  ];

  return (
    <div>
      <Title level={2}>Dashboard Guru</Title>

      {/* Time and Active Schedule */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <ClockCircleOutlined style={{ fontSize: 48, color: '#1a237e', marginBottom: 16 }} />
              <Title level={3}>{currentTime.format('HH:mm:ss')}</Title>
              <Text type="secondary">{currentTime.format('dddd, DD MMMM YYYY')}</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title="Kelas Aktif Saat Ini"
            extra={
              activeSchedule && (
                <Button
                  type="primary"
                  icon={<WhatsAppOutlined />}
                  loading={sending}
                  onClick={handleSendReport}
                  style={{
                    backgroundColor: '#25D366',
                    borderColor: '#25D366',
                  }}
                >
                  Kirim Laporan ke Wali Murid
                </Button>
              )
            }
          >
            {activeSchedule ? (
              <div>
                <div style={{ marginBottom: 12 }}>
                  <BookOutlined style={{ marginRight: 8 }} />
                  <Text strong>Mata Pelajaran: </Text>
                  <Tag color="blue">{activeSchedule.subject_name}</Tag>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <HomeOutlined style={{ marginRight: 8 }} />
                  <Text strong>Kelas: </Text>
                  <Tag color="green">{activeSchedule.class_name}</Tag>
                </div>
                <div>
                  <ClockCircleOutlined style={{ marginRight: 8 }} />
                  <Text strong>Waktu: </Text>
                  <Text>{activeSchedule.time}</Text>
                </div>
                {activeSchedule.room && (
                  <div style={{ marginTop: 12 }}>
                    <HomeOutlined style={{ marginRight: 8 }} />
                    <Text strong>Ruangan: </Text>
                    <Text>{activeSchedule.room}</Text>
                  </div>
                )}
              </div>
            ) : (
              <Text type="secondary">Tidak ada kelas aktif saat ini</Text>
            )}
          </Card>
        </Col>
      </Row>      
      
      {/* General Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 8 }}>
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
              styles={{ body: { padding: '20px' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>
                    {stat.title}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
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
                    width: 56,
                    height: 56,
                    borderRadius: 12,
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

      {/* Attendance Statistics */}
      <Title level={4} style={{ marginTop: 8, marginBottom: 16 }}>Kehadiran Hari Ini</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {attendanceCards.map((stat, index) => (
          <Col xs={24} sm={8} lg={8} key={index}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
              styles={{ body: { padding: '18px' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>
                    {stat.title}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
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
                    width: 48,
                    height: 48,
                    borderRadius: 10,
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

      {/* Assignment Completion Statistics */}
      <Title level={4} style={{ marginTop: 8, marginBottom: 16 }}>Status Pengerjaan Tugas</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {assignmentCompletionCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={12} key={index}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
              styles={{ body: { padding: '18px' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>
                    {stat.title}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
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
                    width: 48,
                    height: 48,
                    borderRadius: 10,
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
  );
};

export default TeacherDashboard;
