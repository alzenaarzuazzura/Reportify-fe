import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

import RequiredMark from '@reportify/components/RequiredMark'

import { rules } from '@reportify/utils/rules'

import { TLevelGeneralParams } from '@reportify/types'

const General = ({ viewMode }: TLevelGeneralParams) => {
    const intl = useIntl()

    return (
        <>
            <Form.Item
                name="name"
                label={
                    <RequiredMark prefix={intl.formatMessage({ id: 'field.name' })} />
                }
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input placeholder={intl.formatMessage({ id: 'input.exlevel' })} disabled={viewMode}/>
            </Form.Item>
        </>
    )
}

export default General
