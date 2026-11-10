import {test, expect} from '../test-utils/component';

test('One button is rendered', async ({mount}) => {
    const component = await mount('button-layout/Buttons');
    await expect(component.getByRole('button')).toHaveCount(1);
});
test('Two buttons are rendered', async ({mount}) => {
    const component = await mount('button-layout/Buttons', {secondary: true});
    await expect(component.getByRole('button')).toHaveCount(2);
});
