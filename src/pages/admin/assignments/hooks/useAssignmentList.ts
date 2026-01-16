import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { TeacherAssignment } from '@reportify/types';

export const useAssignmentList = () => {
  const [assignments, setAssignments] = useState<TeacherAssignment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await api.get<TeacherAssignment[]>('/assignments');
      setAssignments(response.data);
    } catch (error) {
      message.error('Gagal memuat data penugasan guru');
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (id: string) => {
    try {
      await api.delete(`/assignments/${id}`);
      message.success('Data penugasan guru berhasil dihapus');
      fetchAssignments();
    } catch (error) {
      message.error('Gagal menghapus data penugasan guru');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return { assignments, loading, fetchAssignments, deleteAssignment };
};
