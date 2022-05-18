import * as React from 'react';

import type {RegionCode} from './utils/region-code';
import type {Locale} from './utils/locale';
import type {Skin, Colors, SkinName} from './skins/types';
import type {TrackingEvent} from './utils/types';

export type ThemeTexts = typeof TEXTS_ES;

const TEXTS_ES = {
    expirationDatePlaceholder: 'MM/AA',
    togglePasswordVisibilityLabel: 'Mostrar u ocultar contraseña',
    loading: 'Cargando',
    linkOpensInNewTab: 'Se abre en ventana nueva',
    modalClose: 'Cerrar',
    dialogCancelButton: 'Cancelar',
    dialogAcceptButton: 'Aceptar',
    formFieldOptionalLabelSuffix: 'opcional',
    formFieldErrorIsMandatory: 'Este campo es obligatorio',
    formCreditCardNumberLabel: 'Número de tarjeta',
    formCreditCardExpirationLabel: 'Caducidad',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'CVV incorrecto',
    formCreditCardCvvTooltipVisaMcButton: 'Mostrar ayuda CVV',
    formCreditCardCvvTooltipVisaMc: 'El CVV son los 3 últimos dígitos del reverso de tu tarjeta',
    formCreditCardCvvTooltipAmex: 'Si es American Express, añade los 4 dígitos del anverso',
    formCreditCardExpirationError: 'Fecha no válida',
    formCreditCardNumberError: 'No es un número de tarjeta válido',
    formDateOutOfRangeError: 'Fecha no permitida',
    formEmailError: 'Email incorrecto',
    formIbanError: 'IBAN incorrecto',
    closeButtonLabel: 'Cerrar',
    formSearchClear: 'Borrar búsqueda',
    menuLabelSuffix: 'menú',
    openNavigationMenu: 'Abrir menú de navegación',
    closeNavigationMenu: 'Cerrar menú de navegación',
    backNavigationBar: 'Atrás',
    clearButton: 'Borrar',
    carouselNextButton: 'siguiente',
    carouselPrevButton: 'anterior',
};

const TEXTS_EN: ThemeTexts = {
    expirationDatePlaceholder: 'MM/YY',
    togglePasswordVisibilityLabel: 'Toggle password visibility',
    loading: 'Loading',
    linkOpensInNewTab: 'Opens in a new window',
    modalClose: 'Close',
    dialogCancelButton: 'Cancel',
    dialogAcceptButton: 'Accept',
    formFieldOptionalLabelSuffix: 'optional',
    formFieldErrorIsMandatory: 'This field is required',
    formCreditCardNumberLabel: 'Card number',
    formCreditCardExpirationLabel: 'Expiry',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'Incorrect CVV',
    formCreditCardCvvTooltipVisaMcButton: 'Show CVV help',
    formCreditCardCvvTooltipVisaMc: 'The CVV is the 3 digits of the back of your card',
    formCreditCardCvvTooltipAmex: "If it's American Express, add the 4-digit number on the front of the card",
    formCreditCardExpirationError: 'Invalid date',
    formCreditCardNumberError: 'The card number is not valid',
    formDateOutOfRangeError: 'Invalid date',
    formEmailError: 'Invalid email',
    formIbanError: 'Incorrect IBAN',
    closeButtonLabel: 'Close',
    formSearchClear: 'Clear search',
    menuLabelSuffix: 'menu',
    openNavigationMenu: 'Open navigation menu',
    closeNavigationMenu: 'Close navigation menu',
    backNavigationBar: 'Back',
    clearButton: 'Clear',
    carouselNextButton: 'next',
    carouselPrevButton: 'previous',
};

const TEXTS_DE: ThemeTexts = {
    expirationDatePlaceholder: 'MM/JJ',
    togglePasswordVisibilityLabel: 'Passwort un-/sichtbar machen',
    loading: 'Wird gespeichert',
    linkOpensInNewTab: 'Wird in neuem Fenster geöffnet',
    modalClose: 'Schließen',
    dialogCancelButton: 'Abbrechen',
    dialogAcceptButton: 'Akzeptieren',
    formFieldOptionalLabelSuffix: 'optional',
    formFieldErrorIsMandatory: 'Das ist ein Pflichtfeld',
    formCreditCardNumberLabel: 'Kartennummer',
    formCreditCardExpirationLabel: 'Ablaufdatum',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'Falsche CVV',
    formCreditCardCvvTooltipVisaMcButton: 'CVV-Hilfe anzeigen',
    formCreditCardCvvTooltipVisaMc: 'Der CVV-Code besteht aus den 3 Ziffern auf der Kartenrückseite',
    formCreditCardCvvTooltipAmex: 'Bei American Express 4-stelligen Code auf der Rückseite hinzufügen',
    formCreditCardExpirationError: 'Datum ungültig',
    formCreditCardNumberError: 'Kartennummer ungültig',
    formDateOutOfRangeError: 'Unzulässiges Datum',
    formEmailError: 'Falsche E-Mail-Adresse',
    formIbanError: 'Falsche IBAN',
    closeButtonLabel: 'Schließen',
    formSearchClear: 'Suche löschen',
    menuLabelSuffix: 'Menü',
    openNavigationMenu: 'Navigationsmenü öffnen',
    closeNavigationMenu: 'Navigationsmenü schließen',
    backNavigationBar: 'Zurück',
    clearButton: 'Löschen',
    carouselNextButton: 'nächste',
    carouselPrevButton: 'vorherige',
};

