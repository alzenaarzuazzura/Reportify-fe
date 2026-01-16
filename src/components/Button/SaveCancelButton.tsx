import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Button } from 'antd'
import { CSSProperties } from 'react'

export type TSaveCancelButton = {
	id?: string
	onCancel?: () => void
	onSave?: () => void
	style?: CSSProperties
	buttonBlock?: boolean
	hideSaveBtn?: boolean
	loadingSaveBtn?: boolean
	textCancel?: string
	text?: string
	disableSaveBtn?: boolean
}

const SaveCancelButton = ({
	id,
	onCancel,
	onSave,
	style,
	buttonBlock = false,
	hideSaveBtn = false,
	loadingSaveBtn = false,
	textCancel,
	text = 'button.save',
	disableSaveBtn = false,
}: TSaveCancelButton) => {
	const intl = useIntl()
	const navigate = useNavigate()

	const cancelHandler = () => {
		if (onCancel) onCancel()
		else navigate(-1)
	}

	return (
	  <div
	    id={id}
	    style={{
	      display: 'flex',
	      justifyContent: 'center',
	      gap: 12,
		  marginTop: '35px',
	      ...style,
	    }}
	  >
	    <Button
		style={{ padding: '0 45px', margin: '0 15px 0 0' }}
	      type="default"
	      onClick={cancelHandler}
	      block={buttonBlock}
	    >
	      {intl.formatMessage({
	        id: textCancel || (hideSaveBtn ? 'button.close' : 'button.cancel'),
	      })}
	    </Button>

	    {!hideSaveBtn && (
	      <Button
		  style={{ padding: '0 45px'}}
	        type="primary"
	        htmlType={onSave ? 'button' : 'submit'}
	        onClick={onSave}
	        loading={loadingSaveBtn}
	        block={buttonBlock}
	        disabled={disableSaveBtn}
	      >
	        {intl.formatMessage({ id: text })}
	      </Button>
	    )}
	  </div>
	)
}

export default SaveCancelButton
