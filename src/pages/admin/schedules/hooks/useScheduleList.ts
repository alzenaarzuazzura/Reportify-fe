import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Schedule } from '@reportify/types';

export const useScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await api.get<Schedule[]>('/schedules');
      setSchedules(response.data);
    } catch (error) {
      message.error('Gagal memuat data jadwal');
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async (id: string) => {
    try {
      await api.delete(`/schedules/${id}`);
      message.success('Data jadwal berhasil dihapus');
      fetchSchedules();
    } catch (error) {
      message.error('Gagal menghapus data jadwal');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, fetchSchedules, deleteSchedule };
};
