import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {ThemeContextProvider, IconTruckFilled, getMovistarSkin, textTokens} from '@telefonica/mistica';

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
            React.createElement(IconTruckFilled, {
                // adding a single text token to verify that a single token is included, not the whole dictionary
                key: textTokens.formCreditCardCvvLabel.en,
            })
        )
    )
);
