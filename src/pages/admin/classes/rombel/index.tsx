import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import CreateButton from '@reportify/components/Button/CreateButton'
import RombelList from './List'
import RombelFormModal from './components/DlgRombel'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const RombelPage = () => {
  const intl = useIntl()
  const dlgRombel = useVisibilityHandler()

  const title = intl.formatMessage({ id: 'menu.rombel' })

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => dlgRombel.show('createModal')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <RombelList />

      <RombelFormModal
        open={dlgRombel.isVisible('createModal')}
        onClose={() => dlgRombel.hide('createModal')}
      />
    </>
  )
}

export default RombelPage
