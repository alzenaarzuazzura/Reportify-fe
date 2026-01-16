// redux/globalui/deleteDialogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TDlgDeleteState } from '@reportify/types'

const initialState: TDlgDeleteState = {
	visible: false,
}

const deleteDialogSlice = createSlice({
	name: 'deleteDialog',
	initialState,
	reducers: {
		showDialogDelete(state, action: PayloadAction<Omit<TDlgDeleteState, 'visible'>>) {
			state.visible = true
			Object.assign(state, action.payload)
		},
		hideDialogDelete(state) {
			state.visible = false
			state.onDelete = undefined
			state.localId = undefined
			state.messageId = undefined
		},
	},
})

export const { showDialogDelete, hideDialogDelete } = deleteDialogSlice.actions
export default deleteDialogSlice.reducer
