import { useIntl } from "react-intl"
import { Tabs, Form as AntdForm } from 'antd'

import SaveCancelButton from "@reportify/components/Button/SaveCancelButton"

import { TFormTransParams, TAttendanceTransForm } from "@reportify/types"

import General from "./formContent/General"

type TCurrentSchedule = {
  id: number
  label: string
  day: string
  time: string
  class_name: string
  subject_name: string
  id_teaching_assignment: number
  id_class: number
} | null

type TFormProps = TFormTransParams<TAttendanceTransForm> & {
  currentSchedule?: TCurrentSchedule
  scheduleLoading?: boolean
  scheduleError?: boolean
  editMode?: boolean
}

const Form = ({
  formInstance,
  initialValues,
  onSubmit,
  onCancel,
  viewMode = false,
  createMode = false,
  currentSchedule,
  scheduleLoading,
  scheduleError,
  editMode = false
}: TFormProps) => {
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
              children: (
                <General 
                  viewMode={viewMode} 
                  createMode={createMode}
                  currentSchedule={currentSchedule}
                  scheduleLoading={scheduleLoading}
                  scheduleError={scheduleError}
                  editMode={editMode}
                />
              )
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
