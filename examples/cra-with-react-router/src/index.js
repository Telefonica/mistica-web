import '@telefonica/mistica/css/roboto.css';
import '@telefonica/mistica/css/reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeContextProvider} from '@telefonica/mistica';
import {Link} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <ThemeContextProvider
            theme={{skin: 'Vivo', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}, Link}}
        >
            <App />
        </ThemeContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
