import { useCallback } from "react"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

import useDeleteData from "@reportify/hooks/mutations/useDeleteData"
import useUpdateData from "@reportify/hooks/mutations/useUpdateData"
import usePageQuery from "@reportify/hooks/queries/usePageQuery"
import useDialogDelete from "@reportify/hooks/ui/useDialogDelete"

import { deleteById, getById, update } from "@reportify/services/api/schedule"

import { TScheduleData, TSchedulePostData, TScheduleTransForm } from "@reportify/types"

const useScheduleView = (id: number) => {
    const intl = useIntl()
    const navigate = useNavigate()

    const { showDialogDelete } = useDialogDelete()

    const queryClient = useQueryClient()
    const queryKey = ['dataView', 'schedule', id]

    const { data, isSuccess } = usePageQuery<TScheduleData>({
        key: queryKey,
        queryFn: () => getById(Number(id))
    })

    const { updateData } = useUpdateData<TScheduleData, TSchedulePostData & { id: number }>({
        menu: 'schedules',
        menuId: 'menu.schedule',
        baseRoute: 'admin',
        updateFn: update,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey })
            await queryClient.invalidateQueries({ queryKey: ['dataList', 'schedule'] })
        }
    })

    const { deleteData } = useDeleteData({
        localeId: 'menu.schedule',
        deleteFn: deleteById,
        onSucces: () => navigate('/admin/schedules')
    })

    const onSubmit = useCallback(
      (formData: TScheduleTransForm) => {
        const data: TSchedulePostData & { id: number } = {
          id,
          id_teaching_assignment: formData.id_teaching_assignment?.value,
          day: formData.day,
          start_time: formData.start_time,
          end_time: formData.end_time,
          room: formData.room,
        }

        updateData(data)
      },
      [updateData, id]
    )

    const onDelete = useCallback(
        () =>
            showDialogDelete({
                onDelete: () => deleteData(id),
                localId: intl.formatMessage({ id: 'menu.schedule' }),
            }),
            [intl, id, deleteData, showDialogDelete]
    )

    const onCancel = useCallback(() => navigate('/admin/schedules'), [navigate])

    return {
        data,
        isSuccess,
        onSubmit,
        onCancel,
        onDelete,
        showDialogDelete
    }
}

export default useScheduleView
