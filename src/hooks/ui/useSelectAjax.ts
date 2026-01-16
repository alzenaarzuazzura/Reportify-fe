import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { defaultQueryOption } from '@reportify/utils/reactQueryHelper'
import { debounceDelay } from '@reportify/utils/GlobalConst'

import { TSelectAjaxData, TUseSelectAjax } from '@reportify/types'

const useSelectAjax = ({
	fetchFn,
	minimInputLength = 0,
	debounceTimeout = debounceDelay,
	onDropdownVisibleChange,
	loadOnce,
}: TUseSelectAjax) => {
	const queryClient = useQueryClient()

	const [options, setOptions] = useState<TSelectAjaxData[]>([])
	const [isFetching, setIsFetching] = useState(false)
	const [inputRequired, setInputRequired] = useState(minimInputLength)
	const [hasLoaded, setHasLoaded] = useState(false)

	const debounceFetcher = useMemo(
		() =>
			debounce((values: string) => {
				setInputRequired(0)
				queryClient
					.fetchQuery({
						queryKey: ['combo', fetchFn.name, values],
						queryFn: () => fetchFn({ search: values }),
						...defaultQueryOption,
					})
					.then((data) => {
						setIsFetching(false)
						setOptions(data)
						if (loadOnce) {
							setHasLoaded(true)
						}
					})
			}, debounceTimeout),
		[queryClient, debounceTimeout, setIsFetching, setInputRequired, setOptions, fetchFn, loadOnce],
	)

	const fetchOptions = useCallback(
		(values: string) => {
			if (values.length < minimInputLength) {
				setInputRequired(minimInputLength - values.length)
			} else if (!loadOnce || !hasLoaded) {
				setIsFetching(true)
				debounceFetcher(values)
			}
		},
		[minimInputLength, debounceFetcher, setInputRequired, setIsFetching, loadOnce, hasLoaded],
	)

	const dropdownVisibleChangeHandler = useCallback(
		(open: boolean) => {
			if (open && minimInputLength === 0 && (!loadOnce || !hasLoaded)) {
				setIsFetching(true)
				debounceFetcher('')
			}
			if (onDropdownVisibleChange) onDropdownVisibleChange(open)
		},
		[onDropdownVisibleChange, setIsFetching, debounceFetcher, minimInputLength, loadOnce, hasLoaded],
	)

	return {
		options,
		isFetching,
		inputRequired,
		fetchOptions,
		dropdownVisibleChangeHandler,
	}
}

export default useSelectAjax
