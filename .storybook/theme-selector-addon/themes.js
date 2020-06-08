// @flow
import type {ThemeConfig} from '../../src';

export const Movistar: ThemeConfig = {
    i18n: {locale: 'es-ES', phoneNumberFormattingRegionCode: 'ES'},
    skin: 'Movistar',
};

export const O2: ThemeConfig = {
    i18n: {locale: 'en-US', phoneNumberFormattingRegionCode: 'GB'},
    skin: 'O2',
};

export const Vivo: ThemeConfig = {
    i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'},
    skin: 'Vivo',
};

export default [Movistar, O2, Vivo];
