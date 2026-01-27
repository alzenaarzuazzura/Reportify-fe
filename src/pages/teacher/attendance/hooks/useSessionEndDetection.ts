import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

type UseSessionEndDetectionProps = {
  scheduleEndTime?: string; // Format: "HH:mm"
  enabled?: boolean;
};

/**
 * Hook to detect when a teaching session has ended
 * Shows dialog when current time passes the schedule end time
 */
const useSessionEndDetection = ({ scheduleEndTime, enabled = true }: UseSessionEndDetectionProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!enabled || !scheduleEndTime || hasShown) {
      return;
    }

    // Check every minute
    const checkInterval = setInterval(() => {
      const now = dayjs();
      const [hours, minutes] = scheduleEndTime.split(':').map(Number);
      const endTime = dayjs().hour(hours).minute(minutes).second(0);

      // Show dialog if current time is past end time (with 1 minute buffer)
      if (now.isAfter(endTime) && !hasShown) {
        setShowDialog(true);
        setHasShown(true);
      }
    }, 60000); // Check every minute

    // Also check immediately
    const now = dayjs();
    const [hours, minutes] = scheduleEndTime.split(':').map(Number);
    const endTime = dayjs().hour(hours).minute(minutes).second(0);
    
    if (now.isAfter(endTime) && !hasShown) {
      setShowDialog(true);
      setHasShown(true);
    }

    return () => clearInterval(checkInterval);
  }, [scheduleEndTime, enabled, hasShown]);

  const closeDialog = () => {
    setShowDialog(false);
  };

  const resetDetection = () => {
    setHasShown(false);
    setShowDialog(false);
  };

  return {
    showDialog,
    closeDialog,
    resetDetection,
  };
};

export default useSessionEndDetection;
