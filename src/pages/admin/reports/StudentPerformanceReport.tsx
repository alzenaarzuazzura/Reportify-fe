import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';

import CmbStudent from '@reportify/components/Combos/CmbStudent';

import { getStudentPerformanceReport } from '@reportify/services/api/report';

const { RangePicker } = DatePicker;

const StudentPerformanceReport = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['studentPerformanceReport', dateRange, selectedStudent],
    queryFn: () => getStudentPerformanceReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_student: selectedStudent!
    }),
    enabled: shouldFetch && !!selectedStudent
  });

  const handleGenerate = () => {
    if (!dateRange) {
      message.error('Pilih rentang tanggal terlebih dahulu');
      return;
    }
    if (!selectedStudent) {
      message.error('Pilih siswa terlebih dahulu');
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
              Siswa *
            </label>
            <CmbStudent
              value={selectedStudent}
              onChange={(value) => setSelectedStudent(value)}
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
            <h3>Informasi Siswa</h3>
            <p><strong>Nama:</strong> {data.data.student.name}</p>
            <p><strong>NIS:</strong> {data.data.student.nis}</p>
            <p><strong>Kelas:</strong> {data.data.student.class}</p>
          </Card>

          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Total Kehadiran"
                  value={data.data.attendance.statistics.total}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Hadir"
                  value={data.data.attendance.statistics.hadir}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Tidak Hadir"
                  value={data.data.attendance.statistics.sakit + data.data.attendance.statistics.izin + data.data.attendance.statistics.alpha}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic
                  title="Tingkat Kehadiran"
                  value={data.data.attendance.statistics.attendanceRate}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          <Card title="Kehadiran Per Mata Pelajaran" style={{ borderRadius: '12px' }}>
            <Table
              dataSource={data.data.attendance.bySubject}
              rowKey={(record) => record.subject.id}
              columns={[
                { title: 'Mata Pelajaran', dataIndex: ['subject', 'name'], key: 'subject' },
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
              pagination={false}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default StudentPerformanceReport;
