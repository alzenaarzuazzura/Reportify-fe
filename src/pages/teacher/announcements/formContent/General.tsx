import RequiredMark from "@reportify/components/RequiredMark"
import { TAnnouncementGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form, Input, DatePicker } from "antd"
import { useIntl } from "react-intl"

const General = ({ viewMode }: TAnnouncementGeneralParams) => {
    const intl = useIntl()

    return (
        <>
            <Form.Item
                name='title'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.title' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input placeholder={intl.formatMessage({ id: 'input.exAnnouncementTitle' })} disabled={viewMode}/>
            </Form.Item>
            <Form.Item
                name='content'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.desc' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input.TextArea 
                    rows={6}
                    placeholder={intl.formatMessage({ id: 'input.exAnnouncementContent' })} 
                    disabled={viewMode}
                />
            </Form.Item>
            <Form.Item
                name='announcement_date'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.date' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <DatePicker style={{ width: '100%' }} disabled={viewMode} format="YYYY-MM-DD" />
            </Form.Item>
        </>
    )
}

export default General
