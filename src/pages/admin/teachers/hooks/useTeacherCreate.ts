import useCreateData from "@reportify/hooks/mutations/useCreateData"
import { create } from "@reportify/services/api/teacher"
import { TTeacherData, TTeacherPostData, TTeacherTransForm } from "@reportify/types"
import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useTeacherCreate = () => {
    const navigate = useNavigate()
    const [formInstance] = Form.useForm()

    const { createData } = useCreateData<TTeacherData, TTeacherPostData>({
        menu: 'teacher',
        menuId: 'field.teacher',
        createFn: create,
        onSuccess: () => formInstance.resetFields()
    })

    const onSubmit = useCallback(
        (formData: TTeacherTransForm) => {
            const data: TTeacherPostData = { 
                email: formData.email,
                password: formData.password,
                name: formData.name,
                role: formData.role?.value ?? undefined
            }
            createData(data)
        },
        [createData]
    )

    const onCancel = useCallback(() => navigate('/teachers'), [navigate])

    return { formInstance, onSubmit, onCancel }
}

export default useTeacherCreate