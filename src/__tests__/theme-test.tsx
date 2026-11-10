import {test, expect} from '../test-utils/component';

for (const forwardRef of [true, false]) {
    test(`getMisicaLinkComponent detects ${forwardRef ? 'forwardRefs' : 'function components'} as components`, async ({
        mount,
    }) => {
        const component = await mount('theme/ComponentIdentity', {forwardRef});
        await expect(component.getByTestId('same-component')).toHaveValue('true');
    });
}
test('getMisicaLinkComponent uses given component with type', async ({mount}) => {
    const component = await mount('theme/CustomLink');
    const link = component.getByRole('link', {name: 'any text'});
    await expect(link).toHaveAttribute('href', '#');
    await expect(link).toHaveJSProperty('outerHTML', '<a href="#">any text</a>');
});
