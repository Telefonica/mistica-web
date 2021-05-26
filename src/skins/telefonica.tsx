import {applyAlpha} from '../utils/color';
import {TELEFONICA_SKIN} from './constants';

import type {GetSkin, Skin} from './types';

export const palette = {
    white: '#FFFFFF',
    grey1: '#F2F4FF',
    grey2: '#D1D5E4',
    grey3: '#B0B6CA',
    grey4: '#8F97AF',
    grey5: '#6E7894',
    grey6: '#58617A',
    grey7: '#414B61',
    grey8: '#2B3447',
    grey9: '#031A34',
    telefonicaBlue: '#0066FF',

    ambar: '#EAC344',
    ambarLight: '#F5E98A',
    ambarDark: '#AD842D',
    coral: '#E66C64',
    coralLight: '#E3A19A',
    coralDark: '#912C31',
    orchid: '#C466EF',
    orchidDark: '#8A1A93',
    orchidLight: '#E7C2F8',
    turquoise: '#59C2C9',
    turquoiseLight: '#67E0E5',
    turquoiseDark: '#3E8A8A',

    // specific for dark mode:
    darkModeBlack: '#191919',
    darkModeGrey: '#242424',
    darkModetelefonicaBlueDark: '#4C7389',
} as const;

export const getTelefonicaSkin: GetSkin = (variant) => {
    const skin: Skin = {
        name: TELEFONICA_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.telefonicaBlue,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: palette.telefonicaBlueDark,
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
            buttonDangerBackgroundDisabled: palette.coralLight30,
            buttonDangerBackgroundSelected: palette.coralDark,
            buttonDangerBackgroundHover: palette.coralDark, // web only

            buttonLinkBackgroundSelected: palette.grey1,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundDisabled: palette.telefonicaBlueLight50,
            buttonPrimaryBackgroundDisabledInverse: palette.telefonicaBlueLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.telefonicaBlueDark,
            buttonPrimaryBackgroundHover: palette.telefonicaBlueDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.telefonicaBlueLight50,

            buttonSecondaryBackground: palette.telefonicaBlue,
            buttonSecondaryBackgroundDisabled: palette.telefonicaBlueLight50,
            buttonSecondaryBackgroundSelected: palette.telefonicaBlueDark,
            buttonSecondaryBorderDisabledInverse: palette.telefonicaBlueLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.telefonicaBlueLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryDisabled: palette.white,
            textButtonPrimaryInverse: palette.telefonicaBlue,
            textButtonPrimaryInverseDisabled: palette.grey1,
            textButtonPrimaryInverseSelected: palette.telefonicaBlue,

            textButtonSecondary: palette.telefonicaBlue,
            textButtonSecondaryDisabled: palette.telefonicaBlueLight50,
            textButtonSecondarySelected: palette.telefonicaBlueDark,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.telefonicaBlueLight50,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.coral,
            textLinkDangerDisabled: palette.coralLight30,
            textLinkDisabled: palette.telefonicaBlueLight50,
            textLinkSnackbar: palette.telefonicaBlueLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.telefonicaBlue,
            controlError: palette.coral,
            loadingBar: palette.telefonicaBlueLight50,
            loadingBarBackground: palette.telefonicaBlueDark,
            loadingBarBackgroundInverse: palette.telefonicaBlueDark,
            loadingBarInverse: palette.telefonicaBlueLight50,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.grey2, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: palette.telefonicaBlueDark,
            navigationBarDivider: palette.telefonicaBlue,

            // FEEDBACKS
            badge: palette.coralDark,
            feedbackErrorBackground: palette.coral,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.telefonicaBlue,
            brandDark: palette.telefonicaBlueDark,
            inverse: palette.white,
            neutralHigh: palette.grey9,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey1,
            promo: palette.orchid,
            highlight: palette.coralLight,

            textPrimary: palette.grey9,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,
            textDisabled: palette.grey3,
            textAmount: palette.telefonicaBlue,

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
        },
        darkModeColors: {
            brand: palette.telefonicaBlue, // this color needs to be in darkModeColors to revert the promient variant
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
            buttonPrimaryBackground: palette.telefonicaBlue,
            buttonPrimaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackgroundInverse: palette.telefonicaBlue,
            buttonPrimaryBackgroundSelected: palette.telefonicaBlueDark,
            buttonPrimaryBackgroundHover: palette.telefonicaBlueDark, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.telefonicaBlueDark,
            buttonSecondaryBackground: palette.telefonicaBlue,
            buttonSecondaryBackgroundDisabled: applyAlpha(palette.white, 0.05),
            buttonSecondaryBackgroundSelected: palette.telefonicaBlueDark,
            buttonSecondaryBorderDisabledInverse: applyAlpha(palette.white, 0.05),
            buttonSecondaryBorderInverse: palette.telefonicaBlue,
            buttonSecondaryBorderSelectedInverse: palette.telefonicaBlueDark,
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
            textLink: palette.telefonicaBlue,
            textLinkInverse: palette.telefonicaBlue,
            textLinkDisabled: palette.grey6,
            control: palette.grey6,
            controlActivated: palette.telefonicaBlue,
            loadingBar: palette.telefonicaBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            loadingBarBackgroundInverse: palette.telefonicaBlueDark,
            loadingBarInverse: palette.telefonicaBlueLight50,
            toggleAndroidInactive: palette.grey4, // web only
            toggleAndroidBackgroundActive: palette.grey1, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandDark: palette.grey6,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey6,
            textPrimary: palette.grey2,
            textPrimaryInverse: palette.grey2,
            textSecondary: palette.grey4,
            textSecondaryInverse: palette.grey4,
            textDisabled: palette.grey5,
            textAmount: palette.telefonicaBlueLight50,
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
