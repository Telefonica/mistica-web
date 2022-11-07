import {applyAlpha} from '../utils/color';
import {TELEFONICA_SKIN} from './constants';

import type {GetKnownSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/telefonica-skin-schema.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/telefonica-constants.json

export const palette = {
    telefonicaBlue: '#0066FF',
    telefonicaBlue10: '#E5F0FF',
    telefonicaBlue20: '#B2D1FF',
    telefonicaBlue30: '#80B3FF',
    telefonicaBlue70: '#0356C9',

    ambar: '#EAC344',
    ambar10: '#FDF9EC',
    ambar40: '#F0D57C',
    ambar70: '#69581F',

    coral: '#E66C64',
    coral10: '#FDF0EF',
    coral40: '#E3A19A',
    coral70: '#D50000',
    coral80: '#912C31',

    orchid: '#C466EF',
    orchid10: '#F9F0FD',
    orchid40: '#D694F4',
    orchid70: '#8947A7',

    turquoise: '#59C2C9',
    turquoise10: '#EEF9FA',
    turquoise40: '#8BD4D9',
    turquoise70: '#3E888D',

    grey1: '#F2F4FF',
    grey2: '#D1D5E4',
    grey3: '#B0B6CA',
    grey4: '#8F97AF',
    grey5: '#6E7894',
    grey6: '#58617A',
    grey7: '#414B61',
    grey8: '#2B3447',
    grey9: '#031A34',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModeGrey6: '#313235',
} as const;

export const getTelefonicaSkin: GetKnownSkin = () => {
    return {
        name: TELEFONICA_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.telefonicaBlue,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: palette.telefonicaBlue70,
            navigationBarBackground: palette.telefonicaBlue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.telefonicaBlue,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey2,
            borderDark: palette.grey5,
            borderSelected: palette.telefonicaBlue,

            // BUTTONS
            buttonDangerBackground: palette.coral,
            buttonDangerBackgroundSelected: palette.coral80,
            buttonDangerBackgroundHover: palette.coral80, // web only

            buttonLinkBackgroundSelected: palette.grey1,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.telefonicaBlue70,
            buttonPrimaryBackgroundHover: palette.telefonicaBlue70, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.telefonicaBlue20,

            buttonSecondaryBackgroundSelected: palette.telefonicaBlue10,
            buttonSecondaryBorder: palette.telefonicaBlue,
            buttonSecondaryBorderSelected: palette.telefonicaBlue70,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.telefonicaBlue20,
            buttonSecondaryBackgroundHover: palette.telefonicaBlue70,
            buttonSecondaryBackgroundSelectedInverse: applyAlpha(palette.telefonicaBlue70, 0.2),


            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.telefonicaBlue,
            textButtonPrimaryInverseSelected: palette.telefonicaBlue,
            textButtonSecondary: palette.telefonicaBlue,
            textButtonSecondarySelected: palette.telefonicaBlue70,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseSelected: palette.white,
            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.coral,
            textLinkSnackbar: palette.telefonicaBlue30,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.telefonicaBlue,
            controlError: palette.coral,
            loadingBar: palette.telefonicaBlue30,
            loadingBarBackground: palette.telefonicaBlue70,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.grey2, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.telefonicaBlue,

            // FEEDBACKS
            badge: palette.coral70,
            feedbackErrorBackground: palette.coral,
            feedbackInfoBackground: palette.grey9,

            // GLOBAL
            brand: palette.telefonicaBlue,
            brandHigh: palette.telefonicaBlue70,
            inverse: palette.white,
            neutralHigh: palette.grey9,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey1,
            promo: palette.orchid,
            highlight: palette.coral40,

            textPrimary: palette.grey9,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,

            // STATES
            error: palette.coral,
            success: palette.turquoise,
            warning: palette.ambar,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.grey1,
            textNavigationSearchBarHint: palette.grey1, // iOS
            textNavigationSearchBarText: palette.white, // iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.telefonicaBlue,

            // TAGS
            successLow: palette.turquoise10,
            warningLow: palette.ambar10,
            errorLow: palette.coral10,
            promoLow: palette.orchid10,
            brandLow: palette.grey1,

            successHigh: palette.turquoise70,
            warningHigh: palette.ambar70,
            errorHigh: palette.coral70,
            promoHigh: palette.orchid70,
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

            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundInverse: palette.telefonicaBlue,
            buttonPrimaryBackgroundSelected: palette.telefonicaBlue70,
            buttonPrimaryBackgroundHover: palette.telefonicaBlue70, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.telefonicaBlue70,

            buttonSecondaryBackground: palette.telefonicaBlue,
            buttonSecondaryBackgroundSelected: palette.telefonicaBlue70,

            textButtonPrimary: palette.grey2,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseSelected: palette.grey2,

            textButtonSecondary: palette.grey2,
            textButtonSecondarySelected: palette.grey2,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseSelected: palette.grey2,

            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.telefonicaBlue,

            control: palette.darkModeGrey6,
            controlActivated: palette.telefonicaBlue,
            loadingBar: palette.telefonicaBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            toggleAndroidInactive: palette.grey4, // web only
            toggleAndroidBackgroundActive: palette.grey1, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            feedbackInfoBackground: palette.grey8,
            brandHigh: palette.grey6,
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

            successHigh: palette.turquoise40,
            warningHigh: palette.ambar40,
            errorHigh: palette.coral40,
            promoHigh: palette.orchid40,
        },
    };
};
