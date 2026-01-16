import { Icon } from '@iconify/react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import useDialogDelete from '@reportify/hooks/ui/useDialogDelete'

export type TTableAction = {
	itemId: number
	localId?: string
	viewTo?: string
	editTo?: string
	disabledDelete?: boolean
	onDelete?: (id: number) => void | Promise<void>
	onView?: () => void
	onEdit?: () => void
}

export type TTableActionView = {
	title: string
	viewTo: string
	onView?: () => void
}

export type TTableActionEdit = {
	title: string
	editTo: string
	onEdit?: () => void
}

export type TTableActionDelete = {
	title: string
	disabled: boolean
	doDelete: () => void
}

const iconStyle = { verticalAlign: 'middle' }

// ================= VIEW =================
const ActionView = ({ title, viewTo, onView }: TTableActionView) => {
	return (
		<Link
			className="link-actions px-1"
			to={viewTo}
			title={title}
			onClick={onView}
		>
			<Icon icon="mdi:eye-outline" style={iconStyle} />
		</Link>
	)
}

// ================= EDIT =================
const ActionEdit = ({ title, editTo, onEdit }: TTableActionEdit) => {
	return (
		<Link
			className="link-actions px-1"
			to={editTo}
			title={title}
			onClick={onEdit}
		>
			<Icon icon="lucide:edit-2" style={iconStyle} />
		</Link>
	)
}

// ================= DELETE =================
const ActionDelete = ({ title, disabled, doDelete }: TTableActionDelete) => {
	if (disabled) {
		return (
			<div className="link-actions px-1" title={title}>
				<Icon icon="lucide:trash" style={iconStyle} />
			</div>
		)
	}

	return (
		<Link
			className="link-actions px-1"
			to="#"
			title={title}
			onClick={(e) => {
				e.preventDefault()
				doDelete()
			}}
		>
			<Icon icon="lucide:trash" style={iconStyle} />
		</Link>
	)
}

// ================= TABLE ACTION =================
const TableAction = ({
	itemId,
	localId = '',
	viewTo,
	editTo,
	onDelete,
	onView,
	onEdit,
	disabledDelete = false,
}: TTableAction) => {
	const intl = useIntl()
	const { showDialogDelete } = useDialogDelete()

	const doDelete = () => {
		if (!onDelete) return

		showDialogDelete({
			onDelete: () => onDelete(itemId),
			localId,
		})
	}

	return (
		<>
			{viewTo && (
				<ActionView
					title={intl.formatMessage({ id: 'button.view' })}
					viewTo={viewTo}
					onView={onView}
				/>
			)}

			{editTo && (
				<ActionEdit
					title={intl.formatMessage({ id: 'button.edit' })}
					editTo={editTo}
					onEdit={onEdit}
				/>
			)}

			{onDelete && (
				<ActionDelete
					title={intl.formatMessage({ id: 'button.delete' })}
					disabled={disabledDelete}
					doDelete={doDelete}
				/>
			)}
		</>
	)
}

export default TableAction
