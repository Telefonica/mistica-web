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
    movistarBlueDark: '#0B2739',

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

    movistarProminentBlue: '#0B2739',
    movistarProminentBlueDark: '#081F2D',
    movistarProminentBlueLight20: '#CED3D7',
    movistarProminentBlueLight50: '#85939C',
    movistarProminentBlueLight70: '#546874',

    // specific for dark mode:
    darkModeBlack: '#061824',
    darkModeGrey: '#081F2E',

    darkModeGrey2: '#EAEBEE',
    darkModeGrey3: '#CED4D7',
    darkModeGrey4: '#85939C',
    darkModeGrey5: '#6D7D88',
    darkModeGrey6: '#3C5261',
} as const;

export const getMovistarSkin: GetKnownSkin = () => {
    const skin: KnownSkin = {
        name: MOVISTAR_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundContainer: palette.white,
            backgroundBrand: palette.movistarBlue,
            backgroundBrandSecondary: palette.movistarBlueDark,
            backgroundOverlay: applyAlpha(palette.movistarBlueDark, 0.6),
            backgroundSkeleton: palette.grey2,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            navigationBarBackground: palette.movistarBlue,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.movistarBlue,

            skeletonWave: palette.grey2,

            // BORDERS
            borderLow: palette.grey1,
            border: palette.grey3,
            borderHigh: palette.grey5,
            borderSelected: palette.movistarBlue,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundSelected: palette.pepper55,
            buttonDangerBackgroundHover: palette.pepper55, // web only

            buttonLinkBackgroundSelected: palette.movistarBlue10,
            buttonLinkBackgroundInverseSelected: applyAlpha(palette.white, 0.2),

            buttonPrimaryBackground: palette.movistarBlue,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.movistarBlue55,
            buttonPrimaryBackgroundHover: palette.movistarBlue55, // web only
            buttonPrimaryBackgroundInverseSelected: palette.movistarBlue30,

            buttonSecondaryBorder: palette.movistarBlue,
            buttonSecondaryBorderSelected: palette.movistarBlue55,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderInverseSelected: palette.white,
            buttonSecondaryBackgroundHover: palette.movistarBlue10,
            buttonSecondaryBackgroundSelected: palette.movistarBlue10,
            buttonSecondaryBackgroundInverseHover: applyAlpha(palette.white, 0.2),
            buttonSecondaryBackgroundInverseSelected: applyAlpha(palette.white, 0.2),

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.movistarBlue,
            textButtonPrimaryInverseSelected: palette.movistarBlue,

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
            dividerInverse: palette.movistarBlue55,
            navigationBarDivider: palette.movistarBlue,

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
            textSecondaryInverse: palette.movistarBlue10,

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

            successHighInverse: palette.movistarGreen70,
            warningHighInverse: palette.egg80,
            errorHighInverse: palette.pepper70,
            promoHighInverse: palette.purple70,
            neutralMediumInverse: palette.grey5,
        },
        darkModeColors: {
            appBarBackground: palette.darkModeGrey,
            background: palette.darkModeBlack,
            backgroundContainer: palette.darkModeGrey,
            backgroundBrand: palette.darkModeBlack,
            backgroundBrandSecondary: palette.darkModeBlack,
            backgroundOverlay: applyAlpha(palette.darkModeGrey, 0.8),
            backgroundSkeleton: palette.darkModeGrey6,
            backgroundSkeletonInverse: palette.darkModeGrey6,
            navigationBarBackground: palette.darkModeBlack,
            backgroundAlternative: palette.darkModeGrey,
            backgroundFeedbackBottom: palette.darkModeBlack,
            skeletonWave: palette.darkModeGrey5,
            borderHigh: palette.darkModeGrey4,
            borderLow: palette.darkModeBlack,
            border: palette.darkModeGrey,
            buttonLinkBackgroundSelected: applyAlpha(palette.white, 0.05),
            buttonLinkBackgroundInverseSelected: applyAlpha(palette.white, 0.05),
            buttonPrimaryBackground: palette.movistarBlue,
            buttonPrimaryBackgroundInverse: palette.movistarBlue,
            buttonPrimaryBackgroundSelected: palette.movistarBlue55,
            buttonPrimaryBackgroundHover: palette.movistarBlue55, // web only
            buttonPrimaryBackgroundInverseSelected: palette.movistarBlue55,
            buttonSecondaryBorder: palette.white,
            buttonSecondaryBorderSelected: palette.white,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderInverseSelected: palette.white,
            buttonSecondaryBackgroundHover: applyAlpha(palette.white, 0.15),
            buttonSecondaryBackgroundSelected: applyAlpha(palette.white, 0.15),
            buttonSecondaryBackgroundInverseHover: applyAlpha(palette.white, 0.15),
            buttonSecondaryBackgroundInverseSelected: applyAlpha(palette.white, 0.15),
            textButtonPrimary: palette.darkModeGrey2,
            textButtonPrimaryInverse: palette.darkModeGrey2,
            textButtonPrimaryInverseSelected: palette.darkModeGrey2,
            textButtonSecondary: palette.darkModeGrey2,
            textButtonSecondarySelected: palette.darkModeGrey2,
            textButtonSecondaryInverse: palette.darkModeGrey2,
            textButtonSecondaryInverseSelected: palette.darkModeGrey2,
            textLink: palette.movistarBlue,
            textLinkInverse: palette.movistarBlue,
            control: palette.darkModeGrey6,
            controlActivated: palette.movistarBlue,
            loadingBar: palette.movistarBlue,
            loadingBarBackground: applyAlpha(palette.white, 0.05),
            toggleAndroidInactive: palette.darkModeGrey4, // web only
            toggleAndroidBackgroundActive: palette.movistarBlue20, // web only
            iosControlKnob: palette.darkModeGrey2, // web only
            divider: applyAlpha(palette.white, 0.05),
            dividerInverse: applyAlpha(palette.white, 0.05),
            navigationBarDivider: palette.darkModeBlack,
            brandHigh: palette.darkModeGrey6,
            inverse: palette.darkModeGrey2,
            neutralHigh: palette.darkModeGrey2,
            neutralMedium: palette.darkModeGrey5,
            neutralLow: palette.movistarBlueDark,
            textPrimary: palette.darkModeGrey2,
            textPrimaryInverse: palette.darkModeGrey2,
            textSecondary: palette.darkModeGrey4,
            textSecondaryInverse: palette.darkModeGrey4,
            textNavigationBarPrimary: palette.darkModeGrey2,
            textNavigationBarSecondary: palette.darkModeGrey4,
            textNavigationSearchBarHint: palette.darkModeGrey4, // iOS
            textNavigationSearchBarText: palette.darkModeGrey2, // iOS
            textAppBar: palette.darkModeGrey5,
            textAppBarSelected: palette.darkModeGrey2,

            // TAGS
            successLow: palette.movistarBlueDark,
            warningLow: palette.movistarBlueDark,
            errorLow: palette.movistarBlueDark,
            promoLow: palette.movistarBlueDark,
            brandLow: palette.movistarBlueDark,

            successHigh: palette.movistarGreen40,
            warningHigh: palette.egg40,
            errorHigh: palette.pepper40,
            promoHigh: palette.purple40,

            successHighInverse: palette.movistarGreen70,
            warningHighInverse: palette.egg80,
            errorHighInverse: palette.pepper70,
            promoHighInverse: palette.purple70,
            neutralMediumInverse: palette.grey5,
        },
        textPresets: {
            text5: {weight: 'bold'},
            text6: {weight: 'bold'},
            text7: {weight: 'bold'},
            text8: {weight: 'bold'},
            text9: {weight: 'bold'},
            text10: {weight: 'bold'},
            cardTitle: {weight: 'bold'},
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
