// @flow
import logo from '../img/mistica-react-logo.svg';
import {getColors} from '../src';
import {create} from '@storybook/theming/create';

const createTheme = (skin: 'Movistar' | 'Vivo' | 'O2'): any => {
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
