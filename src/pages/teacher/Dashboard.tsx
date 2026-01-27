import { Card, Row, Col, Typography, Tag, Button, message, Modal } from 'antd';
import { ClockCircleOutlined, BookOutlined, HomeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { currentSchedule } from '@reportify/services/api/combo';
import { sendReportToParents } from '@reportify/services/api/attendance';

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
  const [sending, setSending] = useState(false);

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

  const handleSendReport = async () => {
    if (!activeSchedule) {
      message.warning('Tidak ada kelas aktif saat ini');
      return;
    }

    Modal.confirm({
      title: 'Kirim Laporan ke Wali Murid',
      content: `Apakah Anda yakin ingin mengirim laporan kegiatan belajar hari ini untuk kelas ${activeSchedule.class_name} - ${activeSchedule.subject_name} ke semua wali murid?`,
      okText: 'Ya, Kirim',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          setSending(true);
          const today = dayjs().format('YYYY-MM-DD');
          const result = await sendReportToParents(activeSchedule.value, today);

          if (result.status) {
            Modal.success({
              title: 'Laporan Berhasil Dikirim',
              content: (
                <div>
                  <p>Total siswa: {result.summary.total}</p>
                  <p style={{ color: '#52c41a' }}>✓ Berhasil dikirim: {result.summary.sent}</p>
                  {result.summary.failed > 0 && (
                    <p style={{ color: '#ff4d4f' }}>✗ Gagal dikirim: {result.summary.failed}</p>
                  )}
                </div>
              ),
            });
          } else {
            message.error('Gagal mengirim laporan');
          }
        } catch (error: any) {
          message.error(error?.response?.data?.message || 'Gagal mengirim laporan ke wali murid');
        } finally {
          setSending(false);
        }
      },
    });
  };

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
    </div>
  );
};

export default TeacherDashboard;
