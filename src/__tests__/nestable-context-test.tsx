import {test, expect} from '../test-utils/component';

test('happy case', async ({mount}) => {
    const component = await mount('nestable-context/Scenario1');
    await expect(component.getByText('The value is: something', {exact: true})).toHaveCount(1);
});
test('When unmount, the default value is restored', async ({mount}) => {
    const component = await mount('nestable-context/Scenario2');
    await expect(component.getByText('The value is: a', {exact: true})).toHaveCount(1);
    await component.getByRole('button', {name: 'toggle'}).click();
    await expect(component.getByText('The value is: nothing', {exact: true})).toHaveCount(1);
});
test('When unmount, the previous value is restored', async ({mount}) => {
    const component = await mount('nestable-context/Scenario3');
    await expect(component.getByText('The value is: a', {exact: true})).toHaveCount(1);
    await component.getByRole('button', {name: 'toggle'}).click();
    await expect(component.getByText('The value is: b', {exact: true})).toHaveCount(1);
});
test('when nesting, the innermost component wins', async ({mount}) => {
    const component = await mount('nestable-context/Scenario4');
    await expect(component.getByText('The value is: c', {exact: true})).toHaveCount(1);
});
test('works as expected with transitions', async ({mount}) => {
    const component = await mount('nestable-context/Scenario5');
    await expect(component.getByText('The value is: b', {exact: true})).toHaveCount(1);
});
test('when value is an object, nested values are merged', async ({mount}) => {
    const component = await mount('nestable-context/Scenario6');
    await expect(component.getByText('foo is a and bar is c', {exact: true})).toHaveCount(1);
});
test('can use a custom valuesReducer', async ({mount}) => {
    const component = await mount('nestable-context/Scenario7');
    await expect(component.getByText('foo is undefined and bar is c', {exact: true})).toHaveCount(1);
});
