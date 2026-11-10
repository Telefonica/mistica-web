import {test, expect} from '../test-utils/component';

for (const method of ['esc', 'overlay', 'x']) {
    test(`Drawer dismiss: ${method}`, async ({mount, page}) => {
        const component = await mount('drawer/Actions');
        await component.getByRole('button', {name: 'open'}).click();
        await expect(page.getByRole('dialog')).toHaveCount(1);
        if (method === 'esc') await page.keyboard.press('Escape');
        else if (method === 'overlay')
            await page.getByTestId('drawerOverlay').click({position: {x: 1, y: 1}});
        else await page.getByRole('button', {name: 'CustomDismissLabel'}).click();
        await expect(page.getByRole('dialog')).toHaveCount(0);
        await expect(component.getByTestId('calls')).toHaveValue('["dismiss"]');
    });
}
test('Drawer restores focus to the trigger when closed', async ({mount, page}) => {
    const component = await mount('drawer/Actions');
    const trigger = component.getByRole('button', {name: 'open'});
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toHaveCount(1);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(trigger).toBeFocused();
});
for (const [method, label] of [
    ['primary', 'Primary'],
    ['secondary', 'Secondary'],
    ['link', 'Link'],
]) {
    test(`Drawer close: ${method}`, async ({mount, page}) => {
        const component = await mount('drawer/Actions');
        await component.getByRole('button', {name: 'open'}).click();
        await expect(page.getByRole('dialog')).toHaveCount(1);
        await page.getByRole('button', {name: label, exact: true}).click();
        await expect(page.getByRole('dialog')).toHaveCount(0);
        await expect(component.getByTestId('calls')).toHaveValue(JSON.stringify([method]));
    });
}
