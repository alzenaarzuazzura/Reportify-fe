import { Table, Form } from 'antd';
import { useIntl } from 'react-intl';
import { ColumnsType } from 'antd/es/table';

import TableAction from '@reportify/components/Actions/TableAction';
import CmbTeacher from '@reportify/components/Combos/CmbTeacher';
import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbSubject from '@reportify/components/Combos/CmbSubject';
import SearchFilter from '@reportify/components/SearchFilter';

import { usePageListFilter } from '@reportify/hooks/ui';
import usePagination from '@reportify/hooks/ui/usePagination';

import { onEnter } from '@reportify/utils/Help';
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { tableWidth } from '@reportify/constant/tableWidth';

import { TTeachingAssignmentListData, TTeachingAssignmentListParams, TItemFilterDrawer } from '@reportify/types';

import useTeachingAssignmentList from './hooks/useTeachingAssignmentList';
import LinkTable from '@reportify/components/LinkTable';

const defaultFilter: TTeachingAssignmentListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const TeachingAssignmentList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TTeachingAssignmentListParams>(
    'pageListTeachingAssignment',
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
    handleTableChange,
    formInstance,
    onFilter,
    onSearch,
    resetFilter,
  } = useTeachingAssignmentList(dataFilter, page, pageSize, setDataFilter, resetPage);

  const columns: ColumnsType<TTeachingAssignmentListData> = [
		{
			title: intl.formatMessage({ id: 'field.rownum' }),
			width: tableWidth.no,
			align: 'center',
			fixed: 'left',
			render: (_text, _record, index) => (
				<div className="text-right cell-line-clamp">
					{pageSize * (page - 1) + index + 1}
				</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.teacher' }),
			dataIndex: 'id_user',
			sorter: true,
      className: 'center-header-left-content',
      render: (_text, record) => (
        <LinkTable to={`/teaching-assignments/view/${record.id}`}>{record.id_user.label}</LinkTable>
      )  
		},
		{
			title: intl.formatMessage({ id: 'field.class' }),
			dataIndex: 'id_class',
			sorter: true,
      className: 'center-header-right-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.id_class.label}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'menu.subjects' }),
			dataIndex: 'id_subject',
			sorter: true,
      className: 'center-header-left-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.id_subject.label}</div>
			),
		},
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'menu.teachingassignment' })}
          viewTo={`/admin/teaching-assignments/view/${record.id}`}
          editTo={`/admin/teaching-assignments/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },    
  ];

  const itemsDrawer: TItemFilterDrawer[] = [
    {
      name: 'id_user',
      label: intl.formatMessage({ id: 'field.teacher' }),
      picker: <CmbTeacher onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'id_class',
      label: intl.formatMessage({ id: 'field.class' }),
      picker: <CmbClass onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'id_subject',
      label: intl.formatMessage({ id: 'menu.subjects' }),
      picker: <CmbSubject onInputKeyDown={onEnter(onFilter)}/>
    }
  ]  

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
        dataSource={data?.data || []}
        loading={isLoadingData}
        pagination={{
          current: data?.pagination?.page ?? 1,
          total: data?.pagination?.total ?? 0,
          pageSize,
          pageSizeOptions,
          onChange: onPageChange,
          onShowSizeChange: onPageSizeChange
        }}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default TeachingAssignmentList;
