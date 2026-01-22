import { isEmpty } from 'lodash'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export type TRedirectTab = {
	from: string
	to: string
}

const defaultRedirect: TRedirectTab = { from: '/', to: '/' }

// get active tab berdasarkan route
const getDefaultActiveTab = (currentTab: string, redirect: TRedirectTab): string => {
	if (!isEmpty(redirect) && currentTab === redirect.from) {
		return redirect.to
	}
	return currentTab
}

/**
 * Return default active tab by read the path
 *
 * @param	redirect ex: { from: '/bp', to: '/cust' }
 */
const useRouterTab = (redirect: TRedirectTab = defaultRedirect) => {
	const location = useLocation()
	const currentTab = location?.pathname ?? ''

	const defaultActiveTab = getDefaultActiveTab(currentTab, redirect)
	const [activeTab, setActiveTab] = useState(defaultActiveTab)

	return {
		activeTab,
		setActiveTab,
		defaultActiveTab,
	}
}

export default useRouterTab
