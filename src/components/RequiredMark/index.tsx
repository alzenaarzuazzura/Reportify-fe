import { useIntl } from 'react-intl'

export type TRequiredMarkProps = { prefix?: string }

const RequiredMark = ({ prefix }: TRequiredMarkProps) => {
	const intl = useIntl()

	return (
		<>
			{prefix}
			<span style={{ color: 'red', marginLeft: 2 }}>
				{intl.formatMessage({ id: 'global.required' })}
			</span>
		</>
	)
}

export default RequiredMark
