import {applyAlpha} from '../utils/color';

import type {GetSkin} from './types';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const GREY_0 = '#000000';
const GREY_1 = '#666666';
const GREY_2 = '#999999';
const GREY_3 = '#DDDDDD';
const GREY_4 = '#EEEEEE';
const GREY_5 = '#F6F6F6';
const VIVO_PURPLE = '#660099';
const VIVO_PURPLE_DARK = '#461E5F';
const VIVO_PURPLE_LIGHT_80 = '#8433AD';
const VIVO_PURPLE_LIGHT_40 = '#C199D6';
const VIVO_PURPLE_LIGHT_20 = '#E0CCEB';
const VIVO_PURPLE_LIGHT_10 = '#EFE5F4';
const VIVO_GREEN = '#99CC33';
const VIVO_GREEN_DARK = '#33A14A';
const VIVO_GREEN_LIGHT_40 = '#D6EAAD';
const VIVO_BLUE = '#00ABDB';
const PEPPER = '#CC1F59';
const PEPPER_LIGHT = '#F7B1CB';
const PEPPER_DARK = '#B71D63';
const ORANGE = '#FF9900';
const ORANGE_LIGHT = '#FFD699';
const ORANGE_DARK = '#FA6324';
const PINK = '#EB3D7D';

export const getVivoSkin: GetSkin = () => {
    const accent = VIVO_GREEN;
    const textLink = VIVO_PURPLE;
    const controlActive = VIVO_PURPLE;
    const background = WHITE;
    const primaryDark = VIVO_PURPLE_DARK;
    const textPrimary = GREY_0;

    return {
        colors: {
            // LAYOUT
            primary: VIVO_PURPLE,
            backgroundBrand: VIVO_PURPLE,
            backgroundBrandVariation: VIVO_PURPLE,
            backgroundSpecial0: VIVO_PURPLE,
            backgroundSpecial1: VIVO_PURPLE,
            primaryDark,
            accent,
            divider: GREY_4,
            dividerSpecial0: VIVO_PURPLE,
            dividerSpecial1: VIVO_PURPLE_LIGHT_80,

            background,
            backgroundPromo: VIVO_PURPLE,
            backgroundDark: GREY_0,
            backgroundAlternative: GREY_5,
            backgroundSelectedDark: WHITE,
            backgroundUnselectedDark: applyAlpha(WHITE, 0.2),
            backgroundAccent: VIVO_PURPLE,
            backgroundHeading: VIVO_PURPLE,
            backgroundSpecial: VIVO_PURPLE,
            layerDecorations: BLACK,
            backgroundSkeleton: GREY_5,
            backgroundSkeletonDark: VIVO_PURPLE_DARK,
            backgroundOpacity: applyAlpha(GREY_0, 0.6),
            backgroundLoyalty: VIVO_PURPLE,
            overscrollColorTop: VIVO_PURPLE,
            backgroundSpecialBottom: VIVO_PURPLE,
            gridButtonSpecial1Hover: VIVO_PURPLE_LIGHT_40,

            backgroundSheetBarTop: WHITE,
            backgroundSheetBarTopSpecial: VIVO_PURPLE,
            icnSheetBarTop: GREY_3,
            icnSheetBarTopSpecial: VIVO_PURPLE_LIGHT_20,

            // BORDERS
            border: GREY_3,
            borderSelected: VIVO_PURPLE,
            borderDark: GREY_1,
            borderLight: GREY_5,
            borderAlternative: WHITE,
            borderSpecial0: WHITE,

            // TABS
            tabSelected: VIVO_PURPLE,

            // ITEM
            itemActive: GREY_5,
            itemHover: GREY_4,

            // TEXT
            textAccent: VIVO_GREEN,
            textPrimary,
            textPrimarySpecial: WHITE,
            textPrimaryInverse: WHITE,
            textSecondary: GREY_1,
            textSecondaryDark: GREY_2,
            textGroupTitleList: GREY_1,
            textHint: GREY_2,
            textLink,
            textLinkSnackbar: VIVO_PURPLE_LIGHT_40,
            textClickable: textLink,
            textError: PEPPER,
            textHighlight: ORANGE_DARK,
            textLabel: VIVO_GREEN,
            textInactive: GREY_3,
            textInactiveInverse: VIVO_PURPLE_LIGHT_40,
            textWarning: ORANGE,
            textDanger: PINK,

            // NAVBAR
            textNavbarHover: VIVO_PURPLE,
            navbarBackground: WHITE,
            navbarControl: VIVO_PURPLE_DARK,
            navbarDivider: GREY_4,

            // APPBAR (MOBILE MAIN TABS)
            textAppbar: GREY_2,
            textAppbarSelected: VIVO_PURPLE,

            // TAG
            tagBackgroundFirst: VIVO_GREEN,
            tagBackgroundSecond: GREY_3,
            tagBackgroundThird: VIVO_PURPLE,
            tagBackgroundFourth: ORANGE,
            tagBackgroundFifth: VIVO_PURPLE_DARK,
            tagBackgroundSixth: VIVO_PURPLE_LIGHT_80,
            tagBackgroundSeventh: PINK,

            // ICON
            iconAccent: VIVO_PURPLE,
            iconNavigationBar: WHITE,
            iconInverseDisable: applyAlpha(WHITE, 0.5),
            iconInactive: GREY_1,
            iconPrimary: GREY_0,
            iconSecondary: GREY_2,
            iconSecondarySpecial0: WHITE,
            iconTertiary: VIVO_PURPLE,
            iconInverse: WHITE,
            iconDisabled: GREY_3,
            iconDanger: PEPPER,
            iconPlaceholder: GREY_4,
            iconHeader: WHITE,
            iconHighlight: PINK,

            // BUTTONS
            buttonPrimaryBackground: VIVO_PURPLE,
            buttonPrimaryBackgroundSelected: VIVO_PURPLE_DARK,
            buttonPrimaryBackgroundHover: VIVO_PURPLE_DARK,
            buttonPrimaryBackgroundDisabled: VIVO_PURPLE_LIGHT_20,
            buttonPrimaryText: WHITE,

            buttonPrimaryBackgroundInverse: WHITE,
            textButtonPrimaryInverse: VIVO_PURPLE,
            buttonPrimaryBackgroundInverseSelected: VIVO_PURPLE_LIGHT_40,
            textButtonPrimaryInverseSelected: VIVO_PURPLE,
            buttonPrimaryBackgroundInverseDisabled: VIVO_PURPLE_LIGHT_40,
            textButtonPrimaryInverseDisabled: VIVO_PURPLE_LIGHT_20,

            buttonSecondaryBackground: 'transparent',
            buttonSecondaryText: VIVO_PURPLE,
            buttonSecondaryTextSelected: VIVO_PURPLE_DARK,
            buttonSecondaryTextDisabled: VIVO_PURPLE_LIGHT_20,
            buttonSecondaryBorder: VIVO_PURPLE,
            buttonSecondaryBorderSelected: VIVO_PURPLE_DARK,
            buttonSecondaryBorderDisabled: VIVO_PURPLE_LIGHT_20,

            buttonSecondaryBorderInverse: WHITE,
            textButtonSecondaryInverse: WHITE,
            buttonSecondaryBorderInverseSelected: VIVO_PURPLE_LIGHT_40,
            textButtonSecondaryInverseSelected: WHITE,
            buttonSecondaryBorderInverseDisabled: VIVO_PURPLE_LIGHT_40,
            textButtonSecondaryInverseDisabled: VIVO_PURPLE_LIGHT_40,

            buttonTertiaryBackground: GREY_4,

            buttonDangerBackground: PEPPER,
            buttonDangerBackgroundSelected: PEPPER_DARK,
            buttonDangerBackgroundHover: PEPPER_DARK,
            buttonDangerBackgroundDisabled: PEPPER_LIGHT,

            buttonLinkBackgroundSelected: VIVO_PURPLE_LIGHT_10,

            // FEEDBACKS
            feedbackSuccessBackground: VIVO_GREEN_DARK,
            feedbackSystemBackground: GREY_1,
            feedbackInfoBackground: GREY_0,
            feedbackErrorBackground: PEPPER,
            feedbackPermanentBorder: ORANGE,

            // FORM CONTROLS - https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a1ae27d83c11897d2f
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
            toggleAndroidBackgroundActive: VIVO_PURPLE_LIGHT_20,
            toggleIosInactive: WHITE,
            toggleIosBackgroundInactive: GREY_3,
            toggleIosBackgroundActive: VIVO_PURPLE,

            // CHARTS
            progressChart0: VIVO_GREEN,
            progressChart1: VIVO_GREEN_DARK,
            progressChart2: VIVO_GREEN_LIGHT_40,
            progressChart3: ORANGE_DARK,
            progressChart4: ORANGE_LIGHT,
            progressChart5: PINK,
            progressChart6: VIVO_BLUE,
            progressChart7: PEPPER_LIGHT,

            chartSecondaryLight: VIVO_PURPLE_LIGHT_20,
            chartSecondaryDark: VIVO_PURPLE,
            chartTertiaryLight: GREY_4,
            chartTertiaryDark: applyAlpha(WHITE, 0.2),
            chartSpecialDark: ORANGE,

            barChartInactive: GREY_3,
            barChartInactiveDark: VIVO_PURPLE_LIGHT_80,
            barChartActive: VIVO_PURPLE,
            barChartActiveDark: WHITE,
            chartLabelInactive: GREY_3,
            chartLabelInactiveDark: VIVO_PURPLE_LIGHT_40,
            chartLabelActive: GREY_1,
            chartLabelActiveDark: background,

            barChart0: VIVO_PURPLE,
            barChart1: VIVO_GREEN_DARK,
            barChart2: ORANGE_DARK,
            barChart3: PINK,
            barChart4: PEPPER_DARK,

            branch: GREY_4,
            chartBackground: GREY_4,
            chartBackgroundTooltip: GREY_4,
            chartBackgroundSpecial0: GREY_4,
            chartTextAmount: VIVO_BLUE,

            stakedBarChart0: VIVO_PURPLE,
            stakedBarChart1: VIVO_PURPLE_LIGHT_40,
            stakedBarChart2: VIVO_GREEN_DARK,
            stakedBarChart3: ORANGE,
            stakedBarChart4: ORANGE_DARK,
            stakedBarChart5: VIVO_BLUE,
            stakedBarChart6: PINK,

            // PROGRESS BAR
            progressbarBackgroundDark: GREY_2,
            progressbarInner: VIVO_PURPLE,

            // MAIN NAVIGATION
            mainNavPrimary: primaryDark,
            mainNavPrimaryHome: VIVO_PURPLE,
            navigationBarBackground: VIVO_PURPLE,
            mainNavNotification: accent,
            mainNavItemInactive: VIVO_PURPLE_LIGHT_40,
            mainNavItemActive: WHITE,

            // SECONDARY NAVIGATION TABLET AND MOBILE
            navtabIosBackground: WHITE,
            navtabIosBorder: GREY_3,
            navtabIosActiveTabBackground: WHITE,
            navtabAndroidBackground: GREY_5,
            navtabAndroidActiveTabBackground: GREY_5,
            navtabAndroidActiveTabBorder: accent,
            navtabPrimaryText: textPrimary,
            navtabIosActiveText: GREY_0,
            navtabIosInactiveText: GREY_1,
            navtabAndroidActiveText: VIVO_PURPLE,
            navtabAndroidInactiveText: GREY_1,

            // BUBBLES
            bubbleFromMeBackground: GREY_4,
            bubbleFromOthersBackground: VIVO_PURPLE_LIGHT_10,
            bubbleText: GREY_0,

            // AUDIO WAVES
            wavePlayerSound: GREY_3,
            wavePlayerSoundFilled: VIVO_PURPLE_LIGHT_40,

            // ALERTS
            backgroundTransactionalAlert: VIVO_PURPLE_DARK,

            // SHADOWS
            containerShadow: VIVO_PURPLE,

            // PROGRESS INDICATOR
            loadingBarPrimary: PINK,
            loadingBarBackground: PEPPER_LIGHT,
            loadingBarPrimaryInverse: PINK,
            loadingBarBackgroundInverse: PEPPER_LIGHT,

            // BADGE
            badgeBackground: PEPPER_DARK,
        },
    };
};
