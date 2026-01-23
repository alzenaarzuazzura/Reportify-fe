import { useIntl } from "react-intl";

import { schedule } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbSchedule = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'field.schedule' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={schedule}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbSchedule
