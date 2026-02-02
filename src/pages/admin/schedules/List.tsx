import { Table, Form, Input, Select, TimePicker } from 'antd';
import { useIntl } from 'react-intl';
import { ColumnsType } from 'antd/es/table';

import TableAction from '@reportify/components/Actions/TableAction';
import SearchFilter from '@reportify/components/SearchFilter';

import { usePageListFilter } from '@reportify/hooks/ui';
import usePagination from '@reportify/hooks/ui/usePagination';

import { onEnter } from '@reportify/utils/Help';
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { tableWidth } from '@reportify/constant/tableWidth';

import { TScheduleListData, TScheduleListParams, TItemFilterDrawer } from '@reportify/types';

import useScheduleList from './hooks/useScheduleList';
import CmbTeacher from '@reportify/components/Combos/CmbTeacher';
import CmbClass from '@reportify/components/Combos/CmbClass';
import CmbSubject from '@reportify/components/Combos/CmbSubject';
import LinkTable from '@reportify/components/LinkTable';

const defaultFilter: TScheduleListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20,
  order: 'day',
  sort: 'asc'
}

const ScheduleList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TScheduleListParams>(
    'pageListSchedule',
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
  } = useScheduleList(dataFilter, page, pageSize, setDataFilter, resetPage);

  const dayOptions = [
    { label: 'Senin', value: 'senin' },
    { label: 'Selasa', value: 'selasa' },
    { label: 'Rabu', value: 'rabu' },
    { label: 'Kamis', value: 'kamis' },
    { label: 'Jumat', value: 'jumat' },
    { label: 'Sabtu', value: 'sabtu' },
  ]

  const columns: ColumnsType<TScheduleListData> = [
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
			title: intl.formatMessage({ id: 'menu.teachingassignment' }),
			dataIndex: 'id_teaching_assignment',
			sorter: true,
      className: 'center-header-left-content',
      render: (_text, record) => (
        <LinkTable to={`/admin/schedules/view/${record.id}`}>{record.id_teaching_assignment.label}</LinkTable>
      )  
		},
		{
			title: intl.formatMessage({ id: 'field.day' }),
			dataIndex: 'day',
			sorter: true,
      className: 'center-header-left-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.day}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.starttime' }),
			dataIndex: 'start_time',
			sorter: true,
      className: 'center-header-right-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.start_time}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.endtime' }),
			dataIndex: 'end_time',
			sorter: true,
      className: 'center-header-right-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.end_time}</div>
			),
		},
		{
			title: intl.formatMessage({ id: 'field.room' }),
			dataIndex: 'room',
			sorter: true,
      className: 'center-header-left-content',
			render: (_text, record) => (
				<div className="text-left cell-line-clamp">{record.room}</div>
			),
		},
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'menu.schedule' })}
          viewTo={`/admin/schedules/view/${record.id}`}
          editTo={`/admin/schedules/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },    
  ];

  const itemsDrawer: TItemFilterDrawer[] = [
    {
      name: 'id_user',
      label: intl.formatMessage({ id: 'menu.teachers' }),
      picker: <CmbTeacher onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'id_class',
      label: intl.formatMessage({ id: 'menu.classes' }),
      picker: <CmbClass onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'id_subject',
      label: intl.formatMessage({ id: 'menu.subjects' }),
      picker: <CmbSubject onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'day',
      label: intl.formatMessage({ id: 'field.day' }),
      picker: <Select options={dayOptions} onInputKeyDown={onEnter(onFilter)} placeholder={intl.formatMessage({ id: 'input.day' })} />
    },
    {
      name: 'time_range',
      label: intl.formatMessage({ id: 'field.teachingtime' }),
      picker: (
        <TimePicker.RangePicker 
          format='HH:mm'
          className='w-100'
          minuteStep={5}
          onChange={() => onEnter(onFilter)}
          placeholder={[
            intl.formatMessage({ id: 'field.starttime' }),
            intl.formatMessage({ id: 'field.endtime' }),
          ]}

        />
      )
    },
    {
      name: 'room',
      label: intl.formatMessage({ id: 'field.room' }),
      picker: <Input onPressEnter={onFilter} placeholder={intl.formatMessage({ id: 'input.room' })} />
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

export default ScheduleList;
