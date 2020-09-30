export type SkinVariant = 'prominent';

export type GetSkin = (variant?: SkinVariant) => Skin;

export type Skin = {
    name: string;
    colors: Colors;
};

export type Colors = {
    // LAYOUT
    primary: string;
    backgroundBrand: string;
    backgroundBrandVariation: string;
    backgroundSpecial0: string;
    backgroundSpecial1: string;
    primaryDark: string;
    accent: string;
    divider: string;
    dividerSpecial0: string;
    dividerSpecial1: string;

    background: string;
    backgroundPromo: string;
    backgroundDark: string;
    backgroundAlternative: string;
    backgroundSelectedDark: string;
    backgroundUnselectedDark: string;
    backgroundAccent: string;
    backgroundHeading: string;
    backgroundSpecial: string;
    layerDecorations: string;
    backgroundSkeleton: string;
    backgroundSkeletonDark: string;
    backgroundOpacity: string;
    backgroundLoyalty: string;
    overscrollColorTop: string;
    backgroundSpecialBottom: string;
    gridButtonSpecial1Hover: string;

    backgroundSheetBarTop: string;
    backgroundSheetBarTopSpecial: string;
    icnSheetBarTop: string;
    icnSheetBarTopSpecial: string;

    // BORDERS
    border: string;
    borderSelected: string;
    borderDark: string;
    borderLight: string;
    borderAlternative: string;
    borderSpecial0: string;

    // TABS
    tabSelected: string;

    // ITEM
    itemActive: string;
    itemHover: string;

    // TEXT
    textAccent: string;
    textPrimary: string;
    textPrimarySpecial: string;
    textPrimaryInverse: string;
    textSecondary: string;
    textSecondaryDark: string;
    textGroupTitleList: string;
    textHint: string;
    textLink: string;
    textLinkSnackbar: string;
    textClickable: string;
    textError: string;
    textHighlight: string;
    textLabel: string;
    textInactive: string;
    textInactiveInverse: string;
    textWarning: string;
    textDanger: string;

    // NAVBAR
    textNavbarHover: string;
    navbarBackground: string;
    navbarControl: string;
    navbarDivider: string;

    // APPBAR (MOBILE MAIN TABS)
    textAppbar: string;
    textAppbarSelected: string;

    // TAG
    tagBackgroundFirst: string;
    tagBackgroundSecond: string;
    tagBackgroundThird: string;
    tagBackgroundFourth: string;
    tagBackgroundFifth: string;
    tagBackgroundSixth: string;
    tagBackgroundSeventh: string;

    // ICON
    iconAccent: string;
    iconNavigationBar: string;
    iconInverseDisable: string;
    iconInactive: string;
    iconPrimary: string;
    iconSecondary: string;
    iconSecondarySpecial0: string;
    iconTertiary: string;
    iconInverse: string;
    iconDisabled: string;
    iconDanger: string;
    iconPlaceholder: string;
    iconHeader: string;
    iconHighlight: string;

    // BUTTONS
    buttonPrimaryBackground: string;
    buttonPrimaryBackgroundSelected: string;
    buttonPrimaryBackgroundHover: string;
    buttonPrimaryBackgroundDisabled: string;
    buttonPrimaryText: string;

    buttonPrimaryBackgroundInverse: string;
    textButtonPrimaryInverse: string;
    buttonPrimaryBackgroundInverseSelected: string;
    textButtonPrimaryInverseSelected: string;
    buttonPrimaryBackgroundInverseDisabled: string;
    textButtonPrimaryInverseDisabled: string;

    buttonSecondaryBackground: string;
    buttonSecondaryText: string;
    buttonSecondaryTextSelected: string;
    buttonSecondaryTextDisabled: string;
    buttonSecondaryBorder: string;
    buttonSecondaryBorderSelected: string;
    buttonSecondaryBorderDisabled: string;

    buttonSecondaryBorderInverse: string;
    textButtonSecondaryInverse: string;
    buttonSecondaryBorderInverseSelected: string;
    textButtonSecondaryInverseSelected: string;
    buttonSecondaryBorderInverseDisabled: string;
    textButtonSecondaryInverseDisabled: string;

    buttonTertiaryBackground: string;

    buttonDangerBackground: string;
    buttonDangerBackgroundSelected: string;
    buttonDangerBackgroundHover: string;
    buttonDangerBackgroundDisabled: string;

    buttonLinkBackgroundSelected: string;

    // FEEDBACKS
    feedbackSuccessBackground: string;
    feedbackSystemBackground: string;
    feedbackInfoBackground: string;
    feedbackErrorBackground: string;
    feedbackPermanentBorder: string;

    // FORM CONTROLS - https://app.zeplin.io/project/5a81c7fc94d98154381bec44/screen/5c6a96a1ae27d83c11897d2f
    controlInactive: string;
    controlActive: string;
    controlError: string;
    controlHover: string;

    controlSpecial0Active: string;
    controlSpecial0Inactive: string;
    controlInverseActive: string;
    controlInverseInactive: string;

    // TOGGLE
    toggleAndroidInactive: string;
    toggleAndroidBackgroundInactive: string;
    toggleAndroidActive: string;
    toggleAndroidBackgroundActive: string;
    toggleIosInactive: string;
    toggleIosBackgroundInactive: string;
    toggleIosBackgroundActive: string;

    // CHARTS
    progressChart0: string;
    progressChart1: string;
    progressChart2: string;
    progressChart3: string;
    progressChart4: string;
    progressChart5: string;
    progressChart6: string;
    progressChart7: string;

    chartSecondaryLight: string;
    chartSecondaryDark: string;
    chartTertiaryLight: string;
    chartTertiaryDark: string;
    chartSpecialDark: string;

    barChartInactive: string;
    barChartInactiveDark: string;
    barChartActive: string;
    barChartActiveDark: string;
    chartLabelInactive: string;
    chartLabelInactiveDark: string;
    chartLabelActive: string;
    chartLabelActiveDark: string;

    barChart0: string;
    barChart1: string;
    barChart2: string;
    barChart3: string;
    barChart4: string;

    branch: string;
    chartBackground: string;
    chartBackgroundTooltip: string;
    chartBackgroundSpecial0: string;
    chartTextAmount: string;

    stakedBarChart0: string;
    stakedBarChart1: string;
    stakedBarChart2: string;
    stakedBarChart3: string;
    stakedBarChart4: string;
    stakedBarChart5: string;
    stakedBarChart6: string;

    // PROGRESS BAR
    progressbarBackgroundDark: string;
    progressbarInner: string;

    // MAIN NAVIGATION
    mainNavPrimary: string;
    mainNavPrimaryHome: string;
    navigationBarBackground: string;
    mainNavNotification: string;
    mainNavItemInactive: string;
    mainNavItemActive: string;

    // SECONDARY NAVIGATION TABLET AND MOBILE
    navtabIosBackground: string;
    navtabIosBorder: string;
    navtabIosActiveTabBackground: string;
    navtabAndroidBackground: string;
    navtabAndroidActiveTabBackground: string;
    navtabAndroidActiveTabBorder: string;
    navtabPrimaryText: string;
    navtabIosActiveText: string;
    navtabIosInactiveText: string;
    navtabAndroidActiveText: string;
    navtabAndroidInactiveText: string;

    // BUBBLES
    bubbleFromMeBackground: string;
    bubbleFromOthersBackground: string;
    bubbleText: string;

    // AUDIO WAVES
    wavePlayerSound: string;
    wavePlayerSoundFilled: string;

    // ALERTS
    backgroundTransactionalAlert: string;

    // SHADOWS
    containerShadow: string;

    // PROGRESS INDICATOR
    loadingBarPrimary: string;
    loadingBarBackground: string;
    loadingBarPrimaryInverse: string;
    loadingBarBackgroundInverse: string;

    // BADGE
    badgeBackground: string;
};
