import { App } from 'antd'
import { NoticeType } from 'antd/es/message/interface'

const usePopupMessage = () => {
	const { message } = App.useApp()

	const showMessage = (type: NoticeType, title: string, onClose?: () => void) => {
		message[type](title, 2, () => {
			if (onClose) onClose()
		})
	}

	return { showMessage }
}

export default usePopupMessage
