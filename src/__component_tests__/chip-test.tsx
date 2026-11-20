import {test, expect} from '../test-utils/component';

for (const {title, label} of [
    {title: 'Chip can be closed', label: undefined},
    {title: 'Chip can be closed when using custom close label', label: 'custom close label'},
]) {
    test(title, async ({mount}) => {
        const component = await mount('chip/Interactive', {closeButtonLabel: label});
        await component.getByRole('button', {name: label ?? 'Cerrar'}).click();
        await expect(component.getByTestId('calls')).toHaveValue('1');
    });
}
test('Chip can be clicked', async ({mount}) => {
    const component = await mount('chip/Interactive', {clickable: true});
    await component.getByText('some text').click();
    await expect(component.getByTestId('calls')).toHaveValue('1');
});
