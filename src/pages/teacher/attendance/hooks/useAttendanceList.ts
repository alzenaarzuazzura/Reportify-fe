import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Attendance } from '@reportify/types';

export const useAttendanceList = () => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const response = await api.get<Attendance[]>('/attendance/my');
      setAttendances(response.data);
    } catch (error) {
      message.error('Gagal memuat data absensi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  return { attendances, loading, fetchAttendances };
};
