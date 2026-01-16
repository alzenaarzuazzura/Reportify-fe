import { useIntl } from "react-intl"
import { Tabs, Form as AntdForm } from 'antd'

import SaveCancelButton from "@reportify/components/Button/SaveCancelButton"

import { TFormTransParams, TTeacherTransForm } from "@reportify/types"

import General from "./formContent/General"

const Form = ({
  formInstance,
  initialValues,
  onSubmit,
  onCancel,
  viewMode = false,
  createMode = false
}: TFormTransParams<TTeacherTransForm>) => {
  const intl = useIntl()

  return (
    <AntdForm
      layout="vertical"
      form={formInstance}
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <div className="card rounded">
        <Tabs 
          className="tabs"
          defaultActiveKey="general"
          items={[
            {
              label: intl.formatMessage({ id: 'field.general' }),
              key: 'general',
              className: 'pb-3',
              children: <General viewMode={viewMode} createMode={createMode} />
            }
          ]}
        />
        <div className="mb-3">
          {!viewMode && (
            <SaveCancelButton onSave={formInstance.submit} onCancel={onCancel} />
          )}
        </div>
      </div>
    </AntdForm>
  )
}

export default Form