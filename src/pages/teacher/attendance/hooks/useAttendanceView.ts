import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"

import { deleteById, getById, update } from "@reportify/services/api/attendance"

import { TAttendancePostData, TAttendanceTransForm } from "@reportify/types"

const useAttendanceView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()
    const { showDialogDelete } = useDialogDelete()
    const { showMessage } = usePopupMessage()
    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'attendance', id]

    const { data, isSuccess, isLoading } = useQuery({
        queryKey,
        queryFn: () => getById(id),
        enabled: !!id
    })

    const onSubmit = useCallback(
        async (formData: TAttendanceTransForm) => {
            try {
                const postData: TAttendancePostData = {
                    id_student: formData.id_student?.value as number,
                    id_teaching_assignment: formData.id_teaching_assignment?.value as number,
                    id_schedule: formData.id_schedule?.value as number,
                    date: dayjs(formData.date).format('YYYY-MM-DD'),
                    status: formData.status,
                    note: formData.note || undefined
                }

                await update({ id, data: postData })
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successupdate' },
                        { thing: intl.formatMessage({ id: 'field.attendance' }) }
                    ),
                    () => {
                        queryClient.invalidateQueries({ queryKey })
                        navigate('/teacher/attendance')
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
                        { thing: intl.formatMessage({ id: 'field.attendance' }) }
                    ),
                    () => navigate('/teacher/attendance')
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
                localId: intl.formatMessage({ id: 'field.attendance' }),
            }),
        [intl, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/attendance'), [navigate])

    return {
        data,
        isSuccess,
        isLoading,
        onSubmit,
        onCancel,
        onDelete,
    }
}

export default useAttendanceView
