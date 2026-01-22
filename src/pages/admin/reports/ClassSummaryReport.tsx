import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';

import CmbClass from '@reportify/components/Combos/CmbClass';

import { getClassSummaryReport } from '@reportify/services/api/report';

const { RangePicker } = DatePicker;

const ClassSummaryReport = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['classSummaryReport', dateRange, selectedClass],
    queryFn: () => getClassSummaryReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass!
    }),
    enabled: shouldFetch && !!selectedClass
  });

  const handleGenerate = () => {
    if (!dateRange) {
      message.error('Pilih rentang tanggal terlebih dahulu');
      return;
    }
    if (!selectedClass) {
      message.error('Pilih kelas terlebih dahulu');
      return;
    }
    setShouldFetch(true);
    refetch();
  };

  return (
    <div>
      <Card style={{ marginBottom: 24, borderRadius: '12px' }}>
        <Row gutter={16}>
          <Col xs={24} md={10}>
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
          <Col xs={24} md={10}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Kelas *
            </label>
            <CmbClass
              value={selectedClass}
              onChange={(value) => setSelectedClass(value)}
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
      </Card>

      {data?.data && (
        <>
          <Card style={{ marginBottom: 24, borderRadius: '12px' }}>
            <h3>Informasi Kelas</h3>
            <p><strong>Kelas:</strong> {data.data.class.name}</p>
            <p><strong>Jumlah Siswa:</strong> {data.data.class.totalStudents}</p>
          </Card>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Total Jadwal"
                  value={data.data.statistics.totalSchedules}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Sudah Dilaporkan"
                  value={data.data.statistics.reportedSchedules}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Tingkat Pelaporan"
                  value={data.data.statistics.reportingRate}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          <Card title="Ringkasan Kehadiran Per Siswa" style={{ borderRadius: '12px' }}>
            <Table
              dataSource={data.data.studentSummary}
              rowKey={(record) => record.student.id}
              columns={[
                { title: 'NIS', dataIndex: ['student', 'nis'], key: 'nis' },
                { title: 'Nama', dataIndex: ['student', 'name'], key: 'name' },
                { title: 'Total', dataIndex: 'total', key: 'total', align: 'center' },
                { title: 'Hadir', dataIndex: 'hadir', key: 'hadir', align: 'center' },
                { title: 'Sakit', dataIndex: 'sakit', key: 'sakit', align: 'center' },
                { title: 'Izin', dataIndex: 'izin', key: 'izin', align: 'center' },
                { title: 'Alpha', dataIndex: 'alpha', key: 'alpha', align: 'center' },
                { 
                  title: 'Tingkat Kehadiran', 
                  dataIndex: 'attendanceRate', 
                  key: 'attendanceRate', 
                  align: 'center',
                  render: (rate: string) => `${rate}%`
                },
              ]}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default ClassSummaryReport;
