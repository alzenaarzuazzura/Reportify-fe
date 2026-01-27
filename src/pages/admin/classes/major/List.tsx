import { useIntl } from 'react-intl'
import { Table, Form } from 'antd'
import { useCallback, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

import TableAction from '@reportify/components/Actions/TableAction'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'
import LinkTable from '@reportify/components/LinkTable'
import SearchBar from '@reportify/components/SearchBar'

import { tableWidth } from '@reportify/constant/tableWidth'

import { TMajorData, TMajorListParams } from '@reportify/types'

import useMajorList from './hooks/useMajorList'
import DlgMajor from './components/DlgMajor'
import { usePageListFilter } from '@reportify/hooks/ui'
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst'
import usePagination from '@reportify/hooks/ui/usePagination'

const defaultFilter: TMajorListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const List = () => {
  const intl = useIntl()

  const dlgMajor = useVisibilityHandler()

  const [selectedMajor, setSelectedMajor] = useState<TMajorData>()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create')

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TMajorListParams>(
    'pageLisTMajor',
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
    onSearch,
  } = useMajorList(dataFilter, page, pageSize, setDataFilter, resetPage)

  const onClickView = useCallback(
    (record: TMajorData) => {
      setSelectedMajor(record)
      setModalMode('view')
      dlgMajor.show('modal')
    },
    [dlgMajor]
  )

  const onClickUpdate = useCallback(
    (record: TMajorData) => {
      setSelectedMajor(record)
      setModalMode('edit')
      dlgMajor.show('modal')
    },
    [dlgMajor]
  )

  const columns: ColumnsType<TMajorData> = [
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
      title: intl.formatMessage({id: 'field.code' }),
      dataIndex: 'code',
      width: 120,
      sorter: true,
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable onClick={() => onClickView(record)}>{text}</LinkTable>
      )
    },
    {
      title: intl.formatMessage({id: 'menu.major' }),
      dataIndex: 'name',
      ellipsis: true,
      sorter: true,
      className: 'center-header-left-content',
      render: (text) => <div className="text-left cell-line-clamp">{text}</div>,
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
          <TableAction 
            itemId={record.id} 
            localId={intl.formatMessage({ id: 'menu.major' })}
            viewTo='#'
            editTo='#'
            onView={() => onClickView(record)}
            onEdit={() => onClickUpdate(record)}
            onDelete={deleteData} 
          />
      ),
    },
  ]

  return (
    <>
      <div className="row mb-3">
        <div className="col-24 d-flex justify-content-end align-items-center">
          <Form form={formInstance} component={false}>
            <SearchBar 
              onSearch={onSearch}
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

      <DlgMajor
        open={dlgMajor.isVisible('modal')}
        onClose={() => {
          dlgMajor.hide('modal')
          setSelectedMajor(undefined)
          setModalMode('create')
        }}
        id={selectedMajor?.id}
        mode={modalMode}
      />
    </>
  )
}

export default List
