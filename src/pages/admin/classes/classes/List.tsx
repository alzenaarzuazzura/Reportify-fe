import { Table, Form } from 'antd';
import { useIntl } from 'react-intl';
import { ColumnsType } from 'antd/es/table';

import TableAction from '@reportify/components/Actions/TableAction';
import CmbLevel from '@reportify/components/Combos/CmbLevel';
import CmbMajor from '@reportify/components/Combos/CmbMajor';
import CmbRombel from '@reportify/components/Combos/CmbRombel';
import SearchFilter from '@reportify/components/SearchFilter';

import { usePageListFilter } from '@reportify/hooks/ui';
import usePagination from '@reportify/hooks/ui/usePagination';

import { onEnter } from '@reportify/utils/Help';
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { tableWidth } from '@reportify/constant/tableWidth';

import { TClassListData, TClassListParams, TItemFilterDrawer } from '@reportify/types';

import useClassList from './hooks/useClassList';

const defaultFilter: TClassListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const ClassList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TClassListParams>(
    'pageListClass',
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
  } = useClassList(dataFilter, page, pageSize, setDataFilter, resetPage);

  const columns: ColumnsType<TClassListData> = [
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
			title: intl.formatMessage({ id: 'field.level' }),
			dataIndex: 'id_level',
			align: 'center',
			sorter: true,
			// width: tableWidth.combo,
      className: 'center-header-left-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.id_level.label}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.major' }),
			dataIndex: 'id_major',
			align: 'center',
			sorter: true,
			// width: tableWidth.combo,
      className: 'center-header-left-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.id_major.label}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.rombel' }),
			dataIndex: 'id_rombel',
			align: 'center',
			sorter: true,
			// width: tableWidth.combo,
      className: 'center-header-right-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.id_rombel.label}</div>
			),
		},
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'field.class' })}
          viewTo={`/admin/classes/view/${record.id}`}
          editTo={`/admin/classes/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },    
  ];

  const itemsDrawer: TItemFilterDrawer[] = [
    {
      name: 'level',
      label: intl.formatMessage({ id: 'field.level' }),
      picker: <CmbLevel onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'major',
      label: intl.formatMessage({ id: 'field.major' }),
      picker: <CmbMajor onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'rombel',
      label: intl.formatMessage({ id: 'field.rombel' }),
      picker: <CmbRombel onInputKeyDown={onEnter(onFilter)}/>
    }
  ]  

  return (
    <>
      <div className="row mb-3">
        <div className="col-24 d-flex justify-content-end align-items-center">
          <Form form={formInstance} component={false} initialValues={initialFilter} style={{ width: '100%', maxWidth: '260px' }}>
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

export default ClassList;
