import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import CreateButton from '@reportify/components/Button/CreateButton'
import MajorList from './List'
import MajorFormModal from './components/DlgMajor'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const MajorPage = () => {
  const intl = useIntl()
  const dlgMajor = useVisibilityHandler()

  const title = intl.formatMessage({ id: 'menu.major' })

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => dlgMajor.show('createModal')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <MajorList />

      <MajorFormModal
        open={dlgMajor.isVisible('createModal')}
        onClose={() => dlgMajor.hide('createModal')}
      />
    </>
  )
}

export default MajorPage
