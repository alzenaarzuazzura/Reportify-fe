import { FormattedMessage, useIntl } from 'react-intl'
import { Alert, AlertProps, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'

type TAlertFormattedProps = AlertProps & {
	id: string
	thing?: string
	actionClick?: () => void
	linkGroup?: MenuProps
	textColor?: string
	bgColor?: string
	show?: boolean
}

const AlertFormatted = ({
	id,
	thing,
	actionClick,
	linkGroup,
	textColor = '#F1960C',
	bgColor = '#FFF1BF',
	style,
	show,
	...props
}: TAlertFormattedProps) => {
	const intl = useIntl()

	if (!show) return null

	const renderLink = (text: React.ReactNode) => {
		if (linkGroup) {
			return (
				<Dropdown menu={linkGroup} trigger={['click']}>
					<Button type="link" className="px-0">
						<strong style={{ color: textColor }}>{text}</strong>
					</Button>
				</Dropdown>
			)
		}

		return (
			<Button type="link" className="px-0" onClick={actionClick}>
				<strong style={{ color: textColor }}>{text}</strong>
			</Button>
		)
	}

	return (
		<Alert
			style={{
				backgroundColor: bgColor,
				...style,
			}}
			message={
				<span style={{ color: textColor }}>
					<FormattedMessage
						id={id}
						values={{
							thing: () =>
								thing ? (
									<strong style={{ color: textColor }}>
										{intl.formatMessage({ id: thing })}
									</strong>
								) : null,
							br: <br />,
							strong: (text: React.ReactNode) => (
								<strong style={{ color: textColor }}>{text}</strong>
							),
							link: renderLink,
						}}
					/>
				</span>
			}
			{...props}
		/>
	)
}

export default AlertFormatted
