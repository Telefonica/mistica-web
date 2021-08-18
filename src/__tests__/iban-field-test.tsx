import * as React from 'react';
import {Form, IbanField, ButtonPrimary} from '..';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('IbanField', async () => {
    const onSubmitSpy = jest.fn();
    const onValidationErrorsSpy = jest.fn();
    const formIbanError = 'invalid iban';

    const validIban = 'ES7921000813610123456789';
    const formattedIban = 'ES79 2100 0813 6101 2345 6789';
    const wrongLengthIban = validIban.slice(0, -1);
    const wrongChecksumIban = validIban.slice(0, -1) + '5';

    render(
        <ThemeContextProvider theme={makeTheme({texts: {formIbanError}})}>
            <Form onSubmit={onSubmitSpy} onValidationErrors={onValidationErrorsSpy}>
                <IbanField label="IBAN" name="iban" />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const ibanField = screen.getByLabelText('IBAN');
    const submitButton = screen.getByRole('button', {name: 'Submit'});

    userEvent.type(ibanField, wrongLengthIban);
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(onValidationErrorsSpy).toHaveBeenCalledWith({
            iban: formIbanError,
        });
    });

    onValidationErrorsSpy.mockClear();
    userEvent.clear(ibanField);
    userEvent.type(ibanField, wrongChecksumIban);
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(onValidationErrorsSpy).toHaveBeenCalledWith({
            iban: formIbanError,
        });
    });

    onValidationErrorsSpy.mockClear();
    userEvent.clear(ibanField);
    userEvent.type(ibanField, validIban);
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(onValidationErrorsSpy).not.toHaveBeenCalled();
        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
        expect(onSubmitSpy).toHaveBeenCalledWith(
            {
                iban: validIban,
            },
            {
                iban: formattedIban,
            }
        );
    });
});
