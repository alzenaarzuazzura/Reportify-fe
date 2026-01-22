import { useIntl } from "react-intl"
import { Icon } from "@iconify/react"
import { Helmet } from "react-helmet-async"
import { Form as AntdForm, Spin } from "antd"
import { useNavigate, useParams } from "react-router-dom"

import BackDetailButton from "@reportify/components/Button/BackDetailButton"
import ActionsButton from "@reportify/components/Button/ActionButton"

import { TParamsId } from "@reportify/types"

import Form from "./Form"
import useTeacherView from "./hooks/useTeacherView"

const View = ({ isOnEdit = false }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { id } = useParams<TParamsId>()

  const [formInstance] = AntdForm.useForm()

  const { data, isSuccess, onSubmit, onDelete, onCancel } = useTeacherView(Number(id))

  const title = intl.formatMessage(
    { id: isOnEdit ? 'global.update' : 'global.view' },
    {
      thing: intl.formatMessage({ id: 'field.teacher' }),
      code: data?.data.name,
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

  // Convert TTeacherData to TTeacherTransForm
  const formInitialValues = data?.data ? {
    name: data.data.name,
    email: data.data.email,
    phone: data.data.phone,
    password: '',
    role: {
      value: data.data.role === 'admin' ? 1 : 2,
      label: data.data.role === 'admin' ? 'Admin' : 'Teacher'
    }
  } : undefined

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
            onEdit={() => navigate(`/teachers/update/${data?.data.id}`)}
          />
        </div>
        <Form 
            formInstance={formInstance}
            onCancel={onCancel}
            onSubmit={onSubmit}
            initialValues={formInitialValues}
            viewMode={!isOnEdit}
        />           
    </div>    
  )
}

export default View