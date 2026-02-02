import { TParamsId } from "@reportify/types"
import { Form as AntdForm, Spin } from "antd"
import { useIntl } from "react-intl"
import { useNavigate, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import { Helmet } from "react-helmet-async"
import dayjs from "dayjs"

import useAnnouncementView from "./hooks/useAnnouncementView"
import Form from "./Form"
import BackDetailButton from "@reportify/components/Button/BackDetailButton"
import ActionsButton from "@reportify/components/Button/ActionButton"

const View = ({ isOnEdit = false }) => {
  const intl = useIntl()
  const navigate = useNavigate()
  const { id } = useParams<TParamsId>()

  const [formInstance] = AntdForm.useForm()

  const { data, isSuccess, isLoading, onSubmit, onDelete, onCancel } = useAnnouncementView(Number(id))

  const title = intl.formatMessage(
    { id: isOnEdit ? 'global.update' : 'global.view' },
    {
      thing: intl.formatMessage({ id: 'menu.announcements' }),
      code: data?.title || '',
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
    title: data.title,
    content: data.content,
    announcement_date: dayjs(data.announcement_date),
  } : undefined

  if (isLoading) return <Spin />

  if (!isSuccess || !data) return null

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
            onEdit={() => navigate(`/teacher/announcements/update/${data.id}`)}
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
