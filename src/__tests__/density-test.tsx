import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {DensityProvider, useDensity} from '../density/density-provider';
import {resolveDensityConfig} from '../density/resolve';
import {useTheme} from '../hooks';
import {Portal} from '../portal';
import {getTelefonicaSkin} from '../skins/telefonica';
import {getBlauSkin} from '../skins/blau';
import {getEsimflagSkin} from '../skins/esimflag';
import {getMovistarSkin} from '../skins/movistar';
import {getO2Skin} from '../skins/o2';
import {getVivoSkin} from '../skins/vivo';
import {getVivoEvolutionSkin} from '../skins/vivo-evolution';
import {getCyberSkin} from '../community/skins/cyber-skin';
import {DENSITIES} from '../density/definitions';
import {makeTheme} from './test-utils';

import type {Theme} from '../theme';

const DensityReport = ({name}: {name: string}): JSX.Element => {
    const density = useDensity();
    const {spacing} = useTheme();
    return (
        <p>
            {name}: {density} {spacing.buttonDefaultPadding.top.desktop}
        </p>
    );
};

const theme = makeTheme({skin: getTelefonicaSkin()});

test('the theme density is cozy by default', () => {
    render(
        <ThemeContextProvider theme={theme}>
            <DensityReport name="root" />
        </ThemeContextProvider>
    );

    expect(screen.getByText('root: cozy 12')).toBeInTheDocument();
});

test('ThemeContextProvider resolves the tokens for its density', () => {
    render(
        <ThemeContextProvider theme={theme} density="compact">
            <DensityReport name="root" />
        </ThemeContextProvider>
    );

    expect(screen.getByText('root: compact 8')).toBeInTheDocument();
});

test('DensityProvider overrides the density of its subtree only', () => {
    render(
        <ThemeContextProvider theme={theme}>
            <DensityReport name="root" />
            <DensityProvider density="compact">
                <DensityReport name="compact subtree" />
                <DensityProvider density="cozy">
                    <DensityReport name="nested cozy subtree" />
                </DensityProvider>
            </DensityProvider>
        </ThemeContextProvider>
    );

    expect(screen.getByText('root: cozy 12')).toBeInTheDocument();
    expect(screen.getByText('compact subtree: compact 8')).toBeInTheDocument();
    expect(screen.getByText('nested cozy subtree: cozy 12')).toBeInTheDocument();
});

test('DensityProvider marks its subtree for the density css rules', () => {
    render(
        <ThemeContextProvider theme={theme}>
            <DensityProvider density="compact">
                <DensityReport name="compact subtree" />
            </DensityProvider>
        </ThemeContextProvider>
    );

    // The wrapper has no role, and data-mistica-density has no Testing Library query
    // eslint-disable-next-line testing-library/no-node-access
    const wrapper = screen.getByText('compact subtree: compact 8').parentElement;
    expect(wrapper).toHaveAttribute('data-mistica-density', 'compact');
    expect(wrapper).toHaveStyle({display: 'contents'});
});

test('a Portal takes the density of the nearest DensityProvider', async () => {
    render(
        <ThemeContextProvider theme={theme} density="compact">
            <Portal>
                <DensityReport name="global portal" />
            </Portal>
            <DensityProvider density="cozy">
                <Portal>
                    <DensityReport name="cozy portal" />
                </Portal>
            </DensityProvider>
        </ThemeContextProvider>
    );

    // The portal container has no role, and data-mistica-density has no Testing Library query
    /* eslint-disable testing-library/no-node-access */
    const globalPortal = (await screen.findByText('global portal: compact 8')).parentElement;
    const cozyPortal = (await screen.findByText('cozy portal: cozy 12')).parentElement;
    /* eslint-enable testing-library/no-node-access */
    expect(globalPortal).toHaveAttribute('data-mistica-density', 'compact');
    expect(cozyPortal).toHaveAttribute('data-mistica-density', 'cozy');
});

