import '@telefonica/mistica/css/reset.css';
import '@telefonica/mistica/css/roboto.css';
import '@telefonica/mistica/css/mistica.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import {ThemeContextProvider, getMovistarSkin} from '@telefonica/mistica';

const theme = {
    skin: getMovistarSkin(),
    i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'ES'},
} as const;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeContextProvider theme={theme}>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);
