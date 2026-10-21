import * as React from 'react';
import {screen, render} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import Meter from '../meter';

test('Meter custom label', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Meter aria-label="Patata" values={[10, 20, 30]} />
        </ThemeContextProvider>
    );

    const meter = screen.getByRole('meter', {name: 'Patata'});
    expect(meter).toBeInTheDocument();
});

test('Meter default label', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Meter values={[10, 20, 30]} />
        </ThemeContextProvider>
    );

    const expectedLabel =
        'Indicador de progreso con 3 secciones, total 60% de 100%. Sección 1: 10%. Sección 2: 20%. Sección 3: 30%';

    const meter = screen.getByRole('meter', {name: expectedLabel});
    expect(meter).toBeInTheDocument();
});

describe('Circular Meter completion', () => {
    const getFullRing = () => {
        const meter = screen.getByRole('meter');
        // SVG geometry has no semantic query; check that the visible ring is closed and unmasked.
        // eslint-disable-next-line testing-library/no-node-access
        return meter.querySelector('svg > circle');
    };

    test.each([[100], [0, 100], [100, 0], [0, 100, 0]].map((values) => ({values})))(
        'renders a complete ring for a single full segment: $values',
        ({values}) => {
            render(
                <ThemeContextProvider theme={makeTheme()}>
                    <Meter type="circular" values={values} width={100} />
                </ThemeContextProvider>
            );

            const meter = screen.getByRole('meter');
            const ring = getFullRing();
            expect(ring).toHaveAttribute('cx', '50');
            expect(ring).toHaveAttribute('cy', '50');
            expect(ring).toHaveAttribute('r', '47');
            expect(ring).toHaveAttribute('fill', 'none');
            expect(ring).not.toHaveAttribute('mask');
            expect(meter).toHaveAttribute('aria-valuenow', '100');
        }
    );

    test.each([[0], [99], [99.999], [50, 50]].map((values) => ({values})))(
        'preserves gaps for partial or multiple segments: $values',
        ({values}) => {
            render(
                <ThemeContextProvider theme={makeTheme()}>
                    <Meter type="circular" values={values} width={100} />
                </ThemeContextProvider>
            );

            expect(getFullRing()).not.toBeInTheDocument();
        }
    );

    test('updates between partial and complete rings', () => {
        const renderMeter = (value: number) => (
            <ThemeContextProvider theme={makeTheme()}>
                <Meter type="circular" values={[value]} width={100} />
            </ThemeContextProvider>
        );
        const {rerender} = render(renderMeter(50));
        expect(getFullRing()).not.toBeInTheDocument();

        rerender(renderMeter(100));
        expect(getFullRing()).toBeInTheDocument();

        rerender(renderMeter(50));
        expect(getFullRing()).not.toBeInTheDocument();
    });
});
