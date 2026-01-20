import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import useCreateData from "@reportify/hooks/mutations/useCreateData"

import { create } from "@reportify/services/api/class"

import { TClassData, TClassPostData, TClassTransForm } from "@reportify/types"

const useClassCreate = () => {
  const navigate = useNavigate()
  const [formInstance] = Form.useForm()

  const { createData } = useCreateData<TClassData, TClassPostData>({
    menu: 'classes',
    menuId: 'field.class',
    createFn: create,
    onSuccess: () => formInstance.resetFields(),
  })

  const onSubmit = useCallback(
    (formData: TClassTransForm) => {
      const data: TClassPostData = {
        id_level: formData.id_level?.value,
        id_major: formData.id_major?.value,
        id_rombel: formData.id_rombel?.value,
      }

      createData(data)
    },
    [createData]
  )

  const onCancel = useCallback(
    () => navigate('/classes'),
    [navigate]
  )

  return { formInstance, onSubmit, onCancel }
}

export default useClassCreate
