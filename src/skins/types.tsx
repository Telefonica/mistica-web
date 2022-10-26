export type SkinVariant = 'prominent';

export type KnownSkinName = 'Movistar' | 'O2' | 'O2-classic' | 'Vivo' | 'Telefonica' | 'Blau';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type TextPresetName = 'text5' | 'text6' | 'text7' | 'text8' | 'text9' | 'text10';
export type TextPresetsConfig = {
    [preset in TextPresetName]: {
        weight: FontWeight;
    };
};

type PartialTextPresetsConfig = {
    [preset in TextPresetName]?: {
        weight?: FontWeight;
    };
};

export type Skin = {
    name: SkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
};

export type KnownSkin = {
    name: KnownSkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
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
    buttonSecondaryBackgroundSelected: string;
    buttonSecondaryBorder: string;
    buttonSecondaryBorderSelected: string;
    buttonSecondaryBorderInverse: string;
    buttonSecondaryBorderSelectedInverse: string;
    buttonSecondaryBackground: string;
    buttonSecondaryBackgroundSelectedInverse: string;

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
    brandHigh: string;
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
    successLow: string;
    warningLow: string;
    errorLow: string;
    promoLow: string;
    brandLow: string;
    successHigh: string;
    warningHigh: string;
    errorHigh: string;
    promoHigh: string;
};
