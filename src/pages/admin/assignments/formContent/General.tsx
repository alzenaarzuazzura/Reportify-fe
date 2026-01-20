import CmbTeacher from "@reportify/components/Combos/CmbTeacher"
import CmbClass from "@reportify/components/Combos/CmbClass"
import CmbSubject from "@reportify/components/Combos/CmbSubject"
import RequiredMark from "@reportify/components/RequiredMark"
import { TTeachingAssignmentGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form } from "antd"
import { useIntl } from "react-intl"

const General = ({ viewMode }: TTeachingAssignmentGeneralParams) => {
    const intl = useIntl()

    return (
        <div className="row">
            <div className="col-sm-6 col-lg-3">
                <Form.Item
                    name='id_user'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.teacher' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <CmbTeacher 
                        disabled={viewMode}
                        allowClear={!viewMode}
                    />
                </Form.Item>
                <Form.Item
                    name='id_class'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.class' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <CmbClass 
                        disabled={viewMode}
                        allowClear={!viewMode}
                    />
                </Form.Item>
                <Form.Item
                    name='id_subject'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'menu.subjects' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <CmbSubject 
                        disabled={viewMode}
                        allowClear={!viewMode}
                    />
                </Form.Item>
            </div>
        </div>
    )
}

export default General
