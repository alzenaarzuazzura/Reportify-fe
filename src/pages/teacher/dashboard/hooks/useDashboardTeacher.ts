import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { currentSchedule } from '@reportify/services/api/combo';
import { sendReportToParents, getList as getAttendanceList } from '@reportify/services/api/attendance';
import { getList as getAssignmentList } from '@reportify/services/api/assignment';
import { getList as getAnnouncementList } from '@reportify/services/api/announcement';
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage';
import useDlgMessage from '@reportify/hooks/ui/useDialogMessage';

export type TActiveSchedule = {
  value: number
  label: string
  day: string
  time: string
  class_name: string
  subject_name: string
  room?: string
  id_teaching_assignment: number
  id_class: number
}

const useDashboardTeacher = () => {
  const [currentTime, setCurrentTime] = useState<Dayjs>(dayjs());
  const [activeSchedule, setActiveSchedule] = useState<TActiveSchedule | null>(null);
  const [sending, setSending] = useState(false);
  
  const { showMessage } = usePopupMessage();
  const { showDialogCustom } = useDlgMessage();

  // Fetch all attendances for today to calculate attendance statistics
  const today = dayjs().format('YYYY-MM-DD');
  const { data: allAttendancesData } = useQuery({
    queryKey: ['dashboard-teacher', 'all-attendances', today],
    queryFn: () => getAttendanceList({ 
      page: 1, 
      limit: 1000,
      order: 'id',
      sort: 'desc',
      date: today
    }),
  });

  const { data: assignmentData } = useQuery({
    queryKey: ['dashboard-teacher', 'assignments'],
    queryFn: () => getAssignmentList(),
  });

  const { data: announcementData } = useQuery({
    queryKey: ['dashboard-teacher', 'announcements'],
    queryFn: () => getAnnouncementList(),
  });

  // Calculate statistics
  const attendances = allAttendancesData?.data ?? [];
  const totalStudents = allAttendancesData?.pagination?.total ?? 0;
  
  // Attendance statistics
  const totalHadir = attendances.filter(a => a.status === 'hadir').length;
  const totalIzin = attendances.filter(a => a.status === 'izin').length;
  const totalAlfa = attendances.filter(a => a.status === 'alfa').length;
  
  // Assignment statistics
  const totalAssignments = Array.isArray(assignmentData) ? assignmentData.length : 0;
  
  // Calculate students who completed/not completed assignments
  let totalStudentsCompleted = 0;
  let totalStudentsNotCompleted = 0;
  
  if (Array.isArray(assignmentData)) {
    const allStudentAssignments = assignmentData.flatMap(assignment => 
      assignment.student_assignments || []
    );
    
    // Count completed assignments
    totalStudentsCompleted = allStudentAssignments.filter(sa => sa.status === true).length;
    
    // Total not completed = all student assignments - completed
    // This ensures if there are assignments given but none completed, it shows the correct count
    totalStudentsNotCompleted = allStudentAssignments.length - totalStudentsCompleted;
  }
  
  const totalAnnouncements = Array.isArray(announcementData) ? announcementData.length : 0;

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch active schedule on mount and poll every 30 seconds
  useEffect(() => {
    const fetchActiveSchedule = async () => {
      try {
        const data = await currentSchedule();
        if (data && Array.isArray(data) && data.length > 0) {
          setActiveSchedule(data[0] as TActiveSchedule);
        } else {
          setActiveSchedule(null);
        }
      } catch (error) {
        // No active schedule - silent fail
        setActiveSchedule(null);
      }
    };

    // Fetch immediately
    fetchActiveSchedule();

    // Poll every 30 seconds
    const interval = setInterval(fetchActiveSchedule, 30000);

    return () => clearInterval(interval);
  }, []);

  // Show confirmation dialog before sending report
  const showSendConfirmation = useCallback((onConfirm: () => void) => {
    if (!activeSchedule) {
      showMessage('warning', 'Tidak ada kelas aktif saat ini');
      return;
    }

    showDialogCustom({
      title: 'Kirim Laporan ke Wali Murid',
      subtitle: `Apakah Anda yakin ingin mengirim laporan kegiatan belajar hari ini untuk kelas ${activeSchedule.class_name} - ${activeSchedule.subject_name} ke semua wali murid?`,
      defaultIcon: false,
      primaryButton: {
        text: 'Ya, Kirim',
        props: { type: 'primary' },
        handler: onConfirm,
      },
      secondaryButton: {
        text: 'Batal',
        handler: () => {},
      },
    });
  }, [activeSchedule, showMessage, showDialogCustom]);

  // Show result dialog after sending
  const showSendResult = useCallback((result: any) => {
    const failedInfo =
      result.summary.failed > 0
        ? `\n✗ Gagal dikirim: ${result.summary.failed}`
        : ''
  
    const messageText = 
      `Total siswa: ${result.summary.total}\n` +
      `✓ Berhasil dikirim: ${result.summary.sent}` +
      failedInfo
  
    showDialogCustom({
      title: 'Laporan Berhasil Dikirim',
      subtitle: messageText,
      defaultIcon: true,
      isError: false,
      primaryButton: {
        text: 'Tutup',
        props: { type: 'primary' },
        handler: () => {},
      },
    })
  }, [showDialogCustom])
  
  // Handle send report
  const handleSendReport = useCallback(async () => {
    if (!activeSchedule) {
      showMessage('warning', 'Tidak ada kelas aktif saat ini');
      return;
    }

    showSendConfirmation(async () => {
      try {
        setSending(true);
        const today = dayjs().format('YYYY-MM-DD');
        const result = await sendReportToParents(activeSchedule.value, today);

        if (result.status) {
          showSendResult(result);
        } else {
          showMessage('error', 'Gagal mengirim laporan');
        }
      } catch (error: any) {
        showMessage('error', error?.response?.data?.message || 'Gagal mengirim laporan ke wali murid');
      } finally {
        setSending(false);
      }
    });
  }, [activeSchedule, showMessage, showSendConfirmation, showSendResult]);

  return {
    currentTime,
    activeSchedule,
    sending,
    handleSendReport,
    // Statistics
    totalStudents,
    totalAssignments,
    totalAnnouncements,
    // Attendance statistics
    totalHadir,
    totalIzin,
    totalAlfa,
    // Assignment completion statistics
    totalStudentsCompleted,
    totalStudentsNotCompleted,
  };
};

export default useDashboardTeacher;
