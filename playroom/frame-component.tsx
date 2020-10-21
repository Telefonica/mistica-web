import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {ThemeContextProvider} from '../src';

import type {ThemeConfig} from '../src';

type Props = {children: React.ReactNode; theme: ThemeConfig};

const FrameComponent = ({children, theme}: Props): React.ReactNode => {
    // @ts-expect-error __playroom_theme__ does not exist in window
    window.__playroom_theme__ = {
        colors: theme.skin.colors,
    };
    return <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>;
};

export default FrameComponent;
