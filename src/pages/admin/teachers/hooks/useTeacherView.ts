import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useDeleteData from "@reportify/hooks/mutations/useDeleteData"
import useUpdateData from "@reportify/hooks/mutations/useUpdateData"
import usePageQuery from "@reportify/hooks/queries/usePageQuery"
import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"

import { deleteById, getById, update } from "@reportify/services/api/teacher"

import { TTeacherData, TTeacherPostData, TTeacherTransForm } from "@reportify/types"

const useTeacherView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()

    const { showDialogDelete } = useDialogDelete()

    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'teacher', id]

    const { data, isSuccess } = usePageQuery<TTeacherData>({
        key: queryKey,
        queryFn: () => getById(Number(id))
    })

    const { updateData } = useUpdateData<TTeacherData, TTeacherPostData & { id: number }>({
        menu: 'teacher',
        menuId: 'field.teacher',
        updateFn: update,
        onSuccess: () => queryClient.invalidateQueries({ queryKey })
    })

    const { deleteData } = useDeleteData({
        localeId: 'field.teacher',
        deleteFn: deleteById,
        onSucces: () => navigate('/teacher')
    })

    const onSubmit = useCallback(
      (formData: TTeacherTransForm) => {
        const data: TTeacherPostData & { id: number } = {
          id,
          name: formData.name,
          email: formData.email,
          password: formData.password || '', // Jika kosong, backend tidak akan update password
          role: formData.role?.value, 
        }

        updateData(data)
      },
      [updateData, id]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: () => deleteData(id),
                localId: intl.formatMessage({ id: 'field.teacher' }),
            }),
            [intl, id, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/teachers'), [navigate])

    return {
        data,
        isSuccess,
        onSubmit,
        onCancel,
        onDelete,
        showDialogDelete
    }
}

export default useTeacherView