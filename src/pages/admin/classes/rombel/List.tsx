import { useIntl } from 'react-intl'
import { Table } from 'antd'
import { useCallback, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

import TableAction from '@reportify/components/Actions/TableAction'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'
import LinkTable from '@reportify/components/LinkTable'

import { tableWidth } from '@reportify/constant/tableWidth'

import { TRombelData, TRombelListParams } from '@reportify/types'

import useRombelList from './hooks/useRombelList'
import DlgRombel from './components/DlgRombel'
import { usePageListFilter } from '@reportify/hooks/ui'
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst'
import usePagination from '@reportify/hooks/ui/usePagination'

const defaultFilter: TRombelListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const RombelList = () => {
  const intl = useIntl()

  const dlgRombel = useVisibilityHandler()

  const [selectedRombel, setSelectedRombel] = useState<TRombelData>()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create')

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TRombelListParams>(
    'pageLisTRombel',
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
  } = useRombelList(dataFilter, page, pageSize, setDataFilter, resetPage)

  const onClickView = useCallback(
    (record: TRombelData) => {
      setSelectedRombel(record)
      setModalMode('view')
      dlgRombel.show('modal')
    },
    [dlgRombel]
  )

  const onClickUpdate = useCallback(
    (record: TRombelData) => {
      setSelectedRombel(record)
      setModalMode('edit')
      dlgRombel.show('modal')
    },
    [dlgRombel]
  )

  const columns: ColumnsType<TRombelData> = [
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
      title: intl.formatMessage({id: 'field.name' }),
      dataIndex: 'name',
      sorter: true,
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable onClick={() => onClickView(record)}>{text}</LinkTable>
      )
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      align: 'center',
      width: tableWidth.action,
      render: (_text, record) => (
          <TableAction 
            itemId={record.id} 
            localId={intl.formatMessage({ id: 'menu.rombel' })}
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

      <DlgRombel
        open={dlgRombel.isVisible('modal')}
        onClose={() => {
          dlgRombel.hide('modal')
          setSelectedRombel(undefined)
          setModalMode('create')
        }}
        id={selectedRombel?.id}
        mode={modalMode}
      />
    </>
  )
}

export default RombelList
