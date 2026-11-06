import {test, expect} from '../test-utils/component';

test('target was painted', async ({mount}) => {
    const component = await mount('tooltip/Content', {position: 'bottom'});
    await expect(component.getByText('Press me!')).toHaveCount(1);
});
test('does not render content initially', async ({mount, page}) => {
    await mount('tooltip/Content', {position: 'bottom'});
    await expect(page.getByText('Content', {exact: true})).toHaveCount(0);
});
test('render content after press down target', async ({mount, page}) => {
    const component = await mount('tooltip/Content', {position: 'bottom'});
    await component.getByText('Press me!').click();
    await expect(page.getByText('Content', {exact: true})).toHaveCount(1);
});
test('set title and description', async ({mount, page}) => {
    const component = await mount('tooltip/Content', {title: 'Title', description: 'Description'});
    await component.getByText('Press me!').click();
    await expect(page.getByText('Title', {exact: true})).toHaveCount(1);
    await expect(page.getByText('Description', {exact: true})).toHaveCount(1);
});
test('click anchor does not close tooltip', async ({mount, page}) => {
    const component = await mount('tooltip/Anchor');
    await component.getByText('Press me!').hover();
    const link = page.getByRole('link', {name: 'Link'});
    await expect(link).toBeVisible();
    await link.click();
    await expect(component.getByTestId('calls')).toHaveValue('1');
    await expect(page.locator('.content')).toContainText('Content');
});
test('tooltip with controlled value', async ({mount, page}) => {
    const component = await mount('tooltip/Controlled');
    await expect(page.getByText('Content', {exact: true})).toHaveCount(0);
    await component.getByRole('button', {name: 'Button', exact: true}).click();
    await expect(page.getByText('Content', {exact: true})).toHaveCount(1);
    await component.getByRole('button', {name: 'Button', exact: true}).click();
    await expect(page.getByText('Content', {exact: true})).toHaveCount(0);
});
