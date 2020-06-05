// @flow
import type {ThemeConfig} from '../../src';

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

export default [Movistar, O2, Vivo];
