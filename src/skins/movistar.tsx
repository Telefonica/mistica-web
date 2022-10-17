import {applyAlpha} from '../utils/color';
import {MOVISTAR_SKIN} from './constants';

import type {GetKnownSkin, KnownSkin} from './types';

// https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar-skin-schema.json
// https://github.com/Telefonica/mistica-design/blob/production/tokens/movistar-constants.json

export const palette = {
    movistarBlue: '#019DF4',
    movistarBlue10: '#E6F5FD',
    movistarBlue20: '#B3E1FB',
    movistarBlue30: '#80CEF9',
    movistarBlue40: '#4DBAF7',
    movistarBlue55: '#008EDD',

    movistarGreen: '#5CB615',
    movistarGreen10: '#EFF8E8',
    movistarGreen30: '#ADDA8A',
    movistarGreen40: '#8DCC5B',
    movistarGreen60: '#499110',
    movistarGreen70: '#407F0F',

    pepper: '#FF374A',
    pepper10: '#FFEBED',
    pepper20: '#FFC3C8',
    pepper40: '#FF7380',
    pepper55: '#D73241',
    pepper70: '#B22634',

    egg: '#F28D15',
    egg10: '#FEF4E8',
    egg40: '#F6AF5B',
    egg80: '#6D3F09',

    pink: '#E63780',

    purple: '#A13EA1',
    purple10: '#F6ECF6',
    purple40: '#BD78BD',
    purple70: '#712B71',

    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#86888C',
    grey6: '#313235',
    white: '#FFFFFF',

    movistarBlueDark: '#0B2739',
    movistarBlueDark60: '#091F2E',

    // specific for dark mode:
    darkModeBlack: '#061824',
    darkModeGrey: '#092232',
} as const;

export const getMovistarSkin: GetKnownSkin = () => {
    const skin: KnownSkin = {
        name: MOVISTAR_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.movistarBlueDark,
            backgroundOverlay: applyAlpha(palette.movistarBlueDark, 0.6),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: palette.movistarBlue55,
            navigationBarBackground: palette.movistarBlueDark,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.movistarBlueDark,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.movistarBlue,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundSelected: palette.pepper55,
            buttonDangerBackgroundHover: palette.pepper55, // web only

            buttonLinkBackgroundSelected: palette.movistarBlue10,
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.movistarBlue,
            buttonPrimaryBackgroundInverse: palette.movistarBlue,
            buttonPrimaryBackgroundSelected: palette.movistarBlue55,
            buttonPrimaryBackgroundHover: palette.movistarBlue55, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.movistarBlue55,

            buttonSecondaryBackground: palette.movistarBlue,
            buttonSecondaryBackgroundSelected: palette.movistarBlue55,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.movistarBlue30,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.white,
            textButtonPrimaryInverseSelected: palette.white,

            textButtonSecondary: palette.movistarBlue,
            textButtonSecondarySelected: palette.movistarBlue55,
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseSelected: palette.white,

            textLink: palette.movistarBlue,
            textLinkInverse: palette.white,
            textLinkDanger: palette.pepper,
            textLinkSnackbar: palette.movistarBlue30,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.movistarBlue,
            controlError: palette.pepper,
            loadingBar: palette.movistarBlue30,
            loadingBarBackground: palette.movistarBlue55,

            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.movistarBlue20, // web only
            iosControlKnob: palette.white, // web only

            // DIVIDERS
            divider: palette.grey2,
            dividerInverse: applyAlpha(palette.white, 0.2),
            navigationBarDivider: palette.movistarBlueDark,

            // FEEDBACKS
            badge: palette.pepper55,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.movistarBlueDark,

            // GLOBAL
            brand: palette.movistarBlue,
            brandHigh: palette.movistarBlue55,
            inverse: palette.white,
            neutralHigh: palette.movistarBlueDark,
            neutralMedium: palette.grey5,
            neutralLow: palette.grey1,
            promo: palette.purple,
            highlight: palette.pink,

            textPrimary: palette.movistarBlueDark,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.white,

            // STATES
            error: palette.pepper,
            success: palette.movistarGreen,
            warning: palette.egg,

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.movistarBlue20,
            textNavigationSearchBarHint: palette.movistarBlue20, // iOS
            textNavigationSearchBarText: palette.white, // iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.movistarBlue,

            // TAGS
            successLow: palette.movistarGreen10,
            warningLow: palette.egg10,
            errorLow: palette.pepper10,
            promoLow: palette.purple10,
            brandLow: palette.movistarBlue10,

            successHigh: palette.movistarGreen70,
            warningHigh: palette.egg80,
            errorHigh: palette.pepper70,
            promoHigh: palette.purple70,
        },
        darkModeColors: {
            brand: palette.movistarBlue, // this color needs to be in darkModeColors to revert the promient variant
            appBarBackground: palette.darkModeGrey,
            background: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundOverlay: applyAlpha(palette.movistarBlueDark, 0.8),
            backgroundSkeleton: palette.darkModeGrey,
            backgroundSkeletonInverse: palette.darkModeGrey,
            navigationBarBackground: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            skeletonWave: palette.grey5,
            feedbackInfoBackground: palette.movistarBlueDark,
            borderLight: palette.darkModeBlack,
            border: palette.darkModeGrey,
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundSelectedInverse: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.movistarBlue,
            buttonPrimaryBackgroundInverse: palette.movistarBlue,
            buttonPrimaryBackgroundSelected: palette.movistarBlue55,
            buttonPrimaryBackgroundHover: palette.movistarBlue55, // web only
            buttonPrimaryBackgroundSelectedInverse: palette.movistarBlue55,
            buttonSecondaryBackground: palette.movistarBlue,
            buttonSecondaryBackgroundSelected: palette.movistarBlue55,
            buttonSecondaryBorderInverse: palette.movistarBlue,
            buttonSecondaryBorderSelectedInverse: palette.movistarBlue55,
            textButtonPrimary: palette.grey2,
            textButtonPrimaryInverse: palette.grey2,
            textButtonPrimaryInverseSelected: palette.grey2,
            textButtonSecondary: palette.grey2,
            textButtonSecondarySelected: palette.grey4,
            textButtonSecondaryInverse: palette.grey2,
            textButtonSecondaryInverseSelected: palette.grey4,
            textLink: palette.movistarBlue,
            textLinkInverse: palette.movistarBlue,
            control: palette.grey4,
            controlActivated: palette.movistarBlue,
            loadingBar: palette.movistarBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            toggleAndroidInactive: palette.grey2, // web only
            toggleAndroidBackgroundActive: palette.movistarBlue20, // web only
            iosControlKnob: palette.grey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandHigh: palette.darkModeGrey,
            inverse: palette.grey2,
            neutralHigh: palette.grey2,
            neutralMedium: palette.grey5,
            neutralLow: palette.darkModeGrey,
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

            successHigh: palette.movistarGreen40,
            warningHigh: palette.egg40,
            errorHigh: palette.pepper40,
            promoHigh: palette.purple40,
        },
        textPresets: {
            text5: {weight: 'bold'},
            text6: {weight: 'bold'},
            text7: {weight: 'bold'},
            text8: {weight: 'bold'},
            text9: {weight: 'bold'},
            text10: {weight: 'bold'},
        },
        // @todo: uncomment to apply movistar skin evolution
        // textPresets: {
        //     text5: {weight: 'medium'},
        //     text6: {weight: 'medium'},
        //     text7: {weight: 'medium'},
        //     text8: {weight: 'medium'},
        //     text9: {weight: 'medium'},
        //     text10: {weight: 'medium'},
        // },
    };

    return skin;
};
