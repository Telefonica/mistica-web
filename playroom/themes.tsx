import * as themes from '../.storybook/themes';

import type {ThemeConfig} from '../src/theme';

const common: Partial<ThemeConfig> = {
    enableTabFocus: true,
    colorScheme: 'auto',
    dimensions: {
        headerMobileHeight: 0,
    },
} as const;

export const Movistar: ThemeConfig = {...themes.Movistar, ...common};
export const Vivo_New: ThemeConfig = {...themes.Vivo_New, ...common};
export const O2_New: ThemeConfig = {...themes.O2_New, ...common};
export const Telefonica: ThemeConfig = {...themes.Telefonica, ...common};
export const Blau: ThemeConfig = {...themes.Blau, ...common};
export const Tu: ThemeConfig = {...themes.Tu, ...common};

export const Movistar_iOS: ThemeConfig = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_New_iOS: ThemeConfig = {...Vivo_New, platformOverrides: {platform: 'ios'}};
export const O2_New_iOS: ThemeConfig = {...O2_New, platformOverrides: {platform: 'ios'}};
export const Telefonica_iOS: ThemeConfig = {...Telefonica, platformOverrides: {platform: 'ios'}};
export const Blau_iOS: ThemeConfig = {...Blau, platformOverrides: {platform: 'ios'}};
export const Tu_iOS: ThemeConfig = {...Tu, platformOverrides: {platform: 'ios'}};
