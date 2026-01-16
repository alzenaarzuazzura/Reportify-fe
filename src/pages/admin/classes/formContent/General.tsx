import CmbLevel from "@reportify/components/Combos/CmbLevel"
import CmbMajor from "@reportify/components/Combos/CmbMajor"
import CmbRombel from "@reportify/components/Combos/CmbRombel"
import RequiredMark from "@reportify/components/RequiredMark"
import { useVisibilityHandler } from "@reportify/hooks/ui/useVisibilityHandler"
import { TClassGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form } from "antd"
import { useState } from "react"
import { useIntl } from "react-intl"
import DlgLevelCreate from "../components/DlgLevel/DlgLevelCreate"
import DlgMajorCreate from "../components/DlgMajor/DlgMajorCreate"
import DlgRombelCreate from "../components/DlgRombel/DlgRombelCreate"

const General = ({ viewMode, formInstance }: TClassGeneralParams) => {
    const intl = useIntl()

    const [levelOpen, setLevelOpen] = useState(false)
    const [majorOpen, setMajorOpen] = useState(false)
    const [rombelOpen, setRombelOpen] = useState(false)

    const dlgLevelCreate = useVisibilityHandler()
    const dlgMajorCreate = useVisibilityHandler()
    const dlgRombelCreate = useVisibilityHandler() 

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
                            open={levelOpen}
                            onOpenChange={setLevelOpen}
                            onCreate={() => {
                                setLevelOpen(false)
                                dlgLevelCreate.show('createModal')
                            }}
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
                            open={majorOpen}
                            onOpenChange={setMajorOpen}
                            onCreate={() => {
                                setMajorOpen(false)
                                dlgMajorCreate.show('createModal')
                            }}
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
                            open={rombelOpen}
                            onOpenChange={setRombelOpen}
                            onCreate={() => {
                                setRombelOpen(false)
                                dlgRombelCreate.show('createModal')
                            }}
                            disabled={viewMode}
                            allowClear={!viewMode}
                        />
                    </Form.Item>
                </div>
            </div>

            <DlgLevelCreate
                isVisible={dlgLevelCreate.isVisible('createModal')}
                setVisible={(visible) => {
                    if (!visible) {
                        dlgLevelCreate.hide('createModal')
                    }
                }}
                onSuccess={(data) => {
                    formInstance?.setFieldsValue({
                        id_level: { label: data.name, value: data.id },
                    })
                }}
            />

            <DlgMajorCreate
                isVisible={dlgMajorCreate.isVisible('createModal')}
                setVisible={(visible) => {
                    if (!visible) {
                        dlgMajorCreate.hide('createModal')
                    }
                }}
                onSuccess={(data) => {
                    formInstance?.setFieldsValue({
                        id_major: { label: data.name, value: data.id },
                    })
                }}
            />

            <DlgRombelCreate
                isVisible={dlgRombelCreate.isVisible('createModal')}
                setVisible={(visible) => {
                    if (!visible) {
                        dlgRombelCreate.hide('createModal')
                    }
                }}
                onSuccess={(data) => {
                    formInstance?.setFieldsValue({
                        id_rombel: { label: data.name, value: data.id },
                    })
                }}
            />
        </>
    )
}

export default General
