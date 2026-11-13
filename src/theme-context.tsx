'use client';
import {getSharedContext} from './utils/shared-context';

import type {Theme} from './theme';

const ThemeContext = getSharedContext<Theme | null>('theme', null);

export default ThemeContext;
