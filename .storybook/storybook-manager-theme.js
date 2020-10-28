import {create} from '@storybook/theming/create';
import {getColors} from './colors';
import logo from '../img/mistica-logo.svg';

/**
 * @param {import('../src').SkinName} skinName
 */
export const createStorybookTheme = (skinName) => {
    const colors = getColors(skinName);

    return create({
        base: 'light',

        brandTitle: 'Mistica',
        brandUrl: 'https://github.com/Telefonica/mistica',
        brandImage: logo,

        colorSecondary: colors.primary,

        // Typography
        fontBase: "-apple-system, 'Roboto', 'Helvetica', 'Arial', sans-serif",
        fontCode: 'monospace',

        // Text colors
        textColor: colors.textPrimary,
        textInverseColor: colors.textPrimaryInverse,

        // Toolbar default and active colors
        barTextColor: colors.textSecondary,
        barSelectedColor: colors.primary,
    });
};
