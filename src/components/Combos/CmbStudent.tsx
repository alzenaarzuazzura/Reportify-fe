import { useIntl } from "react-intl";
import { useCallback } from "react";

import { student, studentByClass } from "@reportify/services/api/combo";

import { TComboAjax, TComboFetchParams, TLabelValue, TSelectValue } from "@reportify/types";

import SelectAjax from "../SelectAjax";

type TCmbStudentProps<V extends TSelectValue = TLabelValue> = TComboAjax<V> & { 
    onCreate?: () => void
    fetchParams?: { id_class?: number }
}

const CmbStudent = <V extends TSelectValue = TLabelValue>({
    isFilter = false,
    fetchParams,
    ...props
}: TCmbStudentProps<V>) => {
    const { formatMessage } = useIntl()

    const thing = formatMessage({ id: 'menu.students' })
    const placeHolder = isFilter
        ? formatMessage({ id: 'field.all' })
        : formatMessage({ id: 'global.choose' }, { thing })

    // Use studentByClass if id_class is provided, otherwise use generic student
    const fetchFn = useCallback((params: TComboFetchParams) => {
        if (fetchParams?.id_class) {
            return studentByClass({ ...params, id_class: fetchParams.id_class })
        }
        return student(params)
    }, [fetchParams?.id_class])

    return (
        <SelectAjax 
            placeholder={placeHolder}
            fetchFn={fetchFn}
            showSearch
            allowClear
            labelInValue
            {...props}
        />
    )
}

export default CmbStudent