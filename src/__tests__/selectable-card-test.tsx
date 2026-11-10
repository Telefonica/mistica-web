import {test, expect} from '../test-utils/component';

import type {Example} from './selectable-card.story';

for (const variant of [0, 1, 2, 3, 4])
    test.describe(`explicit card selection (${variant})`, () => {
        for (const role of ['checkbox', 'switch'] as const)
            test(`${role} selects from the surface and top selector`, async ({mount, page}) => {
                const calls: Array<boolean> = [];
                const component = await mount<typeof Example>('selectable-card/Example', {
                    variant,
                    mode: role,
                    onChange: (value) => {
                        calls.push(value);
                    },
                });
                const surface = component.getByRole(role, {name: 'Choose card', exact: true});
                await expect(surface).toHaveAttribute('aria-checked', 'false');
                await surface.click();
                await expect(surface).toHaveAttribute('aria-checked', 'true');
                await expect.poll(() => calls).toEqual([true]);
                await page.keyboard.press('Space');
                await expect(surface).toHaveAttribute('aria-checked', 'false');
                await expect.poll(() => calls).toEqual([true, false]);
            });
        test('supports controlled selection', async ({mount}) => {
            const calls: Array<boolean> = [];
            const component = await mount<typeof Example>('selectable-card/Example', {
                variant,
                mode: 'controlled',
                value: false,
                onChange: (value) => {
                    calls.push(value);
                },
            });
            const surface = component.getByRole('checkbox', {name: 'Controlled', exact: true});
            await expect(surface).toHaveAttribute('aria-checked', 'false');
            await surface.click();
            await expect.poll(() => calls).toEqual([true]);
            await component.update({variant, mode: 'controlled', value: true});
            await expect(surface).toHaveAttribute('aria-checked', 'true');
        });
        test('disabled selection cannot be changed', async ({mount}) => {
            const calls: Array<boolean> = [];
            const component = await mount<typeof Example>('selectable-card/Example', {
                variant,
                mode: 'disabled',
                onChange: (value) => {
                    calls.push(value);
                },
            });
            const surface = component.getByRole('checkbox', {name: 'Disabled', exact: true});
            await expect(surface).toHaveAttribute('aria-disabled', 'true');
            await surface.dispatchEvent('click');
            expect(calls).toEqual([]);
        });
        test('radio arrows move selection and focus', async ({mount, page}) => {
            const component = await mount('selectable-card/Example', {variant, mode: 'radio'});
            const first = component.getByRole('radio', {name: 'First', exact: true});
            const second = component.getByRole('radio', {name: 'Second', exact: true});
            await page.keyboard.press('Tab');
            await expect(first).toBeFocused();
            await page.keyboard.press('Space');
            await expect(first).toHaveAttribute('aria-checked', 'true');
            await page.keyboard.press('ArrowRight');
            await expect(second).toBeFocused();
            await expect(second).toHaveAttribute('aria-checked', 'true');
            await expect(first).toHaveAttribute('aria-checked', 'false');
        });
        for (const role of ['checkbox', 'switch'] as const)
            test(`${role} in a slot stays independent`, async ({mount}) => {
                const component = await mount('selectable-card/Example', {variant, mode: `slot-${role}`});
                const control = component.getByRole(role, {name: 'Option', exact: true});
                await expect(component.getByRole(role)).toHaveCount(1);
                await component.getByText('Independent', {exact: true}).click();
                await expect(control).toHaveAttribute('aria-checked', 'false');
                await control.click();
                await expect(control).toHaveAttribute('aria-checked', 'true');
            });
        test('slot controls do not alter an explicit card selector', async ({mount}) => {
            const component = await mount('selectable-card/Example', {variant, mode: 'explicit-slot'});
            const surface = component.getByRole('checkbox', {name: 'Card Independent option', exact: true});
            const control = component.getByRole('checkbox', {name: 'Independent option', exact: true});
            await control.click();
            await expect(control).toHaveAttribute('aria-checked', 'true');
            await expect(surface).toHaveAttribute('aria-checked', 'false');
        });
        test('footer actions do not change selection', async ({mount}) => {
            let calls = 0;
            const component = await mount<typeof Example>('selectable-card/Example', {
                variant,
                mode: 'footer',
                onAction: () => {
                    calls++;
                },
            });
            await component.getByRole('button', {name: 'Action'}).click();
            await expect.poll(() => calls).toBe(1);
            await expect(component.getByRole('checkbox', {name: 'Card', exact: true})).toHaveAttribute(
                'aria-checked',
                'true'
            );
        });
        test('a custom slot control can explicitly set selected', async ({mount}) => {
            const component = await mount('selectable-card/Example', {variant, mode: 'custom'});
            const control = component.getByRole('checkbox', {name: 'Custom option', exact: true});
            await control.click();
            await expect(control).toHaveAttribute('aria-checked', 'true');
        });
    });
test('advanced card custom actions remain independent', async ({mount}) => {
    const component = await mount('selectable-card/AdvancedActions');
    const control = component.getByRole('checkbox', {name: 'Option', exact: true});
    await component.getByText('Independent action', {exact: true}).click();
    await expect(control).toHaveAttribute('aria-checked', 'false');
    await control.click();
    await expect(control).toHaveAttribute('aria-checked', 'true');
    await expect(component.getByRole('checkbox')).toHaveCount(1);
});
for (const variant of [0, 1, 2, 3, 4])
    test(`selected preserves card navigation and top actions (${variant})`, async ({mount}) => {
        const calls: Array<string> = [];
        const component = await mount<typeof Example>('selectable-card/Example', {
            variant,
            mode: 'navigation',
            onAction: () => {
                calls.push('press');
            },
            onClose: () => {
                calls.push('close');
            },
        });
        await component.getByRole('button', {name: 'Selected action', exact: true}).click();
        await expect.poll(() => calls).toEqual(['press']);
        await component.getByRole('button', {name: 'Cerrar', exact: true}).click();
        await expect.poll(() => calls).toEqual(['press', 'close']);
    });
