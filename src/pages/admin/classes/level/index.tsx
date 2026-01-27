import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import CreateButton from '@reportify/components/Button/CreateButton'
import LevelList from './List'
import LevelFormModal from './components/DlgLevel'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const LevelPage = () => {
  const intl = useIntl()
  const dlgLevel = useVisibilityHandler()

  const title = intl.formatMessage({ id: 'menu.level' })

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => dlgLevel.show('createModal')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <LevelList />

      <LevelFormModal
        open={dlgLevel.isVisible('createModal')}
        onClose={() => dlgLevel.hide('createModal')}
      />
    </>
  )
}

export default LevelPage
