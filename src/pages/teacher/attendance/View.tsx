import { TParamsId } from "@reportify/types"
import { Form as AntdForm, Spin, Result, Button } from "antd"
import { useIntl } from "react-intl"
import { useNavigate, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Helmet } from "react-helmet-async"
import dayjs from "dayjs"

import useAttendanceView from "./hooks/useAttendanceView"
import Form from "./Form"
import BackDetailButton from "@reportify/components/Button/BackDetailButton"
import ActionsButton from "@reportify/components/Button/ActionButton"

const View = ({ isOnEdit = false }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { id } = useParams<TParamsId>()

  const [formInstance] = AntdForm.useForm()

  const { data, isSuccess, isLoading, onSubmit, onDelete, onCancel } = useAttendanceView(Number(id))

  const title = intl.formatMessage(
    { id: isOnEdit ? 'global.update' : 'global.view' },
    {
      thing: intl.formatMessage({ id: 'attendance.title' }),
      code: data ? dayjs(data.date).format('DD/MM/YYYY') : '',
    }
  )

  const menuOther = {
    items: [
      {
        key: 'delete',
        icon: <Icon icon="lucide:trash" />,
        label: intl.formatMessage({ id: 'button.delete' }),
        onClick: onDelete,
      },
    ],
  }

  // Convert API data to form format with safe access
  const formInitialValues = data ? {
    id_student: data.student ? { 
      label: data.student.name, 
      value: data.student.id 
    } : undefined,
    id_teaching_assignment: data.teaching_assignment ? {
      label: `${data.teaching_assignment.subject?.name || ''} - ${data.teaching_assignment.class?.level?.name || ''} ${data.teaching_assignment.class?.major?.code || ''} ${data.teaching_assignment.class?.rombel?.name || ''}`,
      value: data.teaching_assignment.id
    } : undefined,
    id_schedule: data.schedule ? {
      label: `${data.schedule.day || ''} ${data.schedule.start_time || ''}-${data.schedule.end_time || ''}`,
      value: data.schedule.id
    } : undefined,
    date: data.date ? dayjs(data.date) : undefined,
    status: data.status,
    note: data.note || ''
  } : undefined

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <Spin size="large" />
      </div>
    )
  }

  if (!isSuccess || !data) {
    return (
      <Result
        status="404"
        title="Data tidak ditemukan"
        subTitle="Data absensi yang Anda cari tidak ditemukan."
        extra={
          <Button type="primary" onClick={() => navigate('/teacher/attendance')}>
            Kembali ke Daftar
          </Button>
        }
      />
    )
  }

  return (
    <div>
        <Helmet><title>{title}</title></Helmet>
        <div className="title-underline">
          <h5 className="heading-back">
            {!isOnEdit && <BackDetailButton onCancel={onCancel} />}
            {title}
          </h5>
        </div> 
        <div className="text-right mb-3">
          <ActionsButton 
            editButton={!isOnEdit}
            moreMenu={menuOther}
            onEdit={() => navigate(`/teacher/attendance/update/${data.id}`)}
          />
        </div>
        <Form 
            formInstance={formInstance}
            onCancel={onCancel}
            onSubmit={onSubmit}
            initialValues={formInitialValues}
            viewMode={!isOnEdit}
            editMode={isOnEdit}
        />           
    </div>    
  )
}

export default View
