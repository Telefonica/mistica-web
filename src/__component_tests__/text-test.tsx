import {test, expect} from '../test-utils/component';

for (const {text, expected} of [
    {text: 'Ħ', expected: 'Vivo'},
    {text: 'hola Ħ', expected: 'hola Vivo'},
    {text: 'Ħ hola', expected: 'Vivo hola'},
    {text: 'Ħ hola Ħ', expected: 'Vivo hola Vivo'},
]) {
    test(`Text makes vivinho char readable for screen readers: ${text}`, async ({mount}) => {
        const component = await mount('text/Vivinho', {text});
        await expect(component.getByRole('link', {name: expected, exact: true})).toHaveCount(1);
    });
}
test('vivinho char replacement works in Texts with multiple children', async ({mount}) => {
    const component = await mount('text/Vivinho', {multiple: true});
    await expect(component.getByRole('link', {name: 'Vivo something Vivo'})).toHaveCount(1);
});
test('vivinho char is only replaced in vivo skin', async ({mount}) => {
    const component = await mount('text/Vivinho', {vivo: false});
    await expect(component.getByRole('link', {name: 'Ħ'})).toHaveCount(1);
});
