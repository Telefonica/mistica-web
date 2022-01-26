import {getMovistarSkin} from '..';
import {ThemeConfig, ThemeTexts, getTexts} from '../theme';

import type {Locale} from '../utils/locale';
import type {RegionCode} from '../utils/region-code';
import type {TrackingEvent} from '../utils/types';
import type {Skin} from '..';

if (process.env.NODE_ENV !== 'test') {
    throw Error('Using test-utils outside test environment');
}

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
    texts?: Partial<ThemeTexts>;
    analytics?: {logEvent: (trackingEvent: TrackingEvent) => Promise<void>};
    dimensions?: {headerMobileHeight: number};
    useHrefDecorator?: () => (href: string) => string;
    Link?: ThemeConfig['Link'];
};

const baseSkin = getMovistarSkin();

export const makeTheme = (overrides: ThemeOverrides = {}): ThemeConfig => ({
    ...overrides,
    skin: overrides.skin || baseSkin,
    i18n: overrides.i18n || {
        locale: 'es-ES',
        phoneNumberFormattingRegionCode: 'ES',
    },
    texts: {
        ...getTexts(overrides?.i18n?.locale ?? 'es-ES'),
        ...overrides.texts,
    },
});
