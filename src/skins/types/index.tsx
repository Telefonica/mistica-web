import type {Colors} from './colors';

export type {Colors} from './colors';

export type SkinVariant = 'prominent';

export type KnownSkinName = 'Movistar' | 'O2' | 'O2-new' | 'Vivo' | 'Vivo-new' | 'Telefonica' | 'Blau' | 'Tu';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type TextWeightTokenConfig<PossibleFontWeights = FontWeight> = {
    weight: PossibleFontWeights;
    size?: never;
    lineHeight?: never;
};

type TextSizeTokenConfig = {
    weight?: never;
    size: {mobile: number; desktop: number};
    lineHeight: {mobile: number; desktop: number};
};

type TextTokenConfig<PossibleFontWeights = FontWeight> = {
    weight: PossibleFontWeights;
    size: {mobile: number; desktop: number};
    lineHeight: {mobile: number; desktop: number};
};

export type TextPresetsConfig = {
    cardTitle: TextWeightTokenConfig;
    button: TextWeightTokenConfig<'regular' | 'medium'>;
    link: TextWeightTokenConfig<'regular' | 'medium'>;
    title1: TextWeightTokenConfig<'regular' | 'medium'>;
    title2: TextTokenConfig;
    indicator: TextWeightTokenConfig<'regular' | 'medium'>;
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
    sheet: string;
    bar: string;
    avatar: string;
    mediaSmall: string;
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
