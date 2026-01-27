import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useDeleteData from "@reportify/hooks/mutations/useDeleteData"
import useUpdateData from "@reportify/hooks/mutations/useUpdateData"
import usePageQuery from "@reportify/hooks/queries/usePageQuery"
import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"

import { deleteById, getById, update } from "@reportify/services/api/class"

import { TClassData, TClassPostData, TClassTransForm } from "@reportify/types"

const useClassView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()

    const { showDialogDelete } = useDialogDelete()

    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'class', id]

    const { data, isSuccess } = usePageQuery<TClassData>({
        key: queryKey,
        queryFn: () => getById(Number(id))
    })

    const { updateData } = useUpdateData<TClassData, TClassPostData & { id: number }>({
        menu: 'classes',
        menuId: 'field.class',
        baseRoute: 'admin',
        updateFn: update,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey })
            await queryClient.invalidateQueries({ queryKey: ['dataList', 'class'] })
        }
    })

    const { deleteData } = useDeleteData({
        localeId: 'field.class',
        deleteFn: deleteById,
        onSucces: () => navigate('/admin/classes')
    })

    const onSubmit = useCallback(
      (formData: TClassTransForm) => {
        const data: TClassPostData & { id: number } = {
          id,
          id_level: formData.id_level?.value,
          id_major: formData.id_major?.value,
          id_rombel: formData.id_rombel?.value,
        }

        updateData(data)
      },
      [updateData, id]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: () => deleteData(id),
                localId: intl.formatMessage({ id: 'field.class' }),
            }),
            [intl, id, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/admin/classes'), [navigate])

    return {
        data,
        isSuccess,
        onSubmit,
        onCancel,
        onDelete,
        showDialogDelete
    }
}

export default useClassView