import { Form, Input } from "antd"
import { useIntl } from "react-intl"

import CmbClass from "@reportify/components/Combos/CmbClass"
import RequiredMark from "@reportify/components/RequiredMark"

import { rules } from "@reportify/utils/rules"

import { TStudentGeneralParams } from "@reportify/types"

const General = ({ viewMode }: TStudentGeneralParams) => {
    const intl = useIntl()

    return (
        <>
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <Form.Item 
                        name='nis' 
                        label={
                            <RequiredMark prefix={intl.formatMessage({ id: 'field.nis' })} />
                        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <Input placeholder={intl.formatMessage({ id: 'input.exNis' })} disabled={viewMode}/>
                    </Form.Item>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <Form.Item
                        name='name'
                        label={
                            <RequiredMark prefix={intl.formatMessage({ id: 'field.name' })} />
                        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <Input placeholder={intl.formatMessage({ id: 'input.exName' })} disabled={viewMode}/>
                    </Form.Item>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <Form.Item
                        name='id_class'
                        label={
                            <RequiredMark prefix={intl.formatMessage({ id: 'field.class' })} />
                        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <CmbClass disabled={viewMode} />
                    </Form.Item>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <Form.Item 
                        name='parent_telephone' 
                        label={
                            <RequiredMark prefix={intl.formatMessage({ id: 'field.parenttlp' })} />
                        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <Input placeholder={intl.formatMessage({ id: 'input.exTelephone' })} disabled={viewMode}/>
                    </Form.Item>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <Form.Item 
                        name='student_telephone' 
                        label={intl.formatMessage({ id: 'field.studenttlp' })}
                    >
                        <Input placeholder={intl.formatMessage({ id: 'input.exTelephone' })} disabled={viewMode}/>
                    </Form.Item>
                </div>
            </div>
        </>
    )
}

export default General