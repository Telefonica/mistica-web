import {test, expect} from '../test-utils/component';

import type {Locator} from '@playwright/test';

const expectSelected = async (component: Locator, selected: number) => {
    for (const index of [1, 2, 3]) {
        await expect(component.getByRole('option', {name: `text${index}`})).toHaveJSProperty(
            'selected',
            index === selected
        );
    }
};
test('select happy case', async ({mount}) => {
    const component = await mount('select/Selection');
    await component.getByLabel('selectLabel').selectOption('value2');
    await expectSelected(component, 2);
    await expect(component.getByTestId('calls')).toHaveValue('["value2"]');
});
for (const mode of ['controlled', 'default']) {
    test(`select with ${mode} value`, async ({mount}) => {
        const component = await mount('select/Selection', {mode});
        await expectSelected(component, 2);
        await component.getByLabel('selectLabel').selectOption('value3');
        await expectSelected(component, 3);
    });
}
