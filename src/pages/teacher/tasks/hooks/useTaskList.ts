import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Task } from '@reportify/types';

export const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get<Task[]>('/tasks/my');
      setTasks(response.data);
    } catch (error) {
      message.error('Gagal memuat data tugas');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      message.success('Data tugas berhasil dihapus');
      fetchTasks();
    } catch (error) {
      message.error('Gagal menghapus data tugas');
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await api.patch(`/tasks/${id}/complete`, { completed });
      message.success('Status tugas berhasil diperbarui');
      fetchTasks();
    } catch (error) {
      message.error('Gagal memperbarui status tugas');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, fetchTasks, deleteTask, toggleComplete };
};
