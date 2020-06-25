// @ts-expect-error importing from plain js
export {Movistar, O2, Vivo, O2_Classic} from '../.storybook/theme-selector-addon/themes';

export const Movistar_iOS = {...Movistar, platformOverrides: {platform: 'ios'}};
export const O2_iOS = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_Classic_iOS = {...O2_Classic, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS = {...Vivo, platformOverrides: {platform: 'ios'}};
