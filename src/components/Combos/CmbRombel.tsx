import { useIntl } from "react-intl";

import { rombel } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbRombel = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V> & { onCreate?: () => void}) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.rombel' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={rombel}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbRombel