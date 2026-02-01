import dayjs from "dayjs"
import { useIntl } from "react-intl"
import { Form, Input, Select, TimePicker } from "antd"

import CmbTeachingAssignment from "@reportify/components/Combos/CmbTeachingAssignment"
import RequiredMark from "@reportify/components/RequiredMark"

import { rules } from "@reportify/utils/rules"
import { checkExisting } from "@reportify/services/api/schedule"

import { TScheduleGeneralParams } from "@reportify/types"

const General = ({ viewMode, formInstance, excludeId }: TScheduleGeneralParams) => {
    const intl = useIntl()

    const dayOptions = [
        { label: 'Senin', value: 'senin' },
        { label: 'Selasa', value: 'selasa' },
        { label: 'Rabu', value: 'rabu' },
        { label: 'Kamis', value: 'kamis' },
        { label: 'Jumat', value: 'jumat' },
        { label: 'Sabtu', value: 'sabtu' },
    ]

    // Custom validator for time conflict
    const validateTimeConflict = async (_: any, value: any) => {
        if (!value || viewMode) {
            return Promise.resolve()
        }

        const day = formInstance?.getFieldValue('day')
        const startTime = formInstance?.getFieldValue('start_time')
        const endTime = formInstance?.getFieldValue('end_time')

        // Only validate when all fields are filled
        if (day && startTime && endTime) {
            const exists = await checkExisting(day, startTime, endTime, excludeId)
            if (exists) {
                return Promise.reject(
                    new Error('Jadwal bentrok! Sudah ada guru lain yang mengajar di hari dan jam yang sama.')
                )
            }
        }

        return Promise.resolve()
    }

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
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' })),
                        { validator: validateTimeConflict }
                    ]}
                    dependencies={['start_time', 'end_time']}
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
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' })),
                        { validator: validateTimeConflict }
                    ]}
                    dependencies={['day', 'end_time']}
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
                        rules.required(intl.formatMessage({ id: 'global.rulesfield' })),
                        { validator: validateTimeConflict }
                    ]}
                    dependencies={['day', 'start_time']}
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
