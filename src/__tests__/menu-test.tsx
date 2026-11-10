import {test, expect} from '../test-utils/component';

import type {Options} from './menu.story';

test('Menu closes after pressing an option', async ({mount, page}) => {
    let presses = 0;
    await mount<typeof Options>('menu/Options', {
        onPress: () => {
            presses++;
        },
    });
    await expect(page.getByText('menu is close')).toHaveCount(1);
    await page.getByText('menu is close').click();
    await expect(page.getByText('menu is open')).toHaveCount(1);
    for (const name of ['Option 1', 'Option 2', 'Option 3'])
        await expect(page.getByRole('menuitem', {name})).toBeVisible();
    await page.getByRole('menuitem', {name: 'Option 1'}).click();
    await expect.poll(() => presses).toBe(1);
    await expect(page.getByText('menu is close')).toHaveCount(1);
    for (const name of ['Option 1', 'Option 2', 'Option 3'])
        await expect(page.getByText(name)).toHaveCount(0);
});
test('Menu closes after clicking an href option', async ({mount, page}) => {
    const navigations: Array<string> = [];
    let closedBeforeNavigation = false;
    await page.exposeFunction('recordMenuBeforeUnload', (closed: boolean) => {
        closedBeforeNavigation = closed;
    });
    await page.route('https://example.com/', (route) => {
        navigations.push(route.request().url());
        return route.fulfill({body: 'Destination'});
    });
    await mount('menu/Options', {kind: 'href'});
    await page.getByText('menu is close').click();
    await expect(page.getByText('menu is open')).toHaveCount(1);
    await page.evaluate(() => {
        window.addEventListener('beforeunload', () => {
            (window as unknown as {recordMenuBeforeUnload: (closed: boolean) => void}).recordMenuBeforeUnload(
                document.body.textContent?.includes('menu is close') ?? false
            );
        });
    });
    const item = page.getByRole('menuitem', {name: 'External link'});
    await expect(item).toHaveJSProperty('tagName', 'A');
    await expect(item).toHaveAttribute('href', 'https://example.com');
    await item.click();
    await expect(page).toHaveURL('https://example.com/');
    expect(navigations).toEqual(['https://example.com/']);
    expect(closedBeforeNavigation).toBe(true);
});
test('Menu closes after clicking a "to" option', async ({mount, page}) => {
    await mount('menu/Options', {kind: 'to'});
    await page.getByText('menu is close').click();
    await expect(page.getByText('menu is open')).toHaveCount(1);
    const item = page.getByRole('menuitem', {name: 'Internal link'});
    await expect(item).toHaveJSProperty('tagName', 'A');
    await expect(item).toHaveAttribute('href', '/interna');
    await expect(page.getByText('Current path: /', {exact: true})).toHaveCount(1);
    await item.click();
    await expect(page.getByText('Current path: /interna', {exact: true})).toHaveCount(1);
    await expect(page.getByText('menu is close')).toHaveCount(1);
});
