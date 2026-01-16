import { useMutation } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { isAxiosError } from 'axios'
import { useCallback } from 'react'

import useDlgMessage from '@reportify/hooks/ui/useDialogMessage'
import usePopupMessage from '@reportify/hooks/ui/usePopupMessage'

import { TBaseResponse, TDeleteDataParams, TResponseError } from '@reportify/types'

const useDeleteData = ({
	localeId,
	deleteFn,
	key = ['blocking'],
	onError,
	onSucces,
}: TDeleteDataParams) => {
	const intl = useIntl()

	const { showDialogDelete } = useDlgMessage()
	const { showMessage } = usePopupMessage()

	const mutationDelete = useMutation<TBaseResponse, TResponseError, number>({
		mutationKey: key,
		mutationFn: (id: number) => deleteFn(id),
	})

	const showErrorMessage = useCallback(
		(data: TBaseResponse) => {
			const displayMessage = data?.message || 'Gagal menghapus data'
			showDialogDelete({
				menuId: localeId,
				isError: true,
				message: displayMessage,
				primaryButton: {
					handler: () => {
						if (onError) onError()
					},
				},
			})
		},
		[showDialogDelete, onError, localeId],
	)

	const deleteData = useCallback(
		(id: number) => {
			mutationDelete
				.mutateAsync(id)
				.then((response) => {
					if (response.status) {
						showMessage(
							'success',
							intl.formatMessage(
								{ id: 'dlgmsg.successdel' },
								{ thing: intl.formatMessage({ id: localeId }) },
							),
							() => {
								if (onSucces) onSucces()
							},
						)
					} else showErrorMessage(response)
				})
				.catch((e) => {
					if (isAxiosError<TBaseResponse>(e) && e.response)
						showErrorMessage(e.response?.data)
					else showErrorMessage(e)
				})
		},
		[mutationDelete, intl, localeId, showMessage, showErrorMessage, onSucces],
	)

	return { deleteData }
}

export default useDeleteData
