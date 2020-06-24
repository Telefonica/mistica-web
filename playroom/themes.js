// @flow
import {Movistar, O2, Vivo} from '../.storybook/theme-selector-addon/themes';

export {Movistar, O2, Vivo};

export const Movistar_iOS = {...Movistar, platformOverrides: {platform: 'ios'}};
export const O2_iOS = {...O2, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS = {...Vivo, platformOverrides: {platform: 'ios'}};
