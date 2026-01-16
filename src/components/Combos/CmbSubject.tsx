import { useIntl } from "react-intl";

import { subject } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbSubject = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.subjects' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={subject}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbSubject