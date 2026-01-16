import { Card, Form, Select, TimePicker, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '@reportify/services/api';
import { Schedule, TeacherAssignment } from '@reportify/types';

const ScheduleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  useEffect(() => {
    api.get<TeacherAssignment[]>('/assignments').then(res => {
      setAssignments(res.data);
    });

    if (id) {
      setLoading(true);
      api.get<Schedule>(`/schedules/${id}`)
        .then(res => {
          const data = {
            ...res.data,
            startTime: dayjs(res.data.startTime, 'HH:mm'),
            endTime: dayjs(res.data.endTime, 'HH:mm'),
          };
          form.setFieldsValue(data);
        })
        .finally(() => setLoading(false));
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      const data = {
        ...values,
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
      };
      
      if (id) {
        await api.put(`/schedules/${id}`, data);
        message.success('Data jadwal berhasil diperbarui');
      } else {
        await api.post('/schedules', data);
        message.success('Data jadwal berhasil ditambahkan');
      }
      navigate('/schedules');
    } catch (error) {
      message.error('Gagal menyimpan data jadwal');
    }
  };

  return (
    <Card 
      title={id ? intl.formatMessage({ id: 'common.edit' }) : intl.formatMessage({ id: 'common.add' })}
      loading={loading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="assignmentId"
          label={intl.formatMessage({ id: 'schedule.assignment' })}
          rules={[{ required: true, message: 'Penugasan guru harus dipilih' }]}
        >
          <Select>
            {assignments.map(a => (
              <Select.Option key={a.id} value={a.id}>
                {`${a.teacherName} - ${a.className} - ${a.subjectName}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="day"
          label={intl.formatMessage({ id: 'schedule.day' })}
          rules={[{ required: true, message: 'Hari harus dipilih' }]}
        >
          <Select>
            {days.map(day => (
              <Select.Option key={day} value={day}>{day}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="startTime"
          label={intl.formatMessage({ id: 'schedule.startTime' })}
          rules={[{ required: true, message: 'Waktu mulai harus diisi' }]}
        >
          <TimePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="endTime"
          label={intl.formatMessage({ id: 'schedule.endTime' })}
          rules={[{ required: true, message: 'Waktu selesai harus diisi' }]}
        >
          <TimePicker format="HH:mm" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'common.save' })}
            </Button>
            <Button onClick={() => navigate('/schedules')}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ScheduleForm;
