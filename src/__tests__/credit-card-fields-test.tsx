import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ButtonPrimary, Form, CreditCardFields} from '..';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('Credit card fields validation, all fields empty', async () => {
    const onValidationErrorsSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onValidationErrors={onValidationErrorsSpy} onSubmit={() => {}}>
                <CreditCardFields />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(onValidationErrorsSpy).toHaveBeenCalledWith({
        ccCvv: 'Este campo es obligatorio',
        ccExp: 'Este campo es obligatorio',
        ccNum: 'Este campo es obligatorio',
    });
});

test.each`
    creditCardNumber      | isValid  | cvv       | description
    ${'4321432143214321'} | ${true}  | ${'123'}  | ${'valid visa number'}
    ${'432143214321432'}  | ${false} | ${'123'}  | ${'too short visa number'}
    ${'5321432143214321'} | ${true}  | ${'123'}  | ${'valid mastercard number'}
    ${'532143214321432'}  | ${false} | ${'123'}  | ${'too short mastercard number'}
    ${'345634563456345'}  | ${true}  | ${'1234'} | ${'valid american express number'}
    ${'34563456345634'}   | ${false} | ${'1234'} | ${'too short american express number'}
`(
    'Credit card fields validation, $description: $creditCardNumber',
    async ({creditCardNumber, cvv, isValid}) => {
        const onValidationErrorsSpy = jest.fn();
        const onSubmitSpy = jest.fn();

        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Form onValidationErrors={onValidationErrorsSpy} onSubmit={onSubmitSpy}>
                    <CreditCardFields />
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Form>
            </ThemeContextProvider>
        );

        userEvent.type(screen.getByLabelText('Número de tarjeta'), creditCardNumber);
        userEvent.type(screen.getByLabelText('Caducidad'), '11/50');
        userEvent.type(screen.getByLabelText('CVV'), cvv);
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        if (isValid) {
            await waitFor(() => {
                expect(onSubmitSpy).toHaveBeenCalledWith(
                    {
                        ccNum: creditCardNumber,
                        ccExp: {
                            month: 11,
                            year: 2050,
                            raw: '11/50',
                        },
                        ccCvv: cvv,
                    },
                    {ccNum: expect.any(String), ccExp: '11/50', ccCvv: cvv}
                );
                expect(onValidationErrorsSpy).toHaveBeenCalledWith({});
            });
        } else {
            await waitFor(() => {
                expect(onValidationErrorsSpy).toHaveBeenCalledWith({
                    ccNum: 'No es un número de tarjeta válido',
                });
                expect(onSubmitSpy).not.toHaveBeenCalled();
            });
        }
    }
);

test.each`
    expirationDate | isValid  | errorMessage                   | description
    ${' '}         | ${false} | ${'Este campo es obligatorio'} | ${'empty expiration date'}
    ${'11'}        | ${false} | ${'Fecha no válida'}           | ${'only month expiration date'}
    ${'11/18'}     | ${false} | ${'Fecha no válida'}           | ${'expired date'}
    ${'11/50'}     | ${true}  | ${'Fecha no válida'}           | ${'future date'}
`(
    'Credit card fields validation, $description: $expirationDate',
    async ({expirationDate, errorMessage, isValid}) => {
        const onValidationErrorsSpy = jest.fn();
        const onSubmitSpy = jest.fn();

        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Form onValidationErrors={onValidationErrorsSpy} onSubmit={onSubmitSpy}>
                    <CreditCardFields />
                    <ButtonPrimary submit>Submit</ButtonPrimary>
                </Form>
            </ThemeContextProvider>
        );

        userEvent.type(screen.getByLabelText('Número de tarjeta'), '4321432143214321');
        userEvent.type(screen.getByLabelText('Caducidad'), expirationDate);
        userEvent.type(screen.getByLabelText('CVV'), '123');
        userEvent.click(screen.getByRole('button', {name: 'Submit'}));

        if (isValid) {
            const [month, year] = expirationDate.split('/');
            await waitFor(() => {
                expect(onSubmitSpy).toHaveBeenCalledWith(
                    {
                        ccNum: '4321432143214321',
                        ccExp: {
                            month: Number(month),
                            year: Number(`20${year}`),
                            raw: expirationDate,
                        },
                        ccCvv: '123',
                    },
                    {ccNum: '4321 4321 4321 4321', ccExp: expirationDate, ccCvv: '123'}
                );
                expect(onValidationErrorsSpy).toHaveBeenCalledWith({});
            });
        } else {
            await waitFor(() => {
                expect(onValidationErrorsSpy).toHaveBeenCalledWith({
                    ccExp: errorMessage,
                });
                expect(onSubmitSpy).not.toHaveBeenCalled();
            });
        }
    }
);

test('Credit card fields validation, clear expiration date', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={() => {}}>
                <CreditCardFields />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const expirationDateField = screen.getByLabelText('Caducidad');

    userEvent.type(screen.getByLabelText('Número de tarjeta'), '4321432143214321');
    userEvent.type(expirationDateField, '11');
    userEvent.type(screen.getByLabelText('CVV'), '123');

    expect(screen.getByText('Fecha no válida')).toBeInTheDocument();

    userEvent.clear(expirationDateField);
    expirationDateField.blur();
    expect(screen.queryByText('Fecha no válida')).toBeNull();
    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
});

test.each`
    creditCardNumber      | cvv       | isValid  | description
    ${'4321432143214321'} | ${'123'}  | ${true}  | ${'3 digits CVV for visa'}
    ${'5321432143214321'} | ${'123'}  | ${true}  | ${'3 digits CVV for mastercard'}
    ${'342143214321432'}  | ${'1234'} | ${true}  | ${'4 digits CVV for american express'}
    ${'4321432143214321'} | ${'12'}   | ${false} | ${'too short CVV for visa'}
    ${'5321432143214321'} | ${'12'}   | ${false} | ${'too short CVV for mastercard'}
    ${'342143214321432'}  | ${'123'}  | ${false} | ${'too short CVV for american express'}
`('Credit card fields validation, $description: $cvv', async ({creditCardNumber, cvv, isValid}) => {
    const onValidationErrorsSpy = jest.fn();
    const onSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onValidationErrors={onValidationErrorsSpy} onSubmit={onSubmitSpy}>
                <CreditCardFields />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    userEvent.type(screen.getByLabelText('Número de tarjeta'), creditCardNumber);
    userEvent.type(screen.getByLabelText('Caducidad'), '11/50');
    userEvent.type(screen.getByLabelText('CVV'), cvv);
    userEvent.click(screen.getByRole('button', {name: 'Submit'}));

    if (isValid) {
        await waitFor(() => {
            expect(onSubmitSpy).toHaveBeenCalledWith(
                {
                    ccNum: creditCardNumber,
                    ccExp: {
                        month: 11,
                        year: 2050,
                        raw: '11/50',
                    },
                    ccCvv: cvv,
                },
                {ccNum: expect.any(String), ccExp: '11/50', ccCvv: cvv}
            );
            expect(onValidationErrorsSpy).toHaveBeenCalledWith({});
        });
    } else {
        await waitFor(() => {
            expect(onValidationErrorsSpy).toHaveBeenCalledWith({
                ccCvv: 'CVV incorrecto',
            });
            expect(onSubmitSpy).not.toHaveBeenCalled();
        });
    }
});
