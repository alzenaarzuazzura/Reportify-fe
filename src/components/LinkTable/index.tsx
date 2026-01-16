import { TTableLink } from '@reportify/types'
import { Link } from 'react-router-dom'

const LinkTable = ({
	to = '#',
	children = 'link-table',
	onClick,
	replace = false,
	target,
}: TTableLink) => {
	return (
		<Link to={to} className="bc-link" onClick={onClick} replace={replace} target={target}>
			{children}
		</Link>
	)
}

export default LinkTable
