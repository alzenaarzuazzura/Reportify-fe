import { Card, Typography, Divider, Alert, Tag, Table, Row, Col, Statistic } from 'antd';
import { 
  WarningOutlined, 
  CheckCircleOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { ColumnsType } from 'antd/es/table';

import { TAttendanceReport, TAssignmentReport, TClassSummaryReport, TAttendanceByStudent, TAttendanceDetail, TAssignmentDetail } from '@reportify/types/data/report';

dayjs.locale('id');

const { Title, Paragraph, Text } = Typography;

type TNarrativeReportProps = {
  periodType: 'daily' | 'weekly' | 'monthly';
  viewType: 'student' | 'class' | 'level';
  dateRange: [dayjs.Dayjs, dayjs.Dayjs];
  attendanceData?: TAttendanceReport;
  assignmentData?: TAssignmentReport;
  classData?: TClassSummaryReport;
};

const NarrativeReport = ({
  periodType,
  viewType,
  dateRange,
  attendanceData,
  assignmentData,
  classData
}: TNarrativeReportProps) => {
  const formatPeriod = () => {
    const start = dateRange[0];
    const end = dateRange[1];
    
    if (periodType === 'daily') {
      return start.format('dddd, DD MMMM YYYY');
    } else if (periodType === 'weekly') {
      return `${start.format('DD MMMM YYYY')} - ${end.format('DD MMMM YYYY')}`;
    } else {
      return start.format('MMMM YYYY');
    }
  };

  const getPeriodLabel = () => {
    switch (periodType) {
      case 'daily': return 'Harian';
      case 'weekly': return 'Mingguan';
      case 'monthly': return 'Bulanan';
    }
  };

  // Generate student report
  const generateStudentReport = () => {
    if (!attendanceData || !assignmentData) return null;

    const students = attendanceData.data.byStudent;

    // Table columns for student attendance
    const studentAttendanceColumns: ColumnsType<TAttendanceByStudent> = [
      {
        title: 'NIS',
        dataIndex: ['student', 'nis'],
        key: 'nis',
        width: 100,
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
        width: 100,
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
            <span style={{ 
              color: rateNum >= 75 ? '#52c41a' : '#f5222d',
              fontWeight: 600
            }}>
              {rate}%
            </span>
          );
        },
      },
    ];

    // Table columns for attendance details
    const attendanceDetailColumns: ColumnsType<TAttendanceDetail> = [
      {
        title: 'Tanggal',
        dataIndex: 'date',
        key: 'date',
        render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        width: 100,
      },
      {
        title: 'Siswa',
        dataIndex: ['student', 'name'],
        key: 'studentName',
      },
      {
        title: 'Mata Pelajaran',
        dataIndex: 'subject',
        key: 'subject',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 100,
        render: (status: string) => {
          const colors: Record<string, string> = {
            Hadir: '#52c41a',
            Sakit: '#faad14',
            Izin: '#1890ff',
            Alpha: '#f5222d',
            hadir: '#52c41a',
            sakit: '#faad14',
            izin: '#1890ff',
            alfa: '#f5222d'
          };
          return (
            <Tag color={colors[status] || 'default'}>
              {status.toUpperCase()}
            </Tag>
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
      <>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Kehadiran"
                value={attendanceData.data.statistics.total}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Hadir"
                value={attendanceData.data.statistics.hadir}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tidak Hadir"
                value={attendanceData.data.statistics.izin + attendanceData.data.statistics.sakit + attendanceData.data.statistics.alpha}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tingkat Kehadiran"
                value={attendanceData.data.statistics.attendanceRate}
                suffix="%"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Student Attendance Summary Table */}
        <Card 
          title="Ringkasan Kehadiran Per Siswa" 
          style={{ marginBottom: 24, borderRadius: '8px' }}
        >
          <Table
            columns={studentAttendanceColumns}
            dataSource={students}
            rowKey={(record) => record.student.id}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        {/* Attendance Details Table */}
        <Card 
          title="Detail Kehadiran" 
          style={{ marginBottom: 24, borderRadius: '8px' }}
        >
          <Table
            columns={attendanceDetailColumns}
            dataSource={attendanceData.data.details}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        {/* Narrative Reports */}
        <Divider><Title level={4}>Analisis dan Rekomendasi</Title></Divider>
        
        {students.map((student) => {
          const attendanceRate = parseFloat(student.attendanceRate);
          const hasHighAbsence = student.alpha >= 3;
          const hasLowAttendance = attendanceRate < 75;

          // Find assignment data for this student
          const studentAssignments = assignmentData.data.details.filter(
            detail => detail.class === student.student.class
          );
          const totalAssignments = studentAssignments.length;
          const completedAssignments = studentAssignments.filter(a => a.hasAssignment).length;
          const pendingAssignments = totalAssignments - completedAssignments;
          const hasManyPending = pendingAssignments > totalAssignments * 0.3;

          return (
            <Card 
              key={student.student.id}
              style={{ marginBottom: 16, borderRadius: '8px' }}
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{student.student.name} - {student.student.nis}</span>
                  {(hasHighAbsence || hasLowAttendance || hasManyPending) && (
                    <Tag color="warning" icon={<WarningOutlined />}>Perlu Perhatian</Tag>
                  )}
                </div>
              }
            >
              <Paragraph>
                <Text strong>Kelas:</Text> {student.student.class}
              </Paragraph>

              <Title level={5}>Ringkasan Kehadiran</Title>
              <Paragraph>
                Siswa {student.student.name} tercatat memiliki total {student.total} pertemuan 
                selama periode {getPeriodLabel().toLowerCase()} ini. Dari total pertemuan tersebut, 
                siswa hadir sebanyak {student.hadir} kali ({student.attendanceRate}%), 
                izin {student.izin} kali, sakit {student.sakit} kali, dan alfa {student.alpha} kali.
              </Paragraph>

              <Title level={5}>Ringkasan Tugas</Title>
              <Paragraph>
                Terdapat {totalAssignments} tugas yang diberikan kepada kelas {student.student.class}. 
                Dari jumlah tersebut, {completedAssignments} tugas telah dikerjakan dan {pendingAssignments} tugas 
                belum dikerjakan atau belum terkonfirmasi pengerjaannya.
              </Paragraph>

              {(hasHighAbsence || hasLowAttendance || hasManyPending) && (
                <>
                  <Divider />
                  <Title level={5}>Catatan Penting</Title>
                  {hasHighAbsence && (
                    <Alert
                      message="Tingkat Ketidakhadiran Tinggi"
                      description={`Siswa memiliki ${student.alpha} kali alfa yang memerlukan perhatian khusus dari wali kelas dan orang tua.`}
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleOutlined />}
                      style={{ marginBottom: 8 }}
                    />
                  )}
                  {hasLowAttendance && (
                    <Alert
                      message="Persentase Kehadiran Rendah"
                      description={`Tingkat kehadiran ${student.attendanceRate}% berada di bawah standar minimal 75%. Diperlukan tindak lanjut untuk meningkatkan kehadiran.`}
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleOutlined />}
                      style={{ marginBottom: 8 }}
                    />
                  )}
                  {hasManyPending && (
                    <Alert
                      message="Banyak Tugas Belum Dikerjakan"
                      description={`Terdapat ${pendingAssignments} tugas yang belum dikerjakan. Disarankan untuk melakukan pendampingan belajar.`}
                      type="warning"
                      showIcon
                      icon={<ExclamationCircleOutlined />}
                      style={{ marginBottom: 8 }}
                    />
                  )}
                </>
              )}

              <Divider />
              <Title level={5}>Rekomendasi</Title>
              <Paragraph>
                {hasHighAbsence || hasLowAttendance ? (
                  <>
                    Disarankan untuk melakukan komunikasi intensif dengan orang tua/wali murid 
                    terkait kehadiran siswa. Wali kelas perlu melakukan pendekatan personal 
                    untuk memahami kendala yang dihadapi siswa.
                  </>
                ) : hasManyPending ? (
                  <>
                    Guru mata pelajaran disarankan untuk memberikan bimbingan tambahan dan 
                    memonitor penyelesaian tugas secara berkala. Koordinasi dengan orang tua 
                    diperlukan untuk memastikan siswa menyelesaikan tugas tepat waktu.
                  </>
                ) : (
                  <>
                    Siswa menunjukkan performa yang baik dalam kehadiran dan penyelesaian tugas. 
                    Pertahankan motivasi dan dukungan untuk memastikan konsistensi prestasi.
                  </>
                )}
              </Paragraph>
            </Card>
          );
        })}
      </>
    );
  };

  // Generate class report
  const generateClassReport = () => {
    if (!classData || !attendanceData || !assignmentData) return null;

    const classInfo = classData.data.class;
    const stats = classData.data.statistics;
    const attendanceStats = attendanceData.data.statistics;
    const assignmentStats = assignmentData.data.statistics;
    
    const attendanceRate = parseFloat(attendanceStats.attendanceRate);
    const hasLowAttendance = attendanceRate < 80;
    const hasHighAbsence = attendanceStats.alpha > classInfo.totalStudents * 0.1;

    // Find students with most absences
    const studentsWithHighAlfa = classData.data.studentSummary
      .filter(s => s.alpha >= 3)
      .sort((a, b) => b.alpha - a.alpha)
      .slice(0, 5);

    // Table columns for class student summary
    const classStudentColumns: ColumnsType<any> = [
      {
        title: 'NIS',
        dataIndex: ['student', 'nis'],
        key: 'nis',
        width: 100,
      },
      {
        title: 'Nama Siswa',
        dataIndex: ['student', 'name'],
        key: 'name',
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
            <span style={{ 
              color: rateNum >= 75 ? '#52c41a' : '#f5222d',
              fontWeight: 600
            }}>
              {rate}%
            </span>
          );
        },
      },
    ];

    return (
      <>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Siswa"
                value={classInfo.totalStudents}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Kehadiran"
                value={attendanceStats.total}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tingkat Kehadiran"
                value={attendanceStats.attendanceRate}
                suffix="%"
                valueStyle={{ color: attendanceRate >= 80 ? '#52c41a' : '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Alfa"
                value={attendanceStats.alpha}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Class Student Summary Table */}
        <Card 
          title={`Ringkasan Kehadiran Siswa - ${classInfo.name}`}
          style={{ marginBottom: 24, borderRadius: '8px' }}
        >
          <Table
            columns={classStudentColumns}
            dataSource={classData.data.studentSummary}
            rowKey={(record) => record.student.id}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        {/* Narrative Report */}
        <Divider><Title level={4}>Analisis dan Rekomendasi</Title></Divider>

        <Card style={{ marginBottom: 16, borderRadius: '8px' }}>
          <Title level={4}>{classInfo.name}</Title>
          
          <Paragraph>
            <Text strong>Jumlah Siswa:</Text> {classInfo.totalStudents} siswa
          </Paragraph>

          <Title level={5}>Rekap Kehadiran</Title>
          <Paragraph>
            Selama periode {getPeriodLabel().toLowerCase()} ini, kelas {classInfo.name} memiliki 
            total {attendanceStats.total} catatan kehadiran dari seluruh siswa. 
            Distribusi kehadiran menunjukkan {attendanceStats.hadir} kehadiran ({attendanceStats.attendanceRate}%), 
            {attendanceStats.izin} izin, {attendanceStats.sakit} sakit, dan {attendanceStats.alpha} alfa.
          </Paragraph>

          <Title level={5}>Rekap Penyelesaian Tugas</Title>
          <Paragraph>
            Terdapat {assignmentStats.total} jadwal pembelajaran yang tercatat. 
            Dari jumlah tersebut, {assignmentStats.withAssignment} jadwal disertai dengan pemberian tugas 
            ({assignmentStats.completionRate}% tingkat pemberian tugas). 
            Hal ini menunjukkan {parseFloat(assignmentStats.completionRate) >= 70 ? 'tingkat' : 'masih perlu peningkatan dalam'} 
            {' '}pemberian tugas yang konsisten kepada siswa.
          </Paragraph>

          <Title level={5}>Persentase Kehadiran Kelas</Title>
          <Paragraph>
            Tingkat kehadiran kelas secara keseluruhan mencapai {attendanceStats.attendanceRate}%, 
            yang {attendanceRate >= 80 ? 'menunjukkan disiplin kehadiran yang baik' : 'memerlukan perhatian untuk ditingkatkan'}.
          </Paragraph>

          {studentsWithHighAlfa.length > 0 && (
            <>
              <Title level={5}>Siswa dengan Ketidakhadiran Tinggi</Title>
              <Paragraph>
                Berikut adalah siswa yang memiliki tingkat ketidakhadiran (alfa) yang perlu mendapat perhatian khusus:
              </Paragraph>
              <ul>
                {studentsWithHighAlfa.map(student => (
                  <li key={student.student.id}>
                    <Text strong>{student.student.name}</Text> ({student.student.nis}) - 
                    {' '}{student.alpha} kali alfa, tingkat kehadiran {student.attendanceRate}%
                  </li>
                ))}
              </ul>
            </>
          )}

          <Divider />
          <Title level={5}>Kesimpulan</Title>
          <Paragraph>
            {hasLowAttendance || hasHighAbsence ? (
              <>
                Kelas {classInfo.name} menunjukkan adanya tantangan dalam hal kehadiran siswa. 
                Diperlukan intervensi dari wali kelas dan koordinasi dengan orang tua untuk 
                meningkatkan disiplin kehadiran. Monitoring ketat terhadap siswa dengan alfa tinggi 
                sangat diperlukan untuk mencegah penurunan prestasi akademik.
              </>
            ) : (
              <>
                Kelas {classInfo.name} menunjukkan performa yang baik dalam hal kehadiran dan 
                penyelesaian tugas. Tingkat kehadiran yang tinggi mencerminkan disiplin dan 
                motivasi belajar yang baik dari siswa. Pertahankan kondisi ini dengan terus 
                memberikan dukungan dan motivasi kepada siswa.
              </>
            )}
          </Paragraph>

          <Title level={5}>Rekomendasi Tindak Lanjut</Title>
          <ul>
            {hasLowAttendance && (
              <li>Wali kelas melakukan home visit kepada siswa dengan tingkat kehadiran rendah</li>
            )}
            {hasHighAbsence && (
              <li>Koordinasi dengan BK untuk pendampingan siswa dengan alfa tinggi</li>
            )}
            {parseFloat(assignmentStats.completionRate) < 70 && (
              <li>Meningkatkan konsistensi pemberian tugas oleh guru mata pelajaran</li>
            )}
            <li>Melakukan evaluasi berkala terhadap perkembangan kehadiran dan tugas siswa</li>
            <li>Memberikan apresiasi kepada siswa dengan kehadiran dan penyelesaian tugas yang baik</li>
          </ul>
        </Card>
      </>
    );
  };

  // Generate level report
  const generateLevelReport = () => {
    if (!attendanceData || !assignmentData) return null;

    const attendanceStats = attendanceData.data.statistics;
    const assignmentStats = assignmentData.data.statistics;
    const attendanceRate = parseFloat(attendanceStats.attendanceRate);

    // Table columns for level attendance
    const levelAttendanceColumns: ColumnsType<TAttendanceByStudent> = [
      {
        title: 'NIS',
        dataIndex: ['student', 'nis'],
        key: 'nis',
        width: 100,
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
        width: 100,
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
            <span style={{ 
              color: rateNum >= 75 ? '#52c41a' : '#f5222d',
              fontWeight: 600
            }}>
              {rate}%
            </span>
          );
        },
      },
    ];

    return (
      <>
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Total Kehadiran"
                value={attendanceStats.total}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Hadir"
                value={attendanceStats.hadir}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tidak Hadir"
                value={attendanceStats.izin + attendanceStats.sakit + attendanceStats.alpha}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Statistic
                title="Tingkat Kehadiran"
                value={attendanceStats.attendanceRate}
                suffix="%"
                valueStyle={{ color: attendanceRate >= 80 ? '#52c41a' : '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Level Attendance Summary Table */}
        <Card 
          title="Ringkasan Kehadiran Per Siswa"
          style={{ marginBottom: 24, borderRadius: '8px' }}
        >
          <Table
            columns={levelAttendanceColumns}
            dataSource={attendanceData.data.byStudent}
            rowKey={(record) => record.student.id}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
        </Card>

        {/* Narrative Report */}
        <Divider><Title level={4}>Analisis dan Rekomendasi</Title></Divider>

        <Card style={{ marginBottom: 16, borderRadius: '8px' }}>
          <Title level={4}>Laporan Tingkat/Angkatan</Title>

          <Title level={5}>Rekap Keseluruhan Kehadiran</Title>
          <Paragraph>
            Pada periode {getPeriodLabel().toLowerCase()} ini, tercatat total {attendanceStats.total} data kehadiran 
            dari seluruh siswa di tingkat ini. Distribusi kehadiran menunjukkan {attendanceStats.hadir} kehadiran 
            ({attendanceStats.attendanceRate}%), {attendanceStats.izin} izin, {attendanceStats.sakit} sakit, 
            dan {attendanceStats.alpha} alfa.
          </Paragraph>

          <Title level={5}>Rekap Keseluruhan Tugas</Title>
          <Paragraph>
            Terdapat {assignmentStats.total} jadwal pembelajaran yang tercatat di tingkat ini. 
            Dari jumlah tersebut, {assignmentStats.withAssignment} jadwal disertai dengan pemberian tugas, 
            menghasilkan tingkat pemberian tugas sebesar {assignmentStats.completionRate}%.
          </Paragraph>

          <Title level={5}>Tren yang Menonjol</Title>
          <Paragraph>
            {attendanceRate >= 85 ? (
              <>
                Tingkat kehadiran secara keseluruhan menunjukkan tren positif dengan persentase {attendanceStats.attendanceRate}%. 
                Hal ini mencerminkan disiplin dan motivasi belajar yang baik dari siswa di tingkat ini.
              </>
            ) : attendanceRate >= 75 ? (
              <>
                Tingkat kehadiran berada pada level yang cukup baik dengan persentase {attendanceStats.attendanceRate}%. 
                Namun masih terdapat ruang untuk peningkatan, terutama dalam mengurangi jumlah ketidakhadiran tanpa keterangan (alfa).
              </>
            ) : (
              <>
                Tingkat kehadiran {attendanceStats.attendanceRate}% menunjukkan adanya tantangan serius yang perlu segera ditangani. 
                Diperlukan evaluasi menyeluruh dan intervensi sistematis untuk meningkatkan kehadiran siswa.
              </>
            )}
          </Paragraph>

          {parseFloat(assignmentStats.completionRate) < 70 && (
            <Alert
              message="Perhatian: Tingkat Pemberian Tugas Rendah"
              description={`Tingkat pemberian tugas ${assignmentStats.completionRate}% masih di bawah standar optimal. Diperlukan koordinasi dengan guru mata pelajaran untuk meningkatkan konsistensi pemberian tugas.`}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Divider />
          <Title level={5}>Kesimpulan dan Rekomendasi</Title>
          <Paragraph>
            Berdasarkan data yang tercatat, tingkat ini {attendanceRate >= 80 ? 'menunjukkan performa yang baik' : 'memerlukan perhatian khusus'} 
            {' '}dalam hal kehadiran dan penyelesaian tugas. Untuk mempertahankan atau meningkatkan kualitas pembelajaran, 
            disarankan untuk:
          </Paragraph>
          <ul>
            <li>Melakukan monitoring berkala terhadap kehadiran dan penyelesaian tugas di setiap kelas</li>
            <li>Koordinasi rutin antara wali kelas, guru mata pelajaran, dan BK</li>
            <li>Komunikasi intensif dengan orang tua/wali murid terkait perkembangan siswa</li>
            <li>Memberikan intervensi dini kepada siswa yang menunjukkan tanda-tanda penurunan performa</li>
            <li>Mengadakan program motivasi dan bimbingan belajar untuk meningkatkan semangat belajar siswa</li>
          </ul>
        </Card>
      </>
    );
  };

  return (
    <div>
      <Card 
        style={{ 
          marginBottom: 24, 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Title level={3} style={{ color: 'white', marginBottom: 8 }}>
          LAPORAN {getPeriodLabel().toUpperCase()}
        </Title>
        <Title level={4} style={{ color: 'white', fontWeight: 400, marginTop: 0 }}>
          Periode: {formatPeriod()}
        </Title>
      </Card>

      {viewType === 'student' && generateStudentReport()}
      {viewType === 'class' && generateClassReport()}
      {viewType === 'level' && generateLevelReport()}
    </div>
  );
};

export default NarrativeReport;
