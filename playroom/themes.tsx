import {Movistar, Vivo, O2, O2_Classic} from '../.storybook/themes';

export {Movistar, Vivo, O2, O2_Classic};
export const Movistar_iOS = {...Movistar, platformOverrides: {platform: 'ios'}};
export const Vivo_iOS = {...Vivo, platformOverrides: {platform: 'ios'}};
export const O2_iOS = {...O2, platformOverrides: {platform: 'ios'}};
export const O2_Classic_iOS = {...O2_Classic, platformOverrides: {platform: 'ios'}};
