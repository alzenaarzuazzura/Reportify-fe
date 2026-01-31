import { useState } from 'react';
import { Form } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { getAttendanceReport } from '@reportify/services/api/report';
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage';

export type TPeriodType = 'daily' | 'weekly' | 'monthly';

const useAttendanceReport = () => {
  const [form] = Form.useForm();
  const { showMessage } = usePopupMessage();

  const [periodType, setPeriodType] = useState<TPeriodType>('daily');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>();
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [selectedStudent, setSelectedStudent] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['attendanceReport', dateRange, selectedClass, selectedStudent],
    queryFn: () =>
      getAttendanceReport({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
        id_class: selectedClass,
        id_student: selectedStudent,
      }),
    enabled: shouldFetch,
  });

  const handlePeriodChange = (type: TPeriodType) => {
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

  const handleGenerate = () => {
    if (!dateRange) {
      showMessage('error', 'Pilih rentang tanggal terlebih dahulu');
      return;
    }
    setShouldFetch(true);
    refetch();
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedLevel(undefined);
    setSelectedClass(undefined);
    setSelectedStudent(undefined);
    setShouldFetch(false);
  };

  return {
    form,
    periodType,
    dateRange,
    selectedLevel,
    selectedClass,
    selectedStudent,
    data,
    isLoading,
    setPeriodType: handlePeriodChange,
    setDateRange,
    setSelectedLevel,
    setSelectedClass,
    setSelectedStudent,
    handleGenerate,
    handleReset,
  };
};

export default useAttendanceReport;
