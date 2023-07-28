import type {BorderRadiiConfig, TextPresetsConfig} from './types';

export const defaultTextPresetsConfig: TextPresetsConfig = {
    text5: {weight: 'light'},
    text6: {weight: 'light'},
    text7: {weight: 'light'},
    text8: {weight: 'light'},
    text9: {weight: 'light'},
    text10: {weight: 'light'},
    cardTitle: {weight: 'regular'},
    button: {weight: 'medium'},
    link: {weight: 'medium'},
    title1: {weight: 'medium'},
    title2: {weight: 'light', size: {mobile: 20, desktop: 28}, lineHeight: {mobile: 24, desktop: 32}},
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
};
