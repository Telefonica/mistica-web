import {test, expect} from '../test-utils/component';

import type {Page} from '@playwright/test';

const expectDisabledScroll = async (page: Page) => {
    await expect
        .poll(() =>
            page.locator('body').evaluate((node) => {
                const style = (node as HTMLElement).style;
                return {
                    background: style.background,
                    overflowX: style.overflowX,
                    overflowY: style.overflowY,
                    position: style.position,
                    top: style.top,
                    left: style.left,
                    right: style.right,
                    overscrollBehaviorY: style.overscrollBehaviorY,
                };
            })
        )
        .toEqual({
            background: 'red',
            overflowX: 'hidden',
            overflowY: 'hidden',
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            overscrollBehaviorY: 'contain',
        });
};
test('useDisableScroll: happy case', async ({mount, page}) => {
    const component = await mount('hooks/Single');
    await expect(component.getByText('scroll is disabled')).toHaveCount(0);
    const toggle = component.getByRole('button', {name: 'toggle', exact: true});
    await toggle.click();
    await expect(component.getByText('scroll is disabled')).toHaveCount(1);
    await expectDisabledScroll(page);
    await toggle.click();
    await expect(component.getByText('scroll is disabled')).toHaveCount(0);
    await expect(page.locator('body')).toHaveAttribute('style', 'background: red;');
});
for (const allAtOnce of [true, false]) {
    test(`useDisableScroll: nested instances - closing ${allAtOnce ? 'all at once' : 'ony by one'}`, async ({
        mount,
        page,
    }) => {
        const component = await mount('hooks/Nested');
        const outer = component.getByRole('button', {name: 'toggle1'});
        await outer.click();
        await expect(component.getByText('scroll is disabled')).toHaveCount(1);
        await expectDisabledScroll(page);
        const inner = component.getByRole('button', {name: 'toggle2'});
        await inner.click();
        await expect(component.getByText('scroll is disabled')).toHaveCount(2);
        await expectDisabledScroll(page);
        if (!allAtOnce) {
            await inner.click();
            await expect(component.getByText('scroll is disabled')).toHaveCount(1);
            await expectDisabledScroll(page);
        }
        await outer.click();
        await expect(component.getByText('scroll is disabled')).toHaveCount(0);
        await expect(page.locator('body')).toHaveAttribute('style', 'background: red;');
    });
}
