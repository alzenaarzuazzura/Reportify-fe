import { Card, Row, Col, Typography, Tag } from 'antd';
import { ClockCircleOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { currentSchedule } from '@reportify/services/api/combo';

const { Title, Text } = Typography;

type TActiveSchedule = {
  value: number
  label: string
  day: string
  time: string
  class_name: string
  subject_name: string
  room?: string
  id_teaching_assignment: number
  id_class: number
}

const TeacherDashboard = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [activeSchedule, setActiveSchedule] = useState<TActiveSchedule | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    const fetchActiveSchedule = async () => {
      try {
        const data = await currentSchedule();
        if (data && Array.isArray(data) && data.length > 0) {
          setActiveSchedule(data[0] as TActiveSchedule);
        }
      } catch (error) {
        // No active schedule
      }
    };

    fetchActiveSchedule();
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Title level={2}>Dashboard Guru</Title>
      
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
          <Card title="Kelas Aktif Saat Ini">
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
    </div>
  );
};

export default TeacherDashboard;
