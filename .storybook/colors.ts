export const AVAILABLE_SKINS = [
    'Movistar-new',
    'Movistar',
    'O2-new',
    'O2',
    'Vivo-new',
    'Vivo',
    'Telefonica',
    'Blau',
    'Esimflag',
] as const;

export type Skin = (typeof AVAILABLE_SKINS)[number];

type SkinTheme = {primary: string; textPrimary: string; textPrimaryInverse: string; textSecondary: string};

export const getColors = (skin: Skin): SkinTheme => {
    switch (skin) {
        case 'Movistar':
            return {
                primary: '#019DF4',
                textPrimary: '#0B2739',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#6B6C6F',
            };
        case 'Movistar-new':
            return {
                primary: '#0066FF',
                textPrimary: '#262423',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#605e5c',
            };
        case 'Vivo':
        case 'Vivo-new':
            return {
                primary: '#660099',
                textPrimary: '#000000',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#666666',
            };
        case 'O2':
            return {
                primary: '#032B5A',
                textPrimary: '#000033',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#757575',
            };
        case 'O2-new':
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
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
