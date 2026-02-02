import { Card, Row, Col, Typography, Tag, Button, Badge } from 'antd';
import { 
  ClockCircleOutlined, 
  BookOutlined, 
  HomeOutlined, 
  WhatsAppOutlined, 
  CalendarOutlined
} from '@ant-design/icons';
import useDashboardTeacher from './hooks/useDashboardTeacher';

const { Title, Text } = Typography;

// Day colors for visual distinction
const dayColors: Record<string, string> = {
  'Senin': '#1890ff',
  'Selasa': '#52c41a',
  'Rabu': '#fa8c16',
  'Kamis': '#eb2f96',
  'Jumat': '#722ed1',
  'Sabtu': '#13c2c2',
};

const TeacherDashboard = () => {
  const { 
    currentTime, 
    activeSchedule, 
    sending, 
    handleSendReport,
    schedulesByDay,
  } = useDashboardTeacher();

  const daysOrder = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

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
      
      {/* All Teaching Schedules */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                <span>Jadwal Mengajar</span>
              </div>
            }
            style={{
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            {daysOrder.map(day => {
              const schedules = schedulesByDay[day] || [];
              if (schedules.length === 0) return null;

              return (
                <div key={day} style={{ marginBottom: 24 }}>
                  {/* Day Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 12,
                      paddingBottom: 8,
                      borderBottom: `2px solid ${dayColors[day]}`,
                    }}
                  >
                    <Badge color={dayColors[day]} />
                    <Text
                      strong
                      style={{
                        fontSize: 18,
                        color: dayColors[day],
                      }}
                    >
                      {day}
                    </Text>
                    <Tag color={dayColors[day]}>{schedules.length} jadwal</Tag>
                  </div>

                  {/* Schedule Cards for this day */}
                  <Row gutter={[12, 12]}>
                    {schedules.map((schedule) => {
                      const isActive = activeSchedule && schedule.id === activeSchedule.value;
                      
                      return (
                        <Col xs={24} sm={12} lg={8} key={schedule.id}>
                          <Card
                            size="small"
                            style={{
                              borderRadius: '12px',
                              border: isActive ? `2px solid ${dayColors[day]}` : '1px solid #f0f0f0',
                              backgroundColor: isActive ? '#e6f7ff' : '#fafafa',
                              boxShadow: isActive 
                                ? `0 4px 12px ${dayColors[day]}33`
                                : '0 2px 8px rgba(0,0,0,0.06)',
                              transition: 'all 0.3s',
                            }}
                            styles={{ body: { padding: '16px' } }}
                            hoverable
                          >
                            {/* Time */}
                            <div style={{ marginBottom: 12 }}>
                              <ClockCircleOutlined
                                style={{
                                  marginRight: 8,
                                  color: dayColors[day],
                                  fontSize: 16,
                                }}
                              />
                              <Text
                                strong
                                style={{
                                  fontSize: 15,
                                  color: isActive ? dayColors[day] : '#000',
                                }}
                              >
                                {schedule.start_time} - {schedule.end_time}
                              </Text>
                            </div>

                            {/* Subject */}
                            <div style={{ marginBottom: 8 }}>
                              <BookOutlined
                                style={{
                                  marginRight: 8,
                                  color: '#52c41a',
                                }}
                              />
                              <Text strong>{schedule.subject}</Text>
                            </div>

                            {/* Class */}
                            <div style={{ marginBottom: 8 }}>
                              <Tag color="blue" style={{ marginLeft: 24 }}>
                                {schedule.class}
                              </Tag>
                            </div>

                            {/* Room */}
                            <div>
                              <HomeOutlined
                                style={{
                                  marginRight: 8,
                                  color: '#fa8c16',
                                }}
                              />
                              <Text type="secondary">
                                {schedule.room || 'Ruangan belum ditentukan'}
                              </Text>
                            </div>

                            {isActive && (
                              <Tag
                                color={dayColors[day]}
                                style={{
                                  marginTop: 12,
                                  borderRadius: 4,
                                }}
                              >
                                Sedang Berlangsung
                              </Tag>
                            )}
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              );
            })}

            {Object.keys(schedulesByDay).length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <CalendarOutlined style={{ fontSize: 48, color: '#d9d9d9', marginBottom: 16 }} />
                <br />
                <Text type="secondary">Belum ada jadwal mengajar</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
