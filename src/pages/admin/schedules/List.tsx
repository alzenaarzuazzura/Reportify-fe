import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useScheduleList } from './hooks/useScheduleList';

const ScheduleList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { schedules, loading, deleteSchedule } = useScheduleList();

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
      title: intl.formatMessage({ id: 'schedule.day' }),
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: intl.formatMessage({ id: 'schedule.startTime' }),
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: intl.formatMessage({ id: 'schedule.endTime' }),
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/schedules/${record.id}/edit`)} />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => deleteSchedule(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.schedules' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/schedules/new')}>
          {intl.formatMessage({ id: 'common.add' })}
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={schedules} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default ScheduleList;
