import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeContextProvider, Text1} from '@telefonica/mistica';

ReactDOM.render(
    <React.StrictMode>
        <ThemeContextProvider
            theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
        >
            <Text1>Hello</Text1>
        </ThemeContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
