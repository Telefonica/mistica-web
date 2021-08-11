import {applyAlpha} from '../utils/color';
import {BLAU_SKIN} from './constants';

import type {GetSkin, Skin} from './types';

export const palette = {
    blauBlue: '#0070BF',
    blauBlueDark: '#004779',
    blauBlueLight90: '#1A7EC5',
    blauBlueLight60: '#66A9D9',
    blauBlueLight30: '#B3D4EC',
    blauBlueLight10: '#E5F1F9',
    blauBlueLight: '#00B6F1',

    blauPurple: '#7814B3',
    blauViolet: '#5F108D',
    blauLavande: '#AE72D1',
    blauOrange: '#FFA922',
    blauGreen: '',
    blauRed: '',

    grey1: '#F6F6F6',
    grey2: '#E6E6E7',
    grey3: '#BFC0C2',
    grey4: '#808285',
    grey5: '#000000',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
} as const;

export const getBlauSkin: GetSkin = () => {
    const skin: Skin = {
        name: BLAU_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.blauBlue,
            backgroundOverlay: applyAlpha(palette.grey5, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: palette.blauBlueDark,
            navigationBarBackground: palette.blauBlue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.blauBlue,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.blauBlue,

            // BUTTONS
            buttonDangerBackground: palette.blauRed,
            buttonDangerBackgroundDisabled: palette.blauRed,
            buttonDangerBackgroundSelected: palette.blauRed,
            buttonDangerBackgroundHover: palette.blauRed, // web only

            buttonLinkBackgroundSelected: palette.blauBlueLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.blauViolet,
            buttonPrimaryBackgroundDisabled: palette.blauBlueLight60,
            buttonPrimaryBackgroundDisabledInverse: palette.blauBlueLight60,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.blauBlueDark,
            buttonPrimaryBackgroundHover: palette.blauBlueDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.blauBlueLight60,

            buttonSecondaryBackground: palette.blauBlue,
            buttonSecondaryBackgroundDisabled: palette.blauBlueLight60,
            buttonSecondaryBackgroundSelected: palette.blauBlueDark,
            buttonSecondaryBorderDisabledInverse: palette.blauBlueLight60,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueLight60,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.blauBlue,
            textButtonPrimaryInverseDisabled: palette.blauBlueLight30,
            textButtonPrimaryInverseSelected: palette.blauBlue,

            textButtonSecondary: palette.blauBlue,
            textButtonSecondaryDisabled: palette.blauBlueLight60,
            textButtonSecondarySelected: palette.blauBlueDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.blauBlueLight60,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.blauBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.blauRed,
            textLinkDangerDisabled: palette.blauRed,
            textLinkDisabled: palette.blauBlueLight60,
            textLinkSnackbar: palette.blauBlueLight60,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.blauBlue,
            controlError: palette.blauRed,
            loadingBar: palette.blauBlueLight60,
            loadingBarBackground: palette.blauBlueDark,
            loadingBarBackgroundInverse: palette.blauBlueDark,
            loadingBarInverse: palette.blauBlueLight60,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.blauBlueLight30, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: palette.blauBlueDark,
            navigationBarDivider: palette.blauBlue,

            // FEEDBACKS
            badge: palette.blauRed,
            feedbackErrorBackground: palette.blauRed,
            feedbackInfoBackground: palette.grey5,

            // GLOBAL
            brand: palette.blauBlue,
            brandDark: palette.blauBlueDark,
            inverse: palette.white,
            neutralHigh: palette.grey5,
            neutralMedium: palette.grey3,
            neutralLow: palette.grey1,
            promo: palette.blauLavande,
            highlight: palette.blauViolet,

            textPrimary: palette.grey5,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey3,
            textAmount: palette.blauBlue,

            // STATES
            error: palette.blauRed,
            success: palette.blauBlue,
            warning: palette.blauOrange,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.blauBlueLight30,
            textNavigationSearchBarHint: palette.blauBlueLight30, // iOS
            textNavigationSearchBarText: palette.white, // iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.blauBlue,
        },
        darkModeColors: {
            brand: palette.blauBlue, // this color needs to be in darkModeColors to revert the promient variant
            appBarBackground: palette.darkModeGrey,
            background: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.grey5,
            backgroundSkeletonInverse: palette.grey5,
            navigationBarBackground: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            skeletonWave: palette.grey5,
            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,
            buttonDangerBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.blauBlue,
            buttonPrimaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundInverse: palette.blauBlue,
            buttonPrimaryBackgroundSelected: palette.blauBlueDark,
            buttonPrimaryBackgroundHover: palette.blauBlueDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.blauBlueDark,
            buttonSecondaryBackground: palette.blauBlue,
            buttonSecondaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonSecondaryBackgroundSelected: palette.blauBlueDark,
            buttonSecondaryBorderDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonSecondaryBorderInverse: palette.blauBlue,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueDark,
            textButtonPrimary: palette.grey2,
            textButtonPrimaryDisabled: palette.grey5,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseDisabled: palette.grey5,
            textButtonPrimaryInverseSelected: palette.grey2,
            textButtonSecondary: palette.grey2,
            textButtonSecondaryDisabled: palette.grey5,
            textButtonSecondarySelected: palette.grey4,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseDisabled: palette.grey5,
            textButtonSecondaryInverseSelected: palette.grey4,
            textLink: palette.blauBlue,
            textLinkInverse: palette.blauBlue,
            textLinkDisabled: palette.grey5,
            control: palette.grey5,
            controlActivated: palette.blauBlue,
            loadingBar: palette.blauBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            loadingBarBackgroundInverse: palette.blauBlueDark,
            loadingBarInverse: palette.blauBlueLight60,
            toggleAndroidInactive: palette.grey4, // web only
            toggleAndroidBackgroundActive: palette.blauBlueLight30, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandDark: palette.grey5,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey5,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textDisabled: palette.grey5,
            textAmount: palette.blauBlueLight60,
            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,
        },
    };

    return skin;
};
