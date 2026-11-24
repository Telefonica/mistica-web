import {DEFAULT_DENSITY, DENSITIES} from '../../src/density/definitions.ts';

import type {Density, DensityCategory, DensityValue} from '../../src/density/definitions.ts';
import type {Breakpoint, BreakpointValue, TextTokenValue, TokenValue} from './token-types.ts';

/**
 * The name in the token file of each theme category that can change with the density. The Record type asks for an
 * entry for each category of DENSITY_CATEGORIES.
 */
const TOKEN_FILE_CATEGORY: Record<DensityCategory, string> = {
    textPresets: 'text',
    spacing: 'spacing',
    borderRadii: 'radius',
};

const BREAKPOINTS: ReadonlyArray<Breakpoint> = ['mobile', 'desktop'];

export const isDensityValue = <T>(value: unknown): value is DensityValue<T> =>
    typeof value === 'object' && value !== null && 'density' in value;

export const isBreakpointValue = <T>(value: unknown): value is BreakpointValue<T> =>
    typeof value === 'object' && value !== null && BREAKPOINTS.every((breakpoint) => breakpoint in value);

const DENSITY_TOKEN_CATEGORIES: ReadonlyArray<string> = Object.values(TOKEN_FILE_CATEGORY);

const findDensityPaths = (value: unknown, path: Array<string>): Array<string> => {
    if (typeof value !== 'object' || value === null) {
        return [];
    }
    if (isDensityValue(value)) {
        return [path.join('.')];
    }
    return Object.entries(value).flatMap(([key, child]) => findDensityPaths(child, [...path, key]));
};

/**
 * Stops the generation when the schema puts a density value in a category that the generator does not read
 * yet. Otherwise the skin gets an object where it expects a scalar, without any error.
 *
 * assertDensityInSupportedCategories({light: {textPrimary: {value: {density: {cozy: '{palette.white}'}}}}})
 * // throws: Density is not supported in light.textPrimary.value
 */
export const assertDensityInSupportedCategories = (designTokens: object): void => {
    const unsupportedPaths = Object.entries(designTokens)
        .filter(([category]) => !DENSITY_TOKEN_CATEGORIES.includes(category))
        .flatMap(([category, tokens]) => findDensityPaths(tokens, [category]));

    if (unsupportedPaths.length > 0) {
        throw new Error(
            `Density is not supported in ${unsupportedPaths.join(', ')}. ` +
                `Supported categories: ${DENSITY_TOKEN_CATEGORIES.join(', ')}`
        );
    }
};

const assertKnownDensityModes = (value: DensityValue<unknown>): void => {
    const unknownModes = Object.keys(value.density).filter((mode) => !DENSITIES.includes(mode as Density));
    if (unknownModes.length > 0) {
        throw new Error(
            `Unknown density mode ${unknownModes.join(', ')} in ${JSON.stringify(value)}. ` +
                `Supported modes: ${DENSITIES.join(', ')}`
        );
    }
};

/**
 * Maps every leaf of a value (a scalar or the scalar of a density mode) and keeps the density structure.
 *
 * mapDensityLeaves({density: {cozy: '8', compact: '4'}}, toPx) // {density: {cozy: '8px', compact: '4px'}}
 * mapDensityLeaves('8', toPx) // '8px'
 */
export const mapDensityLeaves = <T, R>(
    value: T | DensityValue<T>,
    mapLeaf: (leaf: T) => R
): R | DensityValue<R> => {
    const mapScalar = (leaf: unknown): R => {
        // An object here is a density value without the reserved key, for example {default: 12, compact: 8}
        if (typeof leaf === 'object' && leaf !== null) {
            throw new Error(
                `Unknown token value ${JSON.stringify(leaf)}. Expected a scalar or {density: {cozy, ...}}`
            );
        }
        return mapLeaf(leaf as T);
    };

    if (!isDensityValue<T>(value)) {
        return mapScalar(value);
    }

    assertKnownDensityModes(value);

    if (!(DEFAULT_DENSITY in value.density)) {
        throw new Error(`The ${DEFAULT_DENSITY} density mode is missing in ${JSON.stringify(value)}`);
    }

    return {
        density: Object.fromEntries(
            Object.entries(value.density).map(([mode, leaf]) => [mode, mapScalar(leaf)])
        ) as DensityValue<R>['density'],
    };
};

/**
 * mistica-web reads the breakpoint first and the density after it. A value without breakpoints applies to both.
 *
 * normalizeToBreakpoints(8) // {mobile: 8, desktop: 8}
 * normalizeToBreakpoints({density: {cozy: 12, compact: 8}}) // {mobile: {density: {...}}, desktop: {density: {...}}}
 */
export const normalizeToBreakpoints = <T>(value: TokenValue<T>): BreakpointValue<T | DensityValue<T>> => {
    if (isBreakpointValue<T | DensityValue<T>>(value)) {
        return {
            mobile: mapDensityLeaves(value.mobile, (leaf: T) => leaf),
            desktop: mapDensityLeaves(value.desktop, (leaf: T) => leaf),
        };
    }
    const leaf = mapDensityLeaves(value, (scalar: T) => scalar);
    return {mobile: leaf, desktop: leaf};
};

const RESPONSIVE_TEXT_ATTRIBUTES = ['size', 'lineHeight'];

/**
 * The size and the line height change with the breakpoint. Any other text attribute, like the weight, can change
 * with the density only.
 *
 * normalizeTextTokenValue('size', 16) // {mobile: 16, desktop: 16}
 * normalizeTextTokenValue('weight', 'bold') // 'bold'
 */
export const normalizeTextTokenValue = (textAttribute: string, value: TextTokenValue): unknown =>
    RESPONSIVE_TEXT_ATTRIBUTES.includes(textAttribute)
        ? normalizeToBreakpoints(value as TokenValue<number>)
        : mapDensityLeaves(value, (leaf) => leaf);

/**
 * resolveDensity({density: {cozy: 12, compact: 8}}, 'compact') // 8
 * resolveDensity({density: {cozy: 12}}, 'compact') // 12, a missing mode takes the cozy value
 * resolveDensity(12, 'compact') // 12
 */
export const resolveDensity = <T>(value: T | DensityValue<T>, mode: Density): T => {
    if (!isDensityValue<T>(value)) {
        return value;
    }
    return value.density[mode] ?? value.density[DEFAULT_DENSITY];
};
