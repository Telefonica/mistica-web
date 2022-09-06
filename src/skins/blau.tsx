import {applyAlpha} from '../utils/color';
import {BLAU_SKIN} from './constants';

import type {GetKnownSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/blau-constants.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/blau-skin-schema.json

export const palette = {
    blauBluePrimary: '#00B6F1',
    blauBluePrimary10: '#F7FDFF',
    blauBluePrimary20: '#E5F6FD',
    blauBluePrimary30: '#B3E9FB',

    blauBlueSecondary: '#0072BC',
    blauBlueSecondary10: '#E5F1F9',
    blauBlueSecondary20: '#B2D4EC',
    blauBlueSecondary30: '#80B7DF',
    blauBlueSecondary60: '#005A99',

    blauPurple: '#7814B3',
    blauPurple10: '#F1E7F7',
    blauPurple30: '#BB89D9',

    blauYellow: '#FFA922',
    blauYellow10: '#FFF6E9',
    blauYellow40: '#FFC364',
    blauYellow60: '#F09500',
    blauYellow70: '#996614',

    blauGreen: '#30D300',
    blauGreen10: '#EAFBE5',
    blauGreen30: '#97E980',
    blauGreen70: '#1D7F00',

    blauRed: '#F64417',
    blauRed10: '#FEECE8',
    blauRed20: '#FCC7B9',
    blauRed30: '#FA9E87',
    blauRed40: '#F97C5D',
    blauRed70: '#C93712',

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
    darkModeGrey6: '#313235',
} as const;

export const getBlauSkin: GetKnownSkin = () => {
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
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
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
            buttonDangerBackgroundSelected: palette.blauRed70,
            buttonDangerBackgroundHover: palette.blauRed70,

            buttonLinkBackgroundSelected: palette.blauPurple10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.3),

            buttonPrimaryBackground: palette.blauBlueSecondary,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.blauBlueSecondary60,
            buttonPrimaryBackgroundHover: palette.blauBlueSecondary60,
            buttonPrimaryBackgroundSelectedInverse: palette.blauBluePrimary30,

            buttonSecondaryBackground: palette.blauBlueSecondary,
            buttonSecondaryBackgroundSelected: palette.blauBlueSecondary60,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.blauBluePrimary30,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.blauBlueSecondary,
            textButtonPrimaryInverseSelected: palette.blauBlueSecondary60,

            textButtonSecondary: palette.blauBlueSecondary,
            textButtonSecondarySelected: palette.blauBlueSecondary60,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.blauPurple,
            textLinkInverse: palette.white,
            textLinkDanger: palette.blauRed,
            textLinkSnackbar: palette.blauPurple30,

            // CONTROLS
            control: palette.grey2,
            controlActivated: palette.blauBlueSecondary,
            controlError: palette.blauRed,
            loadingBar: palette.blauBlueSecondary,
            loadingBarBackground: palette.blauBlueSecondary10,

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
            brandHigh: palette.blauBlueSecondary,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey1,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,

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

            // TAGS
            successLow: palette.blauGreen10,
            warningLow: palette.blauYellow10,
            errorLow: palette.blauRed10,
            promoLow: palette.blauPurple10,
            brandLow: palette.blauBlueSecondary10,

            successHigh: palette.blauGreen70,
            warningHigh: palette.blauYellow70,
            errorHigh: palette.blauRed70,
            promoHigh: palette.blauPurple,
        },
        darkModeColors: {
            // BACKGROUNDS
            backgroundBrand: palette.darkModeBlack,
            background: palette.darkModeBlack,
            appBarBackground: palette.darkModeGrey,
            backgroundContainer: palette.darkModeGrey,
            backgroundAlternative: palette.darkModeGrey,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.darkModeGrey,
            backgroundSkeletonInverse: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            navigationBarBackground: palette.darkModeBlack,

            skeletonWave: palette.grey5,

            // BORDERS
            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,

            // BUTTONS

            buttonLinkBackgroundSelected: applyAlpha(palette.blauPurple, 0.3),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.blauPurple, 0.3),

            buttonPrimaryBackgroundInverse: palette.blauBlueSecondary,
            buttonPrimaryBackgroundSelected: palette.blauBlueSecondary60,

            buttonSecondaryBorderInverse: palette.blauBluePrimary,
            buttonSecondaryBorderSelectedInverse: palette.blauBlueSecondary60,

            textButtonPrimary: palette.grey2,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseSelected: palette.grey2,

            textButtonSecondary: palette.grey2,
            textButtonSecondarySelected: palette.blauBlueSecondary60,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseSelected: palette.blauBlueSecondary60,

            textLink: palette.blauPurple30,
            textLinkInverse: palette.blauPurple30,

            // CONTROLS
            control: palette.darkModeGrey6,
            loadingBar: palette.blauBluePrimary,
            loadingBarBackground: palette.darkModeGrey,

            toggleAndroidInactive: palette.grey5, // web only
            toggleAndroidBackgroundActive: palette.blauBlueSecondary30, // web only
            iosControlKnob: palette.grey2, // web only

            // DIVIDERS
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,

            // GLOBAL
            brand: palette.blauBluePrimary,
            brandHigh: palette.grey5,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.darkModeGrey6,

            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,

            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,

            // TAGS
            successLow: applyAlpha(palette.white, 0.05),
            warningLow: applyAlpha(palette.white, 0.05),
            errorLow: applyAlpha(palette.white, 0.05),
            promoLow: applyAlpha(palette.white, 0.05),
            brandLow: applyAlpha(palette.white, 0.05),

            successHigh: palette.blauGreen30,
            warningHigh: palette.blauYellow40,
            errorHigh: palette.blauRed40,
            promoHigh: palette.blauPurple30,
        },
    };
};
