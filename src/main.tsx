import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, App as AntApp } from 'antd';
import idID from 'antd/locale/id_ID';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css';
import App from './App';
import { store } from './redux/store';
import { color } from './constant/color';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            locale={idID}
            theme={{
              token: {
                colorPrimary: color.primary,
                colorSuccess: color.success,
                colorWarning: color.warning,
                colorError: color.danger,
                borderRadius: 8,
              },
            }}
          >
            <AntApp>
              <App />
            </AntApp>
          </ConfigProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>
);
