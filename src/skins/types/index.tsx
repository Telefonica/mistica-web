import type {Variant} from '../../theme-variant-context';
import type {DensityValue} from '../../density/definitions';
import type {Colors} from './colors';

export type {Colors} from './colors';

export type SkinVariant = 'prominent';

export type KnownSkinName =
    | 'Movistar'
    | 'O2'
    | 'Vivo'
    | 'Vivo-evolution'
    | 'Telefonica'
    | 'Blau'
    | 'Esimflag';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

export type {Density, DensityValue} from '../../density/definitions';

export type MaybeDensity<T> = T | DensityValue<T>;

/**
 * The skin shape of a resolved config: every leaf can also be a density value. The schema of mistica-design
 * decides which tokens use density, so the type does not restrict it to some categories.
 *
 * The tuples stop the distribution over a union: MaybeDensity<'light' | 'bold'> lets cozy and compact take
 * different members, while a distributed type would force the same member in every mode.
 */
export type MaybeDensityConfig<T> = [T] extends [never]
    ? never
    : [T] extends [number | string]
      ? MaybeDensity<T>
      : {[K in keyof T]: MaybeDensityConfig<T[K]>};

type ResponsiveValue<T> = {mobile: T; desktop: T};

type PaddingYValues = {
    top: ResponsiveValue<number>;
    bottom: ResponsiveValue<number>;
};

type PaddingXValues = {
    left: ResponsiveValue<number>;
    right: ResponsiveValue<number>;
};

type PaddingValues = PaddingYValues & PaddingXValues;

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
    headerPretitle: TextTokenConfig;
    cardSubtitleDefault: TextSizeTokenConfig;
    cardSubtitleSnap: TextSizeTokenConfig;
    cardTitleDefault: TextSizeTokenConfig;
    cardTitleSnap: TextSizeTokenConfig;
    drawerTitle: TextTokenConfig;
    feedbackScreenDescription: TextTokenConfig;
    feedbackScreenTitle: TextTokenConfig;
    chipLabel: TextTokenConfig;
    chipLabelSmall: TextTokenConfig;
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
    popup: string;
    checkbox: string;
    indicator: string;
    chip: string;
    sheet: string;
    bar: string;
    avatar: string;
    mediaSmall: string;
    tag: string;
    snackbar: string;
};

export type SpacingConfig = {
    buttonDefaultPadding: PaddingValues;
    buttonSmallPadding: PaddingValues;
    iconButtonDefaultPadding: ResponsiveValue<number>;
    cardDefaultPadding: PaddingValues;
    inputPadding: PaddingValues;
    tagPadding: PaddingYValues;
    feedbackScreenPadding: PaddingValues;
    heroPadding: PaddingYValues;
    headerPadding: PaddingYValues;
    drawerPadding: PaddingValues;
    boxedDefaultPadding: PaddingXValues;
    boxedSmallPadding: PaddingYValues;
    responsiveLayoutMargin: ResponsiveValue<number>;
};

export type SkinTextPresetsConfig = MaybeDensityConfig<PartialTextPresetsConfig>;

export type SkinBorderRadiiConfig = MaybeDensityConfig<BorderRadiiConfig>;

export type SkinSpacingConfig = MaybeDensityConfig<SpacingConfig>;

export type ThemeVariantsConfig = {
    successFeedback: Variant;
    brandLoadingScreen: Variant;
};

export type ComponentPropertiesConfig = {
    showBoxedBorder: {
        default: boolean;
        alternative: boolean;
        brand: boolean;
        negative: boolean;
        media: boolean;
    };
};

export type Skin = {
    name: SkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: SkinTextPresetsConfig;
    borderRadii?: SkinBorderRadiiConfig;
    themeVariants?: ThemeVariantsConfig;
    spacing?: SkinSpacingConfig;
    componentProperties?: ComponentPropertiesConfig;
};

export type KnownSkin = {
    name: KnownSkinName;
    colors: Colors;
    darkModeColors?: Partial<Colors>;
    textPresets?: SkinTextPresetsConfig;
    borderRadii?: SkinBorderRadiiConfig;
    themeVariants?: ThemeVariantsConfig;
    spacing: SkinSpacingConfig;
    componentProperties?: ComponentPropertiesConfig;
};
