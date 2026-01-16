import { configureStore } from '@reduxjs/toolkit'
import deleteDialogReducer from './deleteDialogSlice'

export const store = configureStore({
	reducer: {
		deleteDialog: deleteDialogReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['deleteDialog/showDialogDelete'],
				// Ignore these paths in the state
				ignoredPaths: ['deleteDialog.onDelete'],
			},
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch