import { TabPaneProps } from 'antd'
import React from 'react'

export type TTabItem = Omit<TabPaneProps, 'tab'> & {
	key: string
	label: React.ReactNode
}

export type TTabItemWithAuth = Omit<TTabItem, 'label'> & {
	intl: string
	Component: React.FC
}
