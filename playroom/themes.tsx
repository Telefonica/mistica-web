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
export const Vivo: ThemeConfig = {...themes.Vivo, ...common};
export const Vivo_New: ThemeConfig = {...themes.Vivo_New, ...common};
export const O2: ThemeConfig = {...themes.O2, ...common};
export const O2_New: ThemeConfig = {...themes.O2_New, ...common};
export const Telefonica: ThemeConfig = {...themes.Telefonica, ...common};
export const Blau: ThemeConfig = {...themes.Blau, ...common};

export const Movistar_iOS: ThemeConfig = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS: ThemeConfig = {...Vivo, platformOverrides: {platform: 'ios'}};
export const Vivo_New_iOS: ThemeConfig = {...Vivo_New, platformOverrides: {platform: 'ios'}};
export const O2_iOS: ThemeConfig = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_New_iOS: ThemeConfig = {...O2_New, platformOverrides: {platform: 'ios'}};
export const Telefonica_iOS: ThemeConfig = {...Telefonica, platformOverrides: {platform: 'ios'}};
export const Blau_iOS: ThemeConfig = {...Blau, platformOverrides: {platform: 'ios'}};
