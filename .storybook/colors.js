// Workaround until these issues get fixed and released
// https://github.com/storybookjs/storybook/pull/10980
// https://github.com/storybookjs/storybook/pull/10813
//
// At this moment we cannot write addon's register in TSX (extension must be .js)
// but then we cannot import stuff from ./src
// So this module replaces the required parts from ./src/colors.tsx

/**
 * @param {'Movistar' | 'Vivo' | 'O2'} skin
 */
export const getColors = (skin) => {
    switch (skin) {
        case 'Movistar':
            return {
                PRIMARY: '#019DF4',
                TEXT_PRIMARY: '#313235',
                TEXT_PRIMARY_INVERSE: '#FFFFFF',
                TEXT_SECONDARY: '#86888C',
            };
        case 'Vivo':
            return {
                PRIMARY: '#660099',
                TEXT_PRIMARY: '#000000',
                TEXT_PRIMARY_INVERSE: '#FFFFFF',
                TEXT_SECONDARY: '#666666',
            };
        case 'O2-classic':
        case 'O2':
            return {
                PRIMARY: '#032B5A',
                TEXT_PRIMARY: '#000033',
                TEXT_PRIMARY_INVERSE: '#FFFFFF',
                TEXT_SECONDARY: '#757575',
            };
        default:
            throw Error('Unexpected skin: ' + skin);
    }
};
