import { Card, Form, Input, DatePicker, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '@reportify/services/api';
import { Announcement } from '@reportify/types';

const AnnouncementForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get<Announcement>(`/announcements/${id}`)
        .then(res => {
          const data = {
            ...res.data,
            date: dayjs(res.data.date),
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
        date: values.date.format('YYYY-MM-DD'),
      };
      
      if (id) {
        await api.put(`/announcements/${id}`, data);
        message.success('Data pengumuman berhasil diperbarui');
      } else {
        await api.post('/announcements', data);
        message.success('Data pengumuman berhasil ditambahkan');
      }
      navigate('/announcements');
    } catch (error) {
      message.error('Gagal menyimpan data pengumuman');
    }
  };

  return (
    <Card 
      title={id ? intl.formatMessage({ id: 'common.edit' }) : intl.formatMessage({ id: 'common.add' })}
      loading={loading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label={intl.formatMessage({ id: 'announcement.title' })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label={intl.formatMessage({ id: 'announcement.content' })}
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          name="date"
          label={intl.formatMessage({ id: 'announcement.date' })}
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'common.save' })}
            </Button>
            <Button onClick={() => navigate('/announcements')}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AnnouncementForm;
