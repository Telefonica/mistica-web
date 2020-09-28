import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeContextProvider, Text1} from '@telefonica/mistica';

/*
Using React.createElement so we don't need to compile JSX

<React.StrictMode>
    <ThemeContextProvider
        theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
    >
        <Text1>Hello</Text1>
    </ThemeContextProvider>
</React.StrictMode>,
*/

ReactDOM.render(
    React.createElement(
        React.StrictMode,
        {},
        React.createElement(
            ThemeContextProvider,
            {
                theme: {skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}},
            },
            React.createElement(Text1, {}, 'Hello')
        )
    ),
    document.getElementById('root')
);
