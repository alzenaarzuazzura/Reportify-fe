import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import useCreateData from "@reportify/hooks/mutations/useCreateData"

import { create } from "@reportify/services/api/student"

import { TStudentData, TStudentPostData, TStudentTransForm } from "@reportify/types"

const useStudentCreate = () => {
  const navigate = useNavigate()
  const [formInstance] = Form.useForm()

  const { createData } = useCreateData<TStudentData, TStudentPostData>({
    menu: 'students',
    menuId: 'field.class',
    baseRoute: 'admin',
    createFn: create,
    onSuccess: () => formInstance.resetFields(),
  })

  const onSubmit = useCallback(
    (formData: TStudentTransForm) => {
      const data: TStudentPostData = {
        name: formData.name,
        nis: formData.nis,
        parent_telephone: formData.parent_telephone,
        student_telephone: formData.student_telephone,
        id_class: formData.id_class.value,
      }

      createData(data)
    },
    [createData]
  )

  const onCancel = useCallback(
    () => navigate('/admin/students'),
    [navigate]
  )

  return { formInstance, onSubmit, onCancel }
}

export default useStudentCreate
