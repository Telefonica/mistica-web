export type SkinVariant = 'prominent';

export type SkinName = 'Movistar' | 'O2' | 'O2-classic' | 'Vivo';

export type GetSkin = (variant?: SkinVariant) => Skin;

export type Skin = {
    name: SkinName;
    colors: Colors;
};

export type Colors = {
    // BACKGROUNDS
    appBarBackground: string;
    background: string;
    backgroundBrand: string;
    backgroundOverlay: string;
    backgroundSkeleton: string;
    backgroundSkeletonInverse: string;
    backgroundAlternative: string;
    backgroundFeedbackBottom: string;
    navigationBarBackground: string;
    navigationSearchBarBackground: string;

    // BORDERS
    border: string;
    borderLight: string;
    borderDark: string;
    borderSelected: string;

    // BUTTONS
    buttonDangerBackground: string;
    buttonDangerBackgroundDisabled: string;
    buttonDangerBackgroundSelected: string;
    buttonDangerBackgroundHover: string;
    buttonLinkBackgroundSelected: string;
    buttonPrimaryBackground: string;
    buttonPrimaryBackgroundDisabled: string;
    buttonPrimaryBackgroundDisabledInverse: string;
    buttonPrimaryBackgroundInverse: string;
    buttonPrimaryBackgroundSelected: string;
    buttonPrimaryBackgroundSelectedInverse: string;
    buttonPrimaryBackgroundHover: string;
    buttonSecondaryBackground: string;
    buttonSecondaryBackgroundDisabled: string;
    buttonSecondaryBackgroundSelected: string;
    buttonSecondaryBorderDisabledInverse: string;
    buttonSecondaryBorderInverse: string;
    buttonSecondaryBorderSelectedInverse: string;

    // CONTROLS
    control: string;
    controlActivated: string;
    controlError: string;
    loadingBar: string;
    loadingBarBackground: string;
    loadingBarBackgroundInverse: string;
    loadingBarInverse: string;

    toggleAndroidInactive: string;
    toggleAndroidBackgroundActive: string;
    toggleIosInactive: string;

    // DIVIDERS
    divider: string;
    navigationBarDivider: string;

    // FEEDBACKS
    badge: string;
    feedbackErrorBackground: string;
    feedbackInfoBackground: string;

    // GLOBAL
    brand: string;
    inverse: string;
    neutralHigh: string;
    neutralLow: string;
    neutralMedium: string;
    promo: string;

    // STATES
    error: string;
    highlight: string;
    success: string;
    warning: string;

    // TEXTS COLORS

    // TEXT GLOBAL
    textPrimary: string;
    textPrimaryInverse: string;
    textSecondary: string;
    textDisabled: string;
    textAmount: string;

    // TEXT BUTTONS
    textButtonPrimary: string;
    textButtonPrimaryInverse: string;
    textButtonPrimaryInverseDisabled: string;
    textButtonPrimaryInverseSelected: string;
    textButtonPrimaryInversePressed: string;
    textButtonSecondary: string;
    textButtonSecondaryDisabled: string;
    textButtonSecondarySelected: string;
    textButtonSecondaryPressed: string;
    textButtonSecondaryInverse: string;
    textButtonSecondaryInverseDisabled: string;
    textButtonSecondaryInverseSelected: string;
    textButtonSecondaryInversePressed: string;

    // TEXT LINKS
    textLink: string;
    textLinkDanger: string;
    textLinkDangerDisabled: string;
    textLinkDisabled: string;
    textLinkSnackbar: string;

    // TEXT NAVIGATION BARS
    textNavigationBarPrimary: string;
    textNavigationBarSecondary: string;
    textNavigationSearchBarHint: string;
    textNavigationSearchBarText: string;
    textAppBar: string;
    textAppBarSelected: string;
};
