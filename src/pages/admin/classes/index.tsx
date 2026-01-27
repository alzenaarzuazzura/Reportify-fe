import { Tabs } from 'antd'
import { useIntl } from 'react-intl'
import { useMemo } from 'react'

import type { TTabItem } from '@reportify/types'

import Classes from './classes'
import Level from './level'
import Major from './major'
import Rombel from './rombel'

const subTabs = [
  { key: 'classes', intl: 'menu.classes', Component: Classes },
  { key: 'level', intl: 'menu.level', Component: Level },
  { key: 'major', intl: 'menu.major', Component: Major },
  { key: 'rombel', intl: 'menu.rombel', Component: Rombel },
]

const General = () => {
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

export default General
