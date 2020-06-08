import getColors, {MOVISTAR_SKIN} from './colors';
import {getPlatform, isInsideNovumNativeApp} from './utils/platform';
import {createMediaQueries} from './utils/media-queries';

import type {RegionCode} from './utils/region-code';
import type {Locale} from './utils/locale';
import type {Skin, Colors} from './colors';
import type {TrackingEvent} from './utils/types';

const c: Colors = getColors(MOVISTAR_SKIN);
const colors = {
    controlActive: c.CONTROL_ACTIVE,
    controlInactive: c.CONTROL_INACTIVE,
    controlError: c.CONTROL_ERROR,
    textPrimary: c.TEXT_PRIMARY,
    background: c.BACKGROUND,
    backgroundHeading: c.BACKGROUND_HEADING,
    backgroundAlternative: c.BACKGROUND_ALTERNATIVE,
    backgroundPromo: c.BACKGROUND_PROMO,

    buttonPrimaryBackground: c.BUTTON_PRIMARY_BACKGROUND,
    buttonPrimaryBackgroundSelected: c.BUTTON_PRIMARY_BACKGROUND_SELECTED,
    buttonPrimaryBackgroundDisabled: c.BUTTON_PRIMARY_BACKGROUND_DISABLED,
    buttonPrimaryBackgroundHover: c.BUTTON_PRIMARY_BACKGROUND_HOVER,
    buttonPrimaryText: c.BUTTON_PRIMARY_TEXT,
    buttonSecondaryBackground: c.BUTTON_SECONDARY_BACKGROUND,
    buttonSecondaryText: c.BUTTON_SECONDARY_TEXT,
    buttonSecondaryTextSelected: c.BUTTON_SECONDARY_TEXT_SELECTED,
    buttonSecondaryTextDisabled: c.BUTTON_SECONDARY_TEXT_DISABLED,
    buttonSecondaryBorder: c.BUTTON_SECONDARY_BORDER,
    buttonSecondaryBorderSelected: c.BUTTON_SECONDARY_BORDER_SELECTED,
    buttonSecondaryBorderDisabled: c.BUTTON_SECONDARY_BORDER_DISABLED,
    buttonPrimaryBackgroundInverse: c.BUTTON_PRIMARY_BACKGROUND_INVERSE,
    textButtonPrimaryInverse: c.TEXT_BUTTON_PRIMARY_INVERSE,
    buttonPrimaryBackgroundInverseSelected: c.BUTTON_PRIMARY_BACKGROUND_INVERSE_SELECTED,
    textButtonPrimaryInverseSelected: c.TEXT_BUTTON_PRIMARY_INVERSE_SELECTED,
    buttonPrimaryBackgroundInverseDisabled: c.BUTTON_PRIMARY_BACKGROUND_INVERSE_DISABLED,
    textButtonPrimaryInverseDisabled: c.TEXT_BUTTON_PRIMARY_INVERSE_DISABLED,
    buttonSecondaryBorderInverse: c.BUTTON_SECONDARY_BORDER_INVERSE,
    textButtonSecondaryInverse: c.TEXT_BUTTON_SECONDARY_INVERSE,
    buttonSecondaryBorderInverseSelected: c.BUTTON_SECONDARY_BORDER_INVERSE_SELECTED,
    textButtonSecondaryInverseSelected: c.TEXT_BUTTON_SECONDARY_INVERSE_SELECTED,
    buttonSecondaryBorderInverseDisabled: c.BUTTON_SECONDARY_BORDER_INVERSE_DISABLED,
    textButtonSecondaryInverseDisabled: c.TEXT_BUTTON_SECONDARY_INVERSE_DISABLED,
    buttonDangerBackground: c.BUTTON_DANGER_BACKGROUND,
    buttonDangerBackgroundDisabled: c.BUTTON_DANGER_BACKGROUND_DISABLED,
    buttonDangerBackgroundHover: c.BUTTON_DANGER_BACKGROUND_HOVER,
    buttonDangerBackgroundSelected: c.BUTTON_DANGER_BACKGROUND_SELECTED,
    textLink: c.TEXT_LINK,
    textInactive: c.TEXT_INACTIVE,
    textPrimaryInverse: c.TEXT_PRIMARY_INVERSE,
    buttonLinkBackgroundSelected: c.BUTTON_LINK_BACKGROUND_SELECTED,
    iconHighlight: c.ICON_HIGHLIGHT,
    overscrollColorTop: c.OVERSCROLL_COLOR_TOP,
    backgroundSpecialBottom: c.BACKGROUND_SPECIAL_BOTTOM,
    backgroundSpecial1: c.BACKGROUND_SPECIAL_1,
    backgroundOpacity: c.BACKGROUND_OPACITY,
    textPrimarySpecial: c.TEXT_PRIMARY_SPECIAL,
    textSecondary: c.TEXT_SECONDARY,
    loadingBarPrimary: c.LOADING_BAR_PRIMARY,
    loadingBarPrimaryInverse: c.LOADING_BAR_PRIMARY_INVERSE,
    loadingBarBackground: c.LOADING_BAR_BACKGROUND,
    loadingBarBackgroundInverse: c.LOADING_BAR_BACKGROUND_INVERSE,
    layerDecorations: c.LAYER_DECORATIONS,
    divider: c.DIVIDER,
    border: c.BORDER,
    borderLight: c.BORDER_LIGHT,
    textError: c.TEXT_ERROR,

    feedbackErrorBackground: c.FEEDBACK_ERROR_BACKGROUND,
    feedbackInfoBackground: c.FEEDBACK_INFO_BACKGROUND,
    textAccent: c.TEXT_ACCENT,
    textLinkSnackbar: c.TEXT_LINK_SNACKBAR,

    iconAccent: c.ICON_ACCENT,
    iconSecondary: c.ICON_SECONDARY,
    iconPrimary: c.ICON_PRIMARY,
    iconTertiary: c.ICON_TERTIARY,

    badgeBackground: c.BADGE_BACKGROUND,
};

