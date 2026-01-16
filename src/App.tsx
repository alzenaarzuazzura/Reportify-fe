import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import messages from './locales/id.json';
import DlgDeleteRedux from './components/Dialog/DlgDelete/DlgDeleteRedux';

function App() {
  return (
    <IntlProvider locale="id" messages={messages}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
          <DlgDeleteRedux />
        </AuthProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
