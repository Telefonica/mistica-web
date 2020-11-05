// @ts-check
// Storybook fails when importing .tsx files from "manager.js" or "manager.tsx"
// This module replaces the required parts from ./src/skins

/**
 * @param {'Movistar' | 'Vivo' | 'O2' | 'O2-classic'} skin
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
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
