import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import dayjs from "dayjs"

import { create, generateStudentAssignments } from "@reportify/services/api/assignment"
import { TAssignmentPostData, TAssignmentTransForm } from "@reportify/types"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"

const useAssignmentCreate = () => {
    const navigate = useNavigate()
    const intl = useIntl()
    const [formInstance] = Form.useForm()
    const { showMessage } = usePopupMessage()

    const onSubmit = useCallback(
        async (formData: TAssignmentTransForm) => {
            try {
                const data: TAssignmentPostData = { 
                    id_teaching_assignment: formData.id_teaching_assignment?.value as number,
                    assignment_title: formData.assignment_title,
                    assignment_desc: formData.assignment_desc,
                    deadline: dayjs(formData.deadline).format('YYYY-MM-DD'),
                    student_ids: formData.student_ids || []
                }
                
                const createdAssignment = await create(data)
                
                // Generate student assignments for the class
                await generateStudentAssignments(createdAssignment.id)
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successcreate' },
                        { thing: intl.formatMessage({ id: 'field.assignment' }) }
                    ),
                    () => {
                        formInstance.resetFields()
                        navigate('/tasks')
                    }
                )
            } catch (error) {
                showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
            }
        },
        [formInstance, intl, navigate, showMessage]
    )

    const onCancel = useCallback(() => navigate('/tasks'), [navigate])

    return { formInstance, onSubmit, onCancel }
}

export default useAssignmentCreate
