import { Card, Form, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect } from 'react';
import api from '@reportify/services/api';
import General from './components/General';
import { useStudentView } from './hooks/useStudentView';

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const { student, loading } = useStudentView(id || '');

  useEffect(() => {
    if (student) {
      form.setFieldsValue(student);
    }
  }, [student, form]);

  const onFinish = async (values: any) => {
    try {
      if (id) {
        await api.put(`/students/${id}`, values);
        message.success('Data siswa berhasil diperbarui');
      } else {
        await api.post('/students', values);
        message.success('Data siswa berhasil ditambahkan');
      }
      navigate('/students');
    } catch (error) {
      message.error('Gagal menyimpan data siswa');
    }
  };

  return (
    <Card 
      title={id ? intl.formatMessage({ id: 'common.edit' }) : intl.formatMessage({ id: 'common.add' })}
      loading={loading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <General initialValues={student || undefined} />
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'common.save' })}
            </Button>
            <Button onClick={() => navigate('/students')}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default StudentForm;
