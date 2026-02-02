import RequiredMark from "@reportify/components/RequiredMark"
import CmbTeachingAssignment from "@reportify/components/Combos/CmbTeachingAssignment"
import { TAssignmentGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form, Input, DatePicker } from "antd"
import { useIntl } from "react-intl"
import dayjs from "dayjs"

const General = ({ viewMode }: TAssignmentGeneralParams) => {
    const intl = useIntl()

    return (
        <>
            <Form.Item 
                name='id_teaching_assignment' 
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.teachingassignment' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <CmbTeachingAssignment disabled={viewMode} />
            </Form.Item>
            <Form.Item
                name='assignment_title'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.assignmenttitle' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input placeholder={intl.formatMessage({ id: 'input.exAssignmentTitle' })} disabled={viewMode}/>
            </Form.Item>
            <Form.Item
                name='assignment_desc'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.assignmentdesc' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >             
                <Input.TextArea 
                    rows={4}
                    placeholder={intl.formatMessage({ id: 'input.exAssignmentDesc' })} 
                    disabled={viewMode}
                />
            </Form.Item>
            <Form.Item
                name='deadline'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.deadline' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <DatePicker 
                    style={{ width: '100%' }} 
                    disabled={viewMode} 
                    format="YYYY-MM-DD" 
                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                />
            </Form.Item>
        </>
    )
}

export default General