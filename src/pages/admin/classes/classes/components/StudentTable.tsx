import { Table, TableProps } from 'antd'
import { useIntl } from 'react-intl'

import LinkTable from '@reportify/components/LinkTable'

import { TClassStudentData } from '@reportify/types'

type StudentTableProps = {
  data: TClassStudentData[]
}

const StudentTable = ({ data }: StudentTableProps) => {
  const intl = useIntl()

  const columns: TableProps<TClassStudentData>['columns'] = [
    {
      title: intl.formatMessage({ id: 'field.nis' }),
      dataIndex: 'nis',
      key: 'nis',
      className: 'center-header-right-content',
      render: (text, record) => (
        <LinkTable to={`admin/students/view/${record.id}`}>{text}</LinkTable>
      )               
    },
    {
      title: intl.formatMessage({ id: 'field.name' }),
      dataIndex: 'name',
      key: 'name',
      className: 'center-header-left-content',
      render: (text, record) => (
        <LinkTable to={`admin/students/view/${record.id}`}>{text}</LinkTable>
      )         
    },
    {
      title: intl.formatMessage({ id: 'field.studenttlp' }),
      dataIndex: 'student_telephone',
      key: 'student_telephone',
      render: (value: string | null) => value ?? '-',
      className: 'center-header-right-content',
    },
    {
      title: intl.formatMessage({ id: 'field.parenttlp' }),
      dataIndex: 'parent_telephone',
      key: 'parent_telephone',
      render: (value: string | null) => value ?? '-',
      className: 'center-header-right-content',
    },
  ]

  return (
    <Table<TClassStudentData>
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

export default StudentTable
