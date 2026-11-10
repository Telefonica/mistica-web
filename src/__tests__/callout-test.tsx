import {test, expect} from '../test-utils/component';

test('renders an accesible and closable Callout', async ({mount}) => {
    const component = await mount('callout/Closable');
    const callout = component.getByRole('region', {name: 'some label'});
    await expect(callout).toHaveCount(1);
    await expect(callout.getByRole('heading', {name: 'some title aria label'})).toHaveCount(1);
    await callout.getByRole('button', {name: 'Cerrar'}).click();
    await expect(component.getByTestId('calls')).toHaveValue('1');
});
test('renders an accesible and closable Callout with custom close button label', async ({mount}) => {
    const component = await mount('callout/Closable', {customLabel: true});
    const callout = component.getByRole('region', {name: 'some label'});
    await expect(callout).toHaveCount(1);
    await callout.getByRole('button', {name: 'custom close label'}).click();
    await expect(component.getByTestId('calls')).toHaveValue('1');
});
test('renders a small Callout', async ({mount}) => {
    const component = await mount('callout/Small');
    await expect(component.getByRole('region', {name: 'some label'})).toHaveCount(1);
    await expect(component.getByTestId('title')).toContainText('some title');
    await expect(component.getByTestId('description')).toContainText('some description');
});
