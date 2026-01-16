import { Card, Form, Select, Button, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useEffect, useState } from 'react';
import api from '@reportify/services/api';
import { TeacherAssignment, Teacher, Class, Subject } from '@reportify/types';

const AssignmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<Teacher[]>('/teachers'),
      api.get<Class[]>('/classes'),
      api.get<Subject[]>('/subjects'),
    ]).then(([teachersRes, classesRes, subjectsRes]) => {
      setTeachers(teachersRes.data);
      setClasses(classesRes.data);
      setSubjects(subjectsRes.data);
    });

    if (id) {
      setLoading(true);
      api.get<TeacherAssignment>(`/assignments/${id}`)
        .then(res => form.setFieldsValue(res.data))
        .finally(() => setLoading(false));
    }
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      if (id) {
        await api.put(`/assignments/${id}`, values);
        message.success('Data penugasan guru berhasil diperbarui');
      } else {
        await api.post('/assignments', values);
        message.success('Data penugasan guru berhasil ditambahkan');
      }
      navigate('/assignments');
    } catch (error) {
      message.error('Gagal menyimpan data penugasan guru');
    }
  };

  return (
    <Card 
      title={id ? intl.formatMessage({ id: 'common.edit' }) : intl.formatMessage({ id: 'common.add' })}
      loading={loading}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="teacherId"
          label={intl.formatMessage({ id: 'assignment.teacher' })}
          rules={[{ required: true, message: 'Guru harus dipilih' }]}
        >
          <Select>
            {teachers.map(t => (
              <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>
            ))}
          </Select>
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
          name="subjectId"
          label={intl.formatMessage({ id: 'assignment.subject' })}
          rules={[{ required: true, message: 'Mata pelajaran harus dipilih' }]}
        >
          <Select>
            {subjects.map(s => (
              <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {intl.formatMessage({ id: 'common.save' })}
            </Button>
            <Button onClick={() => navigate('/assignments')}>
              {intl.formatMessage({ id: 'common.cancel' })}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AssignmentForm;
