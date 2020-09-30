import {baseTheme} from '../theme';
import {getSkinByName} from '../skins/utils';

import type {ThemeConfig, ThemeTexts} from '../theme';
import type {Locale} from '../utils/locale';
import type {RegionCode} from '../utils/region-code';
import type {TrackingEvent} from '../utils/types';
import type {Skin} from '../skins/types';

type ThemeOverrides = {
    skin?: Skin;
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

export const overrideTheme = (overrides: ThemeOverrides): ThemeConfig => {
    if (process.env.NODE_ENV !== 'testing') {
        throw Error('"overrideTheme" can only be used in testing environment');
    }
    return {
        ...overrides,
        skin: overrides.skin || getSkinByName(baseTheme.skin),
        i18n: overrides.i18n || baseTheme.i18n,
    };
};
