import { useIntl } from "react-intl";

import { classCombo } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbClass = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'field.class' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={classCombo}
                showSearch
                allowClear
                labelInValue
                loadOnce={true}
                {...props}
            />
        )
}

export default CmbClass
