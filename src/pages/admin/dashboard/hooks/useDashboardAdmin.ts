import { useQuery } from '@tanstack/react-query'
import { getList as getTeacherList } from '@reportify/services/api/teacher'
import { getList as getSubjectList } from '@reportify/services/api/subject'
import { getList as getStudentList } from '@reportify/services/api/student'
import { getList as getClassList } from '@reportify/services/api/class'

const defaultParams = {
  page: 1,
  limit: 1,
  order: 'name',
  sort: 'asc',
} as const

const useAdminDashboard = () => {
  const { data: studentData } = useQuery({
    queryKey: ['dashboard', 'students'],
    queryFn: () => getStudentList(defaultParams),
  })

  const { data: teacherData } = useQuery({
    queryKey: ['dashboard', 'teachers'],
    queryFn: () => getTeacherList(defaultParams),
  })

  const { data: subjectData } = useQuery({
    queryKey: ['dashboard', 'subjects'],
    queryFn: () => getSubjectList(defaultParams),
  })

  const { data: classData } = useQuery({
    queryKey: ['dashboard', 'classes'],
    queryFn: () =>
      getClassList({
        page: 1,
        limit: 1,
        order: 'id',
        sort: 'asc',
      }),
  })

  return {
    totalStudents: studentData?.pagination?.total ?? 0,
    totalTeachers: teacherData?.pagination?.total ?? 0,
    totalSubjects: subjectData?.pagination?.total ?? 0,
    totalClasses: classData?.pagination?.total ?? 0,
  }
}

export default useAdminDashboard
