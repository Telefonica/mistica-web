import * as React from 'react';

import type {Theme} from './theme';

const ThemeContext = React.createContext<Theme | null>(null);

export default ThemeContext;
