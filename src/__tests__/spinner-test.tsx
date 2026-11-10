import {test, expect} from '../test-utils/component';

test('spinner is accessible', async ({mount}) => {
    const component = await mount('spinner/Loading');
    await expect(component.getByRole('progressbar', {name: 'Cargando'})).toHaveCount(1);
});
test('spinner with aria-hidden is not visible', async ({mount}) => {
    const component = await mount('spinner/Loading', {hidden: true});
    await expect(component.getByRole('progressbar')).toHaveCount(0);
});
