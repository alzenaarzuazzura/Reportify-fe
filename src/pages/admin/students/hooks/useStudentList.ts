import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Student } from '@reportify/types';

export const useStudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get<Student[]>('/students');
      setStudents(response.data);
    } catch (error) {
      message.error('Gagal memuat data siswa');
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await api.delete(`/students/${id}`);
      message.success('Data siswa berhasil dihapus');
      fetchStudents();
    } catch (error) {
      message.error('Gagal menghapus data siswa');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return { students, loading, fetchStudents, deleteStudent };
};
