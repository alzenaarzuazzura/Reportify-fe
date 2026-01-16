import { useIntl } from 'react-intl'
import { Table, Form } from 'antd'
import { useCallback, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'

import TableAction from '@reportify/components/Actions/TableAction'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'
import LinkTable from '@reportify/components/LinkTable'
import SearchBar from '@reportify/components/SearchBar'

import { tableWidth } from '@reportify/constant/tableWidth'

import { TSubjectData, TSubjectListData, TSubjectListParams } from '@reportify/types/data/subject'

import useSubjectList from './hooks/useSubjectList'
import SubjectModal from './components/SubjectFormModal'
import { usePageListFilter } from '@reportify/hooks/ui'
import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst'
import usePagination from '@reportify/hooks/ui/usePagination'

const defaultFilter: TSubjectListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

const SubjectList = () => {
  const intl = useIntl()

  const dlgSubject = useVisibilityHandler()

  const [selectedSubject, setSelectedSubject] = useState<TSubjectData>()
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('create')

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TSubjectListParams>(
    'pageListSubject',
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
  } = useSubjectList(dataFilter, page, pageSize, setDataFilter, resetPage)

  const onClickView = useCallback(
    (record: TSubjectData) => {
      setSelectedSubject(record)
      setModalMode('view')
      dlgSubject.show('modal')
    },
    [dlgSubject]
  )

  const onClickUpdate = useCallback(
    (record: TSubjectData) => {
      setSelectedSubject(record)
      setModalMode('edit')
      dlgSubject.show('modal')
    },
    [dlgSubject]
  )

  const columns: ColumnsType<TSubjectListData> = [
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
      title: intl.formatMessage({id: 'menu.subjects' }),
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
            localId={intl.formatMessage({ id: 'menu.subjects' })}
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

      <SubjectModal
        open={dlgSubject.isVisible('modal')}
        onClose={() => {
          dlgSubject.hide('modal')
          setSelectedSubject(undefined)
          setModalMode('create')
        }}
        id={selectedSubject?.id}
        mode={modalMode}
      />
    </>
  )
}

export default SubjectList
