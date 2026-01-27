import { Dropdown, DropDownProps } from 'antd'

import CreateButton from './CreateButton'

const CreateGroupButton = ({ menu, ...props }: DropDownProps) => {
	return (
		<Dropdown menu={menu} trigger={['click']} placement="bottomRight" {...props}>
			{/* createButton dibungkus div, agar elemen popup floating pada tempatnya #CMIIW */}
			<div>
				<CreateButton />
			</div>
		</Dropdown>
	)
}

export default CreateGroupButton
