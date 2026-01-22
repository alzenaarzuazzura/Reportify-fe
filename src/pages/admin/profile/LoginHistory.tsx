import { Card, Table, Tag, Empty } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import { getLoginHistory } from '@reportify/services/api/profile';
import { TLoginHistory } from '@reportify/types/data/profile';

const LoginHistory = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery({
    queryKey: ['loginHistory', page, pageSize],
    queryFn: () => getLoginHistory({ page, limit: pageSize }),
  });

  const columns: ColumnsType<TLoginHistory> = [
    {
      title: 'No',
      key: 'no',
      width: 60,
      align: 'center',
      render: (_text, _record, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: 'Waktu Login',
      dataIndex: 'login_at',
      key: 'login_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
      render: (ip: string | null) => ip || '-',
    },
    {
      title: 'Device / Browser',
      dataIndex: 'user_agent',
      key: 'user_agent',
      ellipsis: true,
      render: (agent: string | null) => agent || '-',
    },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      render: () => <Tag color="success">Berhasil</Tag>,
    },
  ];

  const hasData = data?.data && data.data.length > 0;

  return (
    <Card style={{ borderRadius: '12px' }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 8 }}>Riwayat Login</h3>
        <p style={{ color: '#666', margin: 0 }}>
          Pantau aktivitas login akun Anda untuk memastikan keamanan
        </p>
      </div>

      {!hasData && !isLoading ? (
        <Empty
          description="Belum ada riwayat login"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ padding: '50px 0' }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: page,
            pageSize,
            total: data?.pagination?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} riwayat`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            },
          }}
          scroll={{ x: 'max-content' }}
        />
      )}

      <div style={{ 
        marginTop: 24, 
        padding: '16px', 
        background: '#fff7e6', 
        borderRadius: '8px',
        border: '1px solid #ffd591'
      }}>
        <h4 style={{ marginBottom: 8, color: '#fa8c16' }}>⚠️ Perhatian:</h4>
        <p style={{ margin: 0, color: '#666' }}>
          Jika Anda melihat aktivitas login yang mencurigakan atau tidak Anda kenali, 
          segera ubah password Anda dan hubungi administrator.
        </p>
      </div>
    </Card>
  );
};

export default LoginHistory;
