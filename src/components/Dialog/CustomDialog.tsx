import { Modal, Button, Space } from 'antd';
import { ReactNode } from 'react';
import { Icon } from '@iconify/react';

export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'none';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  type?: DialogType;
  customIcon?: ReactNode;
  title?: string;
  description?: string;
  primaryButton?: {
    label: string;
    onClick: () => void;
    color?: string;
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
    color?: string;
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  };
  showCloseButton?: boolean;
}

const getIconByType = (type: DialogType) => {
  switch (type) {
    case 'success':
      return <Icon icon="lucide:check-circle" style={{ fontSize: 64, color: '#52c41a' }} />;
    case 'error':
      return <Icon icon="lucide:x-circle" style={{ fontSize: 64, color: '#ff4d4f' }} />;
    case 'warning':
      return <Icon icon="lucide:alert-triangle" style={{ fontSize: 64, color: '#faad14' }} />;
    case 'info':
      return <Icon icon="lucide:info" style={{ fontSize: 64, color: '#1890ff' }} />;
    default:
      return null;
  }
};

const CustomDialog = ({
  open,
  onClose,
  type = 'none',
  customIcon,
  title,
  description,
  primaryButton,
  secondaryButton,
  showCloseButton = true,
}: CustomDialogProps) => {
  const icon = customIcon || getIconByType(type);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closable={showCloseButton}
      centered
      width={400}
    >
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        {icon && <div style={{ marginBottom: 16 }}>{icon}</div>}
        
        {title && (
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: '#262626' }}>
            {title}
          </h3>
        )}
        
        {description && (
          <p style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 24 }}>
            {description}
          </p>
        )}

        {(primaryButton || secondaryButton) && (
          <Space size="middle">
            {secondaryButton && (
              <Button
                type={secondaryButton.type || 'default'}
                onClick={secondaryButton.onClick}
                style={secondaryButton.color ? { borderColor: secondaryButton.color, color: secondaryButton.color } : {}}
              >
                {secondaryButton.label}
              </Button>
            )}
            {primaryButton && (
              <Button
                type={primaryButton.type || 'primary'}
                onClick={primaryButton.onClick}
                style={primaryButton.color ? { backgroundColor: primaryButton.color, borderColor: primaryButton.color } : {}}
              >
                {primaryButton.label}
              </Button>
            )}
          </Space>
        )}
      </div>
    </Modal>
  );
};

export default CustomDialog;
