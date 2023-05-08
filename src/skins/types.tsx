export type SkinVariant = 'prominent';

export type KnownSkinName = 'Movistar' | 'O2' | 'O2-classic' | 'Vivo' | 'Telefonica' | 'Blau';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type TextPresetName = 'text5' | 'text6' | 'text7' | 'text8' | 'text9' | 'text10' | 'cardTitle';
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

export type BorderRadiiConfig = {
    button: string;
    input: string;
    container: string;
    /**
     * This will be used for DisplayCards and PosterCards only for the moment. One day we'll unify the borderRadius in all the cards to use container.
     * @deprecated Use `container` instead
     */
    legacyDisplay: string;
    popup: string;
    checkbox: string;
    indicator: string;
    sheet: string;
    bar: string;
    avatar: string;
};

export type Skin = {
    name: SkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
    borderRadii?: BorderRadiiConfig;
};

export type KnownSkin = {
    name: KnownSkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
    borderRadii?: BorderRadiiConfig;
};

export type Colors = {
    // BACKGROUNDS
    appBarBackground: string;
    background: string;
    backgroundContainer: string;
    backgroundContainerBrand: string;
    backgroundContainerBrandOverInverse: string;
    backgroundContainerAlternative: string;
    backgroundBrand: string;
    backgroundBrandSecondary: string;
    backgroundOverlay: string;
    backgroundSkeleton: string;
    backgroundSkeletonInverse: string;
    backgroundAlternative: string;
    backgroundFeedbackBottom: string;
    navigationBarBackground: string;

    skeletonWave: string;

    // BORDERS
    border: string;
    borderLow: string;
    borderHigh: string;
    borderSelected: string;

    // BUTTONS
    buttonDangerBackground: string;
    buttonDangerBackgroundSelected: string;
    buttonDangerBackgroundHover: string;
    buttonLinkBackgroundSelected: string;
    buttonLinkBackgroundInverseSelected: string;
    buttonPrimaryBackground: string;
    buttonPrimaryBackgroundInverse: string;
    buttonPrimaryBackgroundSelected: string;
    buttonPrimaryBackgroundInverseSelected: string;
    buttonPrimaryBackgroundHover: string;
    buttonSecondaryBorder: string;
    buttonSecondaryBorderSelected: string;
    buttonSecondaryBorderInverse: string;
    buttonSecondaryBorderInverseSelected: string;
    buttonSecondaryBackgroundHover: string;
    buttonSecondaryBackgroundSelected: string;
    buttonSecondaryBackgroundInverseHover: string;
    buttonSecondaryBackgroundInverseSelected: string;

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
    neutralLowAlternative: string;
    neutralMedium: string;
    neutralMediumInverse: string;
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
    successHighInverse: string;
    warningHighInverse: string;
    errorHighInverse: string;
    promoHighInverse: string;
};
