import { Form } from "antd"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import dayjs from "dayjs"

import { create } from "@reportify/services/api/announcement"
import { TAnnouncementPostData, TAnnouncementTransForm } from "@reportify/types"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"

const useAnnouncementCreate = () => {
    const navigate = useNavigate()
    const intl = useIntl()
    const [formInstance] = Form.useForm()
    const { showMessage } = usePopupMessage()

    const onSubmit = useCallback(
        async (formData: TAnnouncementTransForm) => {
            try {
                const data: TAnnouncementPostData = { 
                    title: formData.title,
                    content: formData.content,
                    announcement_date: dayjs(formData.announcement_date).format('YYYY-MM-DD'),
                }
                
                await create(data)
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successcreate' },
                        { thing: intl.formatMessage({ id: 'menu.announcements' }) }
                    ),
                    () => {
                        formInstance.resetFields()
                        navigate('/teacher/announcements')
                    }
                )
            } catch (error) {
                showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
            }
        },
        [formInstance, intl, navigate, showMessage]
    )

    const onCancel = useCallback(() => navigate('/teacher/announcements'), [navigate])

    return { formInstance, onSubmit, onCancel }
}

export default useAnnouncementCreate
