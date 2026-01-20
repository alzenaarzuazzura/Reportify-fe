import { Helmet } from "react-helmet-async"
import { useIntl } from "react-intl"
import Form from "./Form"
import useTeachingAssignmentCreate from "./hooks/useTeachingAssignmentCreate"

const Create = () => {
  const intl = useIntl()
  const { formInstance, onSubmit, onCancel } = useTeachingAssignmentCreate()

  const title = intl.formatMessage(
    { id: 'global.create' },
    { thing: intl.formatMessage({ id: 'menu.teachingassignment' }) }
  )

  return (
    <div>
      <Helmet>{title}</Helmet>
      <div className="title-underline">
        <h5>{title}</h5>
      </div>
      <Form
        formInstance={formInstance}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  )
}

export default Create
