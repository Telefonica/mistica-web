import {applyAlpha} from '../utils/color';
import {O2_CLASSIC_SKIN} from './constants';

import type {GetSkin} from './types';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const GREY_0 = '#000033';
const GREY_1 = '#757575';
const GREY_2 = '#999999';
const GREY_3 = '#DDDDDD';
const GREY_4 = '#EEEEEE';
const GREY_5 = '#F6F6F6';
const COOL_GREY = '#000033';
const O2_BLUE = '#032B5A';
const O2_BLUE_DARK = '#04264E';
const O2_BLUE_LIGHT_60 = '#6C8BAF';
const O2_SKY_BLUE = '#0090D0';
const O2_SKY_BLUE_DARK = '#057DB2';
const O2_SKY_BLUE_LIGHT = '#65B4E4';
const O2_SKY_BLUE_LIGHT_60 = '#A3D2EF';
const O2_SKY_BLUE_LIGHT_30 = '#D0E8F6';
// const O2_DEEP_SKY_BLUE = '#7FD4EF'; // unused
const O2_GEM = '#01B7B4';
const O2_GEM_DARK = '#099E9B';
const O2_GEM_LIGHT_30 = '#99E2E1';
const O2_GREEN = '#84B50F';
const O2_GREEN_LIGHT = '#DAE8B7';
const O2_YELLOW = '#FFCC00';
const O2_YELLOW_LIGHT = '#FFF3C1';
const PEPPER = '#FF374A';
const PEPPER_DARK = '#D73241';
const PEPPER_LIGHT = '#FFC3C8';
const PINK = '#EB3C7D';
const ORANGE = '#FF7F41';
// const ORANGE_LIGHT = '#FFE0B2'; // unused
const CORAL = '#FF706E';
const O2_LAST_GRADIENT_COLOR = '#449ed0';

