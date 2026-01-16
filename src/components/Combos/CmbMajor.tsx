import { useIntl } from "react-intl";

import { major } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbMajor = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V> & { onCreate?: () => void}) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.major' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={major}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbMajor