import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

import { TResponseError, TUpdateDataParams, TUpdateWithIDPayload, TResponseData } from '@reportify/types'

import useDlgMessage from '../ui/useDialogMessage'

const useUpdateData = <
	TData extends { id: number },
	TParams extends { id: number } = TData,
	TError extends TResponseError = TResponseError,
>({
	key = ['blocking'],
	menuId = 'field.trx',
	menu,
	updateFn,
	onSuccess,
	onError,
	onLater,
}: TUpdateDataParams<TResponseData<TData>, TUpdateWithIDPayload<TParams>, TError>) => {
	const navigate = useNavigate()
	const { showDialogUpdate } = useDlgMessage()

	const mutationUpdate = useMutation<TResponseData<TData>, TError, TUpdateWithIDPayload<TParams>>(
		{
			mutationKey: key,
			mutationFn: updateFn,
		},
	)

	const showDialogMessage = useCallback(
		(data: TResponseData<TData>, isError: boolean, error?: TError) => {
			const displayMessage = data?.message || (isError ? 'Terjadi kesalahan' : 'Berhasil')
			showDialogUpdate({
				menuId,
				isError,
				message: displayMessage,
				primaryButton: {
					handler: async () => {
						if (!isError) {
							if (onSuccess) await onSuccess(data)
							
							if (onLater) {
								onLater({ ...data, goTo: 'create' })
							} else {
								navigate(`/${menu}/create`)
							}
						} else if (onError) {
							onError(data, error)
						}
					},
				},
				secondaryButton: {
					handler: async () => {
						if (!isError) {
							if (onSuccess) await onSuccess(data)
							
							if (onLater) {
								onLater({ ...data, goTo: 'view' })
							} else {
								navigate(`/${menu}/view/${data.data.id}`)
							}
						}
					},
				},
			})
		},
		[showDialogUpdate, onSuccess, onError, navigate, menu, menuId, onLater],
	)

	const updateData = useCallback(
		(updateData: TParams) => {
			mutationUpdate
				.mutateAsync({ id: updateData.id, data: updateData })
				.then((response) => showDialogMessage(response, !response.status))
				.catch((e) => {
					if (isAxiosError<TResponseData<TData>>(e) && e.response)
						showDialogMessage(e.response?.data, true)
					else showDialogMessage(e, true)
				})
		},
		[mutationUpdate, showDialogMessage],
	)

	return { updateData }
}

export default useUpdateData
