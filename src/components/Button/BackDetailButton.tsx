import { Icon, IconProps } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

export type TBackDetailButton = Omit<IconProps, 'icon'> & { onCancel?: () => void }

const BackDetailButton = ({ onCancel, ...props }: TBackDetailButton) => {
	const navigate = useNavigate()

	const doGoBack = () => {
		if (onCancel) onCancel()
		else navigate(-1)
	}

	return (
		<Icon
			icon="lucide:chevron-left"
			type="button"
			onClick={doGoBack}
			width="26px"
			height="26px"
			className="mr-2"
			{...props}
		/>
	)
}

export default BackDetailButton
