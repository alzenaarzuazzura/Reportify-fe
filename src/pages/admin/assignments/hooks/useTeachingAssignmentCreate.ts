import useCreateData from "@reportify/hooks/mutations/useCreateData"
import { create } from "@reportify/services/api/teachingassignment"
import { TTeachingAssignmentData, TTeachingAssignmentPostData, TTeachingAssignmentTransForm } from "@reportify/types"
import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useTeachingAssignmentCreate = () => {
  const navigate = useNavigate()
  const [formInstance] = Form.useForm()

  const { createData } = useCreateData<TTeachingAssignmentData, TTeachingAssignmentPostData>({
    menu: 'teaching-assignments',
    menuId: 'menu.teachingassignment',
    createFn: create,
    onSuccess: () => formInstance.resetFields(),
  })

  const onSubmit = useCallback(
    (formData: TTeachingAssignmentTransForm) => {
      const data: TTeachingAssignmentPostData = {
        id_user: formData.id_user?.value,
        id_class: formData.id_class?.value,
        id_subject: formData.id_subject?.value,
      }

      createData(data)
    },
    [createData]
  )

  const onCancel = useCallback(
    () => navigate('/teaching-assignments'),
    [navigate]
  )

  return { formInstance, onSubmit, onCancel }
}

export default useTeachingAssignmentCreate
