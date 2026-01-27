import { useIntl } from 'react-intl'
import { Table } from 'antd'
import { useCallback, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

import TableAction from '@reportify/components/Actions/TableAction'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'
import LinkTable from '@reportify/components/LinkTable'

import { tableWidth } from '@reportify/constant/tableWidth'

import { TLevelData, TLevelListParams } from '@reportify/types'

import useLevelList from './hooks/useLevelList'
import LevelModal from './components/DlgLevel'
import { usePageListFilter } from '@reportify/hooks/ui'
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst'
import usePagination from '@reportify/hooks/ui/usePagination'

const defaultFilter: TLevelListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const LevelList = () => {
  const intl = useIntl()

  const dlgLevel = useVisibilityHandler()

  const [selectedLevel, setSelectedLevel] = useState<TLevelData>()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create')

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TLevelListParams>(
    'pageLisTLevel',
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
  } = useLevelList(dataFilter, page, pageSize, setDataFilter, resetPage)

  const onClickView = useCallback(
    (record: TLevelData) => {
      setSelectedLevel(record)
      setModalMode('view')
      dlgLevel.show('modal')
    },
    [dlgLevel]
  )

  const onClickUpdate = useCallback(
    (record: TLevelData) => {
      setSelectedLevel(record)
      setModalMode('edit')
      dlgLevel.show('modal')
    },
    [dlgLevel]
  )

  const columns: ColumnsType<TLevelData> = [
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
            localId={intl.formatMessage({ id: 'menu.level' })}
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

      <LevelModal
        open={dlgLevel.isVisible('modal')}
        onClose={() => {
          dlgLevel.hide('modal')
          setSelectedLevel(undefined)
          setModalMode('create')
        }}
        id={selectedLevel?.id}
        mode={modalMode}
      />
    </>
  )
}

export default LevelList
