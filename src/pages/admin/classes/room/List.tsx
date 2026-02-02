import { useIntl } from 'react-intl'
import { Table } from 'antd'
import { useCallback, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

import TableAction from '@reportify/components/Actions/TableAction'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'
import LinkTable from '@reportify/components/LinkTable'

import { tableWidth } from '@reportify/constant/tableWidth'

import { TRoomData, TRoomListParams } from '@reportify/types'

import useRoomList from './hooks/useRoomList'
import RoomModal from './components/DlgRoom'
import { usePageListFilter } from '@reportify/hooks/ui'
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst'
import usePagination from '@reportify/hooks/ui/usePagination'

const defaultFilter: TRoomListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const RoomList = () => {
  const intl = useIntl()

  const dlgRoom = useVisibilityHandler()

  const [selectedRoom, setSelectedRoom] = useState<TRoomData>()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create')

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TRoomListParams>(
    'pageLisTRoom',
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
  } = useRoomList(dataFilter, page, pageSize, setDataFilter, resetPage)

  const onClickView = useCallback(
    (record: TRoomData) => {
      setSelectedRoom(record)
      setModalMode('view')
      dlgRoom.show('modal')
    },
    [dlgRoom]
  )

  const onClickUpdate = useCallback(
    (record: TRoomData) => {
      setSelectedRoom(record)
      setModalMode('edit')
      dlgRoom.show('modal')
    },
    [dlgRoom]
  )

  const columns: ColumnsType<TRoomData> = [
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
            localId={intl.formatMessage({ id: 'menu.room' })}
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

      <RoomModal
        open={dlgRoom.isVisible('modal')}
        onClose={() => {
          dlgRoom.hide('modal')
          setSelectedRoom(undefined)
          setModalMode('create')
        }}
        id={selectedRoom?.id}
        mode={modalMode}
      />
    </>
  )
}

export default RoomList
