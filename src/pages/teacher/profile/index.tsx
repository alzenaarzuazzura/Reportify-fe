import { useIntl } from 'react-intl'
import { Helmet } from 'react-helmet-async'
import { Tabs } from 'antd'

import useRouterTab from '@reportify/hooks/ui/useRouterTab'

import profileInfo from './ProfileInfo'
import changepw from './ChangePassword'

const Profile = () => {
	const intl = useIntl()

	const { activeTab, setActiveTab, defaultActiveTab } = useRouterTab({
		from: '/teacher/profile',
		to: '/teacher/profile',
	})

	const tabs = [
		{
			key: '/teacher/profile',
			intl: 'field.profileinfo',
			Component: profileInfo,
		},
		{
			key: '/teacher/change-password',
			intl: 'field.changepw',
			Component: changepw,
		},
	]

	return (
		<>
			<Helmet title={intl.formatMessage({ id: 'field.profile' })} />
			<Tabs
				className="kit-tabs-bold"
				activeKey={activeTab}
				defaultActiveKey={defaultActiveTab}
				onChange={setActiveTab}
				items={tabs
					.filter((item) => (item))
					.map(({ key, intl: label, Component }) => ({
						label: intl.formatMessage({ id: label }),
						className: 'pt-1',
						key,
						children: <Component />,
					}))}
			/>
		</>
	)
}

export default Profile
