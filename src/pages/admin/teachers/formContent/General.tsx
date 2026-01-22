import CmbRole from "@reportify/components/Combos/CmbRole"
import RequiredMark from "@reportify/components/RequiredMark"
import { TTeacherGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form, Input } from "antd"
import { useIntl } from "react-intl"

const General = ({ viewMode, createMode }: TTeacherGeneralParams) => {
    const intl = useIntl()

    return (
        <>
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
            <Form.Item
                name='email'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.email' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input placeholder={intl.formatMessage({ id: 'input.exEmail' })} disabled={viewMode}/>
            </Form.Item>
            <Form.Item
                name='phone'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.tlp' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <Input placeholder={intl.formatMessage({ id: 'input.exTelephone' })} disabled={viewMode}/>
            </Form.Item>
            {/* Password field hanya muncul saat create mode dan disabled */}
            {createMode && (
                <Form.Item
                    name='password'
                    label={intl.formatMessage({ id: 'field.password' })}
                    help="Password akan di-generate otomatis jika tidak diisi"
                >
                    <Input.Password 
                        placeholder="Opsional - akan di-generate otomatis" 
                        disabled={viewMode}
                    />
                </Form.Item>
            )}
            <Form.Item
                name='role'
                label={
					<RequiredMark prefix={intl.formatMessage({ id: 'field.role' })} />
				}
                rules={[
                    rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                ]}
            >
                <CmbRole disabled={viewMode} />
            </Form.Item>
        </>
    )
}

export default General