test('ThemeContextProvider writes density rules only for the vars that change with the density', () => {
    // ThemeContextProvider skips its styles in unit tests, except in the SSR ones
    const previousSsrTest = process.env.SSR_TEST;
    process.env.SSR_TEST = 'true';
    try {
        const {container} = render(
            <ThemeContextProvider theme={theme}>
                <p>content</p>
            </ThemeContextProvider>
        );
        // A style element has no role
        // eslint-disable-next-line testing-library/no-node-access
        const styles = container.querySelector('style')?.textContent ?? '';

        const compactRule = styles.match(/:root \[data-mistica-density="compact"\] \{([^}]*)\}/)?.[1] ?? '';
        expect(compactRule).toMatch(/iconButtonDefaultPadding[^:]*:8px/);
        expect(compactRule).not.toMatch(/buttonDefaultPadding-left/);

        const cozyRule = styles.match(/:root \[data-mistica-density="cozy"\] \{([^}]*)\}/)?.[1] ?? '';
        expect(cozyRule).toMatch(/iconButtonDefaultPadding[^:]*:12px/);
    } finally {
        process.env.SSR_TEST = previousSsrTest;
    }
});

test('ThemeContextProvider writes a mobile density rule only for the values that differ from desktop', () => {
    // ThemeContextProvider skips its styles in unit tests, except in the SSR ones
    const previousSsrTest = process.env.SSR_TEST;
    process.env.SSR_TEST = 'true';
    try {
        const {container} = render(
            <ThemeContextProvider theme={theme}>
                <p>content</p>
            </ThemeContextProvider>
        );
        // A style element has no role
        // eslint-disable-next-line testing-library/no-node-access
        const styles = container.querySelector('style')?.textContent ?? '';
        const countRules = (density: string) =>
            styles.split(`:root [data-mistica-density="${density}"] {`).length - 1;

        // Compact uses the mobile values, so its desktop rule is enough on mobile too
        expect(countRules('compact')).toBe(1);
        expect(countRules('cozy')).toBe(2);
        // The theme element never has the density attribute itself
        expect(styles).not.toMatch(/:root\[data-mistica-density/);
    } finally {
        process.env.SSR_TEST = previousSsrTest;
    }
});

test('a text weight can change with the density', () => {
    const skin = getTelefonicaSkin();
    const WeightReport = (): JSX.Element => <p>weight: {useTheme().textPresets.cardTitle.weight}</p>;

    render(
        <ThemeContextProvider
            theme={makeTheme({
                skin: {
                    ...skin,
                    textPresets: {
                        ...skin.textPresets,
                        cardTitle: {weight: {density: {cozy: 'regular', compact: 'bold'}}},
                    },
                },
            })}
            density="compact"
        >
            <WeightReport />
        </ThemeContextProvider>
    );

    expect(screen.getByText('weight: bold')).toBeInTheDocument();
});

test('a density mode without a value takes the cozy value', () => {
    const tokens = {
        top: {mobile: {density: {cozy: 12}}, desktop: 20},
        bottom: {mobile: {density: {cozy: 12, compact: 8}}, desktop: {density: {cozy: 16, compact: 4}}},
    };

    expect(resolveDensityConfig(tokens, 'compact')).toEqual({
        top: {mobile: 12, desktop: 20},
        bottom: {mobile: 8, desktop: 4},
    });
});

const findUnresolvedDensityPaths = (
    value: unknown,
    path: string,
    visited = new Set<object>()
): Array<string> => {
    if (typeof value !== 'object' || value === null || visited.has(value)) {
        return [];
    }
    visited.add(value);
    // The theme has a density field too, but its value is a string, not an object of modes
    const density = (value as {density?: unknown}).density;
    if (typeof density === 'object' && density !== null) {
        return [path];
    }
    return Object.entries(value).flatMap(([key, child]) =>
        findUnresolvedDensityPaths(child, `${path}.${key}`, visited)
    );
};

const skins = [
    getBlauSkin(),
    getEsimflagSkin(),
    getMovistarSkin(),
    getO2Skin(),
    getTelefonicaSkin(),
    getVivoSkin(),
    getVivoEvolutionSkin(),
    getCyberSkin(),
];

test.each(skins.flatMap((skin) => DENSITIES.map((density) => [skin.name, density, skin] as const)))(
    'the %s theme in %s density has no density value left',
    (_skinName, density, skin) => {
        let theme: Theme | undefined;
        const ThemeReader = (): null => {
            theme = useTheme();
            return null;
        };

        render(
            <ThemeContextProvider theme={makeTheme({skin})} density={density}>
                <ThemeReader />
            </ThemeContextProvider>
        );

        expect(findUnresolvedDensityPaths(theme, 'theme')).toEqual([]);
    }
);
