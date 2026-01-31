import { Card, Row, Col, Button, Radio, DatePicker, Table, Statistic, Form } from 'antd';
import { SearchOutlined, ReloadOutlined, CalendarOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import CmbLevel from '@reportify/components/Combos/CmbLevel';
import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbStudent from '@reportify/components/Combos/CmbStudent';

import { TAttendanceByStudent, TAttendanceDetail } from '@reportify/types/data/report';
import { tableWidth } from '@reportify/constant/tableWidth';

import useAttendanceReport from './hooks/useAttendanceReport';

const { RangePicker } = DatePicker;

const AttendanceReport = () => {
  const {
    form,
    periodType,
    dateRange,
    selectedLevel,
    selectedClass,
    selectedStudent,
    data,
    isLoading,
    setPeriodType,
    setDateRange,
    setSelectedLevel,
    setSelectedClass,
    setSelectedStudent,
    handleGenerate,
    handleReset,
  } = useAttendanceReport();

  const summaryColumns: ColumnsType<TAttendanceByStudent> = [
    {
      title: 'No',
      width: tableWidth.no,
      align: 'center',
      fixed: 'left',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: ['student', 'nis'],
      key: 'nis',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'Nama Siswa',
      dataIndex: ['student', 'name'],
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Kelas',
      dataIndex: ['student', 'class'],
      key: 'class',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 80,
    },
    {
      title: 'Hadir',
      dataIndex: 'hadir',
      key: 'hadir',
      align: 'center',
      width: 80,
    },
    {
      title: 'Izin',
      dataIndex: 'izin',
      key: 'izin',
      align: 'center',
      width: 80,
    },
    {
      title: 'Sakit',
      dataIndex: 'sakit',
      key: 'sakit',
      align: 'center',
      width: 80,
    },
    {
      title: 'Alfa',
      dataIndex: 'alpha',
      key: 'alpha',
      align: 'center',
      width: 80,
      render: (alpha: number) => (
        <span style={{ color: alpha >= 3 ? '#f5222d' : 'inherit', fontWeight: alpha >= 3 ? 600 : 400 }}>
          {alpha}
        </span>
      ),
    },
    {
      title: 'Kehadiran',
      dataIndex: 'attendanceRate',
      key: 'attendanceRate',
      align: 'center',
      width: 100,
      render: (rate: string) => {
        const rateNum = parseFloat(rate);
        return (
          <span style={{ color: rateNum >= 75 ? '#52c41a' : '#f5222d', fontWeight: 600 }}>
            {rate}%
          </span>
        );
      },
    },
  ];

  const detailColumns: ColumnsType<TAttendanceDetail> = [
    {
      title: 'No',
      width: tableWidth.no,
      align: 'center',
      fixed: 'left',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Siswa',
      dataIndex: ['student', 'name'],
      key: 'studentName',
      ellipsis: true,
    },
    {
      title: 'Kelas',
      dataIndex: 'class',
      key: 'class',
      width: 120,
      ellipsis: true,
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: 'Guru',
      dataIndex: 'teacher',
      key: 'teacher',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 100,
      render: (status: string) => {
        const colors: Record<string, string> = {
          hadir: '#52c41a',
          izin: '#1890ff',
          alfa: '#f5222d',
        };
        const labels: Record<string, string> = {
          hadir: 'Hadir',
          izin: 'Izin',
          alfa: 'Alfa',
        };
        return (
          <span style={{ color: colors[status] || '#000', fontWeight: 600 }}>
            {labels[status] || status}
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
      {/* Filter Section */}
      <Card style={{ marginBottom: 24, borderRadius: '12px' }}>
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            {/* Period Type */}
            <Col xs={24}>
              <Form.Item label={<><CalendarOutlined /> Periode Laporan</>}>
                <Radio.Group value={periodType} onChange={(e) => setPeriodType(e.target.value)} buttonStyle="solid">
                  <Radio.Button value="daily">Harian</Radio.Button>
                  <Radio.Button value="weekly">Mingguan</Radio.Button>
                  <Radio.Button value="monthly">Bulanan</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* Date Range */}
            <Col xs={24} md={8}>
              <Form.Item label="Rentang Tanggal">
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                  format="DD/MM/YYYY"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>

            {/* Level Filter */}
            <Col xs={24} md={5}>
              <Form.Item label="Tingkat (Opsional)" name="level">
                <CmbLevel
                  value={selectedLevel}
                  onChange={(value) => {
                    setSelectedLevel(value);
                    setSelectedClass(undefined);
                    setSelectedStudent(undefined);
                  }}
                  allowClear
                />
              </Form.Item>
            </Col>

            {/* Class Filter */}
            <Col xs={24} md={5}>
              <Form.Item label="Kelas (Opsional)" name="class">
                <CmbClass
                  value={selectedClass}
                  onChange={(value) => {
                    setSelectedClass(value);
                    setSelectedStudent(undefined);
                  }}
                  allowClear
                />
              </Form.Item>
            </Col>

            {/* Student Filter */}
            <Col xs={24} md={6}>
              <Form.Item label="Siswa (Opsional)" name="student">
                <CmbStudent value={selectedStudent} onChange={setSelectedStudent} allowClear />
              </Form.Item>
            </Col>
          </Row>

          {/* Action Buttons */}
          <Row gutter={16}>
            <Col>
              <Button type="primary" icon={<SearchOutlined />} onClick={handleGenerate} loading={isLoading}>
                Generate Laporan
              </Button>
            </Col>
            <Col>
              <Button icon={<ReloadOutlined />} onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Statistics Cards */}
      {data?.data && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic title="Total" value={data.data.statistics.total} valueStyle={{ color: '#1890ff' }} />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic title="Hadir" value={data.data.statistics.hadir} valueStyle={{ color: '#52c41a' }} />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic title="Izin" value={data.data.statistics.izin} valueStyle={{ color: '#1890ff' }} />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic title="Sakit" value={data.data.statistics.sakit} valueStyle={{ color: '#faad14' }} />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic title="Alfa" value={data.data.statistics.alpha} valueStyle={{ color: '#f5222d' }} />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={4}>
              <Card>
                <Statistic
                  title="Kehadiran"
                  value={data.data.statistics.attendanceRate}
                  suffix="%"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Summary Table */}
          {data.data.byStudent.length > 0 && (
            <Card title="Ringkasan Per Siswa" style={{ marginBottom: 24, borderRadius: '12px' }}>
              <Table
                columns={summaryColumns}
                dataSource={data.data.byStudent}
                rowKey={(record) => record.student.id}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
              />
            </Card>
          )}

          {/* Detail Table */}
          <Card title="Detail Kehadiran" style={{ borderRadius: '12px' }}>
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
