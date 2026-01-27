import useCreateData from "@reportify/hooks/mutations/useCreateData"
import { create } from "@reportify/services/api/teacher"
import { TTeacherData, TTeacherPostData, TTeacherTransForm } from "@reportify/types"
import { Form, message } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useTeacherCreate = () => {
    const navigate = useNavigate()
    const [formInstance] = Form.useForm()

    const { createData } = useCreateData<TTeacherData, TTeacherPostData>({
        menu: 'teachers',
        menuId: 'field.teacher',
        baseRoute: 'admin',
        createFn: create,
        onSuccess: (response) => {
            formInstance.resetFields()
            
            // Tampilkan notifikasi tambahan untuk WhatsApp
            if (response?.data?.role === 'teacher' && response?.data?.phone) {
                message.success({
                    content: 'Link set password telah dikirim ke WhatsApp guru',
                    duration: 5
                })
            }
        }
    })

    const onSubmit = useCallback(
        (formData: TTeacherTransForm) => {
            const data: TTeacherPostData = { 
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone,
                role: formData.role?.value ?? undefined
            }
            createData(data)
        },
        [createData]
    )

    const onCancel = useCallback(() => navigate('/admin/teachers'), [navigate])

    return { formInstance, onSubmit, onCancel }
}

export default useTeacherCreate