import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAnnouncementList } from './hooks/useAnnouncementList';

const AnnouncementList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { announcements, loading, deleteAnnouncement } = useAnnouncementList();

  const columns = [
    {
      title: intl.formatMessage({ id: 'announcement.title' }),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: intl.formatMessage({ id: 'announcement.content' }),
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: intl.formatMessage({ id: 'announcement.date' }),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: intl.formatMessage({ id: 'common.actions' }),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/announcements/${record.id}/edit`)} />
          <Popconfirm
            title={intl.formatMessage({ id: 'common.confirmDelete' })}
            onConfirm={() => deleteAnnouncement(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.announcements' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/announcements/new')}>
          {intl.formatMessage({ id: 'common.add' })}
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={announcements} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default AnnouncementList;
