import {applyAlpha} from '../utils/color';
import {O2_SKIN} from './constants';

import type {GetSkin} from './types';

export const palette = {
    o2BluePrimary: '#0019A5',
    o2BluePrimaryDark: '#000066',
    o2BluePrimaryLight50: '#808CD2',
    o2BluePrimaryLight10: '#CCD1ED',
    o2BlueMid: '#007BB2',
    o2BlueMidDark: '#006795',
    o2BlueLight: '#41B6E6',
    o2BlueLight60: '#8DD3F0',
    o2BlueLight30: '#C6E9F7',
    o2BlueLight10: '#ECF7FC',
    o2Teal: '#01B7B4',
    o2TealDark: '#099E9B',
    o2TealLight: '#B1E4E3',
    o2Green: '#91C90E',
    o2GreenLight: '#DEEEB7',
    o2Yellow: '#FEDB00',
    o2YellowLight: '#FEF6C3',
    o2Orange: '#FF7F41',
    o2OrangeLight: '#FFD6C2',
    o2Coral: '#FF706E',
    o2Pink: '#CB31A0',
    o2Purple: '#953698',
    pepper: '#FF374A',
    pepperDark: '#D73241',
    pepperLight30: '#FFC3C8',
    grey1: '#F6F6F6',
    grey2: '#EEEEEE',
    grey3: '#DDDDDD',
    grey4: '#999999',
    grey5: '#707070',
    grey6: '#000033',
    white: '#FFFFFF',
};

export const getO2Skin: GetSkin = () => {
    return {
        name: O2_SKIN,
        colors: {
            // BACKGROUNDS
            appBarBackground: palette.white,
            background: palette.white,
            backgroundBrand: palette.o2BluePrimary,
            backgroundOverlay: applyAlpha(palette.grey6, 0.6),
            backgroundSkeleton: palette.grey1,
            backgroundSkeletonInverse: applyAlpha(palette.white, 0.2),
            navigationBarBackground: palette.o2BluePrimary,
            navigationSearchBarBackground: palette.o2BluePrimaryDark,
            backgroundAlternative: palette.grey1,
            backgroundFeedbackBottom: palette.o2BluePrimary,

            // BORDERS
            borderLight: palette.grey1,
            border: palette.grey3,
            borderDark: palette.grey5,
            borderSelected: palette.o2BluePrimary,

            // BUTTONS
            buttonDangerBackground: palette.pepper,
            buttonDangerBackgroundDisabled: palette.pepperLight30,
            buttonDangerBackgroundSelected: palette.pepperDark,
            buttonDangerBackgroundHover: palette.pepperDark,
            buttonLinkBackgroundSelected: palette.o2BluePrimaryLight10,
            buttonPrimaryBackground: palette.o2BluePrimary,
            buttonPrimaryBackgroundDisabled: palette.o2BluePrimaryLight10,
            buttonPrimaryBackgroundDisabledInverse: palette.o2BluePrimaryLight50,
            buttonPrimaryBackgroundInverse: palette.white,
            buttonPrimaryBackgroundSelected: palette.o2BluePrimaryDark,
            buttonPrimaryBackgroundHover: palette.o2BluePrimaryDark,
            buttonPrimaryBackgroundSelectedInverse: palette.o2BluePrimaryLight50,
            buttonSecondaryBackground: palette.o2BluePrimary,
            buttonSecondaryBackgroundDisabled: palette.o2BluePrimaryLight10,
            buttonSecondaryBackgroundSelected: palette.o2BluePrimaryDark,
            buttonSecondaryBorderDisabledInverse: palette.o2BluePrimaryLight50,
            buttonSecondaryBorderInverse: palette.white,
            buttonSecondaryBorderSelectedInverse: palette.o2BluePrimaryLight50,

            textButtonPrimary: palette.white,
            textButtonPrimaryInverse: palette.o2BluePrimary,
            textButtonPrimaryInverseDisabled: palette.o2BluePrimaryLight10,
            textButtonPrimaryInverseSelected: palette.o2BluePrimaryDark, // iOS & Web
            textButtonPrimaryInversePressed: palette.o2BluePrimaryDark, // Android
            textButtonSecondary: palette.o2BluePrimary,
            textButtonSecondaryDisabled: palette.o2BluePrimaryLight10,
            textButtonSecondarySelected: palette.o2BluePrimaryDark, // iOS & Web
            textButtonSecondaryPressed: palette.o2BluePrimaryDark, // Android
            textButtonSecondaryInverse: palette.white,
            textButtonSecondaryInverseDisabled: palette.o2BluePrimaryLight50,
            textButtonSecondaryInverseSelected: palette.white, // iOS & Web
            textButtonSecondaryInversePressed: palette.white, // Android
            textLink: palette.o2BluePrimary,
            textLinkDanger: palette.pepper,
            textLinkDangerDisabled: palette.pepperLight30,
            textLinkDisabled: palette.o2BluePrimaryLight50,
            textLinkSnackbar: palette.o2BluePrimaryLight50,

            // CONTROLS
            control: palette.grey3,
            controlActivated: palette.o2BluePrimary,
            controlError: palette.pepper,
            loadingBar: palette.o2BluePrimary,
            loadingBarBackground: palette.grey1,
            loadingBarBackgroundInverse: palette.grey1,
            loadingBarInverse: palette.o2BluePrimary,

            toggleAndroidInactive: palette.grey2, // solo web
            toggleAndroidBackgroundActive: '#CCD1ED', // solo web
            toggleIosInactive: palette.white, // solo web

            // DIVIDERS
            divider: palette.grey2,
            navigationBarDivider: palette.o2BluePrimary,

            // FEEDBACKS
            badge: palette.pepperDark,
            feedbackErrorBackground: palette.pepper,
            feedbackInfoBackground: palette.grey6,

            // GLOBAL
            brand: palette.o2BluePrimary, // antes iconBrand
            inverse: palette.white, // antes iconInverse
            neutralHigh: palette.grey6, // antes iconPrimary
            neutralLow: palette.grey3, // antes iconDisabled
            neutralMedium: palette.grey5, // antes iconSecondary
            promo: palette.o2Purple, // antes backgroundPromo
            highlight: palette.o2Pink,

            textPrimary: palette.grey6,
            textPrimaryInverse: palette.white,
            textSecondary: palette.grey5,
            textSecondaryInverse: palette.o2BlueLight,
            textDisabled: palette.grey3,
            textAmount: palette.o2BluePrimary,

            // STATES
            error: palette.pepper, // antes iconError
            success: palette.o2Teal, // antes iconSuccess
            warning: palette.o2Orange, // antes iconWarning

            // BARS TEXTS
            textNavigationBarPrimary: palette.white,
            textNavigationBarSecondary: palette.o2BluePrimaryLight50,
            textNavigationSearchBarHint: palette.o2BluePrimaryLight50, // solo en iOS
            textNavigationSearchBarText: palette.white, // solo en iOS
            textAppBar: palette.grey4,
            textAppBarSelected: palette.o2BluePrimary,
        },
    };
};
