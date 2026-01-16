import { Modal, Form } from 'antd'
import useSubjectForm from '../hooks/useSubjectForm'
import General from '../formContent/General'
import SaveCancelButton from '@reportify/components/Button/SaveCancelButton'
import { useIntl } from 'react-intl'

type TSubjectFormModalProps = {
	open: boolean
	onClose: () => void
	id?: number
	mode?: 'view' | 'edit' | 'create'
}

const SubjectFormModal = ({ open, onClose, id, mode = 'create' }: TSubjectFormModalProps) => {
	const intl = useIntl()

	const { formInstance, onSubmit, isLoading } = useSubjectForm({
		id,
		onSuccess: () => {
			onClose()
		},
	})

	const handleCancel = () => {
		formInstance.resetFields()
		onClose()
	}

	const getTitle = () => {
		if (mode === 'view') {
			return (
				intl.formatMessage(
					{ id: 'global.detail' },
					{
						thing: intl.formatMessage({ id: 'menu.subjects' })
					}
				)
			) 
		}
		if (mode === 'edit') {
			return (
				intl.formatMessage(
					{ id: 'global.edit' },
					{
						thing: intl.formatMessage({ id: 'menu.subjects' })
					}
				)
			) 
		}
		return 'Tambah Mata Pelajaran'
	}

	const viewMode = mode === 'view'

	return (
		<Modal
			title={getTitle()}
			open={open}
			onCancel={handleCancel}
			footer={null}
			width={600}
			centered
			styles={{
				body: { paddingTop: 10 },
			}}
		>
			<Form
				form={formInstance}
				layout="vertical"
				autoComplete="off"
				onFinish={onSubmit}
				disabled={viewMode}
			>
				<General viewMode={viewMode} />

			<div className="mb-3"></div>
				{!viewMode && (
					<SaveCancelButton
						onCancel={handleCancel}
						loadingSaveBtn={isLoading}
						disableSaveBtn={isLoading}
						text={mode === 'edit' ? 'button.update' : 'button.save'}
					/>					
				)}
			</Form>
		</Modal>
	)
}

export default SubjectFormModal
