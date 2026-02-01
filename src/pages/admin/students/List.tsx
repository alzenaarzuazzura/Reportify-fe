import { Table, Form } from 'antd';
import { useIntl } from 'react-intl';
import { ColumnsType } from 'antd/es/table';

import TableAction from '@reportify/components/Actions/TableAction';
import CmbLevel from '@reportify/components/Combos/CmbLevel';
import CmbMajor from '@reportify/components/Combos/CmbMajor';
import CmbRombel from '@reportify/components/Combos/CmbRombel';
import SearchFilter from '@reportify/components/SearchFilter';
import LinkTable from '@reportify/components/LinkTable';
import CmbClass from '@reportify/components/Combos/CmbClass';
// import ImportExcelButton from '@reportify/components/ImportExcelButton';

import { usePageListFilter } from '@reportify/hooks/ui';
import usePagination from '@reportify/hooks/ui/usePagination';

import { onEnter } from '@reportify/utils/Help';

import { tableWidth } from '@reportify/constant/tableWidth';

import { TStudentListData, TStudentListParams, TItemFilterDrawer } from '@reportify/types';

import useStudentList from './hooks/useStudentList';
// import { importFromExcel } from '@reportify/services/api/student';

const defaultFilter: TStudentListParams = {
  order: 'nis',
  sort: 'asc',
  page: 1,
  limit: 20
}

const ClassList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TStudentListParams>(
    'pageLisTStudent',
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
  } = useStudentList(dataFilter, page, pageSize, setDataFilter, resetPage);

  const columns: ColumnsType<TStudentListData> = [
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
      title: intl.formatMessage({ id: 'field.nis' }),
      dataIndex: 'nis',
      ellipsis: true,
      sorter: true, 
      className: 'center-header-right-content',
      render: (text, record) => (
        <LinkTable to={`view/${record.id}`}>{text}</LinkTable>
      )      
    },
    {
      title: intl.formatMessage({ id: 'field.name' }),
      dataIndex: 'name',
      ellipsis: true,
      sorter: true, 
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`view/${record.id}`}>{text}</LinkTable>
      )   
    },
    {
      title: intl.formatMessage({ id: 'field.class' }),
      dataIndex: 'id_class',
      align: 'center',
      className: 'center-header-right-content',
      render: (_text, record) => (
        <div className="text-left cell-line-clamp">{record.id_class.label}</div>
      ),
    },
    {
      title: intl.formatMessage({ id: 'field.parenttlp' }),
      dataIndex: 'parent_telephone',
      ellipsis: true,
      className: 'center-header-right-content',
      render: (text) => <div className="text-left cell-line-clamp">{text}</div>,      
    },
    {
      title: intl.formatMessage({ id: 'field.studenttlp' }),
      dataIndex: 'student_telephone',
      ellipsis: true,
      className: 'center-header-right-content',
      render: (text) => <div className="text-left cell-line-clamp">{text}</div>,      
    },        
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
        <TableAction 
          itemId={record.id} 
          localId={intl.formatMessage({ id: 'field.class' })}
          viewTo={`/admin/students/view/${record.id}`}
          editTo={`/admin/students/update/${record.id}`}
          onDelete={deleteData} 
        />
      ),
    },    
  ];

  const itemsDrawer: TItemFilterDrawer[] = [
    {
      name: 'class',
      label: intl.formatMessage({ id: 'field.class' }),
      picker: <CmbClass onInputKeyDown={onEnter(onFilter)}/>
    },
    {
      name: 'level',
      label: intl.formatMessage({ id: 'field.major' }),
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
        <div className="col-24 d-flex justify-content-end">
          <div className="d-flex align-items-center gap-2">
            {/* Import di kiri */}
            {/* <ImportExcelButton
              queryKey={['dataList', 'student']}
              importFn={importFromExcel}
              templateInfo={{
                fileName: 'Reportify.xlsx',
                sheetName: 'Data Siswa',
                columns: ['NIS', 'NAMA', 'KELAS', 'TELPON ORANGTUA', 'TELPON MURID'],
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

export default ClassList;
