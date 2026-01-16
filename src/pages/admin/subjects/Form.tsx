import { Card, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import api from '@reportify/services/api';
import { Subject } from '@reportify/types';

const SubjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get<Subject>(`/subjects/${id}`)
        .then(res => form.setFieldsValue(res.data))
        .finally(() => setLoading(false));
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      if (id) {
        await api.put(`/subjects/${id}`, values);
        message.success('Data mata pelajaran berhasil diperbarui');
      } else {
        await api.post('/subjects', values);
        message.success('Data mata pelajaran berhasil ditambahkan');
      }
      navigate('/subjects');
    } catch (error) {
      message.error('Gagal menyimpan data mata pelajaran');
    }
  };

  return (
    <Card 
      title={id ? intl.formatMessage({ id: 'common.edit' }) : intl.formatMessage({ id: 'common.add' })}
      loading={loading}
  >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label={intl.formatMessage({ id: 'subject.name' })}
          rules={[{ required: true, message: 'Nama mata pelajaran harus diisi' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SubjectForm;
