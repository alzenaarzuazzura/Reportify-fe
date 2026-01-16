import { Card, Form, Select, DatePicker, Button, Space, message, Table, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useState, useEffect } from 'react';
import api from '@reportify/services/api';
import { Schedule, Student } from '@reportify/types';

const AttendanceForm = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>({});

  useEffect(() => {
    api.get<Schedule[]>('/schedules/my').then(res => {
      setSchedules(res.data);
    });
  }, []);

  const handleScheduleChange = async (scheduleId: string) => {
    try {
      const response = await api.get<Student[]>(`/schedules/${scheduleId}/students`);
      setStudents(response.data);
      const initialData: Record<string, string> = {};
      response.data.forEach(student => {
        initialData[student.id] = 'present';
      });
      setAttendanceData(initialData);
    } catch (error) {
      message.error('Gagal memuat data siswa');
    }
  };

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({ ...prev, [studentId]: status }));
  };

  const onFinish = async (values: any) => {
    try {
      const data = {
        scheduleId: values.scheduleId,
        date: values.date.format('YYYY-MM-DD'),
        attendances: Object.entries(attendanceData).map(([studentId, status]) => ({
          studentId,
          status,
        })),
      };
      await api.post('/attendance', data);
      message.success('Data absensi berhasil disimpan');
      navigate('/attendance');
    } catch (error) {
      message.error('Gagal menyimpan data absensi');
    }
  };

  const columns = [
    {
      title: intl.formatMessage({ id: 'student.name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: Student) => (
        <Radio.Group
          value={attendanceData[record.id]}
          onChange={(e) => handleStatusChange(record.id, e.target.value)}
        >
          <Radio.Button value="present">{intl.formatMessage({ id: 'attendance.present' })}</Radio.Button>
          <Radio.Button value="permission">{intl.formatMessage({ id: 'attendance.permission' })}</Radio.Button>
          <Radio.Button value="absent">{intl.formatMessage({ id: 'attendance.absent' })}</Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  return (
    <Card title="Input Absensi">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="scheduleId"
          label={intl.formatMessage({ id: 'schedule.assignment' })}
          rules={[{ required: true, message: 'Jadwal harus dipilih' }]}
        >
          <Select onChange={handleScheduleChange}>
            {schedules.map(s => (
              <Select.Option key={s.id} value={s.id}>
                {`${s.className} - ${s.subjectName} (${s.day} ${s.startTime}-${s.endTime})`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Tanggal"
          rules={[{ required: true, message: 'Tanggal harus diisi' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        {students.length > 0 && (
          <>
            <Table 
              columns={columns} 
              dataSource={students} 
              rowKey="id"
              pagination={false}
              style={{ marginBottom: 16 }}
            />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {intl.formatMessage({ id: 'common.save' })}
                </Button>
                <Button onClick={() => navigate('/attendance')}>
                  {intl.formatMessage({ id: 'common.cancel' })}
                </Button>
              </Space>
            </Form.Item>
          </>
        )}
      </Form>
    </Card>
  );
};

export default AttendanceForm;
