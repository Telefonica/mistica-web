'use client';
/*
 * Contract between this package and @telefonica/mistica-icons.
 *
 * It is an entry of the vite build, so it becomes dist-es/icon-runtime.js, dist/icon-runtime.js and
 * dist/icon-runtime.d.ts. The icons package reads the file of its own world, and the two packages
 * always release together. There is no entry point at the root of this package for it, because a
 * single file can serve only one of the two worlds.
 *
 * The icons live in a separate package, and they need the theme of this one. The CSS variable names
 * of the skin contract carry the package version (see the vanilla-extract identifiers in
 * vite.config.mjs), so a second compilation of the contract would rename every variable. The icons
 * therefore read the vars object from here at run time.
 *
 * Keep this module small, and treat every change to it as a breaking change for the icons package.
 */
export {useTheme} from './hooks';
export {useThemeVariant} from './theme-variant-context';
export {vars} from './skins/skin-contract.css';
export {useIconGradient} from './utils/icon-gradient';

export type {IconProps} from './utils/types';
