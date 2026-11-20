import {test, expect} from '../test-utils/component';

test('ThemeContextProvider with es-ES locale', async ({mount}) => {
    const component = await mount('theme-context-provider/Spanish');
    await expect(component.getByLabel('Número de tarjeta', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('Caducidad', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('CVV', {exact: true})).toHaveCount(1);
});
test('ThemeContextProvider with de-DE locale', async ({mount}) => {
    const component = await mount('theme-context-provider/German');
    await expect(component.getByLabel('Kartennummer', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('Ablaufdatum', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('CVV', {exact: true})).toHaveCount(1);
});
test('ThemeContextProvider override some texts', async ({mount}) => {
    const component = await mount('theme-context-provider/CustomTexts');
    await expect(component.getByLabel('Any number label', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('Any expiration label', {exact: true})).toHaveCount(1);
    await expect(component.getByLabel('CVV', {exact: true})).toHaveCount(1);
});
test('Multiple ThemeContextProvider with as="div" get unique data-mistica-theme attributes', async ({
    mount,
}) => {
    const component = await mount('theme-context-provider/UniqueThemeIds');
    const themedDivs = component.locator('[data-mistica-theme]');
    await expect(themedDivs).toHaveCount(2);
    const ids = await themedDivs.evaluateAll((elements) =>
        elements.map((el) => el.getAttribute('data-mistica-theme'))
    );
    expect(ids[0]).not.toBe(ids[1]);
});
test('ThemeContextProvider with as="div" and withoutStyles does not add data-mistica-theme', async ({
    mount,
}) => {
    const component = await mount('theme-context-provider/WithoutStyles');
    const themedDivs = component.locator('[data-mistica-theme]');
    await expect(themedDivs).toHaveCount(0);
});
