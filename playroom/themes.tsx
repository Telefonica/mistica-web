import {mediaQueriesConfig} from '../src/theme';
import * as themes from '../.storybook/themes';
import type {ThemeConfig} from '../src/theme';

const common = {
    // Override the media query desktopOrTabletMinHeight to avoid to show the components mobile version
    // when playroom height is too short.
    mediaQueries: {...mediaQueriesConfig, desktopOrTabletMinHeight: 0},
    enableTabFocus: true,
    colorScheme: 'auto',
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'ES'},
} as const;

export const Movistar: ThemeConfig = {...themes.Movistar, ...common};
export const Movistar_Prominent: ThemeConfig = {...themes.Movistar_Prominent, ...common};
export const Vivo: ThemeConfig = {...themes.Vivo, ...common};
export const O2: ThemeConfig = {...themes.O2, ...common};
export const O2_Classic: ThemeConfig = {...themes.O2_Classic, ...common};

export const Movistar_iOS: ThemeConfig = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS: ThemeConfig = {...Vivo, platformOverrides: {platform: 'ios'}};
export const O2_iOS: ThemeConfig = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_Classic_iOS: ThemeConfig = {...O2_Classic, platformOverrides: {platform: 'ios'}};
