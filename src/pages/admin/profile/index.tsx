import { Tabs } from 'antd'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { TTabItem } from '@reportify/types'

import profileInfor from './ProfileInfo'
import changepw from './ChangePassword'

const subTabs = [
  { key: 'profile', intl: 'field.profileinfo', Component: profileInfor },
  { key: 'changepw', intl: 'field.changepw', Component: changepw },
]

const Profile = () => {
  const intl = useIntl()

  const subTabsItems = useMemo(
	(): TTabItem[] =>
	  subTabs.map(({ key, intl: label, Component }) => ({
		key,
		label: (
		  <span style={{ fontSize: 14 }}>
			{intl.formatMessage({ id: label })}
		  </span>
		),
		children: <Component />,
	  })),
	[intl],
  )

  return (
	<Tabs
	  className="kit-tabs-pills"
	  tabPosition="left"
	  style={{ lineHeight: 'normal' }}
	  items={subTabsItems}
	/>
  )
}

export default Profile
