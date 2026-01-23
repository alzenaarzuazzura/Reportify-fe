import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"

import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"
import usePopupMessage from "@reportify/hooks/ui/usePopupMessage"

import { deleteById, getById, update, updateStudentAssignment } from "@reportify/services/api/assignment"

import { TAssignmentData, TAssignmentPostData, TAssignmentTransForm, TStudentAssignmentUpdateData } from "@reportify/types"

const useAssignmentView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()
    const { showDialogDelete } = useDialogDelete()
    const { showMessage } = usePopupMessage()
    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'assignment', id]

    const { data, isSuccess, isLoading } = useQuery({
        queryKey,
        queryFn: () => getById(id),
        enabled: !!id
    })

    const onSubmit = useCallback(
        async (formData: TAssignmentTransForm) => {
            try {
                const postData: TAssignmentPostData = {
                    id_teaching_assignment: formData.id_teaching_assignment?.value as number,
                    assignment_title: formData.assignment_title,
                    assignment_desc: formData.assignment_desc,
                    deadline: dayjs(formData.deadline).format('YYYY-MM-DD'),
                    student_ids: formData.student_ids || []
                }

                await update({ id, data: postData })
                
                showMessage(
                    'success',
                    intl.formatMessage(
                        { id: 'dlgmsg.successupdate' },
                        { thing: intl.formatMessage({ id: 'field.assignment' }) }
                    ),
                    () => {
                        queryClient.invalidateQueries({ queryKey })
                        navigate('/tasks')
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
                        { thing: intl.formatMessage({ id: 'field.assignment' }) }
                    ),
                    () => navigate('/tasks')
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
                localId: intl.formatMessage({ id: 'field.assignment' }),
            }),
        [intl, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/tasks'), [navigate])

    const handleStudentSubmissionUpdate = useCallback(
        async (studentAssignmentId: number, status: boolean, note: string) => {
            try {
                const updateData: TStudentAssignmentUpdateData = {
                    status,
                    note: note || undefined
                }
                await updateStudentAssignment(studentAssignmentId, updateData)
                // Refresh data
                queryClient.invalidateQueries({ queryKey })
                showMessage('success', 'Status pengumpulan berhasil diperbarui')
            } catch (error) {
                showMessage('error', 'Gagal memperbarui status pengumpulan')
                throw error
            }
        },
        [queryClient, queryKey, showMessage]
    )

    return {
        data,
        isSuccess,
        isLoading,
        onSubmit,
        onCancel,
        onDelete,
        handleStudentSubmissionUpdate,
    }
}

export default useAssignmentView
