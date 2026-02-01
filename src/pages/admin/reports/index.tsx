import { Tabs } from 'antd';

import AttendanceReport from './attendance';
import AssignmentReport from './assignment';
import { useIntl } from 'react-intl';

const Reports = () => {
  const intl = useIntl()

  const items = [
    {
      key: 'attendance',
      label: intl.formatMessage({ id: 'field.attendancereport' }),
      children: <AttendanceReport />,
    },
    {
      key: 'assignment',
      label: intl.formatMessage({ id: 'field.assignmentreport' }),
      children: <AssignmentReport />,
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="attendance"
        className='kit-tabs-bold'
        items={items}
        size="large"
      />
    </div>
  );
};

export default Reports;
