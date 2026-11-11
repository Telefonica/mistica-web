import {test, expect} from '../test-utils/component';

import type {AccessibleName} from './media-card.story';

const titleFirst = 'Title Headline Pretitle Description Extra line 1 Extra line 2';
const pretitleFirst = 'Pretitle Headline Title Description Extra line 1 Extra line 2';
for (const action of ['href', 'to', 'onPress'] as const) {
    for (const {pretitleAs, titleAs, expectedLabel} of [
        {pretitleAs: undefined, titleAs: undefined, expectedLabel: titleFirst},
        {pretitleAs: 'h1', titleAs: 'h2', expectedLabel: pretitleFirst},
        {pretitleAs: 'h2', titleAs: 'h1', expectedLabel: titleFirst},
    ] as const) {
        test(`MediaCard "${action}" label with pretitleAs={${pretitleAs}} and titleAs={${titleAs}}`, async ({
            mount,
        }) => {
            const component = await mount<typeof AccessibleName>('media-card/AccessibleName', {
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
test('MediaCard onClose custom label', async ({mount}) => {
    const component = await mount('media-card/Closable');
    await component.getByRole('button', {name: 'custom close label'}).click();
    await expect(component.getByTestId('closes')).toHaveValue('1');
});
for (const mediaPosition of ['top', 'left', 'right']) {
    test(`MediaCard tab order with video - mediaPosition ${mediaPosition}`, async ({mount, page}) => {
        await mount('media-card/VideoTabOrder', {mediaPosition});
        await expect(page.getByRole('button', {name: 'Pausar'})).toBeVisible();
        await expect(page.locator('body')).toBeFocused();
        for (const name of [
            'Pausar',
            'Card touchable',
            'Button Primary',
            'Button Link',
            'Device Icon',
            'Star Checked',
            'Close label',
        ]) {
            await page.keyboard.press('Tab');
            await expect(page.getByRole('button', {name, exact: true})).toBeFocused();
        }
        await page.keyboard.press('Tab');
        await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true);
    });
}
