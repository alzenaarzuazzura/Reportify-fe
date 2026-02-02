import useCreateData from "@reportify/hooks/mutations/useCreateData"
import { create } from "@reportify/services/api/schedule"
import { TScheduleData, TSchedulePostData, TScheduleTransForm } from "@reportify/types"
import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useScheduleCreate = () => {
  const navigate = useNavigate()
  const [formInstance] = Form.useForm()

  const { createData } = useCreateData<TScheduleData, TSchedulePostData>({
    menu: 'schedules',
    menuId: 'menu.schedule',
    baseRoute: 'admin',
    createFn: create,
    onSuccess: () => formInstance.resetFields(),
  })

  const onSubmit = useCallback(
    (formData: TScheduleTransForm) => {
      const data: TSchedulePostData = {
        id_teaching_assignment: formData.id_teaching_assignment?.value,
        day: formData.day,
        start_time: formData.start_time,
        end_time: formData.end_time,
        id_room: formData.id_room?.value,
      }

      createData(data)
    },
    [createData]
  )

  const onCancel = useCallback(
    () => navigate('/admin/schedules'),
    [navigate]
  )

  return { formInstance, onSubmit, onCancel }
}

export default useScheduleCreate
