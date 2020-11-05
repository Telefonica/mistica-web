import '../css/roboto.css';
import '../css/reset.css';
import * as React from 'react';
import {ThemeContextProvider} from '../src';

import type {ThemeConfig} from '../src';

type Props = {children: React.ReactNode; theme: ThemeConfig};

const FrameComponent = ({children, theme}: Props): React.ReactNode => (
    <ThemeContextProvider theme={theme}>{children}</ThemeContextProvider>
);

export default FrameComponent;
