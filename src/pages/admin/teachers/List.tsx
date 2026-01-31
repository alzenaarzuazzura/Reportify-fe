import { useIntl } from 'react-intl';
import { Table, Tag, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import CmbRole from '@reportify/components/Combos/CmbRole';
import SearchFilter from '@reportify/components/SearchFilter';
import TableAction from '@reportify/components/Actions/TableAction';
import SendWaEmailButton from '@reportify/components/Button/SendWaEmailButton';
// import ImportExcelButton from '@reportify/components/ImportExcelButton';

import usePagination from '@reportify/hooks/ui/usePagination';
import usePageListFilter from '@reportify/hooks/ui/usePageListFilter';

import { onEnter } from '@reportify/utils/Help';
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { color } from '@reportify/constant/color';
import { tableWidth } from '@reportify/constant/tableWidth';

import { TItemFilterDrawer, TTeacherListData, TTeacherListParams, TUserRole } from '@reportify/types';

import useTeacherList from './hooks/useTeacherList';
import LinkTable from '@reportify/components/LinkTable';
// import { importFromExcel } from '@reportify/services/api/teacher';

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
      className: 'center-header-right-content',      
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
      render: (text, record) => (
        <LinkTable to={`/teachers/view/${record.id}`}>{text}</LinkTable>
      )  
    },
    {
      title: intl.formatMessage({ id: 'field.email' }),
      dataIndex: 'email',
      ellipsis: true,
      sorter: true, 
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`/teachers/view/${record.id}`}>{text}</LinkTable>
      )      
    },
    {
      title: intl.formatMessage({ id: 'field.tlp' }),
      dataIndex: 'phone',
      ellipsis: true,
      sorter: true, 
      align: 'center',
      className: 'center-header-right-content',      
      render: (text) => <div className="text-left cell-line-clamp">{text}</div>,      
    },    
    {
      title: intl.formatMessage({ id: 'field.role' }),
      dataIndex: 'role',
      width: 120,
      className: 'center-header-right-content',
      render: (role: TUserRole) => (
        <Tag color={role === 'admin' ? color.danger : color.success} bordered={false}>
          {role === 'admin' ? 'Admin' : 'Teacher'}
        </Tag>
      ),
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action + 50,
      render: (_text, record) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <TableAction 
            itemId={record.id} 
            localId={intl.formatMessage({ id: 'field.teacher' })}
            viewTo={`/admin/teachers/view/${record.id}`}
            editTo={`/admin/teachers/update/${record.id}`}
            onDelete={deleteData} 
          />
          {record.role === 'teacher' && (
            <SendWaEmailButton 
              teacherId={record.id}
              teacherName={record.name}
              phone={record.phone}
            />
          )}
        </div>
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
        <div className="col-24 d-flex justify-content-end">
          <div className="d-flex align-items-center gap-2">
            {/* Import di kiri */}
            {/* <ImportExcelButton
              queryKey={['dataList', 'teacher']}
              importFn={importFromExcel}
              templateInfo={{
                fileName: 'Reportify.xlsx',
                sheetName: 'Data Guru',
                columns: ['NAME', 'EMAIL', 'TELEPON', 'ROLE'],
              }}
            /> */}

            {/* Search di kanan */}
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
