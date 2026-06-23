import * as React from 'react';
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

test('Multiple ThemeContextProvider with as="div" get unique data-mistica-theme attributes', () => {
    const {container} = render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
            }}
        >
            <ThemeContextProvider
                as="div"
                theme={{
                    skin: getMovistarSkin(),
                    colorScheme: 'light',
                    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                }}
            >
                <div data-testid="light-content" />
            </ThemeContextProvider>

            <ThemeContextProvider
                as="div"
                theme={{
                    skin: getMovistarSkin(),
                    colorScheme: 'dark',
                    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                }}
            >
                <div data-testid="dark-content" />
            </ThemeContextProvider>
        </ThemeContextProvider>,
    );

    const themedDivs = container.querySelectorAll('[data-mistica-theme]');
    expect(themedDivs).toHaveLength(2);

    const ids = Array.from(themedDivs).map((el) => el.getAttribute('data-mistica-theme'));
    // Each instance should have a unique identifier
    expect(ids[0]).not.toBe(ids[1]);
});

test('ThemeContextProvider with as="div" and withoutStyles does not add data-mistica-theme', () => {
    const {container} = render(
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
            }}
        >
            <ThemeContextProvider
                as="div"
                withoutStyles
                theme={{
                    skin: getMovistarSkin(),
                    colorScheme: 'dark',
                    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
                }}
            >
                <div data-testid="content" />
            </ThemeContextProvider>
        </ThemeContextProvider>,
    );

    const themedDivs = container.querySelectorAll('[data-mistica-theme]');
    expect(themedDivs).toHaveLength(0);
});
