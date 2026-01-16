import { Button, Drawer, Form } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Icon } from '@iconify/react'

import {
	TFilterDrawerContent,
	TFilterDrawerFooter,
	TFilterDrawerHeader,
	TFilterDrawerProps,
	TItemFilterDrawer,
} from '@reportify/types'

const FilterItem = ({ name, picker, label, pickerOnly, props }: TItemFilterDrawer) => {
	if (pickerOnly) return picker

	return (
		<Form.Item name={name} label={label} {...props}>
			{picker}
		</Form.Item>
	)
}

const FilterContent = ({ items }: TFilterDrawerContent) => {
	return items.map(({ name, ...item }) => (
		<div className="row" key={name}>
			<div className="col">
				<FilterItem name={name} {...item} />
			</div>
		</div>
	))
}

const FilterHeader = ({ setOpen }: TFilterDrawerHeader) => (
	<div className="d-flex justify-content-between align-items-center mb-3">
		<h5 className="align-self-center mb-0">
			<FormattedMessage id="field.filter" />
		</h5>
		<Button
			className="float-right px-0"
			type="text"
			onClick={() => setOpen(false)}
			shape="circle"
			icon={<Icon icon="material-symbols:close-rounded" width="24" height="24" />}
		/>
	</div>
)

const FilterFooter = ({ setOpen, onReset, onFilter }: TFilterDrawerFooter) => {
	return (
		<>
			<Button
				className="col-5"
				onClick={() => {
					onReset()
					setOpen(false)
				}}
			>
				<FormattedMessage id="button.reset" />
			</Button>
			<Button
				type="primary"
				className="float-right col-5"
				onClick={() => {
					onFilter()
					setOpen(false)
				}}
			>
				<FormattedMessage id="button.apply" />
			</Button>
		</>
	)
}

const FilterDrawer = ({
	formInstance,
	initialValues,
	items,
	open,
	setOpen,
	onReset,
	onFilter,
}: TFilterDrawerProps) => {
	return (
		<Drawer
			placement="right"
			closable={false}
			onClose={() => setOpen(false)}
			open={open}
			styles={{ wrapper: { maxWidth: '85vw' } }}
			footer={<FilterFooter setOpen={setOpen} onReset={onReset} onFilter={onFilter} />}
			width={400}
			forceRender
		>
			<FilterHeader setOpen={setOpen} />
			<Form layout="vertical" form={formInstance} initialValues={initialValues}>
				<FilterContent items={items} />
			</Form>
		</Drawer>
	)
}

export default FilterDrawer
