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
};

export const getMovistarSkin: GetSkin = (variant) => {
    const skin: Skin = {
        name: MOVISTAR_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
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
            buttonDangerBackgroundHover: palette.pepperDark,
            buttonLinkBackgroundSelected: palette.movistarBlueLight10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),
            buttonPrimaryBackground: palette.movistarGreen,
            buttonPrimaryBackgroundDisabled: palette.movistarGreenLight50,
            buttonPrimaryBackgroundDisabledInverse: palette.movistarBlueLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.movistarGreenDark,
            buttonPrimaryBackgroundHover: palette.movistarGreenDark,
            buttonPrimaryBackgroundSelectedInverse: palette.movistarBlueLight50,
            buttonSecondaryBackground: palette.movistarGreen,
            buttonSecondaryBackgroundDisabled: palette.movistarGreenLight50,
            buttonSecondaryBackgroundSelected: palette.movistarGreenDark,
            buttonSecondaryBorderDisabledInverse: palette.movistarBlueLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.movistarBlueLight50,

            textButtonPrimary: palette.white,
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
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepperLight30,
            textLinkDisabled: palette.movistarBlueLight50,
            textLinkSnackbar: palette.movistarBlueLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.movistarBlue,
            controlError: palette.pepper,
            loadingBar: palette.movistarGreen,
            loadingBarBackground: palette.movistarGreenLight50,
            loadingBarBackgroundInverse: palette.movistarBlueDark,
            loadingBarInverse: palette.movistarBlueLight50,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.movistarBlueLight30, // web only
            toggleIosInactive: palette.white, // web only

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
            neutralLow: palette.grey3,
            neutralMedium: palette.grey5,
            promo: palette.purple,
            highlight: palette.pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.movistarBlueLight30,
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
