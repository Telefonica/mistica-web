import {applyAlpha} from '../utils/color';
import {O2_CLASSIC_SKIN} from './constants';

import type {GetSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/classicO2-constants.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/classicO2-skin-schema.json

export const palette = {
    o2Blue: '#032B5A',
    o2Blue55: '#04264E',
    o2Blue45: '#6C8BAF',
    o2Blue10: '#E6EAEE',

    o2SkyBlue: '#0090D0',
    o2SkyBlue55: '#057DB2',

    o2SkyBlueLight: '#65B4E4',
    o2SkyBlueLight50: '#80C7E7',
    o2SkyBlueLight45: '#80C7E7',
    o2SkyBlueLight30: '#D0E8F6',
    o2SkyBlueLight20: '#D0E8F6',
    o2SkyBlueLight10: '#E9F5FB',

    o2DeepSkyBlue: '#7FD4FE',

    o2Gem: '#01B7B4',
    o2GemDark: '#099E9B',
    o2GemLight30: '#99E2E1',

    o2Yellow: '#FFCC00',

    o2Green: '#84B50F',
    o2Green10: '#F3F8E7',
    o2Green75: '#4D621D',

    pepper: '#FF374A',
    pepper70: '#B22634',
    pepper55: '#D73241',
    pepper20: '#FFC3C8',
    pepper10: '#FFEBED',

    orange: '#FF7F41',
    orange10: '#FFF2EC',
    orange80: '#73391D',

    coral: '#FF706E',

    pink: '#EB3C7D',
    pink10: '#FDEBF2',
    pink60: '#BC3064',

    o2GradientFirst: '#102550',
    o2GradientSecond: '#0B4680',
    o2GradientThird: '#0D71AD',
    o2GradientFourth: '#449ED0',

    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#757575',
    grey6: '#000033',
    white: '#FFFFFF',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModeGrey6: '#313235',
} as const;

export const getO2ClassicSkin: GetSkin = () => {
    return {
        name: O2_CLASSIC_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: `linear-gradient(to bottom, ${palette.o2Blue}, ${palette.o2GradientSecond} 51%, ${palette.o2GradientThird} 72%, ${palette.o2GradientFourth})`,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            navigationBarBackground: palette.o2Blue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.o2GradientFourth,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.o2Gem,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundDisabled: palette.pepper20,
            buttonDangerBackgroundSelected: palette.pepper55,
            buttonDangerBackgroundHover: palette.pepper55,
            buttonLinkBackgroundSelected: palette.o2SkyBlueLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),
            buttonPrimaryBackground: palette.o2SkyBlue,
            buttonPrimaryBackgroundDisabled: palette.o2SkyBlueLight50,
            buttonPrimaryBackgroundDisabledInverse: palette.o2SkyBlueLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.o2SkyBlue55,
            buttonPrimaryBackgroundHover: palette.o2SkyBlue55,
            buttonPrimaryBackgroundSelectedInverse: palette.o2SkyBlueLight50,
            buttonSecondaryBackground: palette.o2SkyBlue,
            buttonSecondaryBackgroundDisabled: palette.o2SkyBlueLight50,
            buttonSecondaryBackgroundSelected: palette.o2SkyBlue55,
            buttonSecondaryBorderDisabledInverse: palette.o2SkyBlueLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.o2SkyBlueLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.o2SkyBlue,
            textButtonPrimaryInverseDisabled: palette.o2SkyBlueLight30,
            textButtonPrimaryInverseSelected: palette.o2SkyBlue,
            textButtonSecondary: palette.o2SkyBlue,
            textButtonSecondaryDisabled: palette.o2SkyBlueLight50,
            textButtonSecondarySelected: palette.o2SkyBlue55,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.o2SkyBlueLight50,
            textButtonSecondaryInverseSelected: palette.white,
            textLink: palette.o2SkyBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepper20,
            textLinkDisabled: palette.o2SkyBlueLight,
            textLinkSnackbar: palette.o2SkyBlueLight,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.o2Gem,
            controlError: palette.pepper,
            loadingBar: palette.o2Gem,
            loadingBarBackground: palette.o2GemLight30,
            loadingBarBackgroundInverse: palette.o2GemLight30,
            loadingBarInverse: palette.o2Gem,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.o2GemLight30, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.o2Blue,

            // FEEDBACKS
            badge: palette.pepper55,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.o2Blue,
            brandDark: palette.o2Blue55,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralLow: palette.grey3,
            neutralMedium: palette.grey5,
            promo: palette.pink,
            highlight: palette.pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey4,
            textAmount: palette.o2SkyBlue,

            // STATES
            error: palette.pepper,
            success: palette.o2Green,
            warning: palette.orange,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.o2Blue45,
            textNavigationSearchBarHint: palette.o2Blue45, // iOS only
            textNavigationSearchBarText: palette.white, // iOS only
            textAppBar: palette.grey4,
            textAppBarSelected: palette.o2Blue,

            // TAGS
            tagBackgroundSuccess: palette.o2Green10,
            tagBackgroundWarning: palette.orange10,
            tagBackgroundError: palette.pepper10,
            tagBackgroundPromo: palette.pink10,
            tagBackgroundActive: palette.o2Blue10,
            tagBackgroundInactive: palette.grey1,

            textTagSuccess: palette.o2Green75,
            textTagWarning: palette.orange80,
            textTagError: palette.pepper70,
            textTagPromo: palette.pink60,
            textTagActive: palette.o2Blue,
            textTagInactive: palette.grey5,
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
            borderSelected: palette.o2Gem,
            buttonDangerBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundInverse: palette.o2SkyBlue,
            buttonPrimaryBackgroundSelectedInverse: palette.o2SkyBlue55,
            buttonSecondaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonSecondaryBorderDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonSecondaryBorderInverse: palette.o2SkyBlue,
            buttonSecondaryBorderSelectedInverse: palette.o2SkyBlue55,
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
            textLink: palette.o2SkyBlueLight,
            textLinkInverse: palette.o2SkyBlueLight,
            textLinkDangerDisabled: palette.grey5,
            textLinkDisabled: palette.darkModeGrey6,
            textLinkSnackbar: palette.o2SkyBlueLight,
            control: palette.darkModeGrey6,
            controlActivated: palette.o2Gem,
            loadingBar: palette.o2Gem,
            loadingBarBackground: palette.darkModeGrey6,
            loadingBarBackgroundInverse: palette.darkModeGrey,
            loadingBarInverse: palette.o2SkyBlue,
            toggleAndroidInactive: palette.grey4,
            toggleAndroidBackgroundActive: palette.o2GemLight30,
            iosControlKnob: palette.grey2,
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            feedbackInfoBackground: palette.darkModeGrey6,
            brand: palette.o2SkyBlue,
            brandDark: palette.darkModeGrey6,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.darkModeGrey6,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textDisabled: palette.grey5,
            textAmount: palette.o2SkyBlueLight50,
            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4,
            textNavigationSearchBarText: palette.grey2,
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,

            // TAGS
            tagBackgroundSuccess: palette.o2Green10,
            tagBackgroundWarning: palette.orange10,
            tagBackgroundError: palette.pepper10,
            tagBackgroundPromo: palette.pink10,
            tagBackgroundActive: palette.o2Blue10,
            tagBackgroundInactive: palette.grey1,

            textTagSuccess: palette.o2Green75,
            textTagWarning: palette.orange80,
            textTagError: palette.pepper70,
            textTagPromo: palette.pink60,
            textTagActive: palette.o2Blue,
            textTagInactive: palette.grey5,
        },
    };
};
