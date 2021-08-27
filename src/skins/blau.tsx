import {applyAlpha} from '../utils/color';
import {BLAU_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    blauBlueDark30: '#3B7398',
    blauBlueDark20: '#0092C1',
    blauBlueLight: '#00B6F1',
    blauBlueLight60: '#66D3F7',
    blauBlueLight30: '#B3E9FB',
    blauBlueLight10: '#F7FDFF',
    blauBlueDark: '#0065AC',
    blauBlue: '#0070BF',
    blauBlue90: '#1A7EC5',
    blauBlue60: '#66A9D9',
    blauBlue30: '#B3D4EC',
    blauBlue10: '#E5F1F9',

    blauPurpleDark: '#570080',
    blauPurple: '#7814B3',
    blauPurpleLight50: '#B280CC',
    blauPurpleLight10: '#F2E8F8',
    blauYellowDark: '#F2A120',
    blauYellow: '#FFA922',
    blauGreen: '#30D300',
    blauRedDark: '#E03308',
    blauRed: '#F64417',
    blauRedLight60: '#F78C71',
    blauRedLight20: '#FDDAD1',

    grey1: '#F3F5F6',
    grey2: '#F2F2F2',
    grey3: '#E6E6E7',
    grey4: '#BFC0C2',
    grey5: '#808285',
    grey6: '#000000',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
} as const;

export const getBlauSkin: GetSkin = () => {
    return {
        name: BLAU_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.blauBlueLight,
            backgroundOverlay: applyAlpha(palette.blauBlue, 0.75),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: palette.white,
            navigationBarBackground: palette.blauBlueLight,
            backgroundAlternative: palette.grey2,
            backgroundFeedbackBottom: palette.blauBlueLight,

            skeletonWave: palette.grey3,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.blauBlueDark,

            // BUTTONS
            buttonDangerBackground: palette.blauRed,
            buttonDangerBackgroundDisabled: palette.blauRedLight60,
            buttonDangerBackgroundSelected: palette.blauRedDark,
            buttonDangerBackgroundHover: palette.blauRedDark,

            buttonLinkBackgroundSelected: palette.blauPurpleLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.blauBlue,
            buttonPrimaryBackgroundDisabled: palette.blauBlue30,
            buttonPrimaryBackgroundDisabledInverse: palette.blauBlueLight30,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.blauBlueDark,
            buttonPrimaryBackgroundHover: palette.blauBlueDark,
            buttonPrimaryBackgroundSelectedInverse: palette.blauBlueLight30,

            buttonSecondaryBackground: palette.blauBlue,
            buttonSecondaryBackgroundDisabled: palette.blauBlue30,
            buttonSecondaryBackgroundSelected: palette.blauBlueDark,
            buttonSecondaryBorderDisabledInverse: palette.blauBlueLight30,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueLight30,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.grey4,
            textButtonPrimaryInverse: palette.blauBlue,
            textButtonPrimaryInverseDisabled: palette.blauBlueLight10,
            textButtonPrimaryInverseSelected: palette.blauBlueDark,

            textButtonSecondary: palette.blauBlue,
            textButtonSecondaryDisabled: palette.blauBlue30,
            textButtonSecondarySelected: palette.blauBlueDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.blauPurpleLight50,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.blauPurple,
            textLinkInverse: palette.white,
            textLinkDanger: palette.blauRed,
            textLinkDangerDisabled: palette.blauRedLight20,
            textLinkDisabled: palette.blauPurpleLight50,
            textLinkSnackbar: palette.blauPurpleLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.blauBlue,
            controlError: palette.blauRed,
            loadingBar: palette.blauBlue,
            loadingBarBackground: palette.blauBlue10,

            toggleAndroidInactive: palette.grey2,
            toggleAndroidBackgroundActive: palette.blauBlue10,
            iosControlKnob: palette.white,

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.blauBlueLight,

            // FEEDBACKS
            badge: palette.blauRedDark,
            feedbackErrorBackground: palette.blauRed,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.blauBlueLight,
            brandDark: palette.blauBlue,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey3,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey4,
            textAmount: palette.blauBlue,

            // STATES
            error: palette.blauRed,
            success: palette.blauGreen,
            warning: palette.blauYellow,
            promo: palette.blauPurple,
            highlight: palette.blauBlueLight,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.blauBlue30,
            textNavigationSearchBarHint: palette.blauBlue30,
            textNavigationSearchBarText: palette.white,
            textAppBar: palette.grey5,
            textAppBarSelected: palette.blauBlueDark,
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
};
