import {test, expect} from '../test-utils/component';

test('IbanField', async ({mount}) => {
    const validIban = 'ES7921000813610123456789';
    const formattedIban = 'ES79 2100 0813 6101 2345 6789';
    const component = await mount('iban-field/IbanForm');
    const field = component.getByLabel('IBAN', {exact: true});
    const submit = component.getByRole('button', {name: 'Submit'});
    await field.pressSequentially(validIban.slice(0, -1));
    await field.blur();
    await submit.click();
    await expect(component.getByTestId('errors')).toHaveValue(JSON.stringify([{iban: 'invalid iban'}]));
    await field.fill('');
    await field.pressSequentially(validIban.slice(0, -1) + '5');
    await field.blur();
    await submit.click();
    await expect(component.getByTestId('errors')).toHaveValue(
        JSON.stringify([{iban: 'invalid iban'}, {iban: 'invalid iban'}])
    );
    await field.fill('');
    await field.pressSequentially(validIban);
    await field.blur();
    await submit.click();
    await expect(component.getByTestId('submissions')).toHaveValue(
        JSON.stringify([[{iban: validIban}, {iban: formattedIban}]])
    );
    await expect(component.getByTestId('errors')).toHaveValue(
        JSON.stringify([{iban: 'invalid iban'}, {iban: 'invalid iban'}])
    );
});
