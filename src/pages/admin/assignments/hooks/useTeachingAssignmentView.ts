import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useDeleteData from "@reportify/hooks/mutations/useDeleteData"
import useUpdateData from "@reportify/hooks/mutations/useUpdateData"
import usePageQuery from "@reportify/hooks/queries/usePageQuery"
import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"

import { deleteById, getById, update } from "@reportify/services/api/teachingassignment"

import { TTeachingAssignmentData, TTeachingAssignmentPostData, TTeachingAssignmentTransForm } from "@reportify/types"

const useTeachingAssignmentView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()

    const { showDialogDelete } = useDialogDelete()

    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'teachingAssignment', id]

    const { data, isSuccess } = usePageQuery<TTeachingAssignmentData>({
        key: queryKey,
        queryFn: () => getById(Number(id))
    })

    const { updateData } = useUpdateData<TTeachingAssignmentData, TTeachingAssignmentPostData & { id: number }>({
        menu: 'teaching-assignments',
        menuId: 'menu.teachingassignment',
        baseRoute: 'admin',
        updateFn: update,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey })
            await queryClient.invalidateQueries({ queryKey: ['dataList', 'teachingAssignment'] })
        }
    })

    const { deleteData } = useDeleteData({
        localeId: 'menu.teachingassignment',
        deleteFn: deleteById,
        onSucces: () => navigate('/admin/teaching-assignments')
    })

    const onSubmit = useCallback(
      (formData: TTeachingAssignmentTransForm) => {
        const data: TTeachingAssignmentPostData & { id: number } = {
          id,
          id_user: formData.id_user?.value,
          id_class: formData.id_class?.value,
          id_subject: formData.id_subject?.value,
        }

        updateData(data)
      },
      [updateData, id]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: () => deleteData(id),
                localId: intl.formatMessage({ id: 'menu.teachingassignment' }),
            }),
            [intl, id, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/admin/teaching-assignments'), [navigate])

    return {
        data,
        isSuccess,
        onSubmit,
        onCancel,
        onDelete,
        showDialogDelete
    }
}

export default useTeachingAssignmentView
