import * as React from 'react';

import type {RegionCode} from './utils/region-code';
import type {Locale} from './utils/locale';
import type {Colors, Skin, SkinName, TextPresetsConfig} from './skins/types';
import type {TrackingEvent} from './utils/types';

export type ThemeTexts = Readonly<typeof TEXTS_ES>;

const TEXTS_ES = {
    expirationDatePlaceholder: 'MM/AA',
    enablePasswordVisibility: 'Mostrar contraseña',
    disablePasswordVisibility: 'Ocultar contraseña',
    loading: 'Cargando',
    linkOpensInNewTab: 'Se abre en ventana nueva',
    linkOpensInCurrentPage: 'Página actual',
    modalClose: 'Cerrar',
    dialogCancelButton: 'Cancelar',
    dialogAcceptButton: 'Aceptar',
    formFieldOptionalLabelSuffix: 'opcional',
    formFieldErrorIsMandatory: 'Este campo es obligatorio',
    formCreditCardNumberLabel: 'Número de tarjeta',
    formCreditCardExpirationLabel: 'Caducidad',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'CVV incorrecto',
    formCreditCardCvvTooltipVisaMcButtonOpen: 'Mostrar ayuda CVV',
    formCreditCardCvvTooltipVisaMcButtonClose: 'Ocultar ayuda CVV',
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
    playIconButtonLabel: 'Reproducir',
    pauseIconButtonLabel: 'Pausar',
    sheetConfirmButton: 'Continuar',
    progressBarCompletedLabel: 'completo',
    progressBarStepLabel: 'Paso 1$s de 2$s',
    pinFieldInputLabel: 'Dígito 1$s de 2$s',
    counterRemoveLabel: 'Borrar elemento',
    counterIncreaseLabel: 'Aumentar valor',
    counterDecreaseLabel: 'Disminuir valor',
    counterQuantity: 'cantidad',
    counterMinValue: 'mínimo',
    counterMaxValue: 'máximo',
    timerDaysShortLabel: 'd',
    timerHoursShortLabel: 'h',
    timerMinutesShortLabel: 'min',
    timerSecondsShortLabel: 's',
    timerAnd: 'y',
    timerDayLongLabel: 'día',
    timerDaysLongLabel: 'días',
    timerHourLongLabel: 'hora',
    timerHoursLongLabel: 'horas',
    timerMinuteLongLabel: 'minuto',
    timerMinutesLongLabel: 'minutos',
    timerSecondLongLabel: 'segundo',
    timerSecondsLongLabel: 'segundos',
};

const TEXTS_EN: ThemeTexts = {
    expirationDatePlaceholder: 'MM/YY',
    enablePasswordVisibility: 'Show password',
    disablePasswordVisibility: 'Hide password',
    loading: 'Loading',
    linkOpensInNewTab: 'Opens in a new window',
    linkOpensInCurrentPage: 'Current page',
    modalClose: 'Close',
    dialogCancelButton: 'Cancel',
    dialogAcceptButton: 'Accept',
    formFieldOptionalLabelSuffix: 'optional',
    formFieldErrorIsMandatory: 'This field is required',
    formCreditCardNumberLabel: 'Card number',
    formCreditCardExpirationLabel: 'Expiry',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'Incorrect CVV',
    formCreditCardCvvTooltipVisaMcButtonOpen: 'Show CVV help',
    formCreditCardCvvTooltipVisaMcButtonClose: 'Hide CVV help',
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
    playIconButtonLabel: 'Play',
    pauseIconButtonLabel: 'Pause',
    sheetConfirmButton: 'Continue',
    progressBarCompletedLabel: 'completed',
    progressBarStepLabel: 'Step 1$s of 2$s',
    pinFieldInputLabel: 'Digit 1$s of 2$s',
    counterRemoveLabel: 'Remove element',
    counterIncreaseLabel: 'Increase value',
    counterDecreaseLabel: 'Decrease value',
    counterQuantity: 'quantity',
    counterMinValue: 'minimum of',
    counterMaxValue: 'maximum of',
    timerDaysShortLabel: 'd',
    timerHoursShortLabel: 'h',
    timerMinutesShortLabel: 'min',
    timerSecondsShortLabel: 's',
    timerAnd: 'and',
    timerDayLongLabel: 'day',
    timerDaysLongLabel: 'days',
    timerHourLongLabel: 'hour',
    timerHoursLongLabel: 'hours',
    timerMinuteLongLabel: 'minute',
    timerMinutesLongLabel: 'minutes',
    timerSecondLongLabel: 'second',
    timerSecondsLongLabel: 'seconds',
};

