import { Modal, Form } from 'antd'
import useLevelForm from '../hooks/useLevelForm'
import General from '../formContent/General'
import SaveCancelButton from '@reportify/components/Button/SaveCancelButton'
import { useIntl } from 'react-intl'

type TDlgLevelProps = {
	open: boolean
	onClose: () => void
	id?: number
	mode?: 'view' | 'edit' | 'create'
}

const DlgLevel = ({ open, onClose, id, mode = 'create' }: TDlgLevelProps) => {
	const intl = useIntl()

	const { formInstance, onSubmit, isLoading } = useLevelForm({
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
						thing: intl.formatMessage({ id: 'menu.level' })
					}
				)
			) 
		}
		if (mode === 'edit') {
			return (
				intl.formatMessage(
					{ id: 'global.edit' },
					{
						thing: intl.formatMessage({ id: 'menu.level' })
					}
				)
			) 
		}
		return intl.formatMessage({ id: 'global.create' }, { thing: intl.formatMessage({ id: 'menu.level' })})
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

export default DlgLevel
