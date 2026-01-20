import CmbTeachingAssignment from "@reportify/components/Combos/CmbTeachingAssignment"
import RequiredMark from "@reportify/components/RequiredMark"
import { TScheduleGeneralParams } from "@reportify/types"
import { rules } from "@reportify/utils/rules"
import { Form, Input, Select, TimePicker } from "antd"
import { useIntl } from "react-intl"
import dayjs from "dayjs"

const General = ({ viewMode }: TScheduleGeneralParams) => {
    const intl = useIntl()

    const dayOptions = [
        { label: 'Senin', value: 'Senin' },
        { label: 'Selasa', value: 'Selasa' },
        { label: 'Rabu', value: 'Rabu' },
        { label: 'Kamis', value: 'Kamis' },
        { label: 'Jumat', value: 'Jumat' },
        { label: 'Sabtu', value: 'Sabtu' },
    ]

    return (
        <div className="row">
            <div className="col-sm-6 col-lg-3">
                <Form.Item
                    name='id_teaching_assignment'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'menu.teachingassignment' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <CmbTeachingAssignment 
                        disabled={viewMode}
                        allowClear={!viewMode}
                    />
                </Form.Item>
                <Form.Item
                    name='day'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.day' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <Select 
                        disabled={viewMode}
                        allowClear={!viewMode}
                        options={dayOptions}
                        placeholder={intl.formatMessage({ id: 'global.choose' }, { thing: intl.formatMessage({ id: 'field.day' }) })}
                    />
                </Form.Item>
                <Form.Item
                    name='room'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.room' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                >
                    <Input 
                        disabled={viewMode}
                        placeholder={intl.formatMessage({ id: 'global.input' }, { thing: intl.formatMessage({ id: 'field.room' }) })}
                    />
                </Form.Item>                
            </div>
            <div className="col-sm-6 col-lg-3">
                <Form.Item
                    name='start_time'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.starttime' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value, 'HH:mm:ss') : undefined,
                    })}
                    normalize={(value) => value ? value.format('HH:mm:ss') : undefined}
                >
                    <TimePicker 
                        disabled={viewMode}
                        format="HH:mm:ss"
                        style={{ width: '100%' }}
                        placeholder={intl.formatMessage({ id: 'global.choose' }, { thing: intl.formatMessage({ id: 'field.starttime' }) })}
                    />
                </Form.Item>
                <Form.Item
                    name='end_time'
                    label={
                        <RequiredMark prefix={intl.formatMessage({ id: 'field.endtime' })} />
                    }
                    rules={[
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' }))
                    ]}
                    getValueProps={(value) => ({
                        value: value ? dayjs(value, 'HH:mm:ss') : undefined,
                    })}
                    normalize={(value) => value ? value.format('HH:mm:ss') : undefined}
                >
                    <TimePicker 
                        disabled={viewMode}
                        format="HH:mm:ss"
                        style={{ width: '100%' }}
                        placeholder={intl.formatMessage({ id: 'global.choose' }, { thing: intl.formatMessage({ id: 'field.endtime' }) })}
                    />
                </Form.Item>
            </div>
        </div>
    )
}

export default General
