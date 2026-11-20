import * as React from 'react';
import {CreditCardFields} from '..';
import {getMovistarSkin} from '../skins/movistar';
import ThemeContextProvider from '../theme-context-provider';

export const Spanish = (): JSX.Element => {
    return (
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
            }}
        >
            <CreditCardFields />
        </ThemeContextProvider>
    );
};
export const German = (): JSX.Element => {
    return (
        <ThemeContextProvider
            theme={{
                skin: getMovistarSkin(),
                i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
            }}
        >
            <CreditCardFields />
        </ThemeContextProvider>
    );
};
export const CustomTexts = (): JSX.Element => {
    return (
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
};
export const UniqueThemeIds = (): JSX.Element => {
    return (
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
        </ThemeContextProvider>
    );
};
export const WithoutStyles = (): JSX.Element => {
    return (
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
        </ThemeContextProvider>
    );
};
