import { useState } from 'react';
import { Form } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { getAttendanceReport } from '@reportify/services/api/report';
import { TReportParams } from '@reportify/types/data/report';
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage';

export type TPeriodType = 'daily' | 'weekly' | 'monthly';

const useAttendanceReport = () => {
  const [form] = Form.useForm();
  const { showMessage } = usePopupMessage();

  const [periodType, setPeriodType] = useState<TPeriodType>('daily');
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [selectedClass, setSelectedClass] = useState<number | undefined>();
  const [shouldFetch, setShouldFetch] = useState(false);

  // Query with proper dependency tracking
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['attendanceReport', dateRange, selectedClass],
    queryFn: () => {
      // Build params object with proper typing
      const params: TReportParams = {
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD'),
      };

      if (selectedClass) {
        params.id_class = selectedClass;
      }

      return getAttendanceReport(params);
    },
    enabled: shouldFetch,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache results (replaces cacheTime in newer versions)
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
    if (!dateRange || !dateRange[0] || !dateRange[1]) {
      showMessage('error', 'Pilih rentang tanggal terlebih dahulu');
      return;
    }

    setShouldFetch(true);
    refetch();
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedClass(undefined);
    setShouldFetch(false);
    setDateRange([dayjs(), dayjs()]);
    setPeriodType('daily');
  };

  return {
    form,
    periodType,
    dateRange,
    selectedClass,
    data,
    isLoading: isLoading || isFetching,
    setPeriodType: handlePeriodChange,
    setDateRange,
    setSelectedClass,
    handleGenerate,
    handleReset,
  };
};

export default useAttendanceReport;
