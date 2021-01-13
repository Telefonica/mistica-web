import {getPlatform, isInsideNovumNativeApp} from '../utils/platform';
import {getMovistarSkin} from '..';

import {Theme, ThemeConfig, ThemeTexts, texts, mediaQueriesConfig, dimensions, AnchorLink} from '../theme';
import {createMediaQueries} from '../utils/media-queries';

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
    texts?: ThemeTexts;
    analytics?: {logEvent: (trackingEvent: TrackingEvent) => Promise<void>};
    dimensions?: {headerMobileHeight: number};
    Link?: ThemeConfig['Link'];
};

const baseSkin = getMovistarSkin();

export const baseTheme: Theme = {
    skinName: baseSkin.name,
    i18n: {
        locale: 'es-ES',
        phoneNumberFormattingRegionCode: 'ES',
    },
    platformOverrides: {
        platform: getPlatform(),
        insideNovumNativeApp: isInsideNovumNativeApp(),
    },
    colors: baseSkin.colors,
    texts,
    analytics: {
        logEvent: (): Promise<void> => Promise.resolve(),
    },
    mq: createMediaQueries(mediaQueriesConfig),
    dimensions,
    Link: AnchorLink,
};

export const makeTheme = (overrides: ThemeOverrides = {}): ThemeConfig => ({
    ...overrides,
    skin: overrides.skin || baseSkin,
    i18n: overrides.i18n || baseTheme.i18n,
});
