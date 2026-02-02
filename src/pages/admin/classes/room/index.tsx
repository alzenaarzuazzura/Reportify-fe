import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import CreateButton from '@reportify/components/Button/CreateButton'
import RoomList from './List'
import RoomFormModal from './components/DlgRoom'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const RoomPage = () => {
  const intl = useIntl()
  const dlgRoom = useVisibilityHandler()

  const title = intl.formatMessage({ id: 'menu.room' })

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => dlgRoom.show('createModal')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <RoomList />

      <RoomFormModal
        open={dlgRoom.isVisible('createModal')}
        onClose={() => dlgRoom.hide('createModal')}
      />
    </>
  )
}

export default RoomPage
