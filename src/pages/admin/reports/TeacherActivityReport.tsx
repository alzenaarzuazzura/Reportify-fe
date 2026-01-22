import { useState } from 'react';
import { Card, DatePicker, Button, Table, Statistic, Row, Col, Space, message, Tag } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { ColumnsType } from 'antd/es/table';

import CmbTeacher from '@reportify/components/Combos/CmbTeacher';

import { getTeacherActivityReport } from '@reportify/services/api/report';
import { TTeacherActivityByTeacher } from '@reportify/types/data/report';

const { RangePicker } = DatePicker;

const TeacherActivityReport = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('month'),
    dayjs().endOf('month')
  ]);
  const [selectedTeacher, setSelectedTeacher] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['teacherActivityReport', dateRange, selectedTeacher],
    queryFn: () => getTeacherActivityReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_teacher: selectedTeacher
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

  const teacherColumns: ColumnsType<TTeacherActivityByTeacher> = [
    {
      title: 'Nama Guru',
      dataIndex: ['teacher', 'name'],
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: ['teacher', 'email'],
      key: 'email',
    },
    {
      title: 'Total Jadwal',
      dataIndex: 'totalSchedules',
      key: 'totalSchedules',
      align: 'center',
    },
    {
      title: 'Sudah Dilaporkan',
      dataIndex: 'reportedSchedules',
      key: 'reportedSchedules',
      align: 'center',
    },
    {
      title: 'Laporan Kehadiran',
      dataIndex: 'attendanceReports',
      key: 'attendanceReports',
      align: 'center',
    },
    {
      title: 'Laporan Tugas',
      dataIndex: 'assignmentReports',
      key: 'assignmentReports',
      align: 'center',
    },
    {
      title: 'Tingkat Pelaporan',
      dataIndex: 'reportingRate',
      key: 'reportingRate',
      align: 'center',
      render: (rate: string) => `${rate}%`,
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'subjects',
      key: 'subjects',
      render: (subjects: string[]) => (
        <>
          {subjects.map((subject, idx) => (
            <Tag key={idx} color="blue">{subject}</Tag>
          ))}
        </>
      ),
    },
  ];

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
              Guru (Opsional)
            </label>
            <CmbTeacher
              value={selectedTeacher}
              onChange={(value) => setSelectedTeacher(value)}
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
      </Card>

      {data?.data && (
        <>
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

          <Card 
            title="Aktivitas Per Guru" 
            style={{ borderRadius: '12px' }}
            extra={
              <Button icon={<DownloadOutlined />}>
                Export
              </Button>
            }
          >
            <Table
              columns={teacherColumns}
              dataSource={data.data.byTeacher}
              rowKey={(record) => record.teacher.id}
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default TeacherActivityReport;
