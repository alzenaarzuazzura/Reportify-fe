import { App, ModalFuncProps } from 'antd'
import { isNil } from 'lodash'
import { IntlShape, useIntl } from 'react-intl'
import { useCallback } from 'react'
import { Icon } from '@iconify/react'

import DlgMessage from '@reportify/components/Dialog/DlgMessage'

import {
	TActionDialogMessage,
	TBaseDialogMessage,
	TCustomDialogMessage,
	TDefaultDialogMessage,
} from '@reportify/types'
import { color } from '@reportify/constant/color'

const successIcon = (
  <Icon
    icon="lucide:check-circle"
    style={{ fontSize: 64, color: color.success }}
  />
)

const dangerIcon = (
  <Icon
    icon="lucide:alert-triangle"
    style={{ fontSize: 64, color: color.danger }}
  />
)


enum action {
	'create',
	'update',
	'updateSetting',
	'delete',
}

const modalProps: ModalFuncProps = {
	centered: true,
	footer: null,
	icon: null,
	styles: { body: { maxHeight: 560, overflow: 'auto', textAlign: 'center' } },
	maskClosable: false,
	width: 480,
	zIndex: 1011,
}

const generateActionDialogContent = (
	intl: IntlShape,
	act: action,
	params: TActionDialogMessage,
): TBaseDialogMessage => {
	const payload: TBaseDialogMessage = { ...params }
	const menu = intl.formatMessage({ id: params.menuId })

	const formatText = (id: string) => intl.formatMessage({ id }, { thing: menu })

	switch (act) {
		case action.create: {
			payload.title = formatText('dlgmsg.successcrt')
			payload.subtitle = formatText('dlgmsg.successcrt.subtitle')
			payload.primaryButton = {
				...params.primaryButton,
				text: intl.formatMessage({ id: 'button.addnew' }),
				props: {
					...params.primaryButton?.props,
					type: 'primary',
					icon: <Icon icon="lucide:plus" />,
				},
			}
			payload.secondaryButton = {
				...params.secondaryButton,
				text: intl.formatMessage({ id: 'button.later' }),
			}
			break
		}
		case action.update: {
			payload.title = formatText('dlgmsg.successupd')
			payload.subtitle = formatText('dlgmsg.successupd.subtitle')
			payload.primaryButton = {
				...params.primaryButton,
				text: intl.formatMessage({ id: 'button.addnew' }),
				props: {
					...params.primaryButton?.props,
					type: 'primary',
					icon: <Icon icon="lucide:plus" />,
				},
			}
			payload.secondaryButton = {
				...params.secondaryButton,
				text: intl.formatMessage({ id: 'button.later' }),
			}
			break
		}
		case action.updateSetting: {
			payload.title = formatText('dlgmsg.successupdsetting')
			payload.primaryButton = {
				...params.primaryButton,
				text: intl.formatMessage({ id: 'button.close' }),
				props: { ...params.primaryButton?.props, type: 'primary', block: false },
			}
			break
		}
		case action.delete: {
			payload.title = formatText('dlgmsg.successdel')
			payload.primaryButton = {
				...params.primaryButton,
				text: intl.formatMessage({ id: 'button.close' }),
				props: { ...params.primaryButton?.props, type: 'primary', block: false },
			}
			break
		}
		default:
			break
	}

	return payload
}

const useDlgMessage = () => {
	const intl = useIntl()
	const { modal: Modal } = App.useApp()

	const createDialogInstance = useCallback(
		(params: TBaseDialogMessage) => {
			const modal = Modal.info({
				...modalProps,
				content: <DlgMessage {...params} closeDialog={() => modal.destroy()} />,
			})
		},
		[Modal],
	)

	const showDialog = useCallback(
		({ isError, ...params }: TDefaultDialogMessage) => {
			const payload: TBaseDialogMessage = { ...params }
			if (isError) {
				payload.icon = dangerIcon
				payload.title = params.title || intl.formatMessage({ id: 'dlgmsg.errmsg' })
				payload.primaryButton = {
					...params.primaryButton,
					text: intl.formatMessage({ id: 'button.close' }),
					props: { ...params.primaryButton?.props, type: 'primary', block: false },
				}
				payload.secondaryButton = undefined
			} else {
				payload.icon = successIcon
				payload.message = undefined
				if (params.primaryButton) {
					payload.primaryButton = {
						...params.primaryButton,
						text: intl.formatMessage({ id: 'button.close' }),
						props: {
							...params.primaryButton.props,
							type: 'primary',
							block: !isNil(params.secondaryButton),
						},
					}
				}
			}
			createDialogInstance(payload)
		},
		[intl, createDialogInstance],
	)

	const showDialogAction = useCallback(
		(params: TActionDialogMessage, act: action) => {
			if (params.isError) showDialog(params)
			else {
				const successParams: TActionDialogMessage = { ...params }
				successParams.icon = successIcon
				successParams.message = undefined

				createDialogInstance(generateActionDialogContent(intl, act, successParams))
			}
		},
		[createDialogInstance, showDialog, intl],
	)

	const showDialogCreate = useCallback(
		(params: TActionDialogMessage) => showDialogAction(params, action.create),
		[showDialogAction],
	)

	const showDialogUpdate = useCallback(
		(params: TActionDialogMessage) => showDialogAction(params, action.update),
		[showDialogAction],
	)

	const showDialogUpdateSetting = useCallback(
		(params: TActionDialogMessage) => showDialogAction(params, action.updateSetting),
		[showDialogAction],
	)

	const showDialogDelete = useCallback(
		(params: TActionDialogMessage) => showDialogAction(params, action.delete),
		[showDialogAction],
	)

	const showDialogCustom = useCallback(
		({ isError, defaultIcon, ...params }: TCustomDialogMessage) => {
			const payload: TBaseDialogMessage = { ...params }

			if (defaultIcon) payload.icon = isError ? dangerIcon : successIcon

			if (isNil(params.primaryButton)) {
				payload.primaryButton = {
					text: intl.formatMessage({ id: 'button.close' }),
					props: { type: 'primary', block: !isNil(params.secondaryButton) },
					handler: () => {},
				}
			}

			createDialogInstance(payload)
		},
		[createDialogInstance, intl],
	)

	return {
		/** default dialog message */
		showDialog,
		/** dialog message with title or subtitle for create */
		showDialogCreate,
		/** dialog message with title or subtitle for update */
		showDialogUpdate,
		/** dialog message with title or subtitle for update setting */
		showDialogUpdateSetting,
		/** dialog message with title or subtitle for delete */
		showDialogDelete,
		/** custom dialog message */
		showDialogCustom,
	}
}

export default useDlgMessage
