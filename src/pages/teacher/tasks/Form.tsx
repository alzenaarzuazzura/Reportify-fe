import { Card, Form, Input, DatePicker, Select, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import api from '@reportify/services/api';
import { Task, Class } from '@reportify/types';

const TaskForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    api.get<Class[]>('/classes/my').then(res => {
      setClasses(res.data);
    });

    if (id) {
      setLoading(true);
      api.get<Task>(`/tasks/${id}`)
        .then(res => {
          const data = {
            ...res.data,
            deadline: dayjs(res.data.deadline),
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
        deadline: values.deadline.format('YYYY-MM-DD'),
      };
      
      if (id) {
        await api.put(`/tasks/${id}`, data);
        message.success('Data tugas berhasil diperbarui');
      } else {
        await api.post('/tasks', data);
        message.success('Data tugas berhasil ditambahkan');
      }
      navigate('/tasks');
    } catch (error) {
      message.error('Gagal menyimpan data tugas');
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
          label={intl.formatMessage({ id: 'task.title' })}
          rules={[{ required: true, message: 'Judul tugas harus diisi' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label={intl.formatMessage({ id: 'task.description' })}
          rules={[{ required: true, message: 'Deskripsi harus diisi' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="classId"
          label={intl.formatMessage({ id: 'assignment.class' })}
          rules={[{ required: true, message: 'Kelas harus dipilih' }]}
        >
          <Select>
            {classes.map(c => (
              <Select.Option key={c.id} value={c.id}>{`${c.level} ${c.major} ${c.group}`}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="deadline"
          label={intl.formatMessage({ id: 'task.deadline' })}
          rules={[{ required: true, message: 'Tenggat waktu harus diisi' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'common.save' })}
            </Button>
            <Button onClick={() => navigate('/tasks')}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
