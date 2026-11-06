import {test, expect} from '../test-utils/component';

test('Overlay click should not be propagated', async ({mount}) => {
    const component = await mount('overlay/ClickPropagation');
    await component.getByTestId('overlay').click();
    await expect(component.getByTestId('overlay-calls')).toHaveValue('1');
    await expect(component.getByTestId('parent-calls')).toHaveValue('0');
});
