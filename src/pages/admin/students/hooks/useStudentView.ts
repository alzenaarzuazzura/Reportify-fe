import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useDeleteData from "@reportify/hooks/mutations/useDeleteData"
import useUpdateData from "@reportify/hooks/mutations/useUpdateData"
import usePageQuery from "@reportify/hooks/queries/usePageQuery"
import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"

import { deleteById, getById, update } from "@reportify/services/api/student"

import { TStudentData, TStudentPostData, TStudentTransForm } from "@reportify/types"

const useStudentView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()

    const { showDialogDelete } = useDialogDelete()

    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'student', id]

    const { data, isSuccess } = usePageQuery<TStudentData>({
        key: queryKey,
        queryFn: () => getById(Number(id))
    })

    const { updateData } = useUpdateData<TStudentData, TStudentPostData & { id: number }>({
        menu: 'students',
        menuId: 'field.student',
        updateFn: update,
        onSuccess: () => queryClient.invalidateQueries({ queryKey })
    })

    const { deleteData } = useDeleteData({
        localeId: 'field.student',
        deleteFn: deleteById,
        onSucces: () => navigate('/students')
    })

    const onSubmit = useCallback(
      (formData: TStudentTransForm) => {
        const data: TStudentPostData & { id: number } = {
          id,
          name: formData.name,
          nis: formData.nis,
          parent_telephone: formData.parent_telephone,
          student_telephone: formData.student_telephone,
          id_class: formData.id_class?.value, 
        }

        updateData(data)
      },
      [updateData, id]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: () => deleteData(id),
                localId: intl.formatMessage({ id: 'field.student' }),
            }),
            [intl, id, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/students'), [navigate])

    return {
        data,
        isSuccess,
        onSubmit,
        onCancel,
        onDelete,
        showDialogDelete
    }
}

export default useStudentView