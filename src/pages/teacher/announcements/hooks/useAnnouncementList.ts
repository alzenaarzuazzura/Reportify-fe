import { useState, useEffect } from 'react';
import { message } from 'antd';
import api from '@reportify/services/api';
import { Announcement } from '@reportify/types';

export const useAnnouncementList = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await api.get<Announcement[]>('/announcements/my');
      setAnnouncements(response.data);
    } catch (error) {
      message.error('Gagal memuat data pengumuman');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      await api.delete(`/announcements/${id}`);
      message.success('Data pengumuman berhasil dihapus');
      fetchAnnouncements();
    } catch (error) {
      message.error('Gagal menghapus data pengumuman');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return { announcements, loading, fetchAnnouncements, deleteAnnouncement };
};
