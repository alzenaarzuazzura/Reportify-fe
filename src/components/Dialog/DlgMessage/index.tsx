import { Button, Typography } from 'antd'
import { isString } from 'lodash'

import { TDialogMessageParams } from '@reportify/types'

const DlgMessage = ({
	icon,
	title,
	subtitle,
	message,
	primaryButton,
	secondaryButton,
	closeDialog,
}: TDialogMessageParams) => {
	const { Title, Text } = Typography

	const primaryBtnHandler = () => {
		if (primaryButton?.handler) primaryButton.handler()
		closeDialog()
	}

	const secondaryBtnHandler = () => {
		if (secondaryButton?.handler) secondaryButton.handler()
		closeDialog()
	}

	return (
		<>
			{isString(icon) ? <img className="mb-4" src={icon} alt={title} width="30%" /> : icon}
			<Title level={4}>{title}</Title>
			<Text>{subtitle}</Text>
			{subtitle && message && <br />}
			<Text>{message}</Text>
			<div className="d-flex mt-4 justify-content-center" style={{ gap: 24 }}>
				{secondaryButton && (
					<Button block {...secondaryButton.props} onClick={secondaryBtnHandler}>
						{secondaryButton.text}
					</Button>
				)}
				<Button block {...primaryButton?.props} onClick={primaryBtnHandler}>
					{primaryButton?.text}
				</Button>
			</div>
		</>
	)
}

export default DlgMessage
