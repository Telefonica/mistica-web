import {applyAlpha} from '../utils/color';
import {VIVO_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    vivoPurple: '#660099',
    vivoPurpleDark: '#461E5F',
    vivoPurpleLight90: '#751AA3',
    vivoPurpleLight80: '#8433AD',
    vivoPurpleLight50: '#B280CC',
    vivoPurpleLight20: '#E0CCEB',
    vivoPurpleLight10: '#EFE5F4',
    vivoGreen: '#99CC33',
    vivoGreenDark: '#33A14A',
    vivoGreenLight40: '#D6EAAD',
    vivoBlue: '#00ABDB',
    orange: '#FF9900',
    orangeDark: '#FA6324',
    orangeLight: '#FFD699',
    pink: '#EB3D7D',
    pepper: '#CC1F59',
    pepperDark: '#B71D63',
    pepperLight30: '#F7B1CB',
    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#666666',
    grey6: '#000000',
    white: '#FFFFFF',
};

export const getVivoSkin: GetSkin = () => {
    return {
        name: VIVO_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.vivoPurple,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            backgroundFeedbackBottom: palette.vivoPurple,
            navigationBarBackground: palette.vivoPurple,
            backgroundAlternative: palette.grey1,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.vivoPurple,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundDisabled: palette.pepperLight30,
            buttonDangerBackgroundSelected: palette.pepperDark,
            buttonDangerBackgroundHover: palette.pepperDark,
            buttonLinkBackgroundSelected: palette.vivoPurpleLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),
            buttonPrimaryBackground: palette.vivoPurple,
            buttonPrimaryBackgroundDisabled: palette.vivoPurpleLight20,
            buttonPrimaryBackgroundDisabledInverse: palette.vivoPurpleLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.vivoPurpleDark,
            buttonPrimaryBackgroundHover: palette.vivoPurpleDark,
            buttonPrimaryBackgroundSelectedInverse: palette.vivoPurpleLight50,
            buttonSecondaryBackground: palette.vivoPurple,
            buttonSecondaryBackgroundDisabled: palette.vivoPurpleLight20,
            buttonSecondaryBackgroundSelected: palette.vivoPurpleDark,
            buttonSecondaryBorderDisabledInverse: palette.vivoPurpleLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.vivoPurpleLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.vivoPurple,
            textButtonPrimaryInverseDisabled: palette.vivoPurpleLight20,
            textButtonPrimaryInverseSelected: palette.vivoPurple,
            textButtonSecondary: palette.vivoPurple,
            textButtonSecondaryDisabled: palette.vivoPurpleLight20,
            textButtonSecondarySelected: palette.vivoPurpleDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.vivoPurpleLight50,
            textButtonSecondaryInverseSelected: palette.white,
            textLink: palette.vivoPurple,
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepperLight30,
            textLinkDisabled: palette.vivoPurpleLight50,
            textLinkSnackbar: palette.vivoPurpleLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.vivoPurple,
            controlError: palette.pepper,
            loadingBar: palette.pink,
            loadingBarBackground: palette.pepperLight30,
            loadingBarBackgroundInverse: palette.vivoPurpleLight50,
            loadingBarInverse: palette.vivoPurple,

            toggleAndroidInactive: palette.grey2,
            toggleAndroidBackgroundActive: palette.vivoPurpleLight20,
            toggleIosInactive: palette.white,

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.vivoPurple,

            // FEEDBACKS
            badge: palette.pepperDark,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.vivoPurple,
            brandDark: palette.vivoPurpleDark,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralLow: palette.grey3,
            neutralMedium: palette.grey5,
            promo: palette.vivoPurple,
            highlight: palette.pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.vivoPurpleLight50,
            textDisabled: palette.grey3,
            textAmount: palette.vivoPurple,

            // STATES
            error: palette.pepper,
            success: palette.vivoGreen,
            warning: palette.orange,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.vivoPurpleLight50,
            textNavigationSearchBarHint: palette.vivoPurpleLight50, // iOS only
            textNavigationSearchBarText: palette.white, // iOS only
            textAppBar: palette.grey4,
            textAppBarSelected: palette.vivoPurple,
        },
    };
};
