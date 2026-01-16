import { Card, Descriptions, Button, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useStudentView } from './hooks/useStudentView';

const StudentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intl = useIntl();
  const { student, loading } = useStudentView(id || '');

  return (
    <Card 
      title={intl.formatMessage({ id: 'common.detail' })}
      loading={loading}
      extra={
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/students/${id}/edit`)}>
            {intl.formatMessage({ id: 'common.edit' })}
          </Button>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/students')}>
            {intl.formatMessage({ id: 'common.back' })}
          </Button>
        </Space>
      }
    >
      {student && (
        <Descriptions bordered column={1}>
          <Descriptions.Item label={intl.formatMessage({ id: 'student.nis' })}>
            {student.nis}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'student.name' })}>
            {student.name}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'student.class' })}>
            {student.class}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'student.parentPhone' })}>
            {student.parentPhone}
          </Descriptions.Item>
          <Descriptions.Item label={intl.formatMessage({ id: 'student.studentPhone' })}>
            {student.studentPhone}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default StudentView;
