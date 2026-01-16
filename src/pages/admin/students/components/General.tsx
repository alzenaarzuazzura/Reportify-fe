import { Form, Input } from 'antd';
import { useIntl } from 'react-intl';
import { Student } from '@reportify/types';

interface GeneralProps {
  initialValues?: Partial<Student>;
}

const General = ({ initialValues }: GeneralProps) => {
  const intl = useIntl();

  return (
    <>
      <Form.Item
        name="nis"
        label={intl.formatMessage({ id: 'student.nis' })}
        rules={[{ required: true, message: 'NIS harus diisi' }]}
        initialValue={initialValues?.nis}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label={intl.formatMessage({ id: 'student.name' })}
        rules={[{ required: true, message: 'Nama harus diisi' }]}
        initialValue={initialValues?.name}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="class"
        label={intl.formatMessage({ id: 'student.class' })}
        rules={[{ required: true, message: 'Kelas harus diisi' }]}
        initialValue={initialValues?.class}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="parentPhone"
        label={intl.formatMessage({ id: 'student.parentPhone' })}
        rules={[{ required: true, message: 'No. Telp Orang Tua harus diisi' }]}
        initialValue={initialValues?.parentPhone}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="studentPhone"
        label={intl.formatMessage({ id: 'student.studentPhone' })}
        rules={[{ required: true, message: 'No. Telp Siswa harus diisi' }]}
        initialValue={initialValues?.studentPhone}
      >
        <Input />
      </Form.Item>
    </>
  );
};

export default General;
