import {test, expect} from '../test-utils/component';

import type {Fruit, FormFruit, Propagation} from './radio-button.story';

for (const defaultValue of ['banana', '']) {
    test(`RadioGroup (uncontrolled${defaultValue ? '' : ', no default value'})`, async ({mount}) => {
        const component = await mount('radio-button/Fruit', {defaultValue});
        const group = component.getByLabel('Choose a fruit');
        await expect(group).toHaveCount(1);
        const radios = group.getByRole('radio');
        await expect(radios).toHaveCount(2);
        await expect(radios.nth(0)).toBeChecked({checked: !!defaultValue});
        await expect(radios.nth(1)).not.toBeChecked();
        await radios.nth(1).click();
        await expect(radios.nth(0)).not.toBeChecked();
        await expect(radios.nth(1)).toBeChecked();
    });
}
test('RadioGroup (controlled)', async ({mount}) => {
    const component = await mount('radio-button/Fruit', {mode: 'controlled', defaultValue: 'apple'});
    await expect(component.getByText('you have selected apple')).toHaveCount(1);
    const radios = component.getByLabel('Choose a fruit').getByRole('radio');
    await expect(radios).toHaveCount(2);
    await expect(radios.nth(0)).not.toBeChecked();
    await expect(radios.nth(1)).toBeChecked();
    await radios.nth(0).click();
    await expect(radios.nth(0)).toBeChecked();
    await expect(radios.nth(1)).not.toBeChecked();
    await expect(component.getByText('you have selected banana')).toHaveCount(1);
});
test('RadioGroup (controlled) with a immutable value', async ({mount}) => {
    const changes: Array<string> = [];
    const component = await mount<typeof Fruit>('radio-button/Fruit', {
        mode: 'immutable',
        onChange: (value) => {
            changes.push(value);
        },
    });
    const radios = component.getByRole('radio');
    await expect(radios).toHaveCount(2);
    await expect(radios.nth(0)).toBeChecked();
    await expect(radios.nth(1)).not.toBeChecked();
    await radios.nth(1).click();
    await expect(radios.nth(0)).toBeChecked();
    await expect(radios.nth(1)).not.toBeChecked();
    await expect.poll(() => changes).toEqual(['apple']);
});
test('RadioGroup (disabled)', async ({mount}) => {
    const changes: Array<string> = [];
    const component = await mount<typeof Fruit>('radio-button/Fruit', {
        mode: 'disabled',
        defaultValue: 'apple',
        onChange: (value) => {
            changes.push(value);
        },
    });
    const radios = component.getByRole('radio');
    await expect(radios).toHaveCount(2);
    for (const radio of await radios.all()) await expect(radio).toBeDisabled();
    for (const [index, key] of [
        [0, null],
        [0, ' '],
        [1, 'ArrowUp'],
        [1, 'ArrowDown'],
    ] as const) {
        if (key) await radios.nth(index).dispatchEvent('keydown', {key});
        else await radios.nth(index).dispatchEvent('click');
        await expect(radios.nth(0)).not.toBeChecked();
        await expect(radios.nth(1)).toBeChecked();
        expect(changes).toEqual([]);
    }
});
test('Radio custom render', async ({mount}) => {
    const component = await mount('radio-button/Fruit', {custom: true, defaultValue: 'banana'});
    for (const name of ['banana', 'apple'])
        await expect(component.getByText(name, {exact: true})).toHaveCount(1);
    await expect(component.getByRole('radio', {name: 'banana'})).toBeChecked();
    await expect(component.getByRole('radio', {name: 'apple'})).not.toBeChecked();
    await component.getByRole('radio', {name: 'apple'}).click();
    await expect(component.getByRole('radio', {name: 'banana'})).not.toBeChecked();
    await expect(component.getByRole('radio', {name: 'apple'})).toBeChecked();
});
for (const controlled of [false, true])
    test(`form ${controlled ? 'uncontrolled' : 'controlled'} mode`, async ({mount}) => {
        const calls: Array<Array<unknown>> = [];
        const component = await mount<typeof FormFruit>('radio-button/FormFruit', {
            controlled,
            onSubmit: (...args) => {
                calls.push(args);
            },
        });
        const initial = controlled ? 'banana' : 'apple';
        const next = controlled ? 'apple' : 'banana';
        await expect(component.getByRole('radio', {name: initial})).toBeChecked();
        await expect(component.getByRole('radio', {name: next})).not.toBeChecked();
        await component.getByRole('radio', {name: next}).click();
        await expect(component.getByRole('radio', {name: initial})).not.toBeChecked();
        await expect(component.getByRole('radio', {name: next})).toBeChecked();
        await component.getByRole('button', {name: 'done!'}).click();
        await expect.poll(() => calls).toEqual([[{'radio-group': next}, {'radio-group': next}]]);
    });
test('Radio onClick event is not propagated', async ({mount}) => {
    let calls = 0;
    const component = await mount<typeof Propagation>('radio-button/Propagation', {
        onPress: () => {
            calls++;
        },
    });
    await component.getByRole('radio').click();
    expect(calls).toBe(0);
});
for (const selected of [false, true])
    test(`Radiogroup with ${selected ? 'selected radio gets focus on selected' : 'no radio selected gets focus on first'} radio using TAB navigation`, async ({
        mount,
        page,
    }) => {
        const component = await mount('radio-button/Fruit', {
            focusButton: true,
            defaultValue: selected ? 'apple' : '',
        });
        const button = component.getByRole('button', {name: 'Focus me first'});
        await button.click();
        await expect(button).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(component.getByRole('radio').nth(selected ? 1 : 0)).toBeFocused();
    });
