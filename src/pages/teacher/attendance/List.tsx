import { useIntl } from 'react-intl';
import { Tag, Form, Table, Card, Collapse, Badge, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Icon } from '@iconify/react';

import TableAction from '@reportify/components/Actions/TableAction';
import SearchFilter from '@reportify/components/SearchFilter';

import usePageListFilter from '@reportify/hooks/ui/usePageListFilter';
import usePagination from '@reportify/hooks/ui/usePagination';

import { defaultFilterSortMaster } from '@reportify/utils/GlobalConst';

import { TAttendanceData, TAttendanceListParams, TItemFilterDrawer } from '@reportify/types';

import useAttendanceList from './hooks/useAttendanceList';

const defaultFilter: TAttendanceListParams = {
  ...defaultFilterSortMaster,
  page: 1,
  limit: 20
}

// Type for grouped attendance
type TGroupedAttendance = {
  key: string
  date: string
  dateFormatted: string
  className: string
  subjectName: string
  scheduleInfo: string
  totalStudents: number
  hadirCount: number
  izinCount: number
  alfaCount: number
  students: TAttendanceData[]
}

const AttendanceList = () => {
  const intl = useIntl();

  const [dataFilter, setDataFilter, initialFilter] = usePageListFilter<TAttendanceListParams>(
    'pageListAttendance',
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
  } = useAttendanceList(dataFilter, setDataFilter, resetPage);

  // Group attendance by class + date + schedule
  const groupedData = useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return []
    
    const groups: Record<string, TGroupedAttendance> = {}
    
    data.forEach((item) => {
      const ta = item.teaching_assignment
      const className = ta?.class 
        ? `${ta.class.level?.name || ''} ${ta.class.major?.code || ''} ${ta.class.rombel?.name || ''}`.trim()
        : 'Unknown'
      const subjectName = ta?.subject?.name || 'Unknown'
      const dateKey = dayjs(item.date).format('YYYY-MM-DD')
      const scheduleId = item.id_schedule
      
      const groupKey = `${dateKey}-${item.id_teaching_assignment}-${scheduleId}`
      
      if (!groups[groupKey]) {
        groups[groupKey] = {
          key: groupKey,
          date: dateKey,
          dateFormatted: dayjs(item.date).format('DD MMMM YYYY'),
          className,
          subjectName,
          scheduleInfo: item.schedule 
            ? `${item.schedule.day} ${item.schedule.start_time}-${item.schedule.end_time}` 
            : '',
          totalStudents: 0,
          hadirCount: 0,
          izinCount: 0,
          alfaCount: 0,
          students: []
        }
      }
      
      groups[groupKey].students.push(item)
      groups[groupKey].totalStudents++
      if (item.status === 'hadir') groups[groupKey].hadirCount++
      else if (item.status === 'izin') groups[groupKey].izinCount++
      else if (item.status === 'alfa') groups[groupKey].alfaCount++
    })
    
    // Sort by date descending
    return Object.values(groups).sort((a, b) => 
      dayjs(b.date).valueOf() - dayjs(a.date).valueOf()
    )
  }, [data])

  // Columns for student detail table
  const studentColumns: ColumnsType<TAttendanceData> = [
    {
      title: 'No',
      width: 50,
      align: 'center',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'NIS',
      dataIndex: ['student', 'nis'],
      key: 'nis',
      width: 100,
    },
    {
      title: intl.formatMessage({ id: 'field.student' }),
      dataIndex: ['student', 'name'],
      key: 'student_name',
      width: 200,
    },
    {
      title: intl.formatMessage({ id: 'field.attendancestatus' }),
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        let tagColor = 'default'
        let icon = 'lucide:help-circle'
        if (status === 'hadir') { tagColor = 'success'; icon = 'lucide:check' }
        else if (status === 'izin') { tagColor = 'warning'; icon = 'lucide:clock' }
        else if (status === 'alfa') { tagColor = 'error'; icon = 'lucide:x' }
        
        return (
          <Tag color={tagColor}>
            <Icon icon={icon} className="me-1" style={{ fontSize: 12 }} />
            {status?.toUpperCase()}
          </Tag>
        )
      }
    },
    {
      title: intl.formatMessage({ id: 'field.note' }),
      dataIndex: 'note',
      key: 'note',
      width: 200,
      render: (note: string) => note || '-'
    },
    {
      title: intl.formatMessage({ id: 'field.action' }),
      key: 'action',
      width: 100,
      render: (_: any, record: TAttendanceData) => (
        <TableAction
          itemId={record.id}
          localId={intl.formatMessage({ id: 'field.attendance' })}
          viewTo={`/attendance/view/${record.id}`}
          editTo={`/attendance/update/${record.id}`}
          onDelete={deleteData}
        />
      )
    }
  ]

  const itemsDrawer: TItemFilterDrawer[] = []

  // Render collapse items
  const collapseItems = groupedData.map((group) => ({
    key: group.key,
    label: (
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <Tag color="blue">{group.dateFormatted}</Tag>
          <strong>{group.subjectName}</strong>
          <span className="text-muted">-</span>
          <span>{group.className}</span>
          {group.scheduleInfo && (
            <Tag color="default" style={{ fontSize: 11 }}>
              <Icon icon="lucide:clock" className="me-1" style={{ fontSize: 10 }} />
              {group.scheduleInfo}
            </Tag>
          )}
        </div>
        <Space size="small">
          <Badge count={group.hadirCount} style={{ backgroundColor: '#52c41a' }} title="Hadir" />
          <Badge count={group.izinCount} style={{ backgroundColor: '#faad14' }} title="Izin" />
          <Badge count={group.alfaCount} style={{ backgroundColor: '#ff4d4f' }} title="Alfa" />
          <span className="text-muted ms-2">({group.totalStudents} siswa)</span>
        </Space>
      </div>
    ),
    children: (
      <Table
        rowKey="id"
        columns={studentColumns}
        dataSource={group.students}
        pagination={false}
        size="small"
      />
    )
  }))

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

      {isLoadingData ? (
        <Card loading />
      ) : groupedData.length === 0 ? (
        <Card>
          <div className="text-center text-muted py-4">
            <Icon icon="lucide:calendar-x" style={{ fontSize: 48, opacity: 0.5 }} />
            <p className="mt-2">Belum ada data absensi</p>
          </div>
        </Card>
      ) : (
        <Collapse 
          items={collapseItems}
          defaultActiveKey={groupedData.length > 0 ? [groupedData[0].key] : []}
          accordion={false}
        />
      )}
    </>
  )
}

export default AttendanceList
