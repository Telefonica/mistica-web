import * as React from 'react';

import type {RegionCode} from './utils/region-code';
import type {Locale} from './utils/locale';
import type {Skin, Colors, SkinName} from './skins/types';
import type {TrackingEvent} from './utils/types';

export const texts = {
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
    formCreditCardNumberError: 'No es un número de tarjeta valido',
    formDateOutOfRangeError: 'Fecha no permitida',
    formEmailError: 'Email incorrecto',
    closeButtonLabel: 'Cerrar',
    formSearchClear: 'Borrar búsqueda',
};

export const dimensions = {
    headerMobileHeight: 56,
};

export const mediaQueriesConfig = {
    tabletMinWidth: 768,
    desktopMinWidth: 1024,
    largeDesktopMinWidth: 1366,
    desktopOrTabletMinHeight: 550,
};

export type ThemeTexts = typeof texts;

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

// This is the type expected by ThemeContextProvider theme prop.
// This config is provided by the user of the lib
export type ThemeConfig = {
    skin: Skin;
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
    analytics?: {logEvent: (trackingEvent: TrackingEvent) => Promise<void>};
    dimensions?: {headerMobileHeight: number};
    mediaQueries?: {
        tabletMinWidth: number;
        desktopMinWidth: number;
        largeDesktopMinWidth: number;
        desktopOrTabletMinHeight: number;
    };
    Link?: LinkComponent;
};

// This is the lib INTERNAL context
export type Theme = {
    skinName: SkinName;
    i18n: {
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    };
    platformOverrides: {
        platform?: 'ios' | 'android';
        insideNovumNativeApp?: boolean;
        userAgent?: string;
    };
    texts: ThemeTexts;
    analytics: {logEvent: (trackingEvent: TrackingEvent) => Promise<void>};
    dimensions: {headerMobileHeight: number};
    mq: {
        mobile: string;
        tablet: string;
        desktop: string;
        largeDesktop: string;
        tabletOrBigger: string;
        tabletOrSmaller: string;
        desktopOrBigger: string;
    };
    colors: Colors;
    Link: LinkComponent;
};
