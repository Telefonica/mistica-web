export const Movistar = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: 'Movistar',
};

export const O2 = {
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2',
};

export const O2_Classic = {
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2-classic',
};

export const Vivo = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: 'Vivo',
};

export const AVAILABLE_THEMES = [Movistar, O2, O2_Classic, Vivo];

export default (selectedSkin, selectedPlatform) => {
    const themeConfig = AVAILABLE_THEMES.find(({skin}) => skin === selectedSkin) || Movistar;
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
