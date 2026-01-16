import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Student } from '@reportify/types';

export const useStudentView = (id: string) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const response = await api.get<Student>(`/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      message.error('Gagal memuat data siswa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  return { student, loading, fetchStudent };
};
