import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initI18n } from './Localization/i18nInitializer';
import i18n from 'i18next';

initI18n().then(() => {
  if (i18n.language && i18n.language.includes('-')) {
    i18n.changeLanguage(i18n.language.split('-')[0]);
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
