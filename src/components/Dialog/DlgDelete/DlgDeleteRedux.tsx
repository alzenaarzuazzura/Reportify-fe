import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@reportify/redux/store'
import { hideDialogDelete } from '@reportify/redux/deleteDialogSlice'

import DlgDelete from '.'

const DlgDeleteRedux = () => {
	const dispatch = useDispatch()

	const { visible, onDelete, messageId, localId } = useSelector(
		(state: RootState) => state.deleteDialog,
	)

    const onCancel = () => dispatch(hideDialogDelete())

	const handleOk = async () => {
		if (onDelete) {
			await onDelete()
		}
		onCancel()
	}

	return (
        <DlgDelete 
            open={visible}
            onOk={handleOk}
            onCancel={onCancel}
            localId={localId || ''}
            messageId={messageId}
        />
	)
}

export default DlgDeleteRedux
