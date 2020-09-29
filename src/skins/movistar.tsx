import {applyAlpha} from '../utils/color';

import type {GetSkin} from './types';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const GREY_0 = '#313235';
const GREY_1 = '#86888C';
const GREY_2 = '#999999';
const GREY_3 = '#DDDDDD';
const GREY_4 = '#EEEEEE';
const GREY_5 = '#F6F6F6';
const MOVISTAR_BLUE = '#019DF4';
const MOVISTAR_BLUE_DARK = '#008EDD';
const MOVISTAR_BLUE_LIGHT_50 = '#80CEF9';
const MOVISTAR_BLUE_LIGHT_60 = '#65C3F8';
// const MOVISTAR_BLUE_LIGHT_60_P = '#D8F0FD'; // unused
const MOVISTAR_BLUE_LIGHT_30 = '#B3E1FB';
// const MOVISTAR_BLUE_LIGHT_30_P = '#ECF7FE'; // unused
const MOVISTAR_GREEN = '#5CB615';
const MOVISTAR_GREEN_DARK = '#499110';
const MOVISTAR_GREEN_LIGHT_50 = '#ADDA8A';
const MOVISTAR_GREEN_LIGHT_30 = '#CEE9B9';
const PEPPER = '#FF374A';
const PEPPER_LIGHT = '#FFC3C8';
const PEPPER_DARK = '#D73241';
const PINK = '#E63780';
const PURPLE = '#A13EA1';
const EGG = '#F28D15';
const EGG_LIGHT = '#F8D2B3';
const MOVISTAR_PRIORITY = '#0B2739';

// MOVISTAR PROMINENT PALETTE
const MOVISTAR_PROMINENT_BLUE = '#0B2739';
const MOVISTAR_PROMINENT_BLUE_DARK = '#081F2D';
const MOVISTAR_PROMINENT_BLUE_LIGHT_70 = '#546874';
const MOVISTAR_PROMINENT_BLUE_LIGHT_50 = '#85939C';
const MOVISTAR_PROMINENT_BLUE_LIGHT_20 = '#CED3D7';

