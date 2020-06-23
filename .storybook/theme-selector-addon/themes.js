// @flow
import type {ThemeConfig, Skin} from '../../src';

export const Movistar: ThemeConfig = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: 'Movistar',
};

export const O2: ThemeConfig = {
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2',
};

export const O2_Classic: ThemeConfig = {
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2-classic',
};

export const Vivo: ThemeConfig = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: 'Vivo',
};

export const AVAILABLE_THEMES = [Movistar, O2, O2_Classic, Vivo];

export default (selectedSkin: ?Skin, selectedPlatform: ?'ios' | 'android'): ThemeConfig => {
    const themeConfig: ThemeConfig = AVAILABLE_THEMES.find(({skin}) => skin === selectedSkin) || Movistar;
    return selectedPlatform
        ? {
              ...themeConfig,
              platformOverrides: {
                  platform: selectedPlatform,
                  insideNovumNativeApp: true,
              },
          }
        : themeConfig;
};
