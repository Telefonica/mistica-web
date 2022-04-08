// @ts-check
// Storybook fails when importing .tsx files from "manager.js" or "manager.tsx"
// This module replaces the required parts from ./src/skins

/**
 * @param {'Movistar' | 'Vivo' | 'O2' | 'O2-classic' | 'Telefonica' | 'Blau' | 'Solar360'} skin
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
            return {
                primary: '#660099',
                textPrimary: '#000000',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#666666',
            };
        case 'O2-classic':
        case 'O2':
            return {
                primary: '#032B5A',
                textPrimary: '#000033',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#757575',
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
        case 'Solar360':
            return {
                primary: '#E64D00',
                textPrimary: '#041E42',
                textPrimaryInverse: '#FFFFFF',
                textSecondary: '#4F617B',
            };
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
