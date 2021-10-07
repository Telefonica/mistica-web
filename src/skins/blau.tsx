import {applyAlpha} from '../utils/color';
import {BLAU_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    blauBluePrimary: '#00B6F1',
    blauBluePrimary30: '#B3E9FB',
    blauBluePrimary20: '#E5F6FD',
    blauBluePrimary10: '#F7FDFF',

    blauBlueSecondary60: '#005A99',
    blauBlueSecondary: '#0072BC',
    blauBlueSecondary30: '#80B7DF',
    blauBlueSecondary20: '#B2D4EC',
    blauBlueSecondary10: '#E5F1F9',

    blauPurple: '#7814B3',
    blauPurple10: '#F1E7F7',
    blauPurple30: '#BB89D9',

    blauYellow: '#FFA922',
    BlauYellow10: '#FFF6E9',
    BlauYellow60: '#F09500',
    BlauYellow70: '#996614',

    blauGreen: '#30D300',

    blauRed: '#F64417',
    blauRed10: '#FEECE8',
    blauRed70: '#C93712',
    blauRed30: '#FA9E87',
    blauRed20: '#FCC7B9',

    BlauGreen10: '#EAFBE5',
    BlauGreen70: '#1D7F00',

    grey1: '#F5F9FA',
    grey2: '#E7E7E7',
    grey3: '#B8B8B8',
    grey4: '#A0A0A0',
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
            backgroundBrand: palette.blauBluePrimary,
            backgroundOverlay: applyAlpha(palette.blauBlueSecondary, 0.75),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: palette.white,
            navigationBarBackground: palette.blauBluePrimary,
            backgroundAlternative: palette.blauBluePrimary20,
            backgroundFeedbackBottom: palette.blauBluePrimary,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey2,
            borderDark: palette.grey5,
            borderSelected: palette.blauBlueSecondary60,

            // BUTTONS
            buttonDangerBackground: palette.blauRed,
            buttonDangerBackgroundDisabled: palette.blauRed20,
            buttonDangerBackgroundSelected: palette.blauRed70,
            buttonDangerBackgroundHover: palette.blauRed70,

            buttonLinkBackgroundSelected: palette.blauPurple10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.3),

            buttonPrimaryBackground: palette.blauBlueSecondary,
            buttonPrimaryBackgroundDisabled: palette.blauBlueSecondary20,
            buttonPrimaryBackgroundDisabledInverse: palette.blauBlueSecondary30,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.blauBlueSecondary60,
            buttonPrimaryBackgroundHover: palette.blauBlueSecondary60,
            buttonPrimaryBackgroundSelectedInverse: palette.blauBluePrimary30,

            buttonSecondaryBackground: palette.blauBlueSecondary,
            buttonSecondaryBackgroundDisabled: palette.blauBlueSecondary20,
            buttonSecondaryBackgroundSelected: palette.blauBlueSecondary60,
            buttonSecondaryBorderDisabledInverse: palette.blauBluePrimary30,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.blauBluePrimary30,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.blauBlueSecondary,
            textButtonPrimaryInverseDisabled: palette.blauBluePrimary10,
            textButtonPrimaryInverseSelected: palette.blauBlueSecondary60,

            textButtonSecondary: palette.blauBlueSecondary,
            textButtonSecondaryDisabled: palette.blauBlueSecondary30,
            textButtonSecondarySelected: palette.blauBlueSecondary60,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.blauPurple30,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.blauPurple,
            textLinkInverse: palette.white,
            textLinkDanger: palette.blauRed,
            textLinkDangerDisabled: palette.blauRed20,
            textLinkDisabled: palette.blauPurple30,
            textLinkSnackbar: palette.blauPurple30,

            // CONTROLS
            control: palette.grey2,
            controlActivated: palette.blauBlueSecondary,
            controlError: palette.blauRed,
            loadingBar: palette.blauBlueSecondary,
            loadingBarBackground: palette.blauBlueSecondary10,
            loadingBarInverse: palette.blauBlueSecondary, // Deprecated. Remove
            loadingBarBackgroundInverse: palette.blauBlueSecondary10, // Deprecated. Remove

            toggleAndroidInactive: palette.grey2,
            toggleAndroidBackgroundActive: palette.blauBlueSecondary10,
            iosControlKnob: palette.white,

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.blauBluePrimary,

            // FEEDBACKS
            badge: palette.blauRed,
            feedbackErrorBackground: palette.blauRed,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.blauBluePrimary,
            brandDark: palette.blauBlueSecondary,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey2,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey3,
            textAmount: palette.blauBlueSecondary,

            // STATES
            error: palette.blauRed,
            success: palette.blauGreen,
            warning: palette.blauYellow,
            promo: palette.blauPurple,
            highlight: palette.blauBluePrimary,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.blauBlueSecondary20,
            textNavigationSearchBarHint: palette.blauBlueSecondary20,
            textNavigationSearchBarText: palette.white,
            textAppBar: palette.grey5,
            textAppBarSelected: palette.blauBlueSecondary60,
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

            buttonPrimaryBackgroundDisabled: palette.darkModeGrey,
            buttonPrimaryBackgroundDisabledInverse: palette.darkModeGrey,
            buttonPrimaryBackgroundInverse: palette.blauBluePrimary,
            buttonPrimaryBackgroundSelected: palette.blauBlueSecondary60,

            buttonSecondaryBackgroundDisabled: palette.darkModeGrey,
            buttonSecondaryBorderDisabledInverse: palette.darkModeGrey,
            buttonSecondaryBorderInverse: palette.blauBluePrimary,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueSecondary60,

            textButtonPrimary: palette.grey2,
            textButtonPrimaryDisabled: palette.grey5,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseDisabled: palette.grey5,
            textButtonPrimaryInverseSelected: palette.grey2,

            textButtonSecondary: palette.grey2,
            textButtonSecondaryDisabled: palette.grey5,
            textButtonSecondarySelected: palette.blauBlueSecondary60,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseDisabled: palette.grey5,
            textButtonSecondaryInverseSelected: palette.blauBlueSecondary60,

            textLink: palette.blauPurple30,
            textLinkInverse: palette.blauPurple30,
            textLinkDisabled: palette.grey5,

            control: palette.grey5,
            loadingBar: palette.blauBluePrimary,
            loadingBarBackground: palette.darkModeGrey,

            toggleAndroidInactive: palette.grey5, // web only
            toggleAndroidBackgroundActive: palette.blauBlueSecondary30, // web only
            iosControlKnob: palette.grey2, // web only

            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,

            brand: palette.blauBluePrimary, // this color needs to be in darkModeColors to revert the promient variant
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
            textAmount: palette.blauBlueSecondary,

            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,
        },
    };
};
