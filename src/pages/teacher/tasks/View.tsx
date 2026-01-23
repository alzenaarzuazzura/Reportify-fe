import { TParamsId } from "@reportify/types"
import { Form as AntdForm, Spin } from "antd"
import { useIntl } from "react-intl"
import { useNavigate, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Helmet } from "react-helmet-async"
import dayjs from "dayjs"

import useAssignmentView from "./hooks/useAssignmentView"
import Form from "./Form"
import BackDetailButton from "@reportify/components/Button/BackDetailButton"
import ActionsButton from "@reportify/components/Button/ActionButton"
import StudentSubmissions from "./components/StudentSubmissions"

const View = ({ isOnEdit = false }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { id } = useParams<TParamsId>()

  const [formInstance] = AntdForm.useForm()

  const { data, isSuccess, isLoading, onSubmit, onDelete, onCancel, handleStudentSubmissionUpdate } = useAssignmentView(Number(id))

  const title = intl.formatMessage(
    { id: isOnEdit ? 'global.update' : 'global.view' },
    {
      thing: intl.formatMessage({ id: 'field.assignment' }),
      code: data?.assignment_title || '',
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

  // Convert API data to form format
  const formInitialValues = data ? {
    id_teaching_assignment: {
      value: data.id_teaching_assignment,
      label: `${data.teaching_assignment.subject.name} - ${data.teaching_assignment.class.level.name} ${data.teaching_assignment.class.major.code} ${data.teaching_assignment.class.rombel.name}`
    },
    assignment_title: data.assignment_title,
    assignment_desc: data.assignment_desc,
    deadline: dayjs(data.deadline),
    student_ids: data.student_assignments.map(sa => sa.id_student)
  } : undefined

  if (isLoading) return <Spin />

  if (!isSuccess || !data) return null

  const classId = data.teaching_assignment.class.id

  return (
    <div>
        <Helmet>{title}</Helmet>
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
            onEdit={() => navigate(`/tasks/update/${data.id}`)}
          />
        </div>
        <Form 
            formInstance={formInstance}
            onCancel={onCancel}
            onSubmit={onSubmit}
            initialValues={formInitialValues}
            viewMode={!isOnEdit}
        />
        
        {/* Student Submissions - Show in view mode */}
        {!isOnEdit && (
            <div className="mt-4">
                <StudentSubmissions
                    assignmentId={data.id}
                    onUpdate={handleStudentSubmissionUpdate}
                    viewMode={false}
                />
            </div>
        )}           
    </div>    
  )
}

export default View
