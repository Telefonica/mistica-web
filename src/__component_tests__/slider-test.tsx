import {test, expect} from '../test-utils/component';

import type {Basic, InForm, Reactive} from './slider.story';

test('renders slider', async ({mount}) => {
    const component = await mount('slider/Basic', {name: 'slider'});
    await expect(component.getByRole('slider')).toHaveCount(1);
});
for (const mode of ['uncontrolled', 'uncontrolled with defaultValue', 'controlled'])
    test(`${mode} slider`, async ({mount}) => {
        const component = await mount('slider/Basic', {
            name: 'slider',
            controlled: mode === 'controlled',
            defaultValue: mode.includes('defaultValue') ? 3 : undefined,
        });
        const slider = component.getByRole('slider');
        if (mode.includes('defaultValue')) await expect(slider).toHaveValue('3');
        await slider.press('End');
        for (let index = 0; index < 10; index++) await slider.press('ArrowLeft');
        await expect(slider).toHaveValue('90');
    });
test('disabled slider', async ({mount}) => {
    const component = await mount('slider/Basic', {name: 'slider', disabled: true});
    await expect(component.getByRole('slider')).toBeDisabled();
});
test('slider with values array', async ({mount}) => {
    const calls: Array<number> = [];
    const component = await mount<typeof Basic>('slider/Basic', {
        name: 'slider',
        values: [12, 3, 4],
        value: 3,
        onChangeValue: (value) => {
            calls.push(value);
        },
    });
    const slider = component.getByRole('slider');
    await expect(slider).toHaveValue('1');
    await slider.dispatchEvent('change');
    expect(calls).toEqual([]);
    await slider.press('Home');
    await expect.poll(() => calls).toEqual([12]);
});
test('slider inside form', async ({mount}) => {
    const calls: Array<Array<unknown>> = [];
    const component = await mount<typeof InForm>('slider/InForm', {
        onSubmit: (...args) => {
            calls.push(args);
        },
    });
    await component.getByRole('slider').press('ArrowRight');
    await component.getByRole('button', {name: 'done!'}).click();
    await expect.poll(() => calls).toEqual([[{slider: 1}, {slider: 1}]]);
});
test('slider is accessible', async ({mount}) => {
    const component = await mount('slider/Accessible');
    for (const label of ['slider1', 'slider2', 'slider3'])
        await expect(component.getByRole('slider', {name: label})).toHaveCount(1);
});
test('slider is reactive to changes in min, max and step props', async ({mount}) => {
    const calls: Array<number> = [];
    const component = await mount<typeof Reactive>('slider/Reactive', {
        onChange: (value) => {
            calls.push(value);
        },
    });
    const slider = component.getByRole('slider');
    await expect(slider).toHaveValue('0');
    await component.getByLabel('min', {exact: true}).fill('3');
    await expect(slider).toHaveValue('3');
    await expect.poll(() => calls).toEqual([3]);
    for (let index = 0; index < 3; index++) await slider.press('ArrowRight');
    await expect(slider).toHaveValue('6');
    await expect.poll(() => calls).toEqual([3, 4, 5, 6]);
    await component.getByLabel('step', {exact: true}).fill('2');
    await expect(slider).toHaveValue('7');
    await expect.poll(() => calls).toEqual([3, 4, 5, 6, 7]);
    await component.getByLabel('max', {exact: true}).fill('6');
    await expect(slider).toHaveValue('5');
    await expect.poll(() => calls).toEqual([3, 4, 5, 6, 7, 5]);
    await component.getByLabel('step', {exact: true}).fill('1');
    await expect(slider).toHaveValue('5');
    expect(calls).toEqual([3, 4, 5, 6, 7, 5]);
});
