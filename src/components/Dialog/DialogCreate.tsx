import { useIntl } from 'react-intl';
import CustomDialog from './CustomDialog';

interface DialogCreateProps {
  open: boolean;
  onClose: () => void;
  menuName?: string;
  isSuccess?: boolean;
  errorMessage?: string;
}

const DialogCreate = ({ 
  open, 
  onClose, 
  menuName = 'Data',
  isSuccess = true,
  errorMessage 
}: DialogCreateProps) => {
  const intl = useIntl();

  if (isSuccess) {
    return (
      <CustomDialog
        open={open}
        onClose={onClose}
        type="success"
        title="Berhasil!"
        description={`${menuName} berhasil ditambahkan`}
        primaryButton={{
          label: intl.formatMessage({ id: 'common.ok' }) || 'OK',
          onClick: onClose,
        }}
      />
    );
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      type="error"
      title="Gagal!"
      description={errorMessage || `Gagal menambahkan ${menuName}`}
      primaryButton={{
        label: intl.formatMessage({ id: 'common.ok' }) || 'OK',
        onClick: onClose,
      }}
    />
  );
};

export default DialogCreate;
