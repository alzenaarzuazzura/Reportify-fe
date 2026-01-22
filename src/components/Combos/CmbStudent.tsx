import { useIntl } from "react-intl";

import { student } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbStudent = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    ...props
}: TComboAjax<V> & { onCreate?: () => void}) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.student' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={student}
                showSearch
                allowClear
                labelInValue
                {...props}
            />
        )
}

export default CmbStudent