const TEXTS_DE: ThemeTexts = {
    expirationDatePlaceholder: 'MM/JJ',
    enablePasswordVisibility: 'Passwort anzeigen',
    disablePasswordVisibility: 'Passwort verbergen',
    loading: 'Wird gespeichert',
    linkOpensInNewTab: 'Wird in neuem Fenster geöffnet',
    linkOpensInCurrentPage: 'Aktuelle Seite',
    modalClose: 'Schließen',
    dialogCancelButton: 'Abbrechen',
    dialogAcceptButton: 'Akzeptieren',
    formFieldOptionalLabelSuffix: 'optional',
    formFieldErrorIsMandatory: 'Das ist ein Pflichtfeld',
    formCreditCardNumberLabel: 'Kartennummer',
    formCreditCardExpirationLabel: 'Ablaufdatum',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'Falsche CVV',
    formCreditCardCvvTooltipVisaMcButtonOpen: 'CVV-Hilfe anzeigen',
    formCreditCardCvvTooltipVisaMcButtonClose: 'CVV-Hilfe ausblenden',
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
    playIconButtonLabel: 'Abspielen',
    pauseIconButtonLabel: 'Pausieren',
    sheetConfirmButton: 'Fortfahren',
    progressBarCompletedLabel: 'vollendet',
    progressBarStepLabel: 'Schritt 1$s von 2$s',
    pinFieldInputLabel: 'Ziffer 1$s von 2$s',
    counterRemoveLabel: 'Element entfernen',
    counterIncreaseLabel: 'Wert steigern',
    counterDecreaseLabel: 'Wert verringern',
    counterQuantity: 'menge',
    counterMinValue: 'minimal',
    counterMaxValue: 'maximal',
    timerDaysShortLabel: 'Tg.',
    timerHoursShortLabel: 'Std.',
    timerMinutesShortLabel: 'Min.',
    timerSecondsShortLabel: 'Sek.',
    timerAnd: 'und',
    timerDayLongLabel: 'Tag',
    timerDaysLongLabel: 'Tage',
    timerHourLongLabel: 'Stunde',
    timerHoursLongLabel: 'Stunden',
    timerMinuteLongLabel: 'Minute',
    timerMinutesLongLabel: 'Minuten',
    timerSecondLongLabel: 'Sekunde',
    timerSecondsLongLabel: 'Sekunden',
};

