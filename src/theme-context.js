// @flow
import * as React from 'react';
import {baseTheme} from './theme';

import type {Theme} from './theme';

const ThemeContext: React.Context<?Theme> = React.createContext(
    process.env.NODE_ENV === 'test' ? baseTheme : null
);

export default ThemeContext;
