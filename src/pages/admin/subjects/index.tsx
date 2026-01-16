import { Helmet } from 'react-helmet-async'
import { useIntl } from 'react-intl'
import CreateButton from '@reportify/components/Button/CreateButton'
import SubjectList from './List'
import SubjectFormModal from './components/SubjectFormModal'
import { useVisibilityHandler } from '@reportify/hooks/ui/useVisibilityHandler'

const SubjectPage = () => {
  const intl = useIntl()
  const dlgSubject = useVisibilityHandler()

  const title = intl.formatMessage({ id: 'menu.subjects' })

  return (
    <>
      <Helmet title={title} />
      <div className="clearfix">
        <div className="float-right">
          <CreateButton onClick={() => dlgSubject.show('createModal')} />
        </div>
      </div>
      <div className="title-underline">
        <h5 style={{ margin: 0 }}>{title}</h5>
      </div>

      <SubjectList />

      <SubjectFormModal
        open={dlgSubject.isVisible('createModal')}
        onClose={() => dlgSubject.hide('createModal')}
      />
    </>
  )
}

export default SubjectPage
