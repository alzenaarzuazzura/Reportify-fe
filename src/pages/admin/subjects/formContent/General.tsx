import RequiredMark from '@reportify/components/RequiredMark'
import { TSubjectGeneralParams } from '@reportify/types'
import { rules } from '@reportify/utils/rules'
import { Form, Input } from 'antd'
import { useIntl } from 'react-intl'

const General = ({ viewMode }: TSubjectGeneralParams) => {
	const intl = useIntl()

	return (
		<>
			<Form.Item
				name="code"
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.code' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
			>
				<Input placeholder={intl.formatMessage({ id: 'input.exsubjectcode' })} disabled={viewMode} />
			</Form.Item>

			<Form.Item
				name="name"
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.name' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
			>
				<Input placeholder={intl.formatMessage({ id: 'input.exsubjectname' })} disabled={viewMode}/>
			</Form.Item>
		</>
	)
}

export default General
