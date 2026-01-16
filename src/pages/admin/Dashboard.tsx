import { Card, Row, Col, Statistic } from 'antd';
import { TeamOutlined, UserOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getList as getTeacherList } from '@reportify/services/api/teacher';
import { getList as getSubjectList } from '@reportify/services/api/subject';

const AdminDashboard = () => {
  // Fetch teachers count
  const { data: teacherData } = useQuery({
    queryKey: ['dashboard', 'teachers'],
    queryFn: () => getTeacherList({ page: 1, limit: 1 }),
  });

  // Fetch subjects count
  const { data: subjectData } = useQuery({
    queryKey: ['dashboard', 'subjects'],
    queryFn: () => getSubjectList({ page: 1, limit: 1 }),
  });

  const totalTeachers = teacherData?.pagination?.total || 0;
  const totalSubjects = subjectData?.pagination?.total || 0;

  return (
    <div>
      <h1 style={{ marginBottom: 24, fontSize: '24px' }}>Dashboard Admin</h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Siswa"
              value={0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1a237e' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Guru"
              value={totalTeachers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#2e7d32' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Mata Pelajaran"
              value={totalSubjects}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#f57c00' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Kelas"
              value={0}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#c62828' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