export const getMovistarSkin: GetSkin = (variant) => {
    const textLink = MOVISTAR_BLUE;
    const accent = MOVISTAR_GREEN;
    const controlActive = MOVISTAR_BLUE;
    const background = WHITE;
    const primaryDark = MOVISTAR_BLUE_DARK;

    const skin = {
        colors: {
            // LAYOUT
            primary: MOVISTAR_BLUE,
            backgroundBrand: MOVISTAR_BLUE,
            backgroundBrandVariation: MOVISTAR_BLUE,
            backgroundSpecial0: WHITE,
            backgroundSpecial1: MOVISTAR_BLUE,
            primaryDark,
            accent,
            divider: GREY_4,
            dividerSpecial0: GREY_4,
            dividerSpecial1: MOVISTAR_BLUE_LIGHT_60,

            background: WHITE,
            backgroundPromo: PURPLE,
            backgroundDark: GREY_0,
            backgroundAlternative: GREY_5,
            backgroundSelectedDark: WHITE,
            backgroundUnselectedDark: MOVISTAR_BLUE_LIGHT_30,
            backgroundAccent: MOVISTAR_BLUE,
            backgroundHeading: MOVISTAR_BLUE,
            layerDecorations: BLACK,
            backgroundSkeleton: GREY_5,
            backgroundSkeletonDark: applyAlpha(MOVISTAR_BLUE_DARK, 0.5),
            backgroundOpacity: applyAlpha(GREY_0, 0.6),
            backgroundLoyalty: MOVISTAR_PRIORITY,
            backgroundSpecial: MOVISTAR_BLUE,
            overscrollColorTop: MOVISTAR_BLUE,
            backgroundSpecialBottom: MOVISTAR_BLUE,
            gridButtonSpecial1Hover: MOVISTAR_BLUE_LIGHT_60,

            backgroundSheetBarTop: WHITE,
            backgroundSheetBarTopSpecial: MOVISTAR_BLUE,
            icnSheetBarTop: GREY_3,
            icnSheetBarTopSpecial: MOVISTAR_BLUE_LIGHT_30,

            // BORDERS
            border: GREY_3,
            borderSelected: MOVISTAR_GREEN,
            borderDark: GREY_1,
            borderLight: GREY_5,
            borderAlternative: WHITE,
            borderSpecial0: GREY_3,

            // TABS
            tabSelected: MOVISTAR_BLUE,

            // ITEM
            itemActive: GREY_5,
            itemHover: GREY_4,

            // TEXT
            textAccent: MOVISTAR_GREEN,
            textPrimary: GREY_0,
            textPrimarySpecial: WHITE,
            textPrimaryInverse: WHITE,
            textSecondary: GREY_1,
            textSecondaryDark: GREY_2,
            textGroupTitleList: GREY_0,
            textHint: GREY_1,
            textLink,
            textLinkSnackbar: MOVISTAR_BLUE_LIGHT_60,
            textClickable: textLink,
            textError: PEPPER,
            textHighlight: PINK,
            textLabel: MOVISTAR_GREEN,
            textInactive: GREY_3,
            textInactiveInverse: MOVISTAR_BLUE_LIGHT_50,
            textWarning: EGG,
            textDanger: PINK,

            // NAVBAR
            textNavbarHover: MOVISTAR_BLUE,
            navbarBackground: WHITE,
            navbarControl: MOVISTAR_BLUE_DARK,
            navbarDivider: GREY_4,

            // APPBAR (MOBILE MAIN TABS)
            textAppbar: GREY_2,
            textAppbarSelected: MOVISTAR_BLUE,

            // TAG
            tagBackgroundFirst: MOVISTAR_GREEN,
            tagBackgroundSecond: GREY_3,
            tagBackgroundThird: MOVISTAR_BLUE,
            tagBackgroundFourth: EGG,
            tagBackgroundFifth: MOVISTAR_BLUE_DARK,
            tagBackgroundSixth: PURPLE,
            tagBackgroundSeventh: PINK,

            // ICON
            iconAccent: MOVISTAR_GREEN,
            iconNavigationBar: WHITE,
            iconInverseDisable: applyAlpha(WHITE, 0.5),
            iconInactive: GREY_1,
            iconPrimary: GREY_0,
            iconSecondary: GREY_2,
            iconSecondarySpecial0: GREY_2,
            iconTertiary: MOVISTAR_BLUE,
            iconInverse: WHITE,
            iconDisabled: GREY_3,
            iconDanger: PEPPER,
            iconPlaceholder: GREY_4,
            iconHeader: GREY_3,
            iconHighlight: PINK,

            // BUTTONS
            buttonPrimaryBackground: MOVISTAR_GREEN,
            buttonPrimaryBackgroundSelected: MOVISTAR_GREEN_DARK,
            buttonPrimaryBackgroundHover: MOVISTAR_GREEN_DARK,
            buttonPrimaryBackgroundDisabled: MOVISTAR_GREEN_LIGHT_50,
            buttonPrimaryText: WHITE,

            buttonPrimaryBackgroundInverse: WHITE,
            textButtonPrimaryInverse: MOVISTAR_BLUE,
            buttonPrimaryBackgroundInverseSelected: MOVISTAR_BLUE_LIGHT_60,
            textButtonPrimaryInverseSelected: MOVISTAR_BLUE,
            buttonPrimaryBackgroundInverseDisabled: MOVISTAR_BLUE_LIGHT_60,
            textButtonPrimaryInverseDisabled: MOVISTAR_BLUE_LIGHT_30,

            buttonSecondaryBackground: 'transparent',
            buttonSecondaryText: MOVISTAR_GREEN,
            buttonSecondaryTextSelected: MOVISTAR_GREEN_DARK,
            buttonSecondaryTextDisabled: MOVISTAR_GREEN_LIGHT_50,
            buttonSecondaryBorder: MOVISTAR_GREEN,
            buttonSecondaryBorderSelected: MOVISTAR_GREEN_DARK,
            buttonSecondaryBorderDisabled: MOVISTAR_GREEN_LIGHT_50,

            buttonSecondaryBorderInverse: WHITE,
            textButtonSecondaryInverse: WHITE,
            buttonSecondaryBorderInverseSelected: MOVISTAR_BLUE_LIGHT_60,
            textButtonSecondaryInverseSelected: WHITE,
            buttonSecondaryBorderInverseDisabled: MOVISTAR_BLUE_LIGHT_60,
            textButtonSecondaryInverseDisabled: MOVISTAR_BLUE_LIGHT_50,

            buttonTertiaryBackground: GREY_4,

            buttonDangerBackground: PEPPER,
            buttonDangerBackgroundSelected: PEPPER_DARK,
            buttonDangerBackgroundHover: PEPPER_DARK,
            buttonDangerBackgroundDisabled: PEPPER_LIGHT,

            buttonLinkBackgroundSelected: '#e5f6fb', // No palette constant

            // AVATAR BUTTONS

            // FEEDBACKS
            feedbackSuccessBackground: MOVISTAR_GREEN_DARK,
            feedbackSystemBackground: GREY_1,
            feedbackInfoBackground: GREY_0,
            feedbackErrorBackground: PEPPER,
            feedbackPermanentBorder: EGG,

            // FORM CONTROLS - https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a14b2e4246345bc2a6
            controlInactive: GREY_3,
            controlActive,
            controlError: PEPPER,
            controlHover: GREY_1,

            controlSpecial0Active: MOVISTAR_BLUE,
            controlSpecial0Inactive: GREY_3,
            controlInverseActive: WHITE,
            controlInverseInactive: applyAlpha(WHITE, 0.3),

            // TOGGLE
            toggleAndroidInactive: GREY_4,
            toggleAndroidBackgroundInactive: GREY_3,
            toggleAndroidActive: controlActive,
            toggleAndroidBackgroundActive: MOVISTAR_BLUE_LIGHT_30,
            toggleIosInactive: WHITE,
            toggleIosBackgroundInactive: GREY_3,
            toggleIosBackgroundActive: MOVISTAR_BLUE,

            // CHARTS
            progressChart0: MOVISTAR_GREEN,
            progressChart1: MOVISTAR_GREEN_DARK,
            progressChart2: MOVISTAR_GREEN_LIGHT_50,
            progressChart3: EGG,
            progressChart4: EGG_LIGHT,
            progressChart5: PINK,
            progressChart6: MOVISTAR_GREEN_LIGHT_50,
            progressChart7: PINK,

            chartSecondaryLight: MOVISTAR_BLUE_LIGHT_30,
            chartSecondaryDark: MOVISTAR_BLUE,
            chartTertiaryLight: GREY_4,
            chartTertiaryDark: GREY_3,
            chartSpecialDark: EGG,

            barChartInactive: GREY_3,
            barChartInactiveDark: MOVISTAR_BLUE_LIGHT_60,
            barChartActive: MOVISTAR_BLUE,
            barChartActiveDark: WHITE,
            chartLabelInactive: GREY_3,
            chartLabelInactiveDark: MOVISTAR_BLUE_LIGHT_50,
            chartLabelActive: GREY_1,
            chartLabelActiveDark: background,

            barChart0: MOVISTAR_BLUE,
            barChart1: MOVISTAR_GREEN,
            barChart2: EGG,
            barChart3: PINK,
            barChart4: PURPLE,

            branch: GREY_4,
            chartBackground: GREY_4,
            chartBackgroundTooltip: GREY_4,
            chartBackgroundSpecial0: GREY_4,
            chartTextAmount: MOVISTAR_BLUE,

            stakedBarChart0: MOVISTAR_BLUE,
            stakedBarChart1: MOVISTAR_BLUE_LIGHT_50,
            stakedBarChart2: MOVISTAR_GREEN_DARK,
            stakedBarChart3: EGG,
            stakedBarChart4: PURPLE,
            stakedBarChart5: PINK,
            stakedBarChart6: MOVISTAR_GREEN_LIGHT_50,

            // PROGRESS BAR
            progressbarBackgroundDark: GREY_2,
            progressbarInner: accent,

            // MAIN NAVIGATION
            mainNavPrimary: primaryDark,
            mainNavPrimaryHome: MOVISTAR_BLUE,
            navigationBarBackground: MOVISTAR_BLUE,
            mainNavNotification: WHITE,
            mainNavItemInactive: MOVISTAR_BLUE_LIGHT_50,
            mainNavItemActive: WHITE,

            // SECONDARY NAVIGATION TABLET AND MOBILE
            navtabIosBackground: WHITE,
            navtabIosBorder: MOVISTAR_BLUE,
            navtabIosActiveTabBackground: MOVISTAR_BLUE,
            navtabAndroidBackground: GREY_5,
            navtabAndroidActiveTabBackground: GREY_5,
            navtabAndroidActiveTabBorder: accent,
            navtabPrimaryText: GREY_0,
            navtabIosActiveText: WHITE,
            navtabIosInactiveText: MOVISTAR_BLUE,
            navtabAndroidActiveText: GREY_0,
            navtabAndroidInactiveText: GREY_1,

            // BUBBLES
            bubbleFromMeBackground: GREY_4,
            bubbleFromOthersBackground: MOVISTAR_GREEN_LIGHT_30,
            bubbleText: '#191919',

            // AUDIO WAVES
            wavePlayerSound: GREY_3,
            wavePlayerSoundFilled: MOVISTAR_BLUE_LIGHT_50,

            // ALERTS
            backgroundTransactionalAlert: MOVISTAR_BLUE,

            // SHADOWS
            containerShadow: GREY_0,

            // PROGRESS INDICATOR
            loadingBarPrimary: MOVISTAR_GREEN,
            loadingBarBackground: MOVISTAR_GREEN_LIGHT_50,
            loadingBarPrimaryInverse: MOVISTAR_BLUE_LIGHT_60,
            loadingBarBackgroundInverse: MOVISTAR_BLUE_DARK,

            // BADGE
            badgeBackground: PEPPER_DARK,
        },
    };

    if (variant === 'prominent') {
        skin.colors.primary = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundBrand = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundSpecial1 = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundBrandVariation = MOVISTAR_PROMINENT_BLUE;
        skin.colors.primaryDark = MOVISTAR_PROMINENT_BLUE_DARK;
        skin.colors.backgroundHeading = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundUnselectedDark = MOVISTAR_PROMINENT_BLUE_LIGHT_20;
        skin.colors.overscrollColorTop = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundSpecialBottom = MOVISTAR_PROMINENT_BLUE;
        skin.colors.backgroundAccent = MOVISTAR_PROMINENT_BLUE;
        skin.colors.dividerSpecial1 = MOVISTAR_PROMINENT_BLUE_LIGHT_70;

        // FORM CONTROLS
        skin.colors.controlActive = MOVISTAR_PROMINENT_BLUE;

        // CHARTS
        skin.colors.barChartInactiveDark = MOVISTAR_PROMINENT_BLUE_LIGHT_70;
        skin.colors.chartLabelInactiveDark = MOVISTAR_PROMINENT_BLUE_LIGHT_50;
        skin.colors.barChartActive = MOVISTAR_PROMINENT_BLUE;
        skin.colors.chartTextAmount = MOVISTAR_PROMINENT_BLUE;
        skin.colors.barChart0 = MOVISTAR_PROMINENT_BLUE;

        // MAIN NAVIGATION
        skin.colors.mainNavPrimary = MOVISTAR_PROMINENT_BLUE_DARK;
        skin.colors.mainNavPrimaryHome = MOVISTAR_PROMINENT_BLUE;
        skin.colors.navigationBarBackground = MOVISTAR_PROMINENT_BLUE;
        skin.colors.mainNavItemInactive = MOVISTAR_PROMINENT_BLUE_LIGHT_50;

        // ICON
        skin.colors.iconInverseDisable = MOVISTAR_PROMINENT_BLUE_LIGHT_50;
    }

    return skin;
};
