import {baseTheme} from '../theme';

import type {ThemeConfig, ThemeTexts} from '../theme';
import type {Locale} from '../utils/locale';
import type {RegionCode} from '../utils/region-code';
import type {Skin} from '../colors';
import type {TrackingEvent} from '../utils/types';

type ThemeOverrides = {
    skin?: Skin;
    colorOverride?: string;
    i18n?: {
        locale: Locale;
        phoneNumberFormattingRegionCode: RegionCode;
    };
    platformOverrides?: {
        platform?: 'ios' | 'android';
        insideNovumNativeApp?: boolean;
    };
    texts?: ThemeTexts;
    analytics?: {logEvent: (trackingEvent: TrackingEvent) => Promise<void>};
    dimensions?: {headerMobileHeight: number};
    Link?: ThemeConfig['Link'];
};

// ONLY FOR TESTING!!
export const overrideTheme = (overrides: ThemeOverrides): ThemeConfig => ({
    ...overrides,
    skin: overrides.skin || baseTheme.skin,
    i18n: overrides.i18n || baseTheme.i18n,
});
