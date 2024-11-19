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
