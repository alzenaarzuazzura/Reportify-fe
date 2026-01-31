import { TTableSorter, TTableSortFilter } from "@reportify/types/components/table"
import React, { KeyboardEvent as ReactKeyboardEvent } from "react"

export const getTableSortOrder = <T>(sorter: TTableSorter<T>): TTableSortFilter => {
	if (!Array.isArray(sorter) && sorter.order) {
		const order = sorter.field?.toString() || ''
		const sort = sorter.order === 'ascend' ? 'asc' : 'desc'
		return { order, sort }
	}
	return { order: '', sort: 'asc' }
}

export const onEnter = (doEnter: () => void) => (event: React.KeyboardEvent) => {
	if (event.key === 'Enter') {
		doEnter()
	}
}

//numeric only
export const numberOnlyKeyDown = (
	e: ReactKeyboardEvent<HTMLInputElement>,
) => {
	const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Ctrl']

	if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
		e.preventDefault()
	}
}

/**
 * Format phone number untuk display (UI)
 * Input: "081234567890" -> Output: "0812-3456-7890"
 */
export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 12)

  const parts = []
  if (digits.length > 0) parts.push(digits.slice(0, 4))
  if (digits.length > 4) parts.push(digits.slice(4, 8))
  if (digits.length > 8) parts.push(digits.slice(8))

  return parts.join('-')
}


/**
 * Parse phone number dari display ke format backend
 * Input: "0812-3456-7890" -> Output: "081234567890"
 */
export const parsePhoneValue = (phone: string | null | undefined): string => {
	if (!phone) return ''
	
	// Hapus semua karakter non-digit
	return phone.replace(/\D/g, '')
}

//getInitial
export const getInitials = (name?: string) => {
  if (!name) return '?'

  const words = name.trim().split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }

  return (
    words[0].charAt(0) + words[words.length - 1].charAt(0)
  ).toUpperCase()
}
