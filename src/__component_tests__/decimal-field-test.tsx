import {test, expect} from '../test-utils/component';

for (const {maxDecimals, expected} of [
    {maxDecimals: undefined, expected: '123,4567890'},
    {maxDecimals: 2, expected: '123,45'},
    {maxDecimals: 0, expected: '1234567890'},
]) {
    test(`DecimalField - maxDecimals: ${maxDecimals}`, async ({mount}) => {
        const component = await mount('decimal-field/DecimalForm', {maxDecimals});
        await component.getByLabel('Decimal', {exact: true}).pressSequentially('123.4567890');
        await component.getByRole('button', {name: 'Submit'}).click();
        await expect(component.getByTestId('submission')).toHaveValue(
            JSON.stringify([{decimal: expected}, {decimal: expected}])
        );
    });
}
