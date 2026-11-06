import {test, expect} from '../test-utils/component';

test('Row actions in collapsed-rows mode are accessible', async ({mount, page}) => {
    await page.setViewportSize({width: 375, height: 812});
    const component = await mount('table/RowActions');
    await component.getByRole('button', {name: 'action 1'}).click();
    await component.getByRole('button', {name: 'action 2'}).click();
    await expect(component.getByTestId('action-calls')).toHaveValue('[1,1]');
});
