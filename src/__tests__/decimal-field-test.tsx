import * as React from 'react';
import {Form, DecimalField, ButtonPrimary} from '../index';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test.each`
    input            | maxDecimals  | expected
    ${'123.4567890'} | ${undefined} | ${'123,4567890'}
    ${'123.4567890'} | ${2}         | ${'123,45'}
    ${'123.4567890'} | ${0}         | ${'1234567890'}
`(`DecimalField - maxDecimals: $maxDecimals`, async ({input, maxDecimals, expected}) => {
    const onSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={onSubmitSpy}>
                <DecimalField label="Decimal" name="decimal" maxDecimals={maxDecimals} />
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const decimalField = screen.getByLabelText('Decimal');
    const submitButton = screen.getByRole('button', {name: 'Submit'});

    userEvent.type(decimalField, input);
    userEvent.click(submitButton);

    await waitFor(() => {
        expect(onSubmitSpy).toHaveBeenCalledWith({decimal: expected}, {decimal: expected});
    });
});
