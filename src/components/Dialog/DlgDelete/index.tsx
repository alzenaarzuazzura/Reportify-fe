import { Modal, Button, Typography } from 'antd'
import { useIntl } from 'react-intl'

import { TDialogDeleteParams } from '@reportify/types'

const { Title } = Typography

const DlgDelete = ({ open, onOk, onCancel, localId, messageId }: TDialogDeleteParams) => {
	const intl = useIntl()

	return (
		<Modal
			centered
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			closable={false}
			footer={null}
			styles={{ body: { textAlign: 'center' } }}
			width={350}
			zIndex={1001}
		>
			<Title level={4}>
				{intl.formatMessage({ id: 'dlgmsg.delete.title' }, { thing: localId })}
			</Title>

			<center>
				<p style={{ color: '#8D8D8D' }}>
					{messageId ||
						intl.formatMessage({ id: 'dlgmsg.delete.subtitle' }, { thing: localId })}
				</p>
			</center>

			<div className="row justify-content-center align-items-center mt-4">
				<div className="col">
					<Button className="rp-btn-danger" block onClick={onOk}>
						{intl.formatMessage({ id: 'button.delete' })}
					</Button>
				</div>

				<div className="col">
					<Button type="default" block onClick={onCancel}>
						{intl.formatMessage({ id: 'button.cancel' })}
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default DlgDelete