// @flow
import type {ThemeConfig, Skin} from '../../src';

export const Movistar: ThemeConfig = {
    i18n: {locale: 'es_ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: 'Movistar',
};

export const O2: ThemeConfig = {
    i18n: {locale: 'en_US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2',
};

export const Vivo: ThemeConfig = {
    i18n: {locale: 'pt_BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: 'Vivo',
};

export const AVAILABLE_THEMES = [Movistar, O2, Vivo];

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
