import { useIntl } from 'react-intl'
import { Helmet } from 'react-helmet-async'
import { Tabs } from 'antd'

import useRouterTab from '@reportify/hooks/ui/useRouterTab'

import profileInfor from './ProfileInfo'
import changepw from './ChangePassword'
import historylogin from './LoginHistory'

const Profile = () => {
	const intl = useIntl()

	const { activeTab, setActiveTab, defaultActiveTab } = useRouterTab({
		from: '/profile',
		to: '/profile',
	})

	const tabs = [
		{
			key: '/profile',
			intl: 'field.profileinfo',
			Component: profileInfor,
		},
		{
			key: '/change-password',
			intl: 'field.changepw',
			Component: changepw,
		},
		{
			key: '/history-login',
			intl: 'field.historylogin',
			Component: historylogin,
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
