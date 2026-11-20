import {test, expect} from '../test-utils/component';

test('MainNavigationBar section with interaction is accessible', async ({mount, page}) => {
    const component = await mount('main-navigation-bar/Scenario1');
    const firstSection = component.getByRole('button', {name: 'section 1', exact: true});
    const firstMenu = component.getByRole('button', {name: /^section 1,/});
    const secondMenu = component.getByRole('button', {name: /^section 2,/});
    await expect(firstSection).toHaveCount(1);
    await expect(firstMenu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByText('item 1-1', {exact: true})).toHaveCount(0);
    await expect(page.getByText('item 2-1', {exact: true})).toHaveCount(0);
    await firstMenu.focus();
    await firstMenu.press('Enter');
    await expect(page.getByRole('button', {name: 'item 1-1'})).toHaveCount(1);
    await expect(page.getByRole('link', {name: /item 1-2/})).toHaveCount(1);
    await expect(page.getByRole('link', {name: /item 1-3/})).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'item 2-1'})).toHaveCount(0);
    await page.mouse.move(0, 700);
    await expect(component.getByTestId('presses')).toHaveValue('0');
    await firstSection.click();
    await expect(component.getByTestId('presses')).toHaveValue('1');
    await expect(secondMenu).toHaveAttribute('aria-expanded', 'false');
    await secondMenu.hover();
    await expect(firstMenu).toHaveAttribute('aria-expanded', 'false');
    await expect(secondMenu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('item 2-1', {exact: true})).toHaveCount(1);
    await expect(page.getByText('item 1-1', {exact: true})).toHaveCount(0);
    await page.keyboard.press('Escape');
    for (const menu of [firstMenu, secondMenu]) {
        await expect(menu).toHaveAttribute('aria-expanded', 'false');
        await expect(menu).toHaveAttribute('aria-haspopup', 'true');
    }
    await expect(page.getByText('item 1-1', {exact: true})).toHaveCount(0);
    await expect(page.getByText('item 2-1', {exact: true})).toHaveCount(0);
});

test('MainNavigationBar menu closeMenu callback closes the menu', async ({mount, page}) => {
    const component = await mount('main-navigation-bar/Scenario2');
    const section = component.getByRole('button', {name: /^section 1,/});
    await section.hover();
    await expect(section).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('button', {name: 'Close menu'}).click();
    await expect(section).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByText('Close menu', {exact: true})).toHaveCount(0);
});
