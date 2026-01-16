import { useIntl } from "react-intl";

import { role } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbRole = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.role' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={role}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbRole