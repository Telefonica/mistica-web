import {test, expect} from '../test-utils/component';

test('target is painted', async ({mount}) => {
    const component = await mount('popover/Content');
    await expect(component.getByText('Press me!')).toHaveCount(1);
});
test('popover is painted if open property is true', async ({mount, page}) => {
    await mount('popover/Content', {open: true});
    await expect(page.getByText('Content', {exact: true})).toHaveCount(1);
    await expect(page.getByLabel('Cerrar')).toHaveCount(1);
});
test('popover is not painted if open property is false', async ({mount, page}) => {
    await mount('popover/Content', {open: false});
    await expect(page.getByText('Content', {exact: true})).toHaveCount(0);
});
test('set title and description', async ({mount, page}) => {
    await mount('popover/Content', {open: true, title: 'Title'});
    await expect(page.getByText('Title', {exact: true})).toHaveCount(1);
    await expect(page.getByText('Content', {exact: true})).toHaveCount(1);
});
test('set title and asset', async ({mount, page}) => {
    await mount('popover/Content', {open: true, title: 'Title', withAsset: true});
    await expect(page.getByText('Title', {exact: true})).toHaveCount(1);
    await expect(page.getByTestId('icon')).toHaveCount(1);
});
for (const controlled of [true, false]) {
    test(`popover - ${controlled ? 'controlled' : 'uncontrolled'}`, async ({mount, page}) => {
        const component = await mount('popover/Interactive', {controlled});
        const target = component.getByRole('button', {name: 'Press me!'});
        const content = page.getByText('Content', {exact: true});
        await expect(content).toHaveCount(0);
        await target.click();
        await expect(content).toHaveCount(1);
        await target.click();
        await expect(content).toHaveCount(0);
        await expect(component.getByTestId('closes')).toHaveValue('0');
        await target.click();
        await expect(content).toHaveCount(1);
        await page.getByLabel('Cerrar').click();
        await expect(content).toHaveCount(0);
        await expect(component.getByTestId('closes')).toHaveValue('1');
    });
}
test('popover- close button label is customizable', async ({mount, page}) => {
    const component = await mount('popover/Content', {
        title: 'Title',
        closeButtonLabel: 'custom close label',
    });
    await expect(page.getByLabel('custom close label')).toHaveCount(0);
    await component.getByText('Press me!').click();
    await expect(page.getByLabel('custom close label')).toHaveCount(1);
});
