import {test, expect} from '../test-utils/component';

for (const story of ['Uncontrolled', 'Controlled']) {
    test(`TextField ${story.toLowerCase()}`, async ({mount}) => {
        const component = await mount(`text-field/${story}`);
        const field = component.getByLabel('Username');
        await field.pressSequentially('pepito');
        await expect(field).toHaveValue('pepito');
    });
}
test('TextField optional - accessible name includes optional suffix as a single label', async ({mount}) => {
    const component = await mount('text-field/Optional');
    await expect(component.getByRole('textbox', {name: 'Email (opcional)', exact: true})).toHaveCount(1);
});
test('TextField maxLength', async ({mount}) => {
    const component = await mount('text-field/MaxLength');
    await component.getByRole('button', {name: 'Write long string'}).click();
    await expect(component.getByLabel('Sort string')).toHaveValue('12345');
    await component.getByRole('button', {name: 'Submit', exact: true}).click();
    await expect(component.getByTestId('submission')).toHaveValue(
        JSON.stringify([{sortstr: '12345'}, {sortstr: '12345'}])
    );
});
