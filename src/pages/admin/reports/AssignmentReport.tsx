import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, Space, message } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbSubject from '@reportify/components/Combos/CmbSubject';

import { getAssignmentReport } from '@reportify/services/api/report';
import { TAssignmentBySubject, TAssignmentDetail } from '@reportify/types/data/report';

const { RangePicker } = DatePicker;

const AssignmentReport = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedSubject, setSelectedSubject] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['assignmentReport', dateRange, selectedClass, selectedSubject],
    queryFn: () => getAssignmentReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass,
      id_subject: selectedSubject
    }),
    enabled: shouldFetch
  });

  const handleGenerate = () => {
    if (!dateRange) {
      message.error('Pilih rentang tanggal terlebih dahulu');
      return;
    }
    setShouldFetch(true);
    refetch();
  };

  const subjectColumns: ColumnsType<TAssignmentBySubject> = [
    {
      title: 'Mata Pelajaran',
      dataIndex: ['subject', 'name'],
      key: 'subject',
    },
    {
      title: 'Total Jadwal',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Ada Tugas',
      dataIndex: 'withAssignment',
      key: 'withAssignment',
      align: 'center',
    },
    {
      title: 'Tidak Ada Tugas',
      dataIndex: 'withoutAssignment',
      key: 'withoutAssignment',
      align: 'center',
    },
    {
      title: 'Tingkat Penyelesaian',
      dataIndex: 'completionRate',
      key: 'completionRate',
      align: 'center',
      render: (rate: string) => `${rate}%`,
    },
  ];

  const detailColumns: ColumnsType<TAssignmentDetail> = [
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Guru',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Status',
      dataIndex: 'hasAssignment',
      key: 'hasAssignment',
      align: 'center',
      render: (has: boolean) => (
        <span style={{ 
          color: has ? '#52c41a' : '#f5222d',
          fontWeight: 600
        }}>
          {has ? 'Ada Tugas' : 'Tidak Ada'}
        </span>
      ),
    },
    {
      title: 'Tugas',
      dataIndex: 'assignment',
      key: 'assignment',
      ellipsis: true,
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 24, borderRadius: '12px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Rentang Tanggal
              </label>
              <RangePicker
                value={dateRange}
                onChange={(dates) => dates && setDateRange(dates as [Dayjs, Dayjs])}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={6}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Kelas (Opsional)
              </label>
              <CmbClass
                value={selectedClass}
                onChange={(value) => setSelectedClass(value)}
                allowClear
              />
            </Col>
            <Col xs={24} md={6}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Mata Pelajaran (Opsional)
              </label>
              <CmbSubject
                value={selectedSubject}
                onChange={(value) => setSelectedSubject(value)}
                allowClear
              />
            </Col>
            <Col xs={24} md={4}>
              <label style={{ display: 'block', marginBottom: 8, opacity: 0 }}>Action</label>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleGenerate}
                loading={isLoading}
                block
              >
                Generate
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      {data?.data && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Jadwal"
                  value={data.data.statistics.total}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Ada Tugas"
                  value={data.data.statistics.withAssignment}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Tingkat Penyelesaian"
                  value={data.data.statistics.completionRate}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          {data.data.bySubject.length > 0 && (
            <Card 
              title="Ringkasan Per Mata Pelajaran" 
              style={{ marginBottom: 24, borderRadius: '12px' }}
              extra={
                <Button icon={<DownloadOutlined />}>
                  Export
                </Button>
              }
            >
              <Table
                columns={subjectColumns}
                dataSource={data.data.bySubject}
                rowKey={(record) => record.subject.id}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          )}

          <Card 
            title="Detail Tugas" 
            style={{ borderRadius: '12px' }}
            extra={
              <Button icon={<DownloadOutlined />}>
                Export
              </Button>
            }
          >
            <Table
              columns={detailColumns}
              dataSource={data.data.details}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default AssignmentReport;
