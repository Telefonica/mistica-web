import {applyAlpha} from '../utils/color';
import {BLAU_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    blauBlueLight: '#00B6F1',
    blauBlueLight30: '#B3E9FB',
    blauBlueLight20: '#E5F6FD',
    blauBlueLight10: '#F7FDFF',
    blauBlueDark: '#005B9D',
    blauBlue: '#0070BF',
    blauBlue60: '#66A9D9',
    blauBlue30: '#B3D4EC',
    blauBlue10: '#E5F1F9',

    blauPurple: '#7814B3',
    blauPurpleLight50: '#B280CC',
    blauPurpleLight10: '#F2E8F8',
    blauYellowDark: '#F09500',
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
            backgroundAlternative: palette.blauBlueLight20,
            backgroundFeedbackBottom: palette.blauBlueLight,

            skeletonWave: palette.grey3,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.blauBlueDark,

            // BUTTONS
            buttonDangerBackground: palette.blauRed,
            buttonDangerBackgroundDisabled: palette.blauRedLight20,
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
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.blauBlue,
            textButtonPrimaryInverseDisabled: palette.blauBlueLight10,
            textButtonPrimaryInverseSelected: palette.blauBlueDark,

            textButtonSecondary: palette.blauBlue,
            textButtonSecondaryDisabled: palette.blauBlue60,
            textButtonSecondarySelected: palette.blauBlueDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.blauPurpleLight50,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.blauPurple,
            textLinkInverse: palette.white,
            textLinkDanger: palette.blauRed,
            textLinkDangerDisabled: palette.blauPurpleLight50,
            textLinkDisabled: palette.blauPurpleLight50,
            textLinkSnackbar: palette.blauPurpleLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.blauBlue,
            controlError: palette.blauRed,
            loadingBar: palette.blauBlue,
            loadingBarBackground: palette.blauBlue10,
            loadingBarInverse: palette.blauBlue, // Deprecated. Remove in the future
            loadingBarBackgroundInverse: palette.blauBlue10, // Deprecated. Remove in the future

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
            background: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.darkModeGrey,
            backgroundSkeletonInverse: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            appBarBackground: palette.darkModeGrey,
            navigationBarBackground: palette.darkModeBlack,
            skeletonWave: palette.grey5,

            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,

            buttonDangerBackgroundDisabled: palette.darkModeGrey,

            buttonLinkBackgroundSelected: applyAlpha(palette.blauPurple, 0.3),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.blauPurple, 0.3),

            buttonPrimaryBackground: palette.blauBlue,
            buttonPrimaryBackgroundDisabled: palette.darkModeGrey,
            buttonPrimaryBackgroundDisabledInverse: palette.darkModeGrey,
            buttonPrimaryBackgroundInverse: palette.blauBlue,
            buttonPrimaryBackgroundSelected: palette.blauBlueDark,
            buttonPrimaryBackgroundHover: palette.blauBlueDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.blauBlueDark,

            buttonSecondaryBackground: palette.blauBlue,
            buttonSecondaryBackgroundDisabled: palette.darkModeGrey,
            buttonSecondaryBackgroundSelected: palette.blauBlueDark,
            buttonSecondaryBorderDisabledInverse: palette.darkModeGrey,
            buttonSecondaryBorderInverse: palette.blauBlue,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueDark,
            
            textButtonPrimary: palette.grey2,
            textButtonPrimaryDisabled: palette.grey5,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseDisabled: palette.grey5,
            textButtonPrimaryInverseSelected: palette.grey2,
            
            textButtonSecondary: palette.grey2,
            textButtonSecondaryDisabled: palette.grey5,
            textButtonSecondarySelected: palette.blauBlueDark,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseDisabled: palette.grey5,
            textButtonSecondaryInverseSelected: palette.blauBlueDark,

            textLink: palette.blauPurpleLight50,
            textLinkInverse: palette.blauPurpleLight50,
            textLinkDisabled: palette.grey5,

            control: palette.grey5,
            controlActivated: palette.blauBlue,
            loadingBar: palette.blauBlue,
            loadingBarBackground: palette.darkModeGrey,

            toggleAndroidInactive: palette.grey5, // web only
            toggleAndroidBackgroundActive: palette.blauBlue60, // web only
            iosControlKnob: palette.grey2, // web only

            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,

            brand: palette.blauBlue, // this color needs to be in darkModeColors to revert the promient variant
            brandDark: palette.darkModeGrey,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.darkModeGrey,

            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textDisabled: palette.grey5,
            textAmount: palette.blauBlue,

            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,
        },
    };
};
