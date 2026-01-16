import { useIntl } from 'react-intl';
import { Table, Tag, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import CmbRole from '@reportify/components/Combos/CmbRole';
import SearchFilter from '@reportify/components/SearchFilter';
import TableAction from '@reportify/components/Actions/TableAction';

import usePagination from '@reportify/hooks/ui/usePagination';
import usePageListFilter from '@reportify/hooks/ui/usePageListFilter';

import { onEnter } from '@reportify/utils/Help';
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { color } from '@reportify/constant/color';
import { tableWidth } from '@reportify/constant/tableWidth';

import { TItemFilterDrawer, TTeacherListData, TTeacherListParams, TUserRole } from '@reportify/types';

import useTeacherList from './hooks/useTeacherList';
import LinkTable from '@reportify/components/LinkTable';

const defaultFilter: TTeacherListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const TeacherList = () => {
  const intl = useIntl()

	const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TTeacherListParams>(
		'pageListTeacher',
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
  } = useTeacherList(dataFilter, page, pageSize, setDataFilter, resetPage);

  const columns: ColumnsType<TTeacherListData> = [
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
      title: intl.formatMessage({ id: 'field.name' }),
      dataIndex: 'name',
      ellipsis: true,
      sorter: true, 
      className: 'center-header-left-content',
      render: (text) => <div className="text-left cell-line-clamp">{text}</div>,      
    },
    {
      title: intl.formatMessage({ id: 'field.email' }),
      dataIndex: 'email',
      ellipsis: true,
      responsive: ['sm'],
      sorter: true, 
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`/teachers/view/${record.id}`}>{text}</LinkTable>
      )      
    },
    {
      title: intl.formatMessage({ id: 'field.role' }),
      dataIndex: 'role',
      width: 120,
      className: 'center-header-left-content',
      render: (role: TUserRole) => (
        <Tag color={role === 'admin' ? color.danger : color.success} bordered={false}>
          {role === 'admin' ? 'Admin' : 'Teacher'}
        </Tag>
      ),
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'field.teacher' })}
          viewTo={`/teachers/view/${record.id}`}
          editTo={`/teachers/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },
  ];

  const itemsDrawer: TItemFilterDrawer[] = [
    {
      name: 'role',
      label: intl.formatMessage({ id: 'field.role' }),
      picker: <CmbRole onInputKeyDown={onEnter(onFilter)}/>
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

export default TeacherList;
