import { Card, Table, Button, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAttendanceList } from './hooks/useAttendanceList';

const AttendanceList = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { attendances, loading } = useAttendanceList();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'green';
      case 'permission': return 'orange';
      case 'absent': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: intl.formatMessage({ id: 'student.name' }),
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {intl.formatMessage({ id: `attendance.${status}` })}
        </Tag>
      ),
    },
  ];

  return (
    <Card 
      title={intl.formatMessage({ id: 'menu.attendance' })}
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/attendance/new')}>
          Input Absensi
        </Button>
      }
    >
      <Table 
        columns={columns} 
        dataSource={attendances} 
        loading={loading}
        rowKey="id"
      />
    </Card>
  );
};

export default AttendanceList;
