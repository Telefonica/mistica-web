import {test, expect} from '../test-utils/component';

test('getCssVarValue', async ({mount}) => {
    const component = await mount('dom/CssValues');
    await expect
        .poll(async () => JSON.parse(await component.getByTestId('css-values').inputValue()))
        .toMatchObject({
            global: ['#FABADA', '#FABADA', '', '#00FFFF', '#FABADA', '#00FFFF'],
            invalidThrows: true,
        });
});
test('getCssVarValue of element', async ({mount}) => {
    const component = await mount('dom/CssValues');
    await expect
        .poll(async () => JSON.parse(await component.getByTestId('css-values').inputValue()))
        .toMatchObject({local: ['#ABACAD', '#ABACAD']});
});
