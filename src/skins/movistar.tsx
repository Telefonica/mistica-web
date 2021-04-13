import {applyAlpha} from '../utils/color';
import {MOVISTAR_SKIN} from './constants';

import type {GetSkin, Skin} from './types';

export const palette = {
    movistarBlue: '#019DF4',
    movistarBlueDark: '#008EDD',
    movistarBlueLight50: '#80CEF9',
    movistarBlueLight30: '#B3E1FB',
    movistarBlueLight10: '#E6F5FD',
    movistarGreen: '#5CB615',
    movistarGreenDark: '#499110',
    movistarGreenLight50: '#ADDA8A',
    movistarGreenLight30: '#CEE9B9',
    pepper: '#FF374A',
    pepperDark: '#D73241',
    pepperLight30: '#FFC3C8',
    egg: '#F28D15',
    eggLight: '#F8D2B3',
    pink: '#E63780',
    purple: '#A13EA1',
    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#86888C',
    grey6: '#313235',
    white: '#FFFFFF',
    movistarProminentBlue: '#0B2739',
    movistarProminentBlueDark: '#081F2D',
    movistarProminentBlueLight20: '#CED3D7',
    movistarProminentBlueLight50: '#85939C',
    movistarProminentBlueLight70: '#546874',
    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModeMovistarBlueDark: '#4C7389',
} as const;

export const getMovistarSkin: GetSkin = (variant) => {
    const skin: Skin = {
        name: MOVISTAR_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.movistarBlue,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: palette.movistarBlueDark,
            navigationBarBackground: palette.movistarBlue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.movistarBlue,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.movistarGreen,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundDisabled: palette.pepperLight30,
            buttonDangerBackgroundSelected: palette.pepperDark,
            buttonDangerBackgroundHover: palette.pepperDark, // web only

            buttonLinkBackgroundSelected: palette.movistarBlueLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.movistarGreen,
            buttonPrimaryBackgroundDisabled: palette.movistarGreenLight50,
            buttonPrimaryBackgroundDisabledInverse: palette.movistarBlueLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.movistarGreenDark,
            buttonPrimaryBackgroundHover: palette.movistarGreenDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.movistarBlueLight50,

            buttonSecondaryBackground: palette.movistarGreen,
            buttonSecondaryBackgroundDisabled: palette.movistarGreenLight50,
            buttonSecondaryBackgroundSelected: palette.movistarGreenDark,
            buttonSecondaryBorderDisabledInverse: palette.movistarBlueLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.movistarBlueLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.movistarBlue,
            textButtonPrimaryInverseDisabled: palette.movistarBlueLight30,
            textButtonPrimaryInverseSelected: palette.movistarBlue,

            textButtonSecondary: palette.movistarGreen,
            textButtonSecondaryDisabled: palette.movistarGreenLight50,
            textButtonSecondarySelected: palette.movistarGreenDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.movistarBlueLight50,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.movistarBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepperLight30,
            textLinkDisabled: palette.movistarBlueLight50,
            textLinkSnackbar: palette.movistarBlueLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.movistarBlue,
            controlError: palette.pepper,
            loadingBar: palette.movistarBlueLight50,
            loadingBarBackground: palette.grey6,
            loadingBarBackgroundInverse: palette.movistarBlueDark,
            loadingBarInverse: palette.movistarBlueLight50,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.movistarBlueLight30, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: palette.movistarBlueDark,
            navigationBarDivider: palette.movistarBlue,

            // FEEDBACKS
            badge: palette.pepperDark,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.movistarBlue,
            brandDark: palette.movistarBlueDark,
            inverse: palette.white,
            neutralHigh: palette.grey6,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey3,
            promo: palette.purple,
            highlight: palette.pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey3,
            textAmount: palette.movistarBlue,

            // STATES
            error: palette.pepper,
            success: palette.movistarGreen,
            warning: palette.egg,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.movistarBlueLight30,
            textNavigationSearchBarHint: palette.movistarBlueLight30, // iOS
            textNavigationSearchBarText: palette.white, // iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.movistarBlue,
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
            buttonDangerBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.movistarGreen,
            buttonPrimaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundInverse: palette.movistarGreen,
            buttonPrimaryBackgroundSelected: palette.movistarGreenDark,
            buttonPrimaryBackgroundHover: palette.movistarGreenDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.movistarGreenDark,
            buttonSecondaryBackground: palette.movistarGreen,
            buttonSecondaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonSecondaryBackgroundSelected: palette.movistarGreenDark,
            buttonSecondaryBorderDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonSecondaryBorderInverse: palette.movistarGreen,
            buttonSecondaryBorderSelectedInverse: palette.movistarGreenDark,
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
            textLink: palette.movistarBlue,
            textLinkInverse: palette.movistarBlue,
            textLinkDisabled: palette.grey6,
            control: palette.grey6,
            controlActivated: palette.movistarBlue,
            loadingBar: palette.movistarBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            loadingBarBackgroundInverse: palette.movistarGreenDark,
            loadingBarInverse: palette.movistarGreenLight50,
            toggleAndroidInactive: palette.grey4, // web only
            toggleAndroidBackgroundActive: palette.movistarBlueLight30, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandDark: palette.grey6,
            inverse: palette.grey2,
            neutralHigh: palette.grey4,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey6,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textDisabled: palette.grey5,
            textAmount: palette.movistarBlueLight50,
            textNavigationBarPrimary: palette.grey2,
            textNavigationBarSecondary: palette.grey4,
            textNavigationSearchBarHint: palette.grey4, // iOS
            textNavigationSearchBarText: palette.grey2, // iOS
            textAppBar: palette.grey5,
            textAppBarSelected: palette.grey2,
        },
    };

    if (variant === 'prominent') {
        skin.colors.brand = palette.movistarProminentBlue;
        skin.colors.brandDark = palette.movistarProminentBlueDark;
        skin.colors.backgroundBrand = palette.movistarProminentBlue;
        skin.colors.navigationBarBackground = palette.movistarProminentBlue;
        skin.colors.backgroundFeedbackBottom = palette.movistarProminentBlue;
        skin.colors.controlActivated = palette.movistarProminentBlue;
        skin.colors.dividerInverse = palette.movistarProminentBlueDark;
    }

    return skin;
};
