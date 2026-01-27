import { Form } from "antd"
import { useIntl } from "react-intl"

import CmbLevel from "@reportify/components/Combos/CmbLevel"
import CmbMajor from "@reportify/components/Combos/CmbMajor"
import CmbRombel from "@reportify/components/Combos/CmbRombel"
import RequiredMark from "@reportify/components/RequiredMark"

import { rules } from "@reportify/utils/rules"

import { TClassGeneralParams } from "@reportify/types"

const General = ({ viewMode }: TClassGeneralParams) => {
    const intl = useIntl()

    return (
        <>
            <div className="row">
                <div className="col-sm-6 col-lg-3">
                    <Form.Item
                        name='id_level'
                        label={
				        	<RequiredMark prefix={intl.formatMessage({ id: 'field.level' })} />
				        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <CmbLevel
                            disabled={viewMode}
                            allowClear={!viewMode}
                        />
                    </Form.Item>
                    <Form.Item
                        name='id_major'
                        label={
				        	<RequiredMark prefix={intl.formatMessage({ id: 'field.major' })} />
				        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <CmbMajor
                            disabled={viewMode}
                            allowClear={!viewMode}
                        />
                    </Form.Item>
                    <Form.Item
                        name='id_rombel'
                        label={
				        	<RequiredMark prefix={intl.formatMessage({ id: 'field.rombel' })} />
				        }
                        rules={[
                            rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                        ]}
                    >
                        <CmbRombel
                            disabled={viewMode}
                            allowClear={!viewMode}
                        />
                    </Form.Item>
                </div>
            </div>
        </>
    )
}

export default General
