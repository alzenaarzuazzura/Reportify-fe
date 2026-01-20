import { useIntl } from "react-intl";

import { teacher } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbTeacher = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'field.teacher' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={teacher}
                showSearch
                allowClear
                labelInValue
                loadOnce={true}
                {...props}
            />
        )
}

export default CmbTeacher
