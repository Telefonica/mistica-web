import {applyAlpha} from '../utils/color';
import {O2_CLASSIC_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    o2Blue: '#032B5A',
    o2BlueDark: '#04264E',
    o2BlueLight60: '#6C8BAF',
    o2SkyBlue: '#0090D0',
    o2SkyBlueDark: '#057DB2',
    o2SkyBlueLight: '#65B4E4',
    o2SkyBlueLight50: '#80C7E7',
    o2SkyBlueLight30: '#D0E8F6',
    o2SkyBlueLight10: '#E9F5FB',
    o2DeepSkyBlue: '#7FD4FE',
    o2Gem: '#01B7B4',
    o2GemDark: '#099E9B',
    o2GemLight30: '#99E2E1',
    o2Yellow: '#FFCC00',
    o2Green: '#84B50F',
    o2GreenLight: '#DAE8B7',
    pepper: '#FF374A',
    pepperDark: '#D73241',
    pepperLight30: '#FFC3C8',
    orange: '#FF7F41',
    orangeLight: '#FFD6C2',
    coral: '#FF706E',
    pink: '#EB3C7D',
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
};

export const getO2ClassicSkin: GetSkin = () => {
    return {
        name: O2_CLASSIC_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundBrand: `linear-gradient(to bottom, ${palette.o2Blue}, ${palette.o2GradientSecond} 51%, ${palette.o2GradientThird} 72%, ${palette.o2GradientFourth})`,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            navigationBarBackground: palette.o2Blue,
            navigationSearchBarBackground: palette.o2BlueDark,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.o2GradientFourth,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.o2Gem,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundDisabled: palette.pepperLight30,
            buttonDangerBackgroundSelected: palette.pepperDark,
            buttonDangerBackgroundHover: palette.pepperDark,
            buttonLinkBackgroundSelected: palette.o2SkyBlueLight10,
            buttonPrimaryBackground: palette.o2SkyBlue,
            buttonPrimaryBackgroundDisabled: palette.o2SkyBlueLight50,
            buttonPrimaryBackgroundDisabledInverse: palette.o2SkyBlueLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.o2SkyBlueDark,
            buttonPrimaryBackgroundHover: palette.o2SkyBlueDark,
            buttonPrimaryBackgroundSelectedInverse: palette.o2SkyBlueLight50,
            buttonSecondaryBackground: palette.o2SkyBlue,
            buttonSecondaryBackgroundDisabled: palette.o2SkyBlueLight50,
            buttonSecondaryBackgroundSelected: palette.o2SkyBlueDark,
            buttonSecondaryBorderDisabledInverse: palette.o2SkyBlueLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.o2SkyBlueLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.o2SkyBlue,
            textButtonPrimaryInverseDisabled: palette.o2SkyBlueLight30,
            textButtonPrimaryInverseSelected: palette.o2SkyBlue, // iOS & Web
            textButtonPrimaryInversePressed: palette.o2SkyBlue, // Android
            textButtonSecondary: palette.o2SkyBlue,
            textButtonSecondaryDisabled: palette.o2SkyBlueLight50,
            textButtonSecondarySelected: palette.o2SkyBlueDark, // iOS & Web
            textButtonSecondaryPressed: palette.o2SkyBlueDark, // Android
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.o2SkyBlueLight50,
            textButtonSecondaryInverseSelected: palette.white, // iOS & Web
            textButtonSecondaryInversePressed: palette.white, // Android
            textLink: palette.o2SkyBlue,
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepperLight30,
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

            toggleAndroidInactive: palette.grey2, // solo web
            toggleAndroidBackgroundActive: palette.o2GemLight30, // solo web
            toggleIosInactive: palette.white, // solo web
            toggleIosBackgroundActive: palette.o2Gem, // solo web

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.o2Blue,

            // FEEDBACKS
            badge: palette.pepperDark,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.o2Blue, // antes iconBrand
            inverse: palette.white, // antes iconInverse
            neutralHigh: palette.grey6, // antes iconPrimary
            neutralLow: palette.grey3, // antes iconDisabled
            neutralMedium: palette.grey5, // antes iconSecondary
            promo: palette.pink, // antes backgroundPromo
            highlight: palette.pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.o2SkyBlueLight,
            textDisabled: palette.grey3,
            textAmount: palette.o2SkyBlue,

            // STATES
            error: palette.pepper, // antes iconError
            success: palette.o2Green, // antes iconSuccess
            warning: palette.orange, // antes iconWarning

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.o2BlueLight60,
            textNavigationSearchBarHint: palette.o2BlueLight60, // solo en iOS
            textNavigationSearchBarText: palette.white, // solo en iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.o2Blue,
        },
    };
};
