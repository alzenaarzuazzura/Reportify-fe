import { Icon } from '@iconify/react'
import { Form, FormInstance, Input, InputProps } from 'antd'
import { debounce } from 'lodash'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

export type TSearchBarProps = InputProps & {
	searchName?: string
	formInstance: FormInstance
	onSearch: (value: string) => void
}

const SearchBar = ({ onSearch, formInstance, searchName = '', ...props }: TSearchBarProps) => {
	const intl = useIntl()
	const debounceSearch = useMemo(() => debounce((value) => onSearch(value), 400), [onSearch])

	return (
		<div className="search-bar-wrapper">
			<Form form={formInstance} component={false}>
				<Form.Item name={searchName} className="mb-0">
					<Input
						type="search"
						placeholder={intl.formatMessage({ id: 'input.search' })}
						prefix={<Icon icon="lucide:search" />}
						className="input_search solo"
						onChange={(e) => debounceSearch(e.target.value)}
						allowClear
						{...props}
					/>
				</Form.Item>
			</Form>
		</div>
	)
}

export default SearchBar
