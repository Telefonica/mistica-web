'use client';
import * as React from 'react';
import ThemeContext from '../theme-context';
import {useTheme} from '../hooks';
import {DENSITY_ATTRIBUTE} from './definitions';
import {getSkinConfigForDensity} from './resolve';

import type {Density} from './definitions';
import type {MaybeDensitySkinConfig} from './resolve';

/**
 * ThemeContextProvider shares the skin config before it picks a density, so a DensityProvider can get the config
 * for its own density without a full theme.
 */
export const MaybeDensitySkinConfigContext = React.createContext<MaybeDensitySkinConfig | null>(null);

type DensityProviderProps = {
    density: Density;
    children?: React.ReactNode;
};

/**
 * Overrides the density of the ThemeContextProvider for a subtree.
 */
export const DensityProvider = ({density, children}: DensityProviderProps): JSX.Element => {
    const theme = useTheme();
    const maybeDensitySkinConfig = React.useContext(MaybeDensitySkinConfigContext);

    const densityTheme = React.useMemo(() => {
        if (!maybeDensitySkinConfig) {
            return {...theme, density};
        }
        return {...theme, density, ...getSkinConfigForDensity(maybeDensitySkinConfig, density)};
    }, [theme, maybeDensitySkinConfig, density]);

    // display: contents keeps the wrapper out of the layout of the parent, while the children still inherit
    // the css vars that the density rules of ThemeContextProvider set on it
    return (
        <ThemeContext.Provider value={densityTheme}>
            <div {...{[DENSITY_ATTRIBUTE]: density}} style={{display: 'contents'}}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

/**
 * The roots of the imperative layers (dialog, snackbar, sheet) render far from the caller, so they give the layer
 * the density that the caller had. Without a density, the layer keeps the density of the root.
 */
export const OptionalDensityProvider = ({
    density,
    children,
}: {
    density?: Density;
    children: React.ReactNode;
}): JSX.Element => {
    if (!density) {
        return <>{children}</>;
    }
    return <DensityProvider density={density}>{children}</DensityProvider>;
};

export const useDensity = (): Density => useTheme().density;

/**
 * For the hooks that can run outside a ThemeContextProvider and must not throw there (useDialog, useSnackbar)
 */
export const useOptionalDensity = (): Density | undefined => React.useContext(ThemeContext)?.density;
