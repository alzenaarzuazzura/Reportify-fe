import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'

import useDlgMessage from '../ui/useDialogMessage'

import { TCreateDataParams, TResponseData, TResponseError } from '@reportify/types'

const useCreateData = <
	TData extends { id: number } = { id: number },
	TParams = unknown,
	TError extends TResponseError = TResponseError,
>({
	key = ['blocking'],
	menuId = 'field.trx',
	menu,
	createFn,
	onSuccess,
	baseRoute,
	onError,
	onLater,
}: TCreateDataParams<TResponseData<TData>, TParams, TError>) => {
	const navigate = useNavigate()
	const { showDialogCreate } = useDlgMessage()

	const mutationCreate = useMutation<TResponseData<TData>, TError, TParams>({
		mutationKey: key,
		mutationFn: createFn,
	})

	const showDialogMessage = useCallback(
		(data: TResponseData<TData>, isError: boolean, error?: TError) => {
			console.log('showDialogMessage called:', { data, isError, error });
			const displayMessage = data?.message || (isError ? 'Terjadi kesalahan' : 'Berhasil')
			showDialogCreate({
				menuId,
				isError: isError,
				message: displayMessage,
				primaryButton: {
					handler: () => {
						if (!isError) {
							window.scrollTo(0, 0)
							if (onSuccess) onSuccess(data)
						}
					},
				},
				secondaryButton: {
					handler: () => {
						if (!isError) {
							if (onLater) onLater(data)
							else navigate(`/${baseRoute}/${menu}/view/${data.data.id}`)

							if (onError) onError(data, error)
						}
					},
				},
			})
		},
		[showDialogCreate, onSuccess, onError, navigate, menu, menuId, onLater],
	)

	const createData = useCallback(
		(params: TParams) => {
			console.log('createData called with params:', params);
			mutationCreate
				.mutateAsync(params)
				.then((response) => {
					console.log('Create success response:', response);
					// Check for success field, default to true if not present
					const isSuccess = response.status !== undefined ? response.status : true;
					showDialogMessage(response, !isSuccess);
				})
				.catch((e) => {
					console.error('Create error:', e);
					if (isAxiosError<TResponseData<TData>>(e) && e.response)
						showDialogMessage(e.response?.data, true)
					else showDialogMessage(e, true)
				})
		},
		[mutationCreate, showDialogMessage],
	)

	return { createData }
}

export default useCreateData
