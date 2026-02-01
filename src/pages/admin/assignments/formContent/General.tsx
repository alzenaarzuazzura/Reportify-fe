import CmbTeacher from "@reportify/components/Combos/CmbTeacher"
import CmbClass from "@reportify/components/Combos/CmbClass"
import CmbSubject from "@reportify/components/Combos/CmbSubject"
import RequiredMark from "@reportify/components/RequiredMark"
import { TTeachingAssignmentGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form } from "antd"
import { useIntl } from "react-intl"
import { checkExisting } from "@reportify/services/api/teachingassignment"

const General = ({ viewMode, formInstance, excludeId }: TTeachingAssignmentGeneralParams) => {
    const intl = useIntl()

    // Custom validator for class + subject combination
    const validateClassSubjectCombination = async (_: any, value: any) => {
        if (!value || viewMode) {
            return Promise.resolve()
        }

        const idClass = formInstance?.getFieldValue('id_class')?.value
        const idSubject = formInstance?.getFieldValue('id_subject')?.value

        // Only validate when both class and subject are selected
        if (idClass && idSubject) {
            const exists = await checkExisting(idClass, idSubject, excludeId)
            if (exists) {
                return Promise.reject(
                    new Error('Kombinasi kelas dan mata pelajaran ini sudah ada penugasan!')
                )
            }
        }

        return Promise.resolve()
    }

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
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' })),
                        { validator: validateClassSubjectCombination }
                    ]}
                    dependencies={['id_subject']}
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
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' })),
                        { validator: validateClassSubjectCombination }
                    ]}
                    dependencies={['id_class']}
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
