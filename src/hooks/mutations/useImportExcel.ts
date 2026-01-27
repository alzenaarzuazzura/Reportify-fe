import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useIntl } from 'react-intl';

type TImportExcelOptions = {
  queryKey: string[];
  importFn: (file: File) => Promise<any>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

const useImportExcel = ({ queryKey, importFn, onSuccess, onError }: TImportExcelOptions) => {
  const intl = useIntl();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: importFn,
    onSuccess: (data) => {
      // Invalidate query to refresh list
      queryClient.invalidateQueries({ queryKey });

      // Show success message with summary
      const summary = data?.data?.summary;
      if (summary) {
        const successMsg = intl.formatMessage(
          { id: 'message.importSuccess' },
          { 
            success: summary.success,
            failed: summary.failed,
            total: summary.total 
          }
        );
        message.success(successMsg);
      } else {
        message.success(intl.formatMessage({ id: 'message.importSuccessGeneral' }));
      }

      // Call custom onSuccess if provided
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        intl.formatMessage({ id: 'message.importFailed' });
      message.error(errorMessage);

      // Call custom onError if provided
      if (onError) {
        onError(error);
      }
    },
  });

  return {
    importExcel: mutation.mutate,
    isImporting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    data: mutation.data,
    error: mutation.error,
  };
};

export default useImportExcel;
