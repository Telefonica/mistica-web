import {applyAlpha} from '../utils/color';
import {O2_SKIN} from './constants';

import type {GetKnownSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/o2-constants.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/o2-skin-schema.json

export const palette = {
    o2BluePrimary: '#0019A5',
    o2BluePrimary70: '#000066',
    o2BluePrimary30: '#808CD2',
    o2BluePrimary15: '#CCD1ED',
    o2BluePrimary10: '#E5E8F6',

    o2BlueMid: '#0090D0',

    o2BlueLight: '#41B6E6',
    o2BlueLight30: '#C6E9F7',

    o2Teal: '#01B7B4',

    o2Green: '#91C90E',
    o2Green10: '#F4FAE7',
    o2Green40: '#B2D956',
    o2Green80: '#415A06',

    o2Yellow: '#FEDB00',

    o2Orange: '#FF7F41',
    o2Orange10: '#FFF2EC',
    o2Orange40: '#FFA57A',
    o2Orange75: '#A6522A',

    o2Pink: '#E45DBF',

    o2Purple: '#952D98',
    o2Purple10: '#F4EAF5',
    o2Purple30: '#CA9ACB',

    pepper: '#FF374A',
    pepper10: '#FEEBED',
    pepper20: '#FCC3C9',
    pepper40: '#FF7380',
    pepper60: '#C32B3D',

    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#707070',
    grey6: '#000033',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModeGrey6: '#313235',
    darkModeO2BluePrimary: '#0020D6',
    darkModeO2BluePrimaryDark: '#000099',
} as const;

export const getO2Skin: GetKnownSkin = () => {
    return {
        name: O2_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.o2BluePrimary,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            navigationBarBackground: palette.o2BluePrimary,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.o2BluePrimary,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.o2BluePrimary,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundSelected: palette.pepper60,
            buttonDangerBackgroundHover: palette.pepper60,
            buttonLinkBackgroundSelected: palette.o2BluePrimary15,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.o2BluePrimary,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.o2BluePrimary70,
            buttonPrimaryBackgroundHover: palette.o2BluePrimary70,
            buttonPrimaryBackgroundSelectedInverse: palette.o2BluePrimary30,
            buttonSecondaryBackground: palette.o2BluePrimary,
            buttonSecondaryBackgroundSelected: palette.o2BluePrimary70,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.o2BluePrimary30,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.o2BluePrimary,
            textButtonPrimaryInverseSelected: palette.o2BluePrimary70,
            textButtonSecondary: palette.o2BluePrimary,
            textButtonSecondarySelected: palette.o2BluePrimary70,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseSelected: palette.white,
            textLink: palette.o2BluePrimary,
            textLinkInverse: palette.white,
            textLinkDanger: palette.pepper,
            textLinkSnackbar: palette.o2BluePrimary30,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.o2BluePrimary,
            controlError: palette.pepper,
            loadingBar: palette.o2BluePrimary,
            loadingBarBackground: palette.grey1,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.o2BluePrimary15, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.o2BluePrimary,

            // FEEDBACKS
            badge: palette.pepper60,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.o2BluePrimary,
            brandHigh: palette.o2BluePrimary70,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey1,
            promo: palette.o2Purple,
            highlight: palette.o2Pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,

            // STATES
            error: palette.pepper,
            success: palette.o2Green,
            warning: palette.o2Orange,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.o2BluePrimary30,
            textNavigationSearchBarHint: palette.o2BluePrimary30, // iOS only
            textNavigationSearchBarText: palette.white, // iOS only
            textAppBar: palette.grey4,
            textAppBarSelected: palette.o2BluePrimary,

            // TAGS
            successLow: palette.o2Green10,
            warningLow: palette.o2Orange10,
            errorLow: palette.pepper10,
            promoLow: palette.o2Purple10,
            brandLow: palette.o2BluePrimary10,

            successHigh: palette.o2Green80,
            warningHigh: palette.o2Orange75,
            errorHigh: palette.pepper60,
            promoHigh: palette.o2Purple,
        },
        darkModeColors: {
            appBarBackground: palette.darkModeGrey,
            background: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.darkModeGrey6,
            backgroundSkeletonInverse: palette.darkModeGrey6,
            navigationBarBackground: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            skeletonWave: palette.grey5,
            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,
            borderDark: palette.grey5,
            borderSelected: palette.darkModeO2BluePrimary,
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.darkModeO2BluePrimary,
            buttonPrimaryBackgroundInverse: palette.darkModeO2BluePrimary,
            buttonPrimaryBackgroundSelected: palette.darkModeO2BluePrimaryDark,
            buttonPrimaryBackgroundHover: palette.darkModeO2BluePrimaryDark,
            buttonPrimaryBackgroundSelectedInverse: palette.darkModeO2BluePrimaryDark,
            buttonSecondaryBackground: palette.darkModeO2BluePrimary,
            buttonSecondaryBackgroundSelected: palette.darkModeO2BluePrimaryDark,
            buttonSecondaryBorderInverse: palette.darkModeO2BluePrimary,
            buttonSecondaryBorderSelectedInverse: palette.darkModeO2BluePrimaryDark,
            textButtonPrimary: palette.grey2,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseSelected: palette.grey2,
            textButtonSecondary: palette.grey2,
            textButtonSecondarySelected: palette.grey4,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseSelected: palette.grey4,
            textLink: palette.o2BluePrimary30,
            textLinkInverse: palette.o2BluePrimary30,
            control: palette.darkModeGrey6,
            controlActivated: palette.o2BluePrimary30,
            loadingBar: palette.darkModeO2BluePrimary,
            loadingBarBackground: palette.darkModeGrey6,
            toggleAndroidInactive: palette.grey4,
            toggleAndroidBackgroundActive: palette.o2BlueLight30,
            iosControlKnob: palette.grey2,
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            feedbackInfoBackground: palette.darkModeGrey6,
            brand: palette.o2BluePrimary30,
            brandHigh: palette.darkModeGrey6,
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
            textNavigationSearchBarHint: palette.grey4,
            textNavigationSearchBarText: palette.grey2,
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,

            // TAGS
            successLow: applyAlpha(palette.white, 0.05),
            warningLow: applyAlpha(palette.white, 0.05),
            errorLow: applyAlpha(palette.white, 0.05),
            promoLow: applyAlpha(palette.white, 0.05),
            brandLow: applyAlpha(palette.white, 0.05),

            successHigh: palette.o2Green40,
            warningHigh: palette.o2Orange40,
            errorHigh: palette.pepper40,
            promoHigh: palette.o2Purple30,
        },
    };
};
