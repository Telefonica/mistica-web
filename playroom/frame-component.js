// @flow
import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {ThemeContextProvider, getColors} from '../src';

import type {ThemeConfig} from '../src';

const toCamelCase = (str) => {
    const pascalCaseStr = str
        .split('_')
        .map((s) => s[0] + s.slice(1).toLocaleLowerCase())
        .join('');
    return pascalCaseStr[0].toLocaleLowerCase() + pascalCaseStr.slice(1);
};

const buildColors = (skin) => {
    const upperCaseColors = getColors(skin);
    return Object.fromEntries(
        Object.entries(upperCaseColors).map(([colorName, colorValue]) => [toCamelCase(colorName), colorValue])
    );
};

type Props = {children: React.Node, theme: ThemeConfig};

const FrameComponent = ({children, theme}: Props): React.Node => {
    // $FlowFixMe
    window.__playroom_theme__ = {
        colors: buildColors(theme.skin),
    };
    return (
        <MemoryRouter>
            <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
        </MemoryRouter>
    );
};

export default FrameComponent;
