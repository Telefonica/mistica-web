import logo from '../img/mistica-logo.svg';
import {getColors} from './colors';

import {create} from '@storybook/theming/create';

/**
 * @param {'Movistar' | 'Vivo' | 'O2'} skin
 */
const createTheme = (skin) => {
    const colors = getColors(skin);
    return create({
        base: 'light',

        brandTitle: 'Mistica',
        brandUrl: 'https://github.com/Telefonica/mistica',
        brandImage: logo,

        colorSecondary: colors.PRIMARY,

        // Typography
        fontBase: "-apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontCode: 'monospace',

        // Text colors
        textColor: colors.TEXT_PRIMARY,
        textInverseColor: colors.TEXT_PRIMARY_INVERSE,

        // Toolbar default and active colors
        barTextColor: colors.TEXT_SECONDARY,
        barSelectedColor: colors.PRIMARY,
    });
};

export default createTheme;
