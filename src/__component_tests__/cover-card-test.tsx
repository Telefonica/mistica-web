import {test, expect} from '../test-utils/component';

test('CoverCard tab order with video', async ({mount, page}) => {
    await mount('cover-card/VideoTabOrder');
    await expect(page.getByRole('button', {name: 'Pausar'})).toBeVisible();
    await expect(page.locator('body')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Pausar'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Card Touchable'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Button Primary'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Button Link'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Device Icon'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Star Checked'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Close label'})).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
});
test('CoverCard with image has media variant', async ({mount}) => {
    const component = await mount('cover-card/ImageVariant');
    await expect(component.getByTestId('slot-element')).toContainText('media');
});
