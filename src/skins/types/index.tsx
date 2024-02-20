import type {Colors} from './colors';

export type {Colors} from './colors';

export type SkinVariant = 'prominent';

export type KnownSkinName =
    | 'Movistar'
    | 'O2'
    | 'O2-classic'
    | 'Vivo'
    | 'Vivo-new'
    | 'Telefonica'
    | 'Blau'
    | 'Tu';
export type SkinName = KnownSkinName | string;

export type GetKnownSkin = (variant?: SkinVariant) => KnownSkin;

export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';

type TextTokenConfig<PossibleFontWeights = FontWeight> = {
    weight: PossibleFontWeights;
};

export type TextPresetsConfig = {
    cardTitle: TextTokenConfig;
    button: TextTokenConfig<'regular' | 'medium'>;
    link: TextTokenConfig<'regular' | 'medium'>;
    title1: TextTokenConfig<'regular' | 'medium'>;
    title2: {
        weight: FontWeight;
        size: {mobile: number; desktop: number};
        lineHeight: {mobile: number; desktop: number};
    };
    indicator: TextTokenConfig<'regular' | 'medium'>;
    tabsLabel: {
        weight: FontWeight;
        size: {mobile: number; desktop: number};
        lineHeight: {mobile: number; desktop: number};
    };
    navigationBar: TextTokenConfig;
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
