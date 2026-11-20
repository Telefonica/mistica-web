import {test, expect} from '../test-utils/component';
test('DataCard onClose custom label', async ({mount}) => {
    const component = await mount('data-card/Scenario1');
    const closeButton = await component.getByRole('button', {name: 'custom close label', exact: true});
    await closeButton.click();
    await expect(component.getByTestId('closes')).toHaveValue('1');
});
test('DataCard tab order', async ({mount, page}) => {
    const component = await mount('data-card/Scenario2');
    await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Card touchable', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Button Primary', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Button Link', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Device Icon', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Star Checked', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Close label', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
});
test('segregateTouchableContent - touchable target when only title exists', async ({mount}) => {
    const component = await mount('data-card/Scenario3');
    const link = await component.getByRole('link', {name: 'Title', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - touchable target when only pretitle exists', async ({mount}) => {
    const component = await mount('data-card/Scenario4');
    const link = await component.getByRole('link', {name: 'Pretitle', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - touchable target when only headline exists', async ({mount}) => {
    const component = await mount('data-card/Scenario5');
    const link = await component.getByRole('link', {name: 'Headline', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - touchable target when only subtitle exists', async ({mount}) => {
    const component = await mount('data-card/Scenario6');
    const link = await component.getByRole('link', {name: 'Subtitle', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - touchable target when only description exists', async ({mount}) => {
    const component = await mount('data-card/Scenario7');
    const link = await component.getByRole('link', {name: 'Description', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - body content is NOT hidden when segregated', async ({mount}) => {
    const component = await mount('data-card/Scenario8');
    const link = await component.getByRole('link', {name: 'Title', exact: true});
    await expect(link).toHaveCount(1);
});
test('segregateTouchableContent - body content IS aria-hidden when NOT segregated', async ({mount}) => {
    const component = await mount('data-card/Scenario9');
    await expect(component.getByRole('heading', {name: 'Title', exact: true})).toHaveCount(0);
    await expect(component.getByRole('link', {name: 'Title', exact: true})).toHaveCount(0);
    const touchableContent = component.locator('[role="text"]');
    await expect(touchableContent).toHaveCount(1);
});
test('segregateTouchableContent - only one link is rendered when segregated with text content', async ({
    mount,
}) => {
    const component = await mount('data-card/Scenario10');
    const links = component.getByRole('link');
    await expect(links).toHaveCount(1);
    await expect(links.nth(0)).toContainText('Title');
});
test('segregateTouchableContent - only one link is rendered when segregated with touchableAriaLabel and no text', async ({
    mount,
}) => {
    const component = await mount('data-card/Scenario11');
    const links = component.getByRole('link');
    await expect(links).toHaveCount(1);
    await expect(links.nth(0)).toHaveAccessibleName('Custom card label');
});
test('segregateTouchableContent - touchableAriaLabel creates a stretched touchable instead of text touchable', async ({
    mount,
}) => {
    const component = await mount('data-card/Scenario12');
    await expect(component.getByRole('link', {name: 'Custom label', exact: true})).toHaveCount(1);
});
test('segregateTouchableContent - without segregateTouchableContent, the full card content is inside the touchable', async ({
    mount,
}) => {
    const component = await mount('data-card/Scenario13');
    const link = await component.getByRole('link');
    await expect(link.getByText('Title', {exact: true})).toHaveCount(1);
    await expect(link.getByText('Pretitle')).toHaveCount(1);
    await expect(link.getByText('Description')).toHaveCount(1);
});
test('segregateTouchableContent - tab order: card link, footer buttons, top actions, close button', async ({
    mount,
    page,
}) => {
    const component = await mount('data-card/Scenario14');
    await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('link', {name: 'Title', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Button Primary', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Button Link', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Device Icon', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(await component.getByRole('button', {name: 'Close', exact: true})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
});

import type {AccessibleName} from './data-card.story';

const titleFirst = 'Title Headline Pretitle Description Extra line 1 Extra line 2';
const pretitleFirst = 'Pretitle Headline Title Description Extra line 1 Extra line 2';
for (const action of ['href', 'to', 'onPress'] as const) {
    for (const {pretitleAs, titleAs, expectedLabel} of [
        {pretitleAs: undefined, titleAs: undefined, expectedLabel: titleFirst},
        {pretitleAs: 'h1', titleAs: 'h2', expectedLabel: pretitleFirst},
        {pretitleAs: 'h2', titleAs: 'h1', expectedLabel: titleFirst},
    ] as const) {
        test(`DataCard "${action}" label with pretitleAs={${pretitleAs}} and titleAs={${titleAs}}`, async ({
            mount,
        }) => {
            const component = await mount<typeof AccessibleName>('data-card/AccessibleName', {
                action,
                pretitleAs,
                titleAs,
            });
            await expect(
                component.getByRole(action === 'onPress' ? 'button' : 'link', {
                    name: expectedLabel,
                    exact: true,
                })
            ).toHaveCount(1);
        });
    }
}

for (const {pretitleAs, titleAs, expectedTouchableText} of [
    {pretitleAs: undefined, titleAs: undefined, expectedTouchableText: 'Title'},
    {pretitleAs: 'h1', titleAs: 'h2', expectedTouchableText: 'Pretitle'},
    {pretitleAs: 'h2', titleAs: 'h1', expectedTouchableText: 'Title'},
    {pretitleAs: 'h3', titleAs: 'h3', expectedTouchableText: 'Title'},
]) {
    test(`segregateTouchableContent - touchable target with title and pretitle (pretitleAs=${pretitleAs}, titleAs=${titleAs})`, async ({
        mount,
    }) => {
        const component = await mount('data-card/SegregatedHeadings', {pretitleAs, titleAs});
        await expect(component.getByRole('link', {name: expectedTouchableText, exact: true})).toHaveCount(1);
    });
}
