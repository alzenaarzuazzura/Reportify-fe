import { useIntl } from 'react-intl';
import { Table, Form, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import TableAction from '@reportify/components/Actions/TableAction';
import SearchFilter from '@reportify/components/SearchFilter';
import LinkTable from '@reportify/components/LinkTable';

import usePageListFilter from '@reportify/hooks/ui/usePageListFilter';
import usePagination from '@reportify/hooks/ui/usePagination';

import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { tableWidth } from '@reportify/constant/tableWidth';
import { color } from '@reportify/constant/color';

import { TAssignmentListData, TAssignmentListParams, TItemFilterDrawer } from '@reportify/types';

import useAssignmentList from './hooks/useAssignmentList';

const defaultFilter: TAssignmentListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const AssignmentList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TAssignmentListParams>(
    'pageListAssignment',
    defaultFilter,
  )    

  const { page, pageSize, pageSizeOptions, onPageChange, onPageSizeChange, resetPage } =
    usePagination({
      initialPage: initialFilter.page,
      initialPageSize: initialFilter.limit,
    })    

  const {
    data,
    isLoadingData,
    deleteData,
    formInstance,
    onFilter,
    onSearch,
    resetFilter,
  } = useAssignmentList(dataFilter, setDataFilter, resetPage);

  const columns: ColumnsType<TAssignmentListData> = [
    {
      title: intl.formatMessage({ id: 'field.rownum' }),
      width: tableWidth.no,
      align: 'center',
      fixed: 'left',
      render: (_text, _record, index) => (
        <div className="text-right cell-line-clamp">
          {index + 1}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'field.assignmenttitle' }),
      dataIndex: 'assignment_title',
      ellipsis: true,
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`/tasks/view/${record.id}`}>{text}</LinkTable>
      )      
    },
    {
      title: intl.formatMessage({ id: 'field.subject' }),
      ellipsis: true,
      className: 'center-header-left-content',
      render: (_text, record) => (
        <div className="text-left cell-line-clamp">
          {record.teaching_assignment.subject.name}
        </div>
      ),      
    },
    {
      title: intl.formatMessage({ id: 'field.class' }),
      align: 'center',
      className: 'center-header-left-content',
      render: (_text, record) => {
        const classData = record.teaching_assignment.class;
        return (
          <div className="text-left cell-line-clamp">
            {`${classData.level.name} ${classData.major.code} ${classData.rombel.name}`}
          </div>
        )
      },
    },
    {
      title: intl.formatMessage({ id: 'field.deadline' }),
      dataIndex: 'deadline',
      ellipsis: true,
      className: 'center-header-left-content',
      render: (text) => {
        const deadlineDate = dayjs(text);
        const isOverdue = deadlineDate.isBefore(dayjs(), 'day');
        return (
          <Tag color={isOverdue ? color.danger : color.success} bordered={false}>
            {deadlineDate.format('DD/MM/YYYY')}
          </Tag>
        )
      },      
    },
    {
      title: intl.formatMessage({ id: 'field.submitstatus' }),
      align: 'center',
      className: 'center-header-left-content',
      render: (_text, record) => {
        const submitted = record.student_assignments.filter(sa => sa.status).length;
        const total = record.student_assignments.length;
        return (
          <div className="text-center">
            {submitted}/{total}
          </div>
        )
      },
    },        
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'field.assignment' })}
          viewTo={`/tasks/view/${record.id}`}
          editTo={`/tasks/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },    
  ];

  const itemsDrawer: TItemFilterDrawer[] = []

  return (
    <>
      <div className="row mb-3">
        <div className="col-24 d-flex justify-content-end align-items-center">
          <Form form={formInstance} component={false} initialValues={initialFilter}>
            <SearchFilter
              onSearch={onSearch}
              onFilter={onFilter}
              onReset={resetFilter}
              items={itemsDrawer}
              formInstance={formInstance}
              searchName="search"
            />
          </Form>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        loading={isLoadingData}
        pagination={{
          current: page,
          total: Array.isArray(data) ? data.length : 0,
          pageSize,
          pageSizeOptions,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange
        }}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default AssignmentList;
