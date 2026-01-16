import { Card, Table, Button, Space, Popconfirm, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useTaskList } from './hooks/useTaskList';

const TaskList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { tasks, loading, deleteTask, toggleComplete } = useTaskList();

  const columns = [
    {
      title: intl.formatMessage({ id: 'task.title' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: intl.formatMessage({ id: 'task.description' }),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: intl.formatMessage({ id: 'task.deadline' }),
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: intl.formatMessage({ id: 'task.completed' }),
      key: 'completed',
      render: (_: any, record: any) => (
        <Checkbox 
          checked={record.completed} 
          onChange={() => toggleComplete(record.id, !record.completed)}
        />
      ),
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/tasks/${record.id}/edit`)} />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => deleteTask(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.tasks' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/tasks/new')}>
          {intl.formatMessage({ id: 'common.add' })}
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={tasks} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default TaskList;
