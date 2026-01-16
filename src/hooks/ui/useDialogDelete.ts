import { useDispatch } from 'react-redux'
import { showDialogDelete } from '@reportify/redux/deleteDialogSlice'
import { TDlgDeleteState } from '@reportify/types'

const useDialogDelete = () => {
	const dispatch = useDispatch()

	const showDialogDeleteHandler = (payload: Omit<TDlgDeleteState, 'visible'>) => {
		dispatch(showDialogDelete(payload))
	}

	return {
		showDialogDelete: showDialogDeleteHandler,
	}
}

export default useDialogDelete
