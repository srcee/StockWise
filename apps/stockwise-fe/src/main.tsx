import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import container from './inversify';
import { InversifyContextProvider } from './context/inversifyContextProvider';
import './main.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <InversifyContextProvider container={container}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </InversifyContextProvider>
);
