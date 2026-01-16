import { useIntl } from "react-intl";

import { level } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbLevel = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V> & { onCreate?: () => void}) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.level' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={level}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbLevel