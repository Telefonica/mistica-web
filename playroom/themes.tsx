import {mediaQueriesConfig} from '../src/theme';
import * as themes from '../.storybook/themes';

// Override the media query desktopOrTabletMinHeight to avoid to show the components mobile version
// when playroom height is too short.
const mediaQueries = {...mediaQueriesConfig, desktopOrTabletMinHeight: 0};

export const Movistar = {...themes.Movistar, mediaQueries};
export const Vivo = {...themes.Vivo, mediaQueries};
export const O2 = {...themes.O2, mediaQueries};
export const O2_Classic = {...themes.O2_Classic, mediaQueries};

export const Movistar_iOS = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS = {...Vivo, platformOverrides: {platform: 'ios'}};
export const O2_iOS = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_Classic_iOS = {...O2_Classic, platformOverrides: {platform: 'ios'}};
