import {create} from 'storybook/theming';
import {getColors, type Skin} from './colors';
import logo from '../img/mistica-logo.svg';

export const createStorybookTheme = (skinName: Skin): ReturnType<typeof create> => {
    const colors = getColors(skinName);

    return create({
        base: 'light',

        brandTitle: 'Mística',
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
        barHoverColor: colors.primary,

        // UI
        appBg: '#ffffff',
        appContentBg: '#ffffff',
    });
};
