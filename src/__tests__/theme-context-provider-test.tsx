import React from 'react';
import {render, screen} from '@testing-library/react';
import {CreditCardFields} from '..';
import {getMovistarSkin} from '../skins/movistar';
import ThemeContextProvider from '../theme-context-provider';

test('ThemeContextProvider with es-ES locale', () => {
    render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
            }}
        >
            <CreditCardFields />
        </ThemeContextProvider>
    );

    expect(screen.getByLabelText('Número de tarjeta')).toBeInTheDocument();
    expect(screen.getByLabelText('Caducidad')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
});

test('ThemeContextProvider with de-DE locale', () => {
    render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
            }}
        >
            <CreditCardFields />
        </ThemeContextProvider>
    );

    expect(screen.getByLabelText('Kartennummer')).toBeInTheDocument();
    expect(screen.getByLabelText('Ablaufdatum')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
});

test('ThemeContextProvider override some texts', () => {
    render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                texts: {
                    formCreditCardNumberLabel: 'Any number label',
                    formCreditCardExpirationLabel: 'Any expiration label',
                },
            }}
        >
            <CreditCardFields />
        </ThemeContextProvider>
    );

    expect(screen.getByLabelText('Any number label')).toBeInTheDocument();
    expect(screen.getByLabelText('Any expiration label')).toBeInTheDocument();
    expect(screen.getByLabelText('CVV')).toBeInTheDocument();
});
