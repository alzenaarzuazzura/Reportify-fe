import { Tabs } from 'antd';
import { FileTextOutlined, CheckSquareOutlined, UserOutlined, TeamOutlined, HomeOutlined, FileDoneOutlined } from '@ant-design/icons';

import ComprehensiveReport from './ComprehensiveReport';
import AttendanceReport from './AttendanceReport';
import AssignmentReport from './AssignmentReport';
import TeacherActivityReport from './TeacherActivityReport';
import StudentPerformanceReport from './StudentPerformanceReport';
import ClassSummaryReport from './ClassSummaryReport';

const Reports = () => {
  const items = [
    {
      key: 'comprehensive',
      label: (
        <span>
          <FileDoneOutlined />
          Laporan Komprehensif
        </span>
      ),
      children: <ComprehensiveReport />,
    },
    {
      key: 'attendance',
      label: (
        <span>
          <CheckSquareOutlined />
          Laporan Kehadiran
        </span>
      ),
      children: <AttendanceReport />,
    },
    {
      key: 'assignment',
      label: (
        <span>
          <FileTextOutlined />
          Laporan Tugas
        </span>
      ),
      children: <AssignmentReport />,
    },
    {
      key: 'teacher',
      label: (
        <span>
          <UserOutlined />
          Aktivitas Guru
        </span>
      ),
      children: <TeacherActivityReport />,
    },
    {
      key: 'student',
      label: (
        <span>
          <TeamOutlined />
          Performa Siswa
        </span>
      ),
      children: <StudentPerformanceReport />,
    },
    {
      key: 'class',
      label: (
        <span>
          <HomeOutlined />
          Ringkasan Kelas
        </span>
      ),
      children: <ClassSummaryReport />,
    },
  ];

  return (
    <div>
      <h1 style={{ 
        marginBottom: 24, 
        fontSize: '24px', 
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        📊 Laporan
      </h1>
      <Tabs 
        defaultActiveKey="comprehensive" 
        items={items}
        size="large"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '16px',
          borderRadius: '12px',
        }}
      />
    </div>
  );
};

export default Reports;
