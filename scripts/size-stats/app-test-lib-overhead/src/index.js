import * as React from 'react';
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client';
import {ThemeContextProvider, IconTruckFilled, getMovistarSkin} from '@telefonica/mistica';

/*
Using React.createElement so we don't need to compile JSX

<React.StrictMode>
    <ThemeContextProvider
        theme={{skin: getMovistarSkin(), i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'}}}
    >
        <IconTruckFilled />
    </ThemeContextProvider>
</React.StrictMode>,
*/

const root = createRoot(document.getElementById('root'));
root.render(
    React.createElement(
        React.StrictMode,
        {},
        React.createElement(
            ThemeContextProvider,
            {
                theme: {
                    skin: getMovistarSkin(),
                    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                },
            },
            React.createElement(IconTruckFilled, {})
        )
    )
);
