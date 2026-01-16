import { RuleObject } from 'antd/es/form'

export const rules = {
	numberOnly: (message: string): RuleObject => ({
		pattern: /^[0-9 -]+$/g,
		message: message,
	}),
	required: (message: string): RuleObject => ({
		required: true,
		message: message,
	}),
	email: (message: string): RuleObject => ({
		type: 'email',
		message: message,
	}),
	noWhitespace: (message: string): RuleObject => ({
		pattern: /^\S*$/,
		message: message,
	}),
}

export default { rules }
