import {test, expect} from '../test-utils/component';

test('Meter custom label', async ({mount}) => {
    const component = await mount('meter/Progress', {label: 'Patata'});
    await expect(component.getByRole('meter', {name: 'Patata'})).toHaveCount(1);
});
test('Meter default label', async ({mount}) => {
    const component = await mount('meter/Progress');
    await expect(
        component.getByRole('meter', {
            name: 'Indicador de progreso con 3 secciones, total 60% de 100%. Sección 1: 10%. Sección 2: 20%. Sección 3: 30%',
        })
    ).toHaveCount(1);
});
