import { useIntl } from "react-intl"
import { Helmet } from "react-helmet-async"

import useAssignmentCreate from "./hooks/useAssignmentCreate"
import Form from "./Form"

const Create = () => {
    const intl = useIntl()
    const title = intl.formatMessage(
        { id: 'global.create'},
        { thing: intl.formatMessage({ id: 'field.assignment' })}
    )

    const { formInstance, onSubmit, onCancel } = useAssignmentCreate()

    return (
        <div>
            <Helmet>{title}</Helmet>
            <div className="title-underline">
              <h5 style={{ margin: 0 }}>{title}</h5>
            </div> 
            <Form 
                formInstance={formInstance}
                onCancel={onCancel}
                onSubmit={onSubmit}
                createMode={true}
            />           
        </div>
    )
}

export default Create