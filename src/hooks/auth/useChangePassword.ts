import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useIntl } from 'react-intl';
import { changePassword } from '@reportify/services/api/auth';

type TChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

const useChangePassword = () => {
  const intl = useIntl();

  const mutation = useMutation({
    mutationFn: (payload: TChangePasswordPayload) => changePassword(payload),
    onSuccess: (data) => {
      message.success(
        data.message || intl.formatMessage({ id: 'message.changePasswordSuccess' })
      );
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        intl.formatMessage({ id: 'message.changePasswordFailed' });
      message.error(errorMessage);
    },
  });

  return {
    changePassword: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};

export default useChangePassword;
