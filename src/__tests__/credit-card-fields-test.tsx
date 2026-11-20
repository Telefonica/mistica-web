import {test, expect} from '../test-utils/component';

import type {Locator} from '@playwright/test';

const fillPayment = async (component: Locator, number: string, expiration: string, cvv: string) => {
    await component.getByLabel('Número de tarjeta', {exact: true}).pressSequentially(number);
    await component.getByLabel('Caducidad', {exact: true}).pressSequentially(expiration);
    await component.getByLabel('CVV', {exact: true}).pressSequentially(cvv);
    await component.getByLabel('CVV', {exact: true}).blur();
    await component.getByRole('button', {name: 'Submit'}).click();
};
const readSubmissions = async (component: Locator) =>
    JSON.parse(await component.getByTestId('submissions').inputValue());
test('Credit card fields validation, all fields empty', async ({mount}) => {
    const component = await mount('credit-card-fields/Payment');
    await component.getByRole('button', {name: 'Submit'}).click();
    await expect
        .poll(async () => JSON.parse(await component.getByTestId('errors').inputValue()))
        .toContainEqual({
            ccCvv: 'Este campo es obligatorio',
            ccExp: 'Este campo es obligatorio',
            ccNum: 'Este campo es obligatorio',
        });
});
for (const {creditCardNumber, isValid, cvv, description} of [
    {creditCardNumber: '4321432143214321', isValid: true, cvv: '123', description: 'valid visa number'},
    {creditCardNumber: '432143214321432', isValid: false, cvv: '123', description: 'too short visa number'},
    {creditCardNumber: '5321432143214321', isValid: true, cvv: '123', description: 'valid mastercard number'},
    {
        creditCardNumber: '532143214321432',
        isValid: false,
        cvv: '123',
        description: 'too short mastercard number',
    },
    {
        creditCardNumber: '345634563456345',
        isValid: true,
        cvv: '1234',
        description: 'valid american express number',
    },
    {
        creditCardNumber: '34563456345634',
        isValid: false,
        cvv: '1234',
        description: 'too short american express number',
    },
] as const) {
    test(`Credit card fields validation, ${description}: ${creditCardNumber}`, async ({mount}) => {
        const component = await mount('credit-card-fields/Payment');
        await fillPayment(component, creditCardNumber, '11/50', cvv);
        if (isValid) {
            await expect
                .poll(() => readSubmissions(component))
                .toContainEqual([
                    {ccNum: creditCardNumber, ccExp: {month: 11, year: 2050, raw: '11/50'}, ccCvv: cvv},
                    {ccNum: expect.any(String), ccExp: '11/50', ccCvv: cvv},
                ]);
            await expect(component.getByTestId('errors')).toHaveValue('[]');
        } else {
            await expect
                .poll(async () => JSON.parse(await component.getByTestId('errors').inputValue()))
                .toContainEqual({ccNum: 'No es un número de tarjeta válido'});
            await expect(component.getByTestId('submissions')).toHaveValue('[]');
        }
    });
}
for (const {expirationDate, isValid, errorMessage, description} of [
    {
        expirationDate: ' ',
        isValid: false,
        errorMessage: 'Este campo es obligatorio',
        description: 'empty expiration date',
    },
    {
        expirationDate: '11',
        isValid: false,
        errorMessage: 'Fecha no válida',
        description: 'only month expiration date',
    },
    {expirationDate: '11/18', isValid: false, errorMessage: 'Fecha no válida', description: 'expired date'},
    {expirationDate: '11/50', isValid: true, errorMessage: 'Fecha no válida', description: 'future date'},
] as const) {
    test(`Credit card fields validation, ${description}: ${expirationDate}`, async ({mount}) => {
        const component = await mount('credit-card-fields/Payment');
        await fillPayment(component, '4321432143214321', expirationDate, '123');
        if (isValid) {
            const [month, year] = expirationDate.split('/');
            await expect
                .poll(() => readSubmissions(component))
                .toContainEqual([
                    {
                        ccNum: '4321432143214321',
                        ccExp: {month: Number(month), year: Number(`20${year}`), raw: expirationDate},
                        ccCvv: '123',
                    },
                    {ccNum: '4321 4321 4321 4321', ccExp: expirationDate, ccCvv: '123'},
                ]);
            await expect(component.getByTestId('errors')).toHaveValue('[]');
        } else {
            await expect
                .poll(async () => JSON.parse(await component.getByTestId('errors').inputValue()))
                .toContainEqual({ccExp: errorMessage});
            await expect(component.getByTestId('submissions')).toHaveValue('[]');
        }
    });
}
test('Credit card fields validation, clear expiration date', async ({mount}) => {
    const component = await mount('credit-card-fields/Payment');
    const expiration = component.getByLabel('Caducidad', {exact: true});
    await component.getByLabel('Número de tarjeta', {exact: true}).pressSequentially('4321432143214321');
    await expiration.pressSequentially('11');
    await component.getByLabel('CVV', {exact: true}).pressSequentially('123');
    await expect(component.getByText('Fecha no válida', {exact: true})).toHaveCount(1);
    await expiration.fill('');
    await expiration.blur();
    await expect(component.getByText('Fecha no válida', {exact: true})).toHaveCount(0);
    await expect(component.getByText('Este campo es obligatorio', {exact: true})).toHaveCount(1);
});
for (const {creditCardNumber, cvv, isValid, description} of [
    {creditCardNumber: '4321432143214321', cvv: '123', isValid: true, description: '3 digits CVV for visa'},
    {
        creditCardNumber: '5321432143214321',
        cvv: '123',
        isValid: true,
        description: '3 digits CVV for mastercard',
    },
    {
        creditCardNumber: '342143214321432',
        cvv: '1234',
        isValid: true,
        description: '4 digits CVV for american express',
    },
    {creditCardNumber: '4321432143214321', cvv: '12', isValid: false, description: 'too short CVV for visa'},
    {
        creditCardNumber: '5321432143214321',
        cvv: '12',
        isValid: false,
        description: 'too short CVV for mastercard',
    },
    {
        creditCardNumber: '342143214321432',
        cvv: '123',
        isValid: false,
        description: 'too short CVV for american express',
    },
] as const) {
    test(`Credit card fields validation, ${description}: ${cvv}`, async ({mount}) => {
        const component = await mount('credit-card-fields/Payment');
        await fillPayment(component, creditCardNumber, '11/50', cvv);
        if (isValid) {
            await expect
                .poll(() => readSubmissions(component))
                .toContainEqual([
                    {ccNum: creditCardNumber, ccExp: {month: 11, year: 2050, raw: '11/50'}, ccCvv: cvv},
                    {ccNum: expect.any(String), ccExp: '11/50', ccCvv: cvv},
                ]);
            await expect(component.getByTestId('errors')).toHaveValue('[]');
        } else {
            await expect
                .poll(async () => JSON.parse(await component.getByTestId('errors').inputValue()))
                .toContainEqual({ccCvv: 'CVV incorrecto'});
            await expect(component.getByTestId('submissions')).toHaveValue('[]');
        }
    });
}
