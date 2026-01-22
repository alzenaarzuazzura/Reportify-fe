import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, Space, message } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbStudent from '@reportify/components/Combos/CmbStudent';

import { getAttendanceReport } from '@reportify/services/api/report';
import { TAttendanceByStudent, TAttendanceDetail } from '@reportify/types/data/report';

const { RangePicker } = DatePicker;

const AttendanceReport = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['attendanceReport', dateRange, selectedClass, selectedStudent],
    queryFn: () => getAttendanceReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass,
      id_student: selectedStudent
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

  const handleExport = () => {
    message.info('Fitur export akan segera tersedia');
  };

  const studentColumns: ColumnsType<TAttendanceByStudent> = [
    {
      title: 'NIS',
      dataIndex: ['student', 'nis'],
      key: 'nis',
    },
    {
      title: 'Nama Siswa',
      dataIndex: ['student', 'name'],
      key: 'name',
    },
    {
      title: 'Kelas',
      dataIndex: ['student', 'class'],
      key: 'class',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
    },
    {
      title: 'Hadir',
      dataIndex: 'hadir',
      key: 'hadir',
      align: 'center',
    },
    {
      title: 'Sakit',
      dataIndex: 'sakit',
      key: 'sakit',
      align: 'center',
    },
    {
      title: 'Izin',
      dataIndex: 'izin',
      key: 'izin',
      align: 'center',
    },
    {
      title: 'Alpha',
      dataIndex: 'alpha',
      key: 'alpha',
      align: 'center',
    },
    {
      title: 'Tingkat Kehadiran',
      dataIndex: 'attendanceRate',
      key: 'attendanceRate',
      align: 'center',
      render: (rate: string) => `${rate}%`,
    },
  ];

  const detailColumns: ColumnsType<TAttendanceDetail> = [
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Siswa',
      dataIndex: ['student', 'name'],
      key: 'studentName',
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Guru',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => {
        const colors: Record<string, string> = {
          Hadir: '#52c41a',
          Sakit: '#faad14',
          Izin: '#1890ff',
          Alpha: '#f5222d'
        };
        return (
          <span style={{ 
            color: colors[status] || '#000',
            fontWeight: 600
          }}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'Catatan',
      dataIndex: 'notes',
      key: 'notes',
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
                Siswa (Opsional)
              </label>
              <CmbStudent
                value={selectedStudent}
                onChange={(value) => setSelectedStudent(value)}
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
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Total Kehadiran"
                  value={data.data.statistics.total}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Hadir"
                  value={data.data.statistics.hadir}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Sakit"
                  value={data.data.statistics.sakit}
                  valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Izin"
                  value={data.data.statistics.izin}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Alpha"
                  value={data.data.statistics.alpha}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Tingkat Kehadiran"
                  value={data.data.statistics.attendanceRate}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          {data.data.byStudent.length > 0 && (
            <Card 
              title="Ringkasan Per Siswa" 
              style={{ marginBottom: 24, borderRadius: '12px' }}
              extra={
                <Button icon={<DownloadOutlined />} onClick={handleExport}>
                  Export
                </Button>
              }
            >
              <Table
                columns={studentColumns}
                dataSource={data.data.byStudent}
                rowKey={(record) => record.student.id}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
              />
            </Card>
          )}

          <Card 
            title="Detail Kehadiran" 
            style={{ borderRadius: '12px' }}
            extra={
              <Button icon={<DownloadOutlined />} onClick={handleExport}>
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

export default AttendanceReport;
