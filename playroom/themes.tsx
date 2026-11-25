import * as themes from '../.storybook/themes';

import type {ThemeConfig} from '../src/theme';
import type {Density} from '../src';

// The density is not part of ThemeConfig, so the frame component takes it out and gives it to ThemeContextProvider
export type PlayroomTheme = ThemeConfig & {density?: Density};

const common: Partial<ThemeConfig> = {
    colorScheme: 'auto',
    dimensions: {
        headerMobileHeight: 0,
    },
} as const;

export const Movistar: ThemeConfig = {...themes.Movistar, ...common};
export const Vivo: ThemeConfig = {...themes.Vivo, ...common};
export const Vivo_Evolution: ThemeConfig = {...themes.Vivo_Evolution, ...common};
export const O2: ThemeConfig = {...themes.O2, ...common};
export const Telefonica: ThemeConfig = {...themes.Telefonica, ...common};
export const Blau: ThemeConfig = {...themes.Blau, ...common};
export const Esimflag: ThemeConfig = {...themes.Esimflag, ...common};
export const Community_Cyber: ThemeConfig = {...themes.Cyber, ...common};

export const Movistar_iOS: ThemeConfig = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS: ThemeConfig = {...Vivo, platformOverrides: {platform: 'ios'}};
export const Vivo_Evolution_iOS: ThemeConfig = {...Vivo_Evolution, platformOverrides: {platform: 'ios'}};
export const O2_iOS: ThemeConfig = {...O2, platformOverrides: {platform: 'ios'}};
export const Telefonica_iOS: ThemeConfig = {...Telefonica, platformOverrides: {platform: 'ios'}};
export const Blau_iOS: ThemeConfig = {...Blau, platformOverrides: {platform: 'ios'}};
export const Esimflag_iOS: ThemeConfig = {...Esimflag, platformOverrides: {platform: 'ios'}};
export const Community_Cyber_iOS: ThemeConfig = {...Community_Cyber, platformOverrides: {platform: 'ios'}};

const withCompactDensity = (theme: ThemeConfig): PlayroomTheme => ({...theme, density: 'compact'});

export const Movistar_compact: PlayroomTheme = withCompactDensity(Movistar);
export const Vivo_compact: PlayroomTheme = withCompactDensity(Vivo);
export const Vivo_Evolution_compact: PlayroomTheme = withCompactDensity(Vivo_Evolution);
export const O2_compact: PlayroomTheme = withCompactDensity(O2);
export const Telefonica_compact: PlayroomTheme = withCompactDensity(Telefonica);
export const Blau_compact: PlayroomTheme = withCompactDensity(Blau);
export const Esimflag_compact: PlayroomTheme = withCompactDensity(Esimflag);
export const Community_Cyber_compact: PlayroomTheme = withCompactDensity(Community_Cyber);

export const Movistar_iOS_compact: PlayroomTheme = withCompactDensity(Movistar_iOS);
export const Vivo_iOS_compact: PlayroomTheme = withCompactDensity(Vivo_iOS);
export const Vivo_Evolution_iOS_compact: PlayroomTheme = withCompactDensity(Vivo_Evolution_iOS);
export const O2_iOS_compact: PlayroomTheme = withCompactDensity(O2_iOS);
export const Telefonica_iOS_compact: PlayroomTheme = withCompactDensity(Telefonica_iOS);
export const Blau_iOS_compact: PlayroomTheme = withCompactDensity(Blau_iOS);
export const Esimflag_iOS_compact: PlayroomTheme = withCompactDensity(Esimflag_iOS);
export const Community_Cyber_iOS_compact: PlayroomTheme = withCompactDensity(Community_Cyber_iOS);
