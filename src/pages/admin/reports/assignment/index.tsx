import { Card, Row, Col, Button, Radio, DatePicker, Table, Statistic, Form, Tag } from 'antd';
import { SearchOutlined, ReloadOutlined, CalendarOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import CmbLevel from '@reportify/components/Combos/CmbLevel';
import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbSubject from '@reportify/components/Combos/CmbSubject';

import { TAssignmentBySubject, TAssignmentDetail } from '@reportify/types/data/report';
import { tableWidth } from '@reportify/constant/tableWidth';

import useAssignmentReport from './hooks/useAssignmentReport';

const { RangePicker } = DatePicker;

const AssignmentReport = () => {
  const {
    form,
    periodType,
    dateRange,
    selectedLevel,
    selectedClass,
    selectedSubject,
    data,
    isLoading,
    setPeriodType,
    setDateRange,
    setSelectedLevel,
    setSelectedClass,
    setSelectedSubject,
    handleGenerate,
    handleReset,
  } = useAssignmentReport();

  const summaryColumns: ColumnsType<TAssignmentBySubject> = [
    {
      title: 'No',
      width: tableWidth.no,
      align: 'center',
      fixed: 'left',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Mata Pelajaran',
      dataIndex: ['subject', 'name'],
      key: 'subject',
      ellipsis: true,
    },
    {
      title: 'Total Jadwal',
      dataIndex: 'total',
      key: 'total',
      align: 'center',
      width: 120,
    },
    {
      title: 'Ada Tugas',
      dataIndex: 'withAssignment',
      key: 'withAssignment',
      align: 'center',
      width: 120,
    },
    {
      title: 'Tidak Ada Tugas',
      dataIndex: 'withoutAssignment',
      key: 'withoutAssignment',
      align: 'center',
      width: 140,
    },
    {
      title: 'Tingkat Penyelesaian',
      dataIndex: 'completionRate',
      key: 'completionRate',
      align: 'center',
      width: 160,
      render: (rate: string) => {
        const rateNum = parseFloat(rate);
        return (
          <span style={{ color: rateNum >= 70 ? '#52c41a' : '#f5222d', fontWeight: 600 }}>
            {rate}%
          </span>
        );
      },
    },
  ];

  const detailColumns: ColumnsType<TAssignmentDetail> = [
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
      title: 'Mata Pelajaran',
      dataIndex: 'subject',
      key: 'subject',
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
      title: 'Guru',
      dataIndex: 'teacher',
      key: 'teacher',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'hasAssignment',
      key: 'hasAssignment',
      align: 'center',
      width: 120,
      render: (has: boolean) => (
        <span style={{ color: has ? '#52c41a' : '#f5222d', fontWeight: 600 }}>
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
    {
      title: 'Total Siswa',
      dataIndex: 'totalStudents',
      key: 'totalStudents',
      align: 'center',
      width: 100,
    },
    {
      title: 'Sudah Mengerjakan',
      dataIndex: 'submittedCount',
      key: 'submittedCount',
      align: 'center',
      width: 140,
      render: (count: number) => (
        <span style={{ color: '#52c41a', fontWeight: 600 }}>
          {count}
        </span>
      ),
    },
    {
      title: 'Belum Mengerjakan',
      dataIndex: 'notSubmittedCount',
      key: 'notSubmittedCount',
      align: 'center',
      width: 140,
      render: (count: number) => (
        <span style={{ color: count > 0 ? '#f5222d' : '#52c41a', fontWeight: 600 }}>
          {count}
        </span>
      ),
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
                  }}
                  allowClear
                />
              </Form.Item>
            </Col>

            {/* Class Filter */}
            <Col xs={24} md={5}>
              <Form.Item label="Kelas (Opsional)" name="class">
                <CmbClass value={selectedClass} onChange={setSelectedClass} allowClear />
              </Form.Item>
            </Col>

            {/* Subject Filter */}
            <Col xs={24} md={6}>
              <Form.Item label="Mata Pelajaran (Opsional)" name="subject">
                <CmbSubject value={selectedSubject} onChange={setSelectedSubject} allowClear />
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
      {data?.data && Array.isArray(data.data.details) && data.data.details.length > 0 && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic title="Total Jadwal" value={data.data.statistics.total} valueStyle={{ color: '#1890ff' }} />
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

          {/* Summary Table */}
          {Array.isArray(data.data.bySubject) && data.data.bySubject.length > 0 && (
            <Card title="Ringkasan Per Mata Pelajaran" style={{ marginBottom: 24, borderRadius: '12px' }}>
              <Table
                columns={summaryColumns}
                dataSource={data.data.bySubject}
                rowKey={(record) => record.subject.id}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
              />
            </Card>
          )}

          {/* Detail Table */}
          <Card title="Detail Tugas" style={{ borderRadius: '12px' }}>
            <Table
              columns={detailColumns}
              dataSource={data.data.details}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ padding: '16px', backgroundColor: '#fafafa' }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={12}>
                        <Card 
                          title={
                            <span>
                              <Tag color="green">Sudah Mengerjakan ({record.submittedCount})</Tag>
                            </span>
                          }
                          size="small"
                        >
                          {record.submittedStudents.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              {record.submittedStudents.map((student) => (
                                <li key={student.id} style={{ marginBottom: 8 }}>
                                  <strong>{student.nis}</strong> - {student.name}
                                  <br />
                                  <small style={{ color: '#888' }}>
                                    Dikumpulkan: {dayjs(student.submittedAt).format('DD/MM/YYYY HH:mm')}
                                  </small>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: '#888', margin: 0 }}>Belum ada siswa yang mengerjakan</p>
                          )}
                        </Card>
                      </Col>
                      <Col xs={24} md={12}>
                        <Card 
                          title={
                            <span>
                              <Tag color="red">Belum Mengerjakan ({record.notSubmittedCount})</Tag>
                            </span>
                          }
                          size="small"
                        >
                          {record.notSubmittedStudents.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: 20 }}>
                              {record.notSubmittedStudents.map((student) => (
                                <li key={student.id} style={{ marginBottom: 8 }}>
                                  <strong>{student.nis}</strong> - {student.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p style={{ color: '#888', margin: 0 }}>Semua siswa sudah mengerjakan</p>
                          )}
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ),
                rowExpandable: (record) => record.hasAssignment,
              }}
            />
          </Card>
        </>
      )}

      {/* Empty State */}
      {data?.data && Array.isArray(data.data.details) && data.data.details.length === 0 && (
        <Card style={{ borderRadius: '12px', textAlign: 'center', padding: '40px 20px' }}>
          <p style={{ fontSize: '16px', color: '#888', marginBottom: 0 }}>
            Tidak ada data tugas untuk filter yang dipilih
          </p>
          <p style={{ fontSize: '14px', color: '#aaa' }}>
            Coba ubah filter atau rentang tanggal
          </p>
        </Card>
      )}
    </div>
  );
};

export default AssignmentReport;
