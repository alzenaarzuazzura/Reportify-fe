import { Button, Divider, Select } from 'antd'
import { FormattedMessage } from 'react-intl'
import { ReactElement, useMemo } from 'react'
import { DefaultOptionType } from 'antd/es/select'
import { Icon } from '@iconify/react'

import useSelectAjax from '@reportify/hooks/ui/useSelectAjax'

import { TSelectAjax, TSelectAjaxDropdown, TSelectAjaxNotFound, TSelectValue } from '@reportify/types'

const NotFoundContent = ({ isFetching, inputRequired }: TSelectAjaxNotFound) => {
	if (inputRequired > 0)
		return <FormattedMessage id="cmb.selectminimlength" values={{ i: inputRequired }} />

	if (isFetching) return <FormattedMessage id="cmb.fetching" />

	return <FormattedMessage id="cmb.selectnotfound" />
}

const DropdownContent = ({ menu, onCreate }: TSelectAjaxDropdown) => (
	<>
		<Button type="link" className="mt-1 text-left" block onClick={onCreate}>
			<Icon icon="lucide:plus" />
			<FormattedMessage id="button.addnew" />
		</Button>
		<Divider className="my-2" />
		{menu}
	</>
)

const onFilterOption = (input: string, option?: DefaultOptionType) => {
	// Ensure option and option.label exist and check if label is a string
	if (option && typeof option.label === 'string') {
		return option.label.toLowerCase().includes(input.toLowerCase())
	}
	return false
}

const SelectAjax = <V extends TSelectValue>({
	fetchFn,
	debounceTimeout,
	minimInputLength,
	onDropdownVisibleChange,
	onCreate,
	loadOnce = false,
	showSearch,
	open,
	onOpenChange,
	...props
}: TSelectAjax<V>) => {
	const { options, isFetching, inputRequired, fetchOptions, dropdownVisibleChangeHandler } =
		useSelectAjax({
			fetchFn,
			debounceTimeout,
			minimInputLength,
			onDropdownVisibleChange,
			loadOnce,
		})

	const dropdownRenderHandler = (menu: ReactElement) => {
		if (onCreate) return <DropdownContent menu={menu} onCreate={onCreate} />

		return menu
	}

	const formattedShowSearch = useMemo(() => {
		if (typeof showSearch === 'boolean' && showSearch) {
			return {
				filterOption: loadOnce ? onFilterOption : false,
				onSearch: fetchOptions,
			}
		}

		return showSearch
	}, [showSearch, loadOnce, fetchOptions])

	const handleOpenChange = (isOpen: boolean) => {
		dropdownVisibleChangeHandler(isOpen)
		if (onOpenChange) {
			onOpenChange(isOpen)
		}
	}

	return (
		<Select<V>
			options={options}
			showSearch={typeof formattedShowSearch === 'boolean' ? formattedShowSearch : true}
			filterOption={typeof formattedShowSearch === 'object' ? formattedShowSearch.filterOption : undefined}
			onSearch={typeof formattedShowSearch === 'object' ? formattedShowSearch.onSearch : undefined}
			notFoundContent={
				<NotFoundContent isFetching={isFetching} inputRequired={inputRequired} />
			}
			popupRender={dropdownRenderHandler}
			open={open}
			onOpenChange={handleOpenChange}
			onSelect={() => fetchOptions('')} // query di-reset setelah memilih item
			{...props}
		/>
	)
}

export default SelectAjax
