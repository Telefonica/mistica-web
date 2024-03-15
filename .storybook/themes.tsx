import {
    getMovistarSkin,
    getO2Skin,
    getVivoSkin,
    getVivoNewSkin,
    getTelefonicaSkin,
    getBlauSkin,
    getTuSkin,
} from '../src';

export const Movistar = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getMovistarSkin(),
} as const;

export const O2 = {
    i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'},
    skin: getO2Skin(),
} as const;

export const Vivo = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: getVivoSkin(),
} as const;

export const Vivo_New = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: getVivoNewSkin(),
} as const;

export const Telefonica = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getTelefonicaSkin(),
} as const;

export const Blau = {
    i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
    skin: getBlauSkin(),
} as const;

export const Tu = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getTuSkin(),
} as const;

export const AVAILABLE_THEMES = [Movistar, O2, Vivo, Vivo_New, Telefonica, Blau, Tu];
