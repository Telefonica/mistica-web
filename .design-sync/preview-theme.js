// Provides the theme object for cfg.provider (referenced via {"$ref":"previewTheme"}).
// Mirrors .storybook/themes.tsx `Movistar` — the default skin the reference
// storybook renders with — so previews match the storybook oracle.
import {getMovistarSkin} from '../dist-es/index.js';

export const previewTheme = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getMovistarSkin(),
};
