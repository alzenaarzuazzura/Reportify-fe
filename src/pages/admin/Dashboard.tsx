import { Card, Row, Col } from 'antd';
import { TeamOutlined, UserOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getList as getTeacherList } from '@reportify/services/api/teacher';
import { getList as getSubjectList } from '@reportify/services/api/subject';
import { getList as getStudentList } from '@reportify/services/api/student';
import { getList as getClassList } from '@reportify/services/api/class';

const AdminDashboard = () => {
  // Fetch students count
  const { data: studentData } = useQuery({
    queryKey: ['dashboard', 'students'],
    queryFn: () => getStudentList({ page: 1, limit: 1, order: 'name', sort: 'asc' }),
  });

  // Fetch teachers count
  const { data: teacherData } = useQuery({
    queryKey: ['dashboard', 'teachers'],
    queryFn: () => getTeacherList({ page: 1, limit: 1, order: 'name', sort: 'asc' }),
  });

  // Fetch subjects count
  const { data: subjectData } = useQuery({
    queryKey: ['dashboard', 'subjects'],
    queryFn: () => getSubjectList({ page: 1, limit: 1, order: 'name', sort: 'asc' }),
  });

  // Fetch classes count
  const { data: classData } = useQuery({
    queryKey: ['dashboard', 'classes'],
    queryFn: () => getClassList({ page: 1, limit: 1, order: 'id', sort: 'asc' }),
  });

  const totalStudents = studentData?.pagination?.total || 0;
  const totalTeachers = teacherData?.pagination?.total || 0;
  const totalSubjects = subjectData?.pagination?.total || 0;
  const totalClasses = classData?.pagination?.total || 0;

  const statsCards = [
    {
      title: 'Total Siswa',
      value: totalStudents,
      icon: <TeamOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(102, 126, 234, 0.2)',
      iconColor: '#667eea',
    },
    {
      title: 'Total Guru',
      value: totalTeachers,
      icon: <UserOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'rgba(240, 147, 251, 0.2)',
      iconColor: '#f093fb',
    },
    {
      title: 'Mata Pelajaran',
      value: totalSubjects,
      icon: <BookOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'rgba(79, 172, 254, 0.2)',
      iconColor: '#4facfe',
    },
    {
      title: 'Total Kelas',
      value: totalClasses,
      icon: <HomeOutlined style={{ fontSize: 32 }} />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      iconBg: 'rgba(67, 233, 123, 0.2)',
      iconColor: '#43e97b',
    },
  ];

  return (
    <div>
      <h1 style={{ 
        marginBottom: 32, 
        fontSize: '28px', 
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Dashboard Admin
      </h1>
      <Row gutter={[24, 24]}>
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              styles={{ body: { padding: '24px' } }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: stat.gradient,
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '14px', 
                    color: '#64748b',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}>
                    {stat.title}
                  </div>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: 700,
                    background: stat.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.2,
                  }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: stat.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: stat.iconColor,
                }}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AdminDashboard;
