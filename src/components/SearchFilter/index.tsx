import { useState } from 'react'
import { Button } from 'antd'
import { Icon } from '@iconify/react'

import { TSearchFilterProps } from '@reportify/types'

import FilterDrawer from '../FilterDrawer'
import SearchBar from '../SearchBar'

const SearchFilter = ({
	items,
	onSearch,
	onFilter,
	onReset,
	formInstance,
	searchName,
	useSearch = true,
	initialValues,
	style,
	...props
}: TSearchFilterProps) => {
	const [showDrawer, setShowDrawer] = useState(false)

	return (
		<div className="search-filter-wrapper">
			{useSearch && (
				<div className="search-filter-input">
					<SearchBar
						formInstance={formInstance}
						searchName={searchName}
						onSearch={onSearch}
						{...props}
					/>
				</div>				
			)}
			<Button
				onClick={() => setShowDrawer(true)}
				icon={<Icon icon="lucide:filter" />}
				type="default"
				className='btn_filter'
				style={{ height: '32px' }}
			/>
			<FilterDrawer 
				formInstance={formInstance}
				initialValues={initialValues}
				items={items}
				open={showDrawer}
				setOpen={setShowDrawer}
				onFilter={onFilter}
				onReset={onReset}
			/>
		</div>
	)
}

export default SearchFilter
