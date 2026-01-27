import { useIntl } from 'react-intl';
import { Table, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import TableAction from '@reportify/components/Actions/TableAction';
import SearchFilter from '@reportify/components/SearchFilter';
import LinkTable from '@reportify/components/LinkTable';

import usePageListFilter from '@reportify/hooks/ui/usePageListFilter';
import usePagination from '@reportify/hooks/ui/usePagination';

import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { tableWidth } from '@reportify/constant/tableWidth';

import { TAnnouncementListData, TAnnouncementListParams, TItemFilterDrawer } from '@reportify/types';

import useAnnouncementList from './hooks/useAnnouncementList';

const defaultFilter: TAnnouncementListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const AnnouncementList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TAnnouncementListParams>(
    'pageListAnnouncement',
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
  } = useAnnouncementList(dataFilter, setDataFilter, resetPage);

  const columns: ColumnsType<TAnnouncementListData> = [
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
      title: intl.formatMessage({ id: 'field.title' }),
      dataIndex: 'title',
      ellipsis: true,
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`/announcements/view/${record.id}`}>{text}</LinkTable>
      )      
    },
    {
      title: intl.formatMessage({ id: 'field.desc' }),
      dataIndex: 'content',
      ellipsis: true,
      className: 'center-header-left-content',
      render: (text) => (
        <div className="text-left cell-line-clamp">{text}</div>
      ),      
    },
    {
      title: intl.formatMessage({ id: 'field.date' }),
      dataIndex: 'announcement_date',
      ellipsis: true,
      className: 'center-header-right-content',
      render: (text) => (
        <div className="text-left cell-line-clamp">
          {dayjs(text).format('DD/MM/YYYY')}
        </div>
      ),      
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'menu.announcements' })}
          viewTo={`/teacher/announcements/view/${record.id}`}
          editTo={`/teacher/announcements/update/${record.id}`}
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

export default AnnouncementList;
