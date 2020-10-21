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

    await userEvent.type(screen.getByLabelText('Enter Phone'), '+54 9 223 123-4567');

    expect(onChangeValueSpy).toHaveBeenLastCalledWith('5492231234567', '+54 9 223 123-4567');
});
