import { useIntl } from "react-intl";

import { teachingAssignment } from "@reportify/services/api/combo";

import { TComboAjax, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

const CmbTeachingAssignment = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    isAdmin = false,
    ...props
}: TComboAjax<V> & { isAdmin?: boolean }) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.teachingassignment' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

        return (
            <SelectAjax 
                placeholder={placeHolder}
                fetchFn={teachingAssignment}
                showSearch
                allowClear
                labelInValue
                loadOnce={true}
                {...props}
            />
        )
}

export default CmbTeachingAssignment
