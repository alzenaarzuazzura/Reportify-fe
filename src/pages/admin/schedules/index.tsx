import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CreateButton from '@reportify/components/Button/CreateButton';

import List from './List';

const SchedulePage = () => {
  const intl = useIntl();
  const navigate = useNavigate()
  
  const title = intl.formatMessage({ id: 'menu.schedule' });

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => navigate('/admin/schedules/create')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <List />
    </>
  );
};

export default SchedulePage;
