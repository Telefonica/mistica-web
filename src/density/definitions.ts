// The density definitions that the library and the token generator (packages/generate-design-tokens) share.
// This module has no imports, because the generator runs it with Node, which can not load the React code of the
// library.

export const DENSITIES = ['cozy', 'compact'] as const;

export type Density = (typeof DENSITIES)[number];

export const DEFAULT_DENSITY = 'cozy' satisfies Density;

/**
 * A value that changes with the density. The value of the default density is mandatory: a density mode
 * without a value takes the default one.
 */
export type DensityValue<T> = {
    density: Record<typeof DEFAULT_DENSITY, T> & Partial<Record<Density, T>>;
};

/**
 * The theme categories that can change with the density. To add a category, add it here: tsc names every place
 * that needs code for it, in the library and in the generator.
 */
export const DENSITY_CATEGORIES = ['textPresets', 'spacing', 'borderRadii'] as const;

export type DensityCategory = (typeof DENSITY_CATEGORIES)[number];

/**
 * The attribute that selects the density of a subtree. The css rules of the library and of the static css files
 * match it.
 */
export const DENSITY_ATTRIBUTE = 'data-mistica-density';
