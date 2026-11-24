import {DENSITY_CATEGORIES} from './definitions';

import type {Density, DensityCategory, DensityValue} from './definitions';
import type {MaybeDensityConfig} from '../skins/types';
import type {Theme} from '../theme';

/**
 * The config of the density categories for one density, with plain values.
 */
export type SkinConfigForDensity = Pick<Theme, DensityCategory>;

/**
 * The same config before a density is picked: every leaf can be a density value.
 */
export type MaybeDensitySkinConfig = {[K in DensityCategory]: MaybeDensityConfig<SkinConfigForDensity[K]>};

type ResolvedDensity<T> =
    T extends DensityValue<infer V> ? V : T extends object ? {[K in keyof T]: ResolvedDensity<T[K]>} : T;

const isDensityValue = (value: unknown): value is DensityValue<unknown> =>
    typeof value === 'object' && value !== null && 'density' in value;

export const resolveDensityConfig = <T>(config: T, density: Density): ResolvedDensity<T> => {
    if (isDensityValue(config)) {
        return (config.density[density] ?? config.density.cozy) as ResolvedDensity<T>;
    }

    if (typeof config !== 'object' || config === null) {
        return config as ResolvedDensity<T>;
    }

    return Object.fromEntries(
        Object.entries(config).map(([key, value]) => [key, resolveDensityConfig(value, density)])
    ) as ResolvedDensity<T>;
};

export const getSkinConfigForDensity = (
    maybeDensitySkinConfig: MaybeDensitySkinConfig,
    density: Density
): SkinConfigForDensity =>
    Object.fromEntries(
        DENSITY_CATEGORIES.map((category) => [
            category,
            resolveDensityConfig(maybeDensitySkinConfig[category], density),
        ])
    ) as SkinConfigForDensity;
