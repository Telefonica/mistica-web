import type {BorderRadiiConfig, SpacingConfig, TextPresetsConfig, ThemeVariantsConfig} from './types';

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
    cardDescriptionDefault: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardDescriptionSnap: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardPretitleDefault: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardPretitleSnap: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardSubtitleDefault: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardSubtitleSnap: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    cardTitleDefault: {lineHeight: {desktop: 28, mobile: 24}, size: {desktop: 20, mobile: 18}},
    cardTitleSnap: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
    link: {weight: 'medium'},
    drawerTitle: {
        lineHeight: {desktop: 32, mobile: 24},
        size: {desktop: 28, mobile: 20},
        weight: 'bold',
    },
    title1: {
        lineHeight: {desktop: 20, mobile: 16},
        size: {desktop: 14, mobile: 12},
        weight: 'medium',
    },
    title2: {lineHeight: {desktop: 24, mobile: 24}, size: {desktop: 18, mobile: 16}, weight: 'bold'},
    title3: {weight: 'light', size: {mobile: 20, desktop: 28}, lineHeight: {mobile: 24, desktop: 32}},
    title4: {
        lineHeight: {desktop: 40, mobile: 32},
        size: {desktop: 32, mobile: 24},
        weight: 'medium',
    },
    navigationBar: {weight: 'medium'},
    indicator: {weight: 'medium'},
    tabsLabel: {weight: 'medium', size: {mobile: 16, desktop: 18}, lineHeight: {mobile: 24, desktop: 24}},
    chipLabel: {
        lineHeight: {desktop: 24, mobile: 20},
        size: {desktop: 16, mobile: 14},
        weight: 'medium',
    },
    inputHelperText: {lineHeight: {desktop: 20, mobile: 16}, size: {desktop: 14, mobile: 12}},
    inputLabel: {lineHeight: {desktop: 20, mobile: 16}, size: {desktop: 14, mobile: 12}},
    inputValue: {lineHeight: {desktop: 24, mobile: 24}, size: {desktop: 18, mobile: 16}},
    loadingScreenTitle: {lineHeight: {desktop: 28, mobile: 24}, size: {desktop: 24, mobile: 18}},
    stepperStepLabel: {lineHeight: {desktop: 24, mobile: 20}, size: {desktop: 16, mobile: 14}},
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

export const defaultSpacing: SpacingConfig = {
    buttonDefaultPadding: {left: {mobile: 16, desktop: 16}, right: {mobile: 16, desktop: 16}},
    buttonSmallPadding: {left: {mobile: 8, desktop: 12}, right: {mobile: 8, desktop: 12}},
    cardDefaultPadding: {
        top: {mobile: 16, desktop: 16},
        bottom: {mobile: 16, desktop: 16},
        left: {mobile: 16, desktop: 16},
        right: {mobile: 16, desktop: 16},
    },
    inputPadding: {top: {mobile: 9, desktop: 3}, bottom: {mobile: 9, desktop: 3}},
    tagPadding: {top: {mobile: 2, desktop: 2}, bottom: {mobile: 2, desktop: 2}},
    feedbackScreenPadding: {
        top: {mobile: 64, desktop: 40},
        bottom: {mobile: 16, desktop: 40},
        left: {mobile: 16, desktop: 40},
        right: {mobile: 16, desktop: 40},
    },
    heroPadding: {top: {mobile: 16, desktop: 56}, bottom: {mobile: 16, desktop: 56}},
    headerPadding: {top: {mobile: 16, desktop: 48}, bottom: {mobile: 16, desktop: 48}},
    drawerPadding: {
        top: {mobile: 32, desktop: 32},
        bottom: {mobile: 16, desktop: 32},
        left: {mobile: 16, desktop: 24},
        right: {mobile: 16, desktop: 24},
    },
};
