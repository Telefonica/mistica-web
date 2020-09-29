import {applyAlpha} from '../utils/color';

import type {GetSkin} from './types';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const GREY_0 = '#000033';
const GREY_1 = '#707070';
const GREY_2 = '#999999';
const GREY_3 = '#DDDDDD';
const GREY_4 = '#EEEEEE';
const GREY_5 = '#F6F6F6';
const O2_BLUE_PRIMARY = '#0019A5';
const O2_BLUE_PRIMARY_DARK = '#000066';
const O2_BLUE_PRIMARY_LIGHT_60 = '#6C8BAF';
const O2_BLUE_PRIMARY_LIGHT_10 = '#CCD1ED';
// const O2_BLUE_MID = '#007BB2'; // unused
const O2_BLUE_MID_DARK = '#006795';
const O2_BLUE_LIGHT = '#41B6E6';
const O2_BLUE_LIGHT_60 = '#8DD3F0';
const O2_BLUE_LIGHT_30 = '#C6E9F7';
const O2_BLUE_LIGHT_10 = '#ECF7FC';
const O2_TEAL = '#01B7B4';
const O2_TEAL_DARK = '#099E9B';
// const O2_TEAL_LIGHT = '#B1E4E3'; // unused
const O2_GREEN = '#91C90E';
const O2_GREEN_LIGHT = '#DEEEB7';
const O2_YELLOW = '#FEDB00';
const O2_YELLOW_LIGHT = '#FEF6C3';
const PEPPER = '#FF374A';
const PEPPER_DARK = '#D73241';
const PEPPER_LIGHT = '#FFC3C8';
const O2_PINK = '#CB31A0';
const O2_PURPLE = '#953698';
const O2_ORANGE = '#FF7F41';
// const O2_ORANGE_LIGHT = '#FFD6C2'; // unused
const O2_CORAL = '#FF706E';
// const O2_LAST_GRADIENT_COLOR = '#449ed0'; // unused

