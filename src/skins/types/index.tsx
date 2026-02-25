import type {Variant} from '../../theme-variant-context';
import type {Colors} from './colors';

export type {Colors} from './colors';

export type SkinVariant = 'prominent';

export type KnownSkinName =
    | 'Movistar'
    | 'Movistar-new'
    | 'O2'
    | 'O2-new'
    | 'Vivo'
    | 'Vivo-new'
    | 'Telefonica'
    | 'Blau'
    | 'Tu'
    | 'Esimflag';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type ResponsiveValue<T> = {mobile: T; desktop: T};

type PaddingY = {
    top: ResponsiveValue<number>;
    bottom: ResponsiveValue<number>;
};

type PaddingXValues = {
    left: ResponsiveValue<number>;
    right: ResponsiveValue<number>;
};

type PaddingValues = PaddingY & PaddingXValues;

type TextWeightTokenConfig<PossibleFontWeights = FontWeight> = {
    weight: PossibleFontWeights;
    size?: never;
    lineHeight?: never;
};

export type TextSizeTokenConfig = {
    weight?: never;
    size: ResponsiveValue<number>;
    lineHeight: ResponsiveValue<number>;
};

export type TextTokenConfig<PossibleFontWeights = FontWeight> = {
    weight: PossibleFontWeights;
    size: ResponsiveValue<number>;
    lineHeight: ResponsiveValue<number>;
};

export type TextPresetsConfig = {
    cardTitle: TextWeightTokenConfig;
    rowTitle: TextWeightTokenConfig;
    stepperStepLabel: TextSizeTokenConfig;
    button: TextWeightTokenConfig<'regular' | 'medium'>;
    cardDescriptionDefault: TextSizeTokenConfig;
    cardDescriptionSnap: TextSizeTokenConfig;
    cardPretitleDefault: TextSizeTokenConfig;
    cardPretitleSnap: TextSizeTokenConfig;
    cardSubtitleDefault: TextSizeTokenConfig;
    cardSubtitleSnap: TextSizeTokenConfig;
    cardTitleDefault: TextSizeTokenConfig;
    cardTitleSnap: TextSizeTokenConfig;
    drawerTitle: TextTokenConfig;
    chipLabel: TextTokenConfig;
    link: TextWeightTokenConfig<'regular' | 'medium'>;
    loadingScreenTitle: TextSizeTokenConfig;
    title1: TextTokenConfig<'regular' | 'medium'>;
    title2: TextTokenConfig;
    title3: TextTokenConfig;
    title4: TextTokenConfig;
    indicator: TextWeightTokenConfig<'regular' | 'medium'>;
    inputHelperText: TextSizeTokenConfig;
    inputLabel: TextSizeTokenConfig;
    inputValue: TextSizeTokenConfig;
    tabsLabel: TextTokenConfig;
    navigationBar: TextWeightTokenConfig;
    text1: TextSizeTokenConfig;
    text2: TextSizeTokenConfig;
    text3: TextSizeTokenConfig;
    text4: TextSizeTokenConfig;
    text5: TextTokenConfig;
    text6: TextTokenConfig;
    text7: TextTokenConfig;
    text8: TextTokenConfig;
    text9: TextTokenConfig;
    text10: TextTokenConfig;
};

type PartialTextPresetsConfig = Partial<TextPresetsConfig>;

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
    chip: string;
    sheet: string;
    bar: string;
    avatar: string;
    mediaSmall: string;
    tag: string;
};

export type SpacingConfig = {
    buttonDefaultPadding: PaddingXValues;
    buttonSmallPadding: PaddingXValues;
    cardDefaultPadding: PaddingValues;
    inputPadding: PaddingY;
    tagPadding: PaddingY;
    feedbackScreenPadding: PaddingValues;
    heroPadding: PaddingY;
    headerPadding: PaddingY;
    drawerPadding: PaddingValues;
};

export type ThemeVariantsConfig = {
    successFeedback: Variant;
    brandLoadingScreen: Variant;
};

export type Skin = {
    name: SkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
    borderRadii?: BorderRadiiConfig;
    themeVariants?: ThemeVariantsConfig;
    spacing?: SpacingConfig;
};

export type KnownSkin = {
    name: KnownSkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: PartialTextPresetsConfig;
    borderRadii?: BorderRadiiConfig;
    themeVariants?: ThemeVariantsConfig;
    spacing: SpacingConfig;
};