export const getO2ClassicSkin: GetSkin = () => {
    const accent = O2_GEM;
    const textLink = O2_SKY_BLUE;
    const primaryDark = O2_BLUE_DARK;
    const controlActive = O2_GEM;
    const background = WHITE;

    return {
        name: O2_CLASSIC_SKIN,
        colors: {
            // LAYOUT
            primary: O2_BLUE,
            backgroundBrand: `linear-gradient(to bottom, ${O2_BLUE}, #0b4680 51%, #0d71ad 72%, ${O2_LAST_GRADIENT_COLOR})`,
            backgroundBrandVariation: `linear-gradient(115deg, ${O2_BLUE}, #0b4680 50%, #0d71ad 84%, ${O2_LAST_GRADIENT_COLOR})`,
            backgroundSpecial0: `linear-gradient(to bottom, ${O2_BLUE}, #0b4680 51%, #0d71ad 72%, ${O2_LAST_GRADIENT_COLOR})`,
            backgroundSpecial1: `linear-gradient(to bottom, ${O2_BLUE}, #0b4680 51%, #0d71ad 72%, ${O2_LAST_GRADIENT_COLOR})`,
            primaryDark,
            accent,
            divider: GREY_4,
            dividerSpecial0: O2_BLUE,
            dividerSpecial1: O2_BLUE_LIGHT_60,

            background,
            backgroundPromo: PINK,
            backgroundDark: GREY_0,
            backgroundAlternative: GREY_5,
            backgroundSelectedDark: WHITE,
            backgroundUnselectedDark: applyAlpha(WHITE, 0.2),
            backgroundAccent: O2_BLUE,
            backgroundHeading: `linear-gradient(to bottom, ${O2_BLUE}, #0b4680 51%, #0d71ad 72%, ${O2_LAST_GRADIENT_COLOR})`,
            backgroundSpecial: `linear-gradient(to bottom, ${O2_BLUE}, #0b4680 51%, #0d71ad 72%, ${O2_LAST_GRADIENT_COLOR})`,
            layerDecorations: BLACK,
            backgroundSkeleton: GREY_5,
            backgroundSkeletonDark: `linear-gradient(to right, ${applyAlpha(WHITE, 0.1)}, ${applyAlpha(
                WHITE,
                0.2
            )})`,
            backgroundOpacity: applyAlpha(GREY_0, 0.6),
            backgroundLoyalty: O2_BLUE,
            overscrollColorTop: O2_BLUE,
            backgroundSpecialBottom: O2_LAST_GRADIENT_COLOR,
            gridButtonSpecial1Hover: O2_SKY_BLUE_LIGHT,

            backgroundSheetBarTop: WHITE,
            backgroundSheetBarTopSpecial: O2_BLUE,
            icnSheetBarTop: GREY_3,
            icnSheetBarTopSpecial: O2_BLUE_LIGHT_60,

            // BORDERS
            border: GREY_3,
            borderSelected: O2_GEM,
            borderDark: GREY_1,
            borderLight: GREY_5,
            borderAlternative: WHITE,
            borderSpecial0: WHITE,

            // TABS
            tabSelected: O2_GEM,

            // ITEM
            itemActive: GREY_5,
            itemHover: GREY_4,

            // TEXT
            textAccent: O2_GEM,
            textPrimary: COOL_GREY,
            textPrimarySpecial: WHITE,
            textPrimaryInverse: WHITE,
            textSecondary: GREY_1,
            textSecondaryDark: GREY_2,
            textGroupTitleList: COOL_GREY,
            textHint: GREY_1,
            textLink,
            textLinkSnackbar: O2_SKY_BLUE_LIGHT,
            textClickable: textLink,
            textError: PEPPER,
            textHighlight: PINK,
            textLabel: O2_GEM,
            textInactive: GREY_3,
            textInactiveInverse: O2_SKY_BLUE_LIGHT_60,
            textWarning: ORANGE,
            textDanger: PINK,

            // NAVBAR
            textNavbarHover: O2_BLUE_LIGHT_60,
            navbarBackground: O2_BLUE,
            navbarControl: O2_SKY_BLUE_LIGHT_30,
            navbarDivider: O2_BLUE,

            // APPBAR (MOBILE MAIN TABS)
            textAppbar: GREY_2,
            textAppbarSelected: O2_BLUE,

            // TAG
            tagBackgroundFirst: O2_GREEN,
            tagBackgroundSecond: GREY_3,
            tagBackgroundThird: O2_BLUE,
            tagBackgroundFourth: ORANGE,
            tagBackgroundFifth: O2_BLUE_DARK,
            tagBackgroundSixth: O2_GEM,
            tagBackgroundSeventh: PINK,

            // ICON
            iconAccent: O2_GEM,
            iconNavigationBar: WHITE,
            iconInverseDisable: applyAlpha(WHITE, 0.5),
            iconInactive: GREY_1,
            iconPrimary: GREY_0,
            iconSecondary: GREY_2,
            iconSecondarySpecial0: WHITE,
            iconTertiary: O2_BLUE,
            iconInverse: WHITE,
            iconDisabled: GREY_3,
            iconDanger: PEPPER,
            iconPlaceholder: GREY_4,
            iconHeader: WHITE,
            iconHighlight: PINK,

            // BUTTONS
            buttonPrimaryBackground: O2_SKY_BLUE,
            buttonPrimaryBackgroundSelected: O2_SKY_BLUE_DARK,
            buttonPrimaryBackgroundHover: O2_SKY_BLUE_DARK,
            buttonPrimaryBackgroundDisabled: O2_SKY_BLUE_LIGHT_60,
            buttonPrimaryText: WHITE,

            buttonPrimaryBackgroundInverse: WHITE,
            textButtonPrimaryInverse: O2_SKY_BLUE,
            buttonPrimaryBackgroundInverseSelected: O2_SKY_BLUE_LIGHT_60,
            textButtonPrimaryInverseSelected: O2_SKY_BLUE,
            buttonPrimaryBackgroundInverseDisabled: O2_SKY_BLUE_LIGHT_60,
            textButtonPrimaryInverseDisabled: O2_SKY_BLUE_LIGHT_30,

            buttonSecondaryBackground: 'transparent',
            buttonSecondaryText: O2_SKY_BLUE,
            buttonSecondaryTextSelected: O2_SKY_BLUE_DARK,
            buttonSecondaryTextDisabled: O2_SKY_BLUE_LIGHT_60,
            buttonSecondaryBorder: O2_SKY_BLUE,
            buttonSecondaryBorderSelected: O2_SKY_BLUE_DARK,
            buttonSecondaryBorderDisabled: O2_SKY_BLUE_LIGHT_60,

            buttonSecondaryBorderInverse: WHITE,
            textButtonSecondaryInverse: WHITE,
            buttonSecondaryBorderInverseSelected: O2_SKY_BLUE_LIGHT_60,
            textButtonSecondaryInverseSelected: WHITE,
            buttonSecondaryBorderInverseDisabled: O2_SKY_BLUE_LIGHT_60,
            textButtonSecondaryInverseDisabled: O2_SKY_BLUE_LIGHT_60,

            buttonTertiaryBackground: GREY_4,

            buttonDangerBackground: PEPPER,
            buttonDangerBackgroundSelected: PEPPER_DARK,
            buttonDangerBackgroundHover: PEPPER_DARK,
            buttonDangerBackgroundDisabled: PEPPER_LIGHT,

            buttonLinkBackgroundSelected: '#e5f3fa', // No palette constant

            // FEEDBACKS
            feedbackSuccessBackground: O2_GREEN,
            feedbackSystemBackground: ORANGE,
            feedbackInfoBackground: GREY_0,
            feedbackErrorBackground: PEPPER,
            feedbackPermanentBorder: O2_GEM,

            // FORM CONTROLS - https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a1c72d1e466439c72f
            controlInactive: GREY_3,
            controlActive: O2_GEM,
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
            toggleAndroidBackgroundActive: O2_GEM_LIGHT_30,
            toggleIosInactive: WHITE,
            toggleIosBackgroundInactive: GREY_3,
            toggleIosBackgroundActive: O2_GEM,

            // CHARTS -- TBD
            progressChart0: O2_GREEN,
            progressChart1: O2_GREEN,
            progressChart2: O2_GREEN_LIGHT,
            progressChart3: O2_YELLOW,
            progressChart4: O2_YELLOW_LIGHT,
            progressChart5: CORAL,
            progressChart6: O2_SKY_BLUE_LIGHT,
            progressChart7: CORAL,

            chartSecondaryLight: O2_SKY_BLUE_LIGHT,
            chartSecondaryDark: O2_SKY_BLUE_DARK,
            chartTertiaryLight: GREY_4,
            chartTertiaryDark: applyAlpha(WHITE, 0.2),
            chartSpecialDark: ORANGE,

            barChartInactive: GREY_3,
            barChartInactiveDark: O2_SKY_BLUE_LIGHT_60,
            barChartActive: O2_SKY_BLUE,
            barChartActiveDark: WHITE,
            chartLabelInactive: GREY_3,
            chartLabelInactiveDark: O2_SKY_BLUE_LIGHT_60,
            chartLabelActive: GREY_1,
            chartLabelActiveDark: background,

            barChart0: O2_SKY_BLUE,
            barChart1: O2_SKY_BLUE,
            barChart2: O2_SKY_BLUE,
            barChart3: PINK,
            barChart4: O2_SKY_BLUE,

            branch: GREY_4,
            chartBackground: GREY_4,
            chartBackgroundTooltip: GREY_4,
            chartBackgroundSpecial0: applyAlpha(WHITE, 0.2),
            chartTextAmount: O2_SKY_BLUE,

            stakedBarChart0: O2_SKY_BLUE,
            stakedBarChart1: O2_SKY_BLUE_LIGHT_60,
            stakedBarChart2: O2_GEM_DARK,
            stakedBarChart3: ORANGE,
            stakedBarChart4: PINK,
            stakedBarChart5: O2_YELLOW,
            stakedBarChart6: ORANGE, // ORANGE_LIGHT does not exist in O

            // PROGRESS BAR
            progressbarBackgroundDark: GREY_2,
            progressbarInner: accent,

            // MAIN NAVIGATION
            mainNavPrimary: primaryDark,
            mainNavPrimaryHome: O2_BLUE,
            navigationBarBackground: O2_BLUE,
            mainNavNotification: O2_GEM,
            mainNavItemInactive: O2_BLUE_LIGHT_60,
            mainNavItemActive: WHITE,

            // SECONDARY NAVIGATION TABLET AND MOBILE
            navtabIosBackground: WHITE,
            navtabIosBorder: O2_BLUE,
            navtabIosActiveTabBackground: O2_BLUE,
            navtabAndroidBackground: GREY_5,
            navtabAndroidActiveTabBackground: GREY_5,
            navtabAndroidActiveTabBorder: accent,
            navtabPrimaryText: COOL_GREY,
            navtabIosActiveText: WHITE,
            navtabIosInactiveText: O2_BLUE,
            navtabAndroidActiveText: O2_BLUE,
            navtabAndroidInactiveText: GREY_1,

            // BUBBLES
            bubbleFromMeBackground: GREY_5,
            bubbleFromOthersBackground: O2_SKY_BLUE_LIGHT_30,
            bubbleText: '#191919',

            // AUDIO WAVES
            wavePlayerSound: GREY_3,
            wavePlayerSoundFilled: O2_SKY_BLUE_LIGHT_60,

            // ALERTS
            backgroundTransactionalAlert: `linear-gradient(${O2_BLUE}, ${O2_SKY_BLUE})`,

            // SHADOWS
            containerShadow: PEPPER,

            // PROGRESS INDICATOR
            loadingBarPrimary: O2_GEM,
            loadingBarBackground: O2_GEM_LIGHT_30,
            loadingBarPrimaryInverse: O2_GEM,
            loadingBarBackgroundInverse: O2_GEM_LIGHT_30,

            // BADGE
            badgeBackground: PEPPER_DARK,
        },
    };
};
