import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

import RequiredMark from '@reportify/components/RequiredMark'

import { rules } from '@reportify/utils/rules'

import { TRombelGeneralParams } from '@reportify/types'

const General = ({ viewMode }: TRombelGeneralParams) => {
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
                <Input placeholder={intl.formatMessage({ id: 'input.exrombel' })} disabled={viewMode}/>
            </Form.Item>
        </>
    )
}

export default General
