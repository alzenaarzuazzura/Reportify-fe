import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useStudentList } from './hooks/useStudentList';

const StudentList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { students, loading, deleteStudent } = useStudentList();

  const columns = [
    {
      title: intl.formatMessage({ id: 'student.nis' }),
      dataIndex: 'nis',
      key: 'nis',
    },
    {
      title: intl.formatMessage({ id: 'student.name' }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: intl.formatMessage({ id: 'student.class' }),
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: intl.formatMessage({ id: 'student.parentPhone' }),
      dataIndex: 'parentPhone',
      key: 'parentPhone',
    },
    {
      title: intl.formatMessage({ id: 'student.studentPhone' }),
      dataIndex: 'studentPhone',
      key: 'studentPhone',
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => navigate(`/students/${record.id}`)} />
          <Button icon={<EditOutlined />} onClick={() => navigate(`/students/${record.id}/edit`)} />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => deleteStudent(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.students' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/students/new')}>
          {intl.formatMessage({ id: 'common.add' })}
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={students} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default StudentList;
