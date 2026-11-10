import {test, expect} from '../test-utils/component';

for (const {title, defaultValue, expected} of [
    {title: 'Counter starts with min value', defaultValue: undefined, expected: '3'},
    {title: 'Counter with default value greater than max is updated to max', defaultValue: 20, expected: '5'},
    {title: 'Counter with default value lower than min is updated to min', defaultValue: 1, expected: '3'},
]) {
    test(title, async ({mount}) => {
        const component = await mount('counter/Quantity', {defaultValue});
        await expect(component.getByText(expected, {exact: true})).toHaveCount(1);
    });
}
for (const controlled of [false, true]) {
    test(`Counter with ${controlled ? 'controlled' : 'default'} value`, async ({mount}) => {
        const component = await mount('counter/Quantity', {
            controlled,
            defaultValue: controlled ? undefined : 4,
        });
        await expect(component.getByText(controlled ? '3' : '4', {exact: true})).toHaveCount(1);
        const increase = component.getByRole('button', {name: 'Aumentar valor'});
        const decrease = component.getByRole('button', {name: 'Disminuir valor'});
        await expect(increase).toHaveCount(1);
        await expect(decrease).toHaveCount(1);
        await increase.click();
        await expect(component.getByText(controlled ? '4' : '5', {exact: true})).toHaveCount(1);
        if (controlled) await increase.click();
        else await expect(increase).toBeDisabled();
        await expect(component.getByText('5', {exact: true})).toHaveCount(1);
        await decrease.click();
        await expect(component.getByText('4', {exact: true})).toHaveCount(1);
    });
}
test('Counter with onRemove has remove button and callback is executed on press', async ({mount}) => {
    const component = await mount('counter/Quantity', {defaultValue: 4, removable: true});
    await component.getByRole('button', {name: 'Disminuir valor'}).click();
    await expect(component.getByRole('button', {name: 'Disminuir valor'})).toHaveCount(0);
    await component.getByRole('button', {name: 'Borrar elemento'}).click();
    await expect(component.getByTestId('removals')).toHaveValue('1');
});
