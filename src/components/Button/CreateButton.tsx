import { Button } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const CreateButton = ({ onClick, href }: { onClick?: () => void; href?: string }) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      icon={<Icon icon="lucide:plus" className="mr-2" />}
      onClick={href ? () => navigate(href) : onClick}
      style={{ 
        paddingLeft: 20, 
        paddingRight: 20,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {intl.formatMessage({ id: 'button.addnew' })}
    </Button>
  );
};

export default CreateButton;
