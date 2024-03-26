// @ts-check
// Storybook fails when importing .tsx files from "manager.js" or "manager.tsx"
// This module replaces the required parts from ./src/skins

/**
 * @param {'Movistar' | 'Vivo' | 'Vivo-new' | 'O2' | 'O2-new' | 'Telefonica' | 'Blau' | 'Tu'} skin
 */
export const getColors = (skin) => {
    switch (skin) {
        case 'Movistar':
            return {
                primary: '#019DF4',
                textPrimary: '#313235',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#86888C',
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
        case 'Tu':
            return {
                primary: '#2B3447',
                textPrimary: '#2B3447',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#727579',
            };
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