const TEXTS_PT: ThemeTexts = {
    expirationDatePlaceholder: 'MM/AA',
    enablePasswordVisibility: 'mostrar senha',
    disablePasswordVisibility: 'esconder a senha',
    loading: 'Carregando',
    linkOpensInNewTab: 'Abre em nova janela',
    linkOpensInCurrentPage: 'Página atual',
    modalClose: 'Fechar',
    dialogCancelButton: 'Cancelar',
    dialogAcceptButton: 'Aceitar',
    formFieldOptionalLabelSuffix: 'opcional',
    formFieldErrorIsMandatory: 'Este campo é obrigatório',
    formCreditCardNumberLabel: 'Número de cartão',
    formCreditCardExpirationLabel: 'Expiração',
    formCreditCardCvvLabel: 'CVV',
    formCreditCardCvvError: 'CVV incorreto',
    formCreditCardCvvTooltipVisaMcButtonOpen: 'Exibir ajuda CVV',
    formCreditCardCvvTooltipVisaMcButtonClose: 'Ocultar ajuda CVV',
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
    playIconButtonLabel: 'Reproduzir',
    pauseIconButtonLabel: 'Pausar',
    sheetConfirmButton: 'Continuar',
    progressBarCompletedLabel: 'concluído',
    progressBarStepLabel: 'Etapa 1$s de 2$s',
    pinFieldInputLabel: 'Dígito 1$s de 2$s',
    counterRemoveLabel: 'Remover elemento',
    counterIncreaseLabel: 'aumentar valor',
    counterDecreaseLabel: 'diminuir valor',
    counterQuantity: 'quantidade',
    counterMinValue: 'mínimo',
    counterMaxValue: 'máximo',
    timerDaysShortLabel: 'd',
    timerHoursShortLabel: 'h',
    timerMinutesShortLabel: 'min',
    timerSecondsShortLabel: 's',
    timerAnd: 'e',
    timerDayLongLabel: 'dia',
    timerDaysLongLabel: 'dias',
    timerHourLongLabel: 'hora',
    timerHoursLongLabel: 'horas',
    timerMinuteLongLabel: 'minuto',
    timerMinutesLongLabel: 'minutos',
    timerSecondLongLabel: 'segundo',
    timerSecondsLongLabel: 'segundos',
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

export const NAVBAR_HEIGHT_MOBILE = 56;
export const NAVBAR_HEIGHT_DESKTOP = 80;
export const NAVBAR_HEIGHT_DESKTOP_LARGE = 2 * NAVBAR_HEIGHT_DESKTOP;

export const dimensions = {
    headerMobileHeight: NAVBAR_HEIGHT_MOBILE,
    headerDesktopHeight: NAVBAR_HEIGHT_DESKTOP,
};

type LinkComponent = React.ComponentType<{
    style?: React.CSSProperties;
    className?: string;
    'aria-label'?: string;
    disabled?: boolean;
    role?: string;
    'data-testid'?: string;
    'aria-checked'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-checked'];
    'aria-controls'?: string;
    'aria-expanded'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-expanded'];
    'aria-hidden'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-hidden'];
    'aria-selected'?: React.AnchorHTMLAttributes<HTMLAnchorElement>['aria-selected'];
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
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
    children: React.ReactNode;
}>;

const AnchorLink: LinkComponent = ({to, innerRef, ...props}) => (
    <a ref={innerRef} href={typeof to === 'string' ? to : to?.pathname} {...props}>
        {props.children}
    </a>
);

const getReactRouter5Link = (ReactRouterLink: React.ComponentType<any>): LinkComponent => ReactRouterLink;

const getReactRouter6Link =
    (ReactRouterLink: React.ComponentType<any>): LinkComponent =>
    ({innerRef, ...props}) =>
        <ReactRouterLink ref={innerRef} {...props} />;

const getNext12Link =
    (NextLink: React.ComponentType<any>): LinkComponent =>
    ({to, innerRef, children, ...props}) =>
        (
            <NextLink href={to}>
                <a ref={innerRef} {...props}>
                    {children}
                </a>
            </NextLink>
        );

const getNext13Or14Link =
    (NextLink: React.ComponentType<any>): LinkComponent =>
    ({to, innerRef, children, ...props}) =>
        (
            <NextLink href={to} ref={innerRef} {...props}>
                {children}
            </NextLink>
        );

export const getMisticaLinkComponent = (Link?: ThemeConfig['Link']): LinkComponent => {
    if (!Link) {
        return AnchorLink;
    }
    // the $$typeof check is because components like forwardRefs are objects
    // see https://github.com/facebook/react/blob/main/packages/shared/isValidElementType.js
    if (typeof Link === 'function' || (Link as any).$$typeof) {
        return Link as LinkComponent;
    }
    switch (Link.type) {
        case 'ReactRouter5':
            // webapp, flow-frontend
            return getReactRouter5Link(Link.Component);
        case 'ReactRouter6':
            // nt_core
            return getReactRouter6Link(Link.Component);
        case 'Next12':
            // zeus-web
            return getNext12Link(Link.Component);
        case 'Next13':
        case 'Next14':
            // hello-world-web, global-checkout-webview
            return getNext13Or14Link(Link.Component);
        default:
            const exhaustiveCheck: never = Link.type;
            throw new Error(`Invalid Link type: ${exhaustiveCheck}`);
    }
};

export type ColorScheme = 'dark' | 'light' | 'auto';
export type EventFormat = 'universal-analytics' | 'google-analytics-4';

// This is the type expected by ThemeContextProvider theme prop.
// This config is provided by the user of the lib
export type ThemeConfig = Readonly<{
    skin: Readonly<Skin>;
    colorScheme?: ColorScheme; // light by default. TODO: Change to auto by default in next major version
    i18n: Readonly<{
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    }>;
    platformOverrides?: Readonly<{
        platform?: 'ios' | 'android' | 'desktop';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    }>;
    texts?: Partial<ThemeTexts>;
    analytics?: Readonly<{
        logEvent: (trackingEvent: TrackingEvent) => Promise<void>;
        eventFormat?: EventFormat;
    }>;
    dimensions?: Readonly<{headerMobileHeight: number | 'mistica'}>;
    Link?:
        | LinkComponent
        | {
              type: 'ReactRouter5' | 'ReactRouter6' | 'Next12' | 'Next13' | 'Next14';
              Component: React.ComponentType<any>;
          };
    useHrefDecorator?: () => (href: string) => string;
    useId?: () => string;
    enableTabFocus?: boolean;
}>;

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
        eventFormat: EventFormat;
    };
    // TODO: rename this props to navigationBarHeight (or something similar) in next major
    dimensions: {headerMobileHeight: number; headerDesktopHeight: number};
    colorValues: Colors;
    textPresets: TextPresetsConfig;
    Link: LinkComponent;
    isDarkMode: boolean;
    isIos: boolean;
    useHrefDecorator: () => (href: string) => string;
    useId?: () => string;
};
