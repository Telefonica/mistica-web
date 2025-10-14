import type {BorderRadiiConfig, TextPresetsConfig, ThemeVariantsConfig} from './types';

export const defaultTextPresetsConfig: TextPresetsConfig = {
    text1: {size: {mobile: 12, desktop: 14}, lineHeight: {mobile: 16, desktop: 20}},
    text2: {size: {mobile: 14, desktop: 16}, lineHeight: {mobile: 20, desktop: 24}},
    text3: {size: {mobile: 16, desktop: 18}, lineHeight: {mobile: 24, desktop: 24}},
    text4: {size: {mobile: 18, desktop: 20}, lineHeight: {mobile: 24, desktop: 28}},
    text5: {weight: 'light', size: {mobile: 20, desktop: 28}, lineHeight: {mobile: 24, desktop: 32}},
    text6: {weight: 'light', size: {mobile: 24, desktop: 32}, lineHeight: {mobile: 32, desktop: 40}},
    text7: {weight: 'light', size: {mobile: 28, desktop: 40}, lineHeight: {mobile: 32, desktop: 48}},
    text8: {weight: 'light', size: {mobile: 32, desktop: 48}, lineHeight: {mobile: 40, desktop: 56}},
    text9: {weight: 'light', size: {mobile: 40, desktop: 56}, lineHeight: {mobile: 48, desktop: 64}},
    text10: {weight: 'light', size: {mobile: 48, desktop: 64}, lineHeight: {mobile: 56, desktop: 72}},
    cardTitle: {weight: 'regular'},
    rowTitle: {weight: 'regular'},
    button: {weight: 'medium'},
    link: {weight: 'medium'},
    title1: {weight: 'medium'},
    title2: {weight: 'light'},
    title3: {weight: 'light', size: {mobile: 20, desktop: 28}, lineHeight: {mobile: 24, desktop: 32}},
    navigationBar: {weight: 'medium'},
    indicator: {weight: 'medium'},
    tabsLabel: {weight: 'medium', size: {mobile: 16, desktop: 18}, lineHeight: {mobile: 24, desktop: 24}},
};

export const defaultBorderRadiiConfig: BorderRadiiConfig = {
    button: '4px',
    input: '8px',
    container: '8px',
    legacyDisplay: '16px',
    popup: '8px',
    checkbox: '2px',
    indicator: '999px',
    sheet: '8px',
    bar: '999px',
    avatar: '50%',
    mediaSmall: '8px',
    chip: '16px',
    tag: '24px',
};

export const defaultThemeVariantsConfig: ThemeVariantsConfig = {
    brandLoadingScreen: 'inverse',
    successFeedback: 'inverse',
};
