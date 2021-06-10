import * as React from 'react';
import {PhoneNumberField} from '..';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('form-phone-number-field', async () => {
    const onChangeValueSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PhoneNumberField label="Enter Phone" name="phone" onChangeValue={onChangeValueSpy} />
        </ThemeContextProvider>
    );

    userEvent.type(screen.getByLabelText('Enter Phone'), '+54 9 223 123-4567');

    expect(onChangeValueSpy).toHaveBeenLastCalledWith('5492231234567', '+54 9 223 123-4567');
});

test('form-phone-number-field 2', async () => {
    const onChangeValueSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <PhoneNumberField label="Enter Phone" name="phone" onChangeValue={onChangeValueSpy} />
        </ThemeContextProvider>
    );

    userEvent.type(screen.getByLabelText('Enter Phone'), '+123123123');

    expect(onChangeValueSpy).toHaveBeenLastCalledWith('123123123', '+1 231-231-23');
});
