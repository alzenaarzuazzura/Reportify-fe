import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { 
  getAttendanceReport, 
  getAssignmentReport,
  getClassSummaryReport 
} from '@reportify/services/api/report';

export type TReportPeriodType = 'daily' | 'weekly' | 'monthly';
export type TReportViewType = 'student' | 'class' | 'level';

export const useReportGenerator = () => {
  const [periodType, setPeriodType] = useState<TReportPeriodType>('daily');
  const [viewType, setViewType] = useState<TReportViewType>('student');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  // Fetch attendance data
  const { data: attendanceData, isLoading: attendanceLoading } = useQuery({
    queryKey: ['report-attendance', dateRange, selectedClass, selectedStudent],
    queryFn: () => getAttendanceReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass,
      id_student: selectedStudent
    }),
    enabled: shouldFetch
  });

  // Fetch assignment data
  const { data: assignmentData, isLoading: assignmentLoading } = useQuery({
    queryKey: ['report-assignment', dateRange, selectedClass],
    queryFn: () => getAssignmentReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass
    }),
    enabled: shouldFetch
  });

  // Fetch class summary data
  const { data: classData, isLoading: classLoading } = useQuery({
    queryKey: ['report-class', dateRange, selectedClass],
    queryFn: () => getClassSummaryReport({
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      id_class: selectedClass
    }),
    enabled: shouldFetch && viewType === 'class'
  });

  const handlePeriodChange = (type: TReportPeriodType) => {
    setPeriodType(type);
    const today = dayjs();
    
    switch (type) {
      case 'daily':
        setDateRange([today, today]);
        break;
      case 'weekly':
        setDateRange([today.startOf('week'), today.endOf('week')]);
        break;
      case 'monthly':
        setDateRange([today.startOf('month'), today.endOf('month')]);
        break;
    }
  };

  const generateReport = () => {
    setShouldFetch(true);
  };

  const isLoading = attendanceLoading || assignmentLoading || classLoading;

  return {
    periodType,
    viewType,
    dateRange,
    selectedClass,
    selectedStudent,
    attendanceData,
    assignmentData,
    classData,
    isLoading,
    setPeriodType: handlePeriodChange,
    setViewType,
    setDateRange,
    setSelectedClass,
    setSelectedStudent,
    generateReport
  };
};
