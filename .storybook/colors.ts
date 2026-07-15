import {palette as cyberPalette} from '../src/community/skins/cyber-skin';

export const AVAILABLE_SKINS = [
    'Movistar',
    'O2',
    'Vivo',
    'Vivo-evolution',
    'Telefonica',
    'Blau',
    'Esimflag',
] as const;

export const COMMUNITY_SKINS = ['Cyber'] as const;

export const ALL_SKINS = [...AVAILABLE_SKINS, ...COMMUNITY_SKINS] as const;

export type Skin = (typeof ALL_SKINS)[number];

type SkinTheme = {primary: string; textPrimary: string; textPrimaryInverse: string; textSecondary: string};

export const getColors = (skin: Skin): SkinTheme => {
    switch (skin) {
        case 'Movistar':
            return {
                primary: '#0066FF',
                textPrimary: '#262423',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#605e5c',
            };
        case 'Vivo':
        case 'Vivo-evolution':
            return {
                primary: '#660099',
                textPrimary: '#000000',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#666666',
            };
        case 'O2':
            return {
                primary: '#0050FF',
                textPrimary: '#00001E',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#3C3C46',
            };
        case 'Telefonica':
            return {
                primary: '#0066FF',
                textPrimary: '#031A34',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#6E7894',
            };
        case 'Blau':
            return {
                primary: '#0070BF',
                textPrimary: '#000000',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#808285',
            };
        case 'Esimflag':
            return {
                primary: '#005CFF',
                textPrimary: '#001740',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#666B73',
            };
        case 'Cyber':
            return {
                primary: cyberPalette.brand,
                textPrimary: '#000000',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#666666',
            };
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
