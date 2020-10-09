import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeContextProvider, IconTruckFilled} from '@telefonica/mistica';

/*
Using React.createElement so we don't need to compile JSX

<React.StrictMode>
    <ThemeContextProvider
        theme={{skin: 'Movistar', i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
    >
        <IconTruckFilled />
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
            React.createElement(IconTruckFilled, {})
        )
    ),
    document.getElementById('root')
);
