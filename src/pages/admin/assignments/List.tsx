import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAssignmentList } from './hooks/useAssignmentList';

const AssignmentList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { assignments, loading, deleteAssignment } = useAssignmentList();

  const columns = [
    {
      title: intl.formatMessage({ id: 'assignment.teacher' }),
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: intl.formatMessage({ id: 'assignment.class' }),
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: intl.formatMessage({ id: 'assignment.subject' }),
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/assignments/${record.id}/edit`)} />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => deleteAssignment(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.assignments' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/assignments/new')}>
          {intl.formatMessage({ id: 'common.add' })}
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={assignments} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default AssignmentList;
