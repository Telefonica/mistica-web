export type SkinVariant = 'prominent';

export type KnownSkinName = 'Movistar' | 'O2' | 'O2-classic' | 'Vivo' | 'Telefonica' | 'Blau' | 'Solar360';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type Skin = {
    name: SkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
};

export type KnownSkin = {
    name: KnownSkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
};

export type Colors = {
    // BACKGROUNDS
    appBarBackground: string;
    background: string;
    backgroundContainer: string;
    backgroundBrand: string;
    backgroundOverlay: string;
    backgroundSkeleton: string;
    backgroundSkeletonInverse: string;
    backgroundAlternative: string;
    backgroundFeedbackBottom: string;
    navigationBarBackground: string;

    skeletonWave: string;

    // BORDERS
    border: string;
    borderLight: string;
    borderDark: string;
    borderSelected: string;

    // BUTTONS
    buttonDangerBackground: string;
    buttonDangerBackgroundSelected: string;
    buttonDangerBackgroundHover: string;
    buttonLinkBackgroundSelected: string;
    buttonLinkBackgroundSelectedInverse: string;
    buttonPrimaryBackground: string;
    buttonPrimaryBackgroundInverse: string;
    buttonPrimaryBackgroundSelected: string;
    buttonPrimaryBackgroundSelectedInverse: string;
    buttonPrimaryBackgroundHover: string;
    buttonSecondaryBackground: string;
    buttonSecondaryBackgroundSelected: string;
    buttonSecondaryBorderInverse: string;
    buttonSecondaryBorderSelectedInverse: string;

    // CONTROLS
    control: string;
    controlActivated: string;
    controlError: string;
    loadingBar: string;
    loadingBarBackground: string;

    toggleAndroidInactive: string;
    toggleAndroidBackgroundActive: string;
    iosControlKnob: string;

    // DIVIDERS
    divider: string;
    dividerInverse: string;
    navigationBarDivider: string;

    // FEEDBACKS
    badge: string;
    feedbackErrorBackground: string;
    feedbackInfoBackground: string;

    // GLOBAL
    brand: string;
    brandDark: string;
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

    // TEXT GLOBAL
    textPrimary: string;
    textPrimaryInverse: string;
    textSecondary: string;
    textSecondaryInverse: string;
    textAmount: string;

    // TEXT BUTTONS
    textButtonPrimary: string;
    textButtonPrimaryInverse: string;
    textButtonPrimaryInverseSelected: string;
    textButtonSecondary: string;
    textButtonSecondarySelected: string;
    textButtonSecondaryInverse: string;
    textButtonSecondaryInverseSelected: string;

    // TEXT LINKS
    textLink: string;
    textLinkInverse: string;
    textLinkDanger: string;
    textLinkSnackbar: string;

    // TEXT NAVIGATION BARS
    textNavigationBarPrimary: string;
    textNavigationBarSecondary: string;
    textNavigationSearchBarHint: string;
    textNavigationSearchBarText: string;
    textAppBar: string;
    textAppBarSelected: string;

    // TAGS
    tagBackgroundSuccess: string;
    tagBackgroundWarning: string;
    tagBackgroundError: string;
    tagBackgroundPromo: string;
    tagBackgroundActive: string;
    tagBackgroundInactive: string;

    textTagSuccess: string;
    textTagWarning: string;
    textTagError: string;
    textTagPromo: string;
    textTagActive: string;
    textTagInactive: string;
};
