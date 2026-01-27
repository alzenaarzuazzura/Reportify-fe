import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"

import { deleteById, getById, update } from "@reportify/services/api/announcement"

import { TAnnouncementPostData, TAnnouncementTransForm } from "@reportify/types"

const useAnnouncementView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()
    const { showDialogDelete } = useDialogDelete()
    const { showMessage } = usePopupMessage()
    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'announcement', id]

    const { data, isSuccess, isLoading } = useQuery({
        queryKey,
        queryFn: () => getById(id),
        enabled: !!id
    })

    const onSubmit = useCallback(
        async (formData: TAnnouncementTransForm) => {
            try {
                const postData: TAnnouncementPostData = {
                    title: formData.title,
                    content: formData.content,
                    announcement_date: dayjs(formData.announcement_date).format('YYYY-MM-DD'),
                }

                await update({ id, data: postData })
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successupdate' },
                        { thing: intl.formatMessage({ id: 'menu.announcements' }) }
                    ),
                    () => {
                        queryClient.invalidateQueries({ queryKey })
                        navigate('/teacher/announcements')
                    }
                )
            } catch (error) {
                showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
            }
        },
        [id, intl, navigate, queryClient, queryKey, showMessage]
    )

    const deleteData = useCallback(
        async () => {
            try {
                await deleteById(id)
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successdel' },
                        { thing: intl.formatMessage({ id: 'menu.announcements' }) }
                    ),
                    () => navigate('/teacher/announcements')
                )
            } catch (error) {
                showMessage('error', intl.formatMessage({ id: 'dlgmsg.errmsg' }))
            }
        },
        [id, intl, navigate, showMessage]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: deleteData,
                localId: intl.formatMessage({ id: 'menu.announcements' }),
            }),
        [intl, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/teacher/announcements'), [navigate])

    return {
        data,
        isSuccess,
        isLoading,
        onSubmit,
        onCancel,
        onDelete,
    }
}

export default useAnnouncementView