export const getO2Skin: GetSkin = () => {
    const accent = O2_TEAL;
    const controlActive = O2_BLUE_PRIMARY;
    const textLink = O2_BLUE_PRIMARY;
    const background = WHITE;
    const primaryDark = O2_BLUE_PRIMARY_DARK;

    return {
        colors: {
            // LAYOUT
            primary: O2_BLUE_PRIMARY,
            backgroundBrand: O2_BLUE_PRIMARY,
            backgroundBrandVariation: O2_BLUE_PRIMARY,
            backgroundSpecial0: WHITE,
            backgroundSpecial1: O2_BLUE_PRIMARY,
            primaryDark,
            accent,
            divider: GREY_4,
            dividerSpecial0: O2_BLUE_PRIMARY,
            dividerSpecial1: O2_BLUE_PRIMARY_LIGHT_60,

            background,
            backgroundPromo: O2_PURPLE,
            backgroundDark: GREY_0,
            backgroundAlternative: GREY_5,
            backgroundSelectedDark: WHITE,
            backgroundUnselectedDark: applyAlpha(WHITE, 0.2),
            backgroundAccent: O2_BLUE_PRIMARY,
            backgroundHeading: O2_BLUE_PRIMARY,
            backgroundSpecial: O2_BLUE_PRIMARY,
            layerDecorations: BLACK,
            backgroundSkeleton: GREY_5,
            backgroundSkeletonDark: `linear-gradient(to right, ${applyAlpha(WHITE, 0.1)}, ${applyAlpha(
                WHITE,
                0.2
            )})`,
            backgroundOpacity: applyAlpha(GREY_0, 0.6),
            backgroundLoyalty: O2_BLUE_PRIMARY,
            overscrollColorTop: O2_BLUE_PRIMARY,
            backgroundSpecialBottom: O2_BLUE_PRIMARY,
            gridButtonSpecial1Hover: O2_BLUE_LIGHT,

            backgroundSheetBarTop: WHITE,
            backgroundSheetBarTopSpecial: O2_BLUE_PRIMARY,
            icnSheetBarTop: GREY_3,
            icnSheetBarTopSpecial: O2_BLUE_PRIMARY_LIGHT_60,

            // BORDERS
            border: GREY_3,
            borderSelected: O2_BLUE_PRIMARY,
            borderDark: GREY_1,
            borderLight: GREY_5,
            borderAlternative: WHITE,
            borderSpecial0: WHITE,

            // TABS
            tabSelected: O2_BLUE_PRIMARY,

            // ITEM
            itemActive: GREY_5,
            itemHover: GREY_4,

            // TEXT
            textAccent: O2_TEAL,
            textPrimary: GREY_0,
            textPrimarySpecial: WHITE,
            textPrimaryInverse: WHITE,
            textSecondary: GREY_1,
            textSecondaryDark: GREY_2,
            textGroupTitleList: GREY_0,
            textHint: GREY_1,
            textLink,
            textLinkSnackbar: O2_BLUE_LIGHT,
            textClickable: textLink,
            textError: PEPPER,
            textHighlight: O2_PINK,
            textLabel: O2_TEAL,
            textInactive: GREY_3,
            textInactiveInverse: O2_BLUE_LIGHT_60,
            textWarning: O2_ORANGE,
            textDanger: O2_PINK,

            // NAVBAR
            textNavbarHover: O2_BLUE_LIGHT_30,
            navbarBackground: O2_BLUE_PRIMARY,
            navbarControl: O2_BLUE_LIGHT_30,
            navbarDivider: O2_BLUE_PRIMARY,

            // APPBAR (MOBILE MAIN TABS)
            textAppbar: GREY_2,
            textAppbarSelected: O2_BLUE_PRIMARY,

            // TAG
            tagBackgroundFirst: O2_GREEN,
            tagBackgroundSecond: GREY_3,
            tagBackgroundThird: O2_BLUE_PRIMARY,
            tagBackgroundFourth: O2_ORANGE,
            tagBackgroundFifth: O2_BLUE_PRIMARY_DARK,
            tagBackgroundSixth: O2_PURPLE,
            tagBackgroundSeventh: O2_PINK,

            // ICON
            iconAccent: O2_TEAL,
            iconNavigationBar: WHITE,
            iconInverseDisable: applyAlpha(WHITE, 0.5),
            iconInactive: GREY_1,
            iconPrimary: GREY_0,
            iconSecondary: GREY_2,
            iconSecondarySpecial0: WHITE,
            iconTertiary: O2_BLUE_PRIMARY,
            iconInverse: WHITE,
            iconDisabled: GREY_3,
            iconDanger: PEPPER,
            iconPlaceholder: GREY_4,
            iconHeader: WHITE,
            iconHighlight: O2_PINK,

            // BUTTONS
            buttonPrimaryBackground: O2_BLUE_PRIMARY,
            buttonPrimaryBackgroundSelected: O2_BLUE_PRIMARY_DARK,
            buttonPrimaryBackgroundHover: O2_BLUE_PRIMARY_DARK,
            buttonPrimaryBackgroundDisabled: O2_BLUE_PRIMARY_LIGHT_10,
            buttonPrimaryText: WHITE,

            buttonPrimaryBackgroundInverse: WHITE,
            textButtonPrimaryInverse: O2_BLUE_PRIMARY,
            buttonPrimaryBackgroundInverseSelected: O2_BLUE_PRIMARY_LIGHT_60,
            textButtonPrimaryInverseSelected: O2_BLUE_PRIMARY_DARK,
            buttonPrimaryBackgroundInverseDisabled: O2_BLUE_PRIMARY_LIGHT_60,
            textButtonPrimaryInverseDisabled: O2_BLUE_PRIMARY_LIGHT_10,

            buttonSecondaryBackground: 'transparent',
            buttonSecondaryText: O2_BLUE_PRIMARY,
            buttonSecondaryTextSelected: O2_BLUE_PRIMARY_DARK,
            buttonSecondaryTextDisabled: O2_BLUE_PRIMARY_LIGHT_10,
            buttonSecondaryBorder: O2_BLUE_PRIMARY,
            buttonSecondaryBorderSelected: O2_BLUE_PRIMARY_DARK,
            buttonSecondaryBorderDisabled: O2_BLUE_PRIMARY_LIGHT_10,

            buttonSecondaryBorderInverse: WHITE,
            textButtonSecondaryInverse: WHITE,
            buttonSecondaryBorderInverseSelected: O2_BLUE_PRIMARY_LIGHT_60,
            textButtonSecondaryInverseSelected: WHITE,
            buttonSecondaryBorderInverseDisabled: O2_BLUE_PRIMARY_LIGHT_60,
            textButtonSecondaryInverseDisabled: O2_BLUE_PRIMARY_LIGHT_60,

            buttonTertiaryBackground: GREY_4,

            buttonDangerBackground: PEPPER,
            buttonDangerBackgroundSelected: PEPPER_DARK,
            buttonDangerBackgroundHover: PEPPER_DARK,
            buttonDangerBackgroundDisabled: PEPPER_LIGHT,

            buttonLinkBackgroundSelected: O2_BLUE_LIGHT_10,

            // FEEDBACKS
            feedbackSuccessBackground: O2_GREEN,
            feedbackSystemBackground: O2_ORANGE,
            feedbackInfoBackground: GREY_0,
            feedbackErrorBackground: PEPPER,
            feedbackPermanentBorder: O2_TEAL,

            // FORM CONTROLS - https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a1c72d1e466439c72f
            controlInactive: GREY_3,
            controlActive,
            controlError: PEPPER,
            controlHover: GREY_1,

            controlSpecial0Active: WHITE,
            controlSpecial0Inactive: applyAlpha(WHITE, 0.3),
            controlInverseActive: WHITE,
            controlInverseInactive: applyAlpha(WHITE, 0.3),

            // TOGGLE
            toggleAndroidInactive: GREY_4,
            toggleAndroidBackgroundInactive: GREY_3,
            toggleAndroidActive: controlActive,
            toggleAndroidBackgroundActive: '#CCD1ED',
            toggleIosInactive: WHITE,
            toggleIosBackgroundInactive: GREY_3,
            toggleIosBackgroundActive: O2_BLUE_PRIMARY,

            // CHARTS -- TBD
            progressChart0: O2_GREEN,
            progressChart1: O2_GREEN,
            progressChart2: O2_GREEN_LIGHT,
            progressChart3: O2_YELLOW,
            progressChart4: O2_YELLOW_LIGHT,
            progressChart5: O2_CORAL,
            progressChart6: O2_BLUE_LIGHT,
            progressChart7: O2_CORAL,

            chartSecondaryLight: O2_BLUE_LIGHT,
            chartSecondaryDark: O2_BLUE_MID_DARK,
            chartTertiaryLight: GREY_4,
            chartTertiaryDark: applyAlpha(WHITE, 0.2),
            chartSpecialDark: O2_ORANGE,

            barChartInactive: GREY_3,
            barChartInactiveDark: O2_BLUE_PRIMARY_LIGHT_60,
            barChartActive: O2_BLUE_PRIMARY,
            barChartActiveDark: WHITE,
            chartLabelInactive: GREY_3,
            chartLabelInactiveDark: O2_BLUE_PRIMARY_LIGHT_60,
            chartLabelActive: GREY_1,
            chartLabelActiveDark: background,

            barChart0: O2_BLUE_PRIMARY,
            barChart1: O2_BLUE_PRIMARY,
            barChart2: O2_BLUE_PRIMARY,
            barChart3: O2_PINK,
            barChart4: O2_BLUE_PRIMARY,

            branch: GREY_4,
            chartBackground: GREY_4,
            chartBackgroundTooltip: GREY_4,
            chartBackgroundSpecial0: applyAlpha(WHITE, 0.2),
            chartTextAmount: O2_BLUE_PRIMARY,

            stakedBarChart0: O2_BLUE_PRIMARY,
            stakedBarChart1: O2_BLUE_LIGHT,
            stakedBarChart2: O2_TEAL_DARK,
            stakedBarChart3: O2_ORANGE,
            stakedBarChart4: O2_PINK,
            stakedBarChart5: O2_YELLOW,
            stakedBarChart6: O2_GREEN,

            // PROGRESS BAR
            progressbarBackgroundDark: GREY_5,
            progressbarInner: O2_BLUE_PRIMARY,

            // MAIN NAVIGATION
            mainNavPrimary: primaryDark,
            mainNavPrimaryHome: O2_BLUE_PRIMARY,
            navigationBarBackground: O2_BLUE_PRIMARY,
            mainNavNotification: O2_TEAL,
            mainNavItemInactive: O2_BLUE_PRIMARY_LIGHT_60,
            mainNavItemActive: WHITE,

            // SECONDARY NAVIGATION TABLET AND MOBILE
            navtabIosBackground: WHITE,
            navtabIosBorder: O2_BLUE_PRIMARY,
            navtabIosActiveTabBackground: O2_BLUE_PRIMARY,
            navtabAndroidBackground: GREY_5,
            navtabAndroidActiveTabBackground: GREY_5,
            navtabAndroidActiveTabBorder: accent,
            navtabPrimaryText: GREY_0,
            navtabIosActiveText: WHITE,
            navtabIosInactiveText: O2_BLUE_PRIMARY,
            navtabAndroidActiveText: O2_BLUE_PRIMARY,
            navtabAndroidInactiveText: GREY_1,

            // BUBBLES
            bubbleFromMeBackground: GREY_5,
            bubbleFromOthersBackground: O2_BLUE_LIGHT_30,
            bubbleText: GREY_0,

            // AUDIO WAVES
            wavePlayerSound: GREY_3,
            wavePlayerSoundFilled: O2_BLUE_LIGHT_60,

            // ALERTS
            backgroundTransactionalAlert: O2_BLUE_PRIMARY,

            // SHADOWS
            containerShadow: PEPPER,

            // PROGRESS INDICATOR
            loadingBarPrimary: O2_BLUE_PRIMARY,
            loadingBarBackground: GREY_5,
            loadingBarPrimaryInverse: O2_BLUE_PRIMARY,
            loadingBarBackgroundInverse: GREY_5,

            // BADGE
            badgeBackground: PEPPER_DARK,
        },
    };
};
