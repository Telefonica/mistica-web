import {test, expect} from '../test-utils/component';

test('Should show suggestions on focus when shouldShowSuggestions is "focus"', async ({mount, page}) => {
    const component = await mount('search-field/Suggestions');
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(0);
    await component.getByRole('combobox', {name: 'Search', exact: true}).click();
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(1);
});
test('Should show suggestions on type when shouldShowSuggestions is 2', async ({mount, page}) => {
    const component = await mount('search-field/Suggestions', {shouldShowSuggestions: 2});
    const input = component.getByRole('combobox', {name: 'Search', exact: true});
    await input.click();
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(0);
    await input.pressSequentially('A');
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(0);
    await input.pressSequentially('p');
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(1);
});
test('Should reload suggestions when clearing the field', async ({mount, page}) => {
    const component = await mount('search-field/Suggestions');
    await component.getByRole('combobox', {name: 'Search', exact: true}).pressSequentially('invent');
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(0);
    await component.getByRole('button', {name: 'Borrar búsqueda'}).click();
    await expect(page.getByRole('menuitem', {name: 'Apple'})).toHaveCount(1);
});
for (const enabled of [true, false]) {
    test(`Should not show suggestions empty case ${enabled ? 'if enabled' : 'by default'}`, async ({
        mount,
        page,
    }) => {
        const component = await mount('search-field/Suggestions', {
            withSuggestionsEmptyCase: enabled ? true : undefined,
        });
        await component.getByRole('combobox', {name: 'Search', exact: true}).pressSequentially('invent');
        await expect(page.getByText('Sin sugerencias', {exact: true})).toHaveCount(enabled ? 1 : 0);
    });
}
