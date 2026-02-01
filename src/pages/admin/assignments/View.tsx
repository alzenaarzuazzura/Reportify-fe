import { TParamsId } from "@reportify/types"
import { Form as AntdForm, Spin } from "antd"
import { useIntl } from "react-intl"
import { useNavigate, useParams } from "react-router-dom"
import useTeachingAssignmentView from "./hooks/useTeachingAssignmentView"
import { Icon } from "@iconify/react"
import { Helmet } from "react-helmet-async"
import Form from "./Form"
import BackDetailButton from "@reportify/components/Button/BackDetailButton"
import ActionsButton from "@reportify/components/Button/ActionButton"

const View = ({ isOnEdit = false }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { id } = useParams<TParamsId>()

  const [formInstance] = AntdForm.useForm()

  const { data, isSuccess, onSubmit, onDelete, onCancel } = useTeachingAssignmentView(Number(id))

  const title = intl.formatMessage(
    { id: isOnEdit ? 'global.update' : 'global.view' },
    {
      thing: intl.formatMessage({ id: 'menu.teachingassignment' }),
      code: `${data?.data.id_user.label} - ${data?.data.id_class?.label} - ${data?.data.id_subject?.label}`,
    }
  )

    const menuOther = {
        items: [
            {
                key: 'void',
                icon: <Icon icon="lucide:trash" />,
                label: intl.formatMessage({ id: 'button.delete' }),
                onClick: onDelete,
            },
        ],
    }

    if (!isSuccess) return <Spin />

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
            onEdit={() => navigate(`/teaching-assignments/update/${data?.data.id}`)}
          />
        </div>
        <Form 
            key={`${data?.data.id}-${data?.data.id_user?.label}-${data?.data.id_class?.label}-${data?.data.id_subject?.label}`}
            formInstance={formInstance}
            onCancel={onCancel}
            onSubmit={onSubmit}
            initialValues={data?.data}
            viewMode={!isOnEdit}
            excludeId={isOnEdit ? data?.data.id : undefined}
        />           
    </div>    
  )
}

export default View