const TEXTS_PT: ThemeTexts = {
    expirationDatePlaceholder: 'MM/AA',
    togglePasswordVisibilityLabel: 'Mostrar ou ocultar senha',
    loading: 'Carregando',
    linkOpensInNewTab: 'Abre em nova janela',
    modalClose: 'Fechar',
    dialogCancelButton: 'Cancelar',
    dialogAcceptButton: 'Aceitar',
    formFieldOptionalLabelSuffix: 'opcional',
    formFieldErrorIsMandatory: 'Este campo é obrigatório',
    formCreditCardNumberLabel: 'Número de cartão',
    formCreditCardExpirationLabel: 'Expiração',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'CVV incorreto',
    formCreditCardCvvTooltipVisaMcButton: 'Exibir ajuda CVV',
    formCreditCardCvvTooltipVisaMc: 'O CVV são os 3  dígitos do reverso de seu cartão',
    formCreditCardCvvTooltipAmex: 'Se for American Express, adicione os 4 dígitos do anverso',
    formCreditCardExpirationError: 'Data inválida',
    formCreditCardNumberError: 'Não é um número de cartão válido',
    formDateOutOfRangeError: 'Data não permitida',
    formEmailError: 'Email incorreto',
    formIbanError: 'IBAN incorreto',
    closeButtonLabel: 'Fechar',
    formSearchClear: 'Apagar pesquisa',
    menuLabelSuffix: 'menu',
    openNavigationMenu: 'Abrir menu de navegação',
    closeNavigationMenu: 'Fechar menu de navegação',
    backNavigationBar: 'Voltar',
    clearButton: 'Apagar',
    carouselNextButton: 'próximo',
    carouselPrevButton: 'anterior',
};

export const getTexts = (locale: Locale): typeof TEXTS_ES => {
    const lang = locale.toLocaleLowerCase().split(/[-_]/)[0];
    switch (lang) {
        case 'es':
            return TEXTS_ES;
        case 'pt':
            return TEXTS_PT;
        case 'de':
            return TEXTS_DE;
        case 'en':
            return TEXTS_EN;
        default: {
            if (process.env.NODE_ENV !== 'production') {
                console.error(`Invalid locale: ${locale}`);
            }
            return TEXTS_EN;
        }
    }
};

export const dimensions = {
    headerMobileHeight: 56,
};

export const mediaQueriesConfig = {
    tabletMinWidth: 768,
    desktopMinWidth: 1024,
    largeDesktopMinWidth: 1368,
    desktopOrTabletMinHeight: 550,
};

type LinkComponent = React.ComponentType<{
    style?: React.CSSProperties;
    className?: string;
    'aria-label'?: string;
    disabled?: boolean;
    role?: string;
    'data-testid'?: string;
    'aria-checked'?: 'true' | 'false' | boolean;
    'aria-controls'?: string;
    'aria-expanded'?: 'true' | 'false' | boolean;
    'aria-hidden'?: 'true' | 'false' | boolean;
    'aria-selected'?: 'true' | 'false' | boolean;
    tabIndex?: number;
    innerRef?: React.RefObject<HTMLAnchorElement>;
    to:
        | string
        | {
              pathname?: string;
              search?: string;
              state?: unknown;
              hash?: string;
              key?: string;
          };
    replace?: boolean;
    onClick?: (event: React.MouseEvent<HTMLElement>) => any;
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => any;
    children: React.ReactNode;
}>;

export const AnchorLink: LinkComponent = ({to, innerRef, ...props}) => (
    <a ref={innerRef} href={typeof to === 'string' ? to : to?.pathname} {...props}>
        {props.children}
    </a>
);

export type ColorScheme = 'dark' | 'light' | 'auto';

// This is the type expected by ThemeContextProvider theme prop.
// This config is provided by the user of the lib
export type ThemeConfig = {
    skin: Readonly<Skin>;
    colorScheme?: ColorScheme; // light by default. TODO: Change to auto by default in next major version
    i18n: {
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    };
    platformOverrides?: {
        platform?: 'ios' | 'android' | 'desktop';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    };
    texts?: Partial<ThemeTexts>;
    analytics?: {
        logEvent: (trackingEvent: TrackingEvent) => Promise<void>;
        eventFormat?: 'universal-analytics' | 'google-analytics-4';
    };
    dimensions?: {headerMobileHeight: number};
    mediaQueries?: {
        tabletMinWidth: number;
        desktopMinWidth: number;
        largeDesktopMinWidth: number;
        desktopOrTabletMinHeight: number;
    };
    Link?: LinkComponent;
    useHrefDecorator?: () => (href: string) => string;
    enableTabFocus?: boolean;
};

// This is the lib INTERNAL context
export type Theme = {
    skinName: SkinName;
    i18n: {
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    };
    platformOverrides: {
        platform?: 'ios' | 'android' | 'desktop';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    };
    texts: ThemeTexts;
    analytics: {
        logEvent: (trackingEvent: TrackingEvent) => Promise<void>;
        eventFormat: 'universal-analytics' | 'google-analytics-4';
    };
    dimensions: {headerMobileHeight: number};
    mq: {
        mobile: string;
        tablet: string;
        desktop: string;
        largeDesktop: string;
        tabletOrBigger: string;
        tabletOrSmaller: string;
        desktopOrBigger: string;
        supportsHover: string;
    };
    colors: Colors;
    Link: LinkComponent;
    isDarkMode: boolean;
    isIos: boolean;
    useHrefDecorator: () => (href: string) => string;
};
