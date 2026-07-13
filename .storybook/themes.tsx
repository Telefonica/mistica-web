import {
    getMovistarSkin,
    getMovistarNewSkin,
    getO2Skin,
    getVivoSkin,
    getVivoEvolutionSkin,
    getTelefonicaSkin,
    getBlauSkin,
    getEsimflagSkin,
} from '../src';
import {getCyberSkin} from '../src/community/skins/cyber-skin';

export const Movistar = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getMovistarSkin(),
} as const;

export const Movistar_New = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getMovistarNewSkin(),
} as const;

export const O2 = {
    i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'},
    skin: getO2Skin(),
} as const;

export const Vivo = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: getVivoSkin(),
} as const;

export const Vivo_Evolution = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: getVivoEvolutionSkin(),
} as const;

export const Telefonica = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getTelefonicaSkin(),
} as const;

export const Blau = {
    i18n: {locale: 'de-DE', phoneNumberFormattingRegionCode: 'DE'},
    skin: getBlauSkin(),
} as const;

export const Esimflag = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getEsimflagSkin(),
} as const;

export const Cyber = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: getCyberSkin(),
} as const;

export const AVAILABLE_THEMES = [
    Movistar,
    Movistar_New,
    O2,
    Vivo,
    Vivo_Evolution,
    Telefonica,
    Blau,
    Esimflag,
    Cyber,
];
