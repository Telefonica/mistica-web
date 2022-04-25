import {applyAlpha} from '../utils/color';
import {SOLAR360_SKIN} from './constants';

import type {GetKnownSkin, KnownSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar-skin-schema.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar-constants.json

export const palette = {
    movistarBlue: '#019DF4',
    movistarBlue10: '#E6F5FD',
    movistarBlue20: '#B3E1FB',
    movistarBlue30: '#80CEF9',
    movistarBlue55: '#008EDD',

    repsolBlue200: '#005AA8',

    repsolOrange10: '#FFF0E0',
    repsolOrange20: '#FFCB96',
    repsolOrange70: '#FF6200',
    repsolOrange50: '#FF9B33',
    repsolOrange700: '#E64D00',

    repsolYellow50: '#FFC800',
    repsolYellow10: '#FFF7DB',
    repsolYellow90: '#806400',

    repsolRed500: '#E4002B',
    repsolRed10: '#FCE5E9',
    repsolRed80: '#AB174F',

    movistarRed: '#FF374A',

    repsolTurquoise10: '#D9F1EA',
    repsolTurquoise50: '#00C1D7',
    repsolTurquoise80: '#016A7F',

    repsolPurple10: '#F4EBFC',
    repsolPurple30: '#BF87EB',
    repsolPurple80: '#6F29A6',

    repsolOrangeDisabled: '#FFB080',
    repsolRedDisabled: '#FF9BA4',

    grey1: '#F6F7FC',
    grey2: '#E4E9F3',
    grey3: '#ABB6C9',
    grey4: '#8FA2C0',
    grey5: '#7486A0',
    grey6: '#041E42',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#121212',
    darkModeGrey: '#202020',
} as const;

export const getSolar360Skin: GetKnownSkin = () => {
    const skin: KnownSkin = {
        name: SOLAR360_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.movistarBlue,
            backgroundOverlay: applyAlpha(palette.repsolBlue200, 0.8),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: palette.repsolBlue200,
            navigationBarBackground: palette.movistarBlue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.movistarBlue,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey2,
            borderDark: palette.grey4,
            borderSelected: palette.repsolOrange700,

            // BUTTONS
            buttonDangerBackground: palette.movistarRed,
            buttonDangerBackgroundSelected: palette.repsolRed500,
            buttonDangerBackgroundHover: palette.repsolRed500, // web only

            buttonLinkBackgroundSelected: palette.repsolOrange10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.repsolOrange70,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.repsolOrange700,
            buttonPrimaryBackgroundHover: palette.repsolOrange700, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.repsolOrange20,

            buttonSecondaryBackground: palette.repsolOrange70,
            buttonSecondaryBackgroundSelected: palette.repsolOrange700,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.repsolOrange20,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.repsolOrange70,
            textButtonPrimaryInverseSelected: palette.repsolOrange700,

            textButtonSecondary: palette.repsolOrange70,
            textButtonSecondarySelected: palette.repsolOrange700,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.repsolOrange70,
            textLinkInverse: palette.white,
            textLinkDanger: palette.repsolRed500,
            textLinkSnackbar: palette.repsolOrange20,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.movistarBlue,
            controlError: palette.movistarRed,
            loadingBar: palette.repsolOrange50,
            loadingBarBackground: palette.repsolOrange20,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.movistarBlue20, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: palette.movistarBlue55,
            navigationBarDivider: palette.movistarBlue,

            // FEEDBACKS
            badge: palette.repsolRed500,
            feedbackErrorBackground: palette.movistarRed,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.movistarBlue,
            brandDark: palette.movistarBlue55,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey4,
            neutralLow: palette.grey2,
            promo: palette.movistarBlue,
            highlight: palette.repsolOrange50,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textAmount: palette.repsolOrange700,

            // STATES
            error: palette.movistarRed,
            success: palette.repsolTurquoise50,
            warning: palette.repsolYellow50,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.movistarBlue20,
            textNavigationSearchBarHint: palette.movistarBlue20, // iOS
            textNavigationSearchBarText: palette.white, // iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.movistarBlue,

            // TAGS
            tagBackgroundSuccess: palette.repsolTurquoise10,
            tagBackgroundWarning: palette.repsolYellow10,
            tagBackgroundError: palette.repsolRed10,
            tagBackgroundPromo: palette.repsolPurple10,
            tagBackgroundActive: palette.movistarBlue10,
            tagBackgroundInactive: palette.grey1,

            textTagSuccess: palette.repsolTurquoise80,
            textTagWarning: palette.repsolYellow90,
            textTagError: palette.repsolRed80,
            textTagPromo: palette.repsolPurple80,
            textTagActive: palette.movistarBlue,
            textTagInactive: palette.grey4,
        },
        darkModeColors: {
            appBarBackground: palette.darkModeGrey,
            background: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.grey6,
            backgroundSkeletonInverse: palette.grey6,
            navigationBarBackground: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            skeletonWave: palette.grey5,
            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.repsolOrange70,
            buttonPrimaryBackgroundInverse: palette.repsolOrange70,
            buttonPrimaryBackgroundSelected: palette.repsolOrange700,
            buttonPrimaryBackgroundHover: palette.repsolOrange700, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.repsolOrange700,
            buttonSecondaryBackground: palette.repsolOrange70,
            buttonSecondaryBackgroundSelected: palette.repsolOrange700,
            buttonSecondaryBorderInverse: palette.repsolOrange70,
            buttonSecondaryBorderSelectedInverse: palette.repsolOrange700,
            textButtonPrimary: palette.grey1,
            textButtonPrimaryInverse: palette.grey1,
            textButtonPrimaryInverseSelected: palette.grey1,
            textButtonSecondary: palette.grey1,
            textButtonSecondarySelected: palette.grey4,
            textButtonSecondaryInverse: palette.grey1,
            textButtonSecondaryInverseSelected: palette.grey4,
            textLink: palette.repsolOrange70,
            textLinkInverse: palette.repsolOrange70,
            control: palette.grey5,
            controlActivated: palette.movistarBlue,
            loadingBar: palette.repsolOrange50,
            loadingBarBackground: palette.repsolOrange20,
            toggleAndroidInactive: palette.grey4, // web only
            toggleAndroidBackgroundActive: palette.movistarBlue20, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandDark: palette.grey5,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey4,
            neutralLow: palette.grey5,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textAmount: palette.repsolOrange50,
            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,

            // TAGS
            tagBackgroundSuccess: applyAlpha(palette.white, 0.05),
            tagBackgroundWarning: applyAlpha(palette.white, 0.05),
            tagBackgroundError: applyAlpha(palette.white, 0.05),
            tagBackgroundPromo: applyAlpha(palette.white, 0.05),
            tagBackgroundActive: applyAlpha(palette.white, 0.05),
            tagBackgroundInactive: applyAlpha(palette.white, 0.05),

            textTagSuccess: palette.repsolTurquoise50,
            textTagWarning: palette.repsolOrange50,
            textTagError: palette.movistarRed,
            textTagPromo: palette.repsolPurple30,
            textTagActive: palette.movistarBlue30,
            textTagInactive: palette.grey4,
        },
    };

    return skin;
};
