'use client';
import {getSharedContext} from './utils/shared-context';

import type {Theme} from './theme';

const ThemeContext = getSharedContext<Theme | null>('theme', null);

export const THEME_SCOPE_ATTRIBUTE = 'data-mistica-theme';

/**
 * The scope id of the nearest ThemeContextProvider that writes its css vars for its own element (the `as` prop).
 * An element that renders out of that element (for example the container of a Portal, in the body) copies the
 * id to stay inside the scope.
 */
export const ThemeScopeContext = getSharedContext<string | null>('theme-scope', null);

export default ThemeContext;
