import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import CreateButton from '@reportify/components/Button/CreateButton';

import List from './List';

const AssignmentPage = () => {
  const intl = useIntl();
  const navigate = useNavigate()
  
  const title = intl.formatMessage({ id: 'menu.tasks' });

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => navigate('/teacher/tasks/create')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <List />
    </>
  );
};

export default AssignmentPage;