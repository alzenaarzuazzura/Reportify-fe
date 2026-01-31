import { Card, Row, Col, Button, Radio, Space, DatePicker, Spin } from 'antd';
import { 
  FileTextOutlined, 
  DownloadOutlined, 
  PrinterOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbStudent from '@reportify/components/Combos/CmbStudent';
import NarrativeReport from './components/NarrativeReport';
import { useReportGenerator, TReportPeriodType, TReportViewType } from './hooks/useReportGenerator';

const { RangePicker } = DatePicker;

const ComprehensiveReport = () => {
  const {
    periodType,
    viewType,
    dateRange,
    selectedClass,
    selectedStudent,
    attendanceData,
    assignmentData,
    classData,
    isLoading,
    setPeriodType,
    setViewType,
    setDateRange,
    setSelectedClass,
    setSelectedStudent,
    generateReport
  } = useReportGenerator();

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // TODO: Implement export to PDF
    console.log('Export to PDF');
  };

  return (
    <div>
      <Card 
        style={{ 
          marginBottom: 24, 
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Period Type Selection */}
          <div>
            <label style={{ display: 'block', marginBottom: 12, fontWeight: 600, fontSize: 15 }}>
              <CalendarOutlined /> Periode Laporan
            </label>
            <Radio.Group 
              value={periodType} 
              onChange={(e) => setPeriodType(e.target.value as TReportPeriodType)}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="daily">Harian</Radio.Button>
              <Radio.Button value="weekly">Mingguan</Radio.Button>
              <Radio.Button value="monthly">Bulanan</Radio.Button>
            </Radio.Group>
          </div>

          {/* Date Range Selection */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                Rentang Tanggal
              </label>
              <RangePicker
                value={dateRange}
                onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                size="large"
              />
            </Col>
          </Row>

          {/* View Type Selection */}
          <div>
            <label style={{ display: 'block', marginBottom: 12, fontWeight: 600, fontSize: 15 }}>
              <FileTextOutlined /> Sudut Pandang Laporan
            </label>
            <Radio.Group 
              value={viewType} 
              onChange={(e) => setViewType(e.target.value as TReportViewType)}
              buttonStyle="solid"
              size="large"
            >
              <Radio.Button value="student">
                <UserOutlined /> Per Siswa
              </Radio.Button>
              <Radio.Button value="class">
                <TeamOutlined /> Per Kelas
              </Radio.Button>
              <Radio.Button value="level">
                <ApartmentOutlined /> Per Angkatan/Level
              </Radio.Button>
            </Radio.Group>
          </div>

          {/* Filters based on view type */}
          <Row gutter={16}>
            {(viewType === 'student' || viewType === 'class') && (
              <Col xs={24} md={12}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Kelas {viewType === 'level' ? '(Opsional)' : ''}
                </label>
                <CmbClass
                  value={selectedClass}
                  onChange={(value) => setSelectedClass(value)}
                  allowClear
                  size="large"
                />
              </Col>
            )}
            
            {viewType === 'student' && (
              <Col xs={24} md={12}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                  Siswa (Opsional)
                </label>
                <CmbStudent
                  value={selectedStudent}
                  onChange={(value) => setSelectedStudent(value)}
                  allowClear
                  size="large"
                />
              </Col>
            )}
          </Row>

          {/* Action Buttons */}
          <Row gutter={16}>
            <Col>
              <Button
                type="primary"
                size="large"
                icon={<FileTextOutlined />}
                onClick={generateReport}
                loading={isLoading}
              >
                Generate Laporan
              </Button>
            </Col>
            {(attendanceData || assignmentData || classData) && (
              <>
                <Col>
                  <Button
                    size="large"
                    icon={<PrinterOutlined />}
                    onClick={handlePrint}
                  >
                    Cetak
                  </Button>
                </Col>
                <Col>
                  <Button
                    size="large"
                    icon={<DownloadOutlined />}
                    onClick={handleExport}
                  >
                    Export PDF
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Space>
      </Card>

      {/* Report Content */}
      {isLoading ? (
        <Card style={{ textAlign: 'center', padding: 48 }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Memproses laporan...</p>
        </Card>
      ) : (attendanceData || assignmentData || classData) ? (
        <NarrativeReport
          periodType={periodType}
          viewType={viewType}
          dateRange={dateRange}
          attendanceData={attendanceData?.data}
          assignmentData={assignmentData?.data}
          classData={classData?.data}
        />
      ) : null}
    </div>
  );
};

export default ComprehensiveReport;