const texts = {
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
    formEmailError: 'Email incorrecto',
};

const dimensions = {
    headerMobileHeight: 56,
};

const mediaQueriesConfig = {
    tabletMinWidth: 768,
    desktopMinWidth: 1024,
    largeDesktopMinWidth: 1366,
    desktopOrTabletMinHeight: 550,
};

type ThemeColors = typeof colors;
export type ThemeTexts = typeof texts;

// This is the type expected by ThemeContextProvider theme prop.
// This config is provided by the user of the lib
export type ThemeConfig = {
    skin: Skin,
    colorOverride?: string,
    i18n: {
        locale: Locale,
        phoneNumberFormattingRegionCode: RegionCode,
    },
    platformOverrides?: {
        platform?: 'ios' | 'android',
        insideNovumNativeApp?: boolean,
    },
    texts?: $Shape<ThemeTexts>,
    analytics?: {logEvent: (TrackingEvent) => Promise<void>},
    dimensions?: {headerMobileHeight: number},
    mediaQueries?: {
        tabletMinWidth: number,
        desktopMinWidth: number,
        largeDesktopMinWidth: number,
        desktopOrTabletMinHeight: number,
    },
};

// This is the lib INTERNAL context
export type Theme = {
    skin: Skin,
    colorOverride?: string,
    i18n: {
        locale: Locale,
        phoneNumberFormattingRegionCode: RegionCode,
    },
    platformOverrides: {
        platform?: 'ios' | 'android',
        insideNovumNativeApp?: boolean,
    },
    texts: ThemeTexts,
    analytics: {logEvent: (TrackingEvent) => Promise<void>},
    dimensions: {headerMobileHeight: number},
    mq: {
        mobile: string,
        tablet: string,
        desktop: string,
        largeDesktop: string,
        tabletOrBigger: string,
        tabletOrSmaller: string,
    },
    colors: ThemeColors,
};

export const baseTheme: Theme = {
    skin: MOVISTAR_SKIN,
    i18n: {
        locale: ('es_ES': Locale),
        phoneNumberFormattingRegionCode: ('ES': RegionCode),
    },
    platformOverrides: {
        platform: getPlatform(),
        insideNovumNativeApp: isInsideNovumNativeApp(),
    },
    colors,
    texts,
    analytics: {
        logEvent: () => Promise.resolve(),
    },
    mq: createMediaQueries(mediaQueriesConfig),
    dimensions,
};
