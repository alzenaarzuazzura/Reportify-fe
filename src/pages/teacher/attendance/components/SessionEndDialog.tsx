import { Modal, Button, Spin, Alert, Descriptions, Tag, List, Typography } from 'antd';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClassSessionSummary, sendReportToParents } from '@reportify/services/api/attendance';
import { useQuery, useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

type SessionEndDialogProps = {
  visible: boolean;
  onClose: () => void;
  scheduleId: number;
  date: string;
};

const SessionEndDialog = ({ visible, onClose, scheduleId, date }: SessionEndDialogProps) => {
  const navigate = useNavigate();
  const [reportSent, setReportSent] = useState(false);

  // Fetch session summary
  const { data: summary, isLoading } = useQuery({
    queryKey: ['sessionSummary', scheduleId, date],
    queryFn: () => getClassSessionSummary(scheduleId, date),
    enabled: visible && !!scheduleId && !!date,
  });

  // Send report mutation
  const sendReportMutation = useMutation({
    mutationFn: () => sendReportToParents(scheduleId, date),
    onSuccess: () => {
      setReportSent(true);
    },
  });

  const handleSendReport = () => {
    sendReportMutation.mutate();
  };

  const handleGoToSchedule = () => {
    navigate('/teacher');
    onClose();
  };

  if (isLoading) {
    return (
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        width={600}
        centered
      >
        <div className="text-center py-5">
          <Spin size="large" />
          <p className="mt-3">Memuat ringkasan sesi...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      closable={!sendReportMutation.isPending}
    >
      <div className="py-3">
        <div className="text-center mb-4">
          <Icon icon="mdi:clock-check-outline" width={64} height={64} className="text-warning" />
          <Title level={4} className="mt-3 mb-1">
            Waktu Mengajar Selesai
          </Title>
          <Text type="secondary">
            Sesi pembelajaran di kelas ini telah berakhir
          </Text>
        </div>

        {summary && (
          <>
            <Descriptions bordered size="small" column={1} className="mb-3">
              <Descriptions.Item label="Tanggal">
                {dayjs(summary.date).format('dddd, DD MMMM YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Mata Pelajaran">
                {summary.schedule.subject}
              </Descriptions.Item>
              <Descriptions.Item label="Kelas">
                {summary.schedule.class}
              </Descriptions.Item>
              <Descriptions.Item label="Waktu">
                {summary.schedule.start_time} - {summary.schedule.end_time}
              </Descriptions.Item>
            </Descriptions>

            <div className="mb-3">
              <Text strong>Ringkasan Kehadiran:</Text>
              <div className="mt-2 d-flex gap-2">
                <Tag color="success">
                  <Icon icon="mdi:check-circle" className="me-1" />
                  Hadir: {summary.attendance.present}
                </Tag>
                <Tag color="warning">
                  <Icon icon="mdi:file-document" className="me-1" />
                  Izin: {summary.attendance.permit}
                </Tag>
                <Tag color="error">
                  <Icon icon="mdi:close-circle" className="me-1" />
                  Alfa: {summary.attendance.absent}
                </Tag>
              </div>
            </div>

            {summary.assignments && summary.assignments.length > 0 && (
              <div className="mb-3">
                <Text strong>Tugas yang Diberikan:</Text>
                <List
                  size="small"
                  bordered
                  dataSource={summary.assignments}
                  renderItem={(item: any) => (
                    <List.Item>
                      <div>
                        <Text>{item.assignment_title}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Deadline: {dayjs(item.deadline).format('DD/MM/YYYY')}
                        </Text>
                      </div>
                    </List.Item>
                  )}
                  className="mt-2"
                />
              </div>
            )}

            {summary.announcements && summary.announcements.length > 0 && (
              <div className="mb-3">
                <Text strong>Pengumuman:</Text>
                <List
                  size="small"
                  bordered
                  dataSource={summary.announcements}
                  renderItem={(item: any) => (
                    <List.Item>
                      <Text>{item.title}</Text>
                    </List.Item>
                  )}
                  className="mt-2"
                />
              </div>
            )}

            {!reportSent && !sendReportMutation.isSuccess && (
              <Alert
                message="Kirim Laporan ke Wali Murid"
                description="Kirim ringkasan kegiatan pembelajaran hari ini ke semua wali murid melalui WhatsApp?"
                type="info"
                showIcon
                className="mb-3"
              />
            )}

            {sendReportMutation.isSuccess && (
              <Alert
                message="Laporan Berhasil Dikirim"
                description={
                  <div>
                    <p className="mb-1">
                      Laporan telah dikirim ke {sendReportMutation.data?.summary.sent} dari{' '}
                      {sendReportMutation.data?.summary.total} wali murid.
                    </p>
                    {sendReportMutation.data?.summary.failed > 0 && (
                      <p className="mb-0 text-warning">
                        {sendReportMutation.data?.summary.failed} pesan gagal dikirim.
                      </p>
                    )}
                  </div>
                }
                type="success"
                showIcon
                className="mb-3"
              />
            )}

            {sendReportMutation.isError && (
              <Alert
                message="Gagal Mengirim Laporan"
                description="Terjadi kesalahan saat mengirim laporan. Silakan coba lagi."
                type="error"
                showIcon
                className="mb-3"
              />
            )}
          </>
        )}

        <div className="d-flex justify-content-end gap-2">
          {!reportSent && !sendReportMutation.isSuccess && (
            <>
              <Button onClick={onClose} disabled={sendReportMutation.isPending}>
                Tutup
              </Button>
              <Button
                type="primary"
                icon={<Icon icon="mdi:whatsapp" />}
                onClick={handleSendReport}
                loading={sendReportMutation.isPending}
              >
                Kirim Laporan
              </Button>
            </>
          )}

          {(reportSent || sendReportMutation.isSuccess) && (
            <>
              <Button onClick={onClose}>
                Tutup
              </Button>
              <Button type="primary" icon={<Icon icon="mdi:calendar" />} onClick={handleGoToSchedule}>
                Lihat Jadwal Lain
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SessionEndDialog;
