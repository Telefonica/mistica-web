/**
 * Entry point of @telefonica/mistica/icon-runtime, which @telefonica/mistica-icons consumes.
 *
 * A generated icon reads the theme of this package, so it needs these four values and this type. It
 * must not reach them through src/index.tsx: that barrel exports the components that render an icon,
 * and the import closes a dependency cycle. A module level read of an icon inside that cycle sees an
 * incomplete module. See doc/module-federation.md for the sharing rule that this entry point needs.
 *
 * This entry point is the only public home of useIconGradient, because only an icon uses that hook.
 *
 * Every module below is a leaf, so this file adds no cycle. Keep it that way.
 */
export {vars as skinVars} from './skins/skin-contract.css';
export {useTheme} from './hooks';
export {useThemeVariant} from './theme-variant-context';
export {useIconGradient} from './utils/icon-gradient';

export type {IconProps} from './utils/types';
