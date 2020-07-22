import * as React from 'react';
import {FormPhoneNumberField} from '..';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('form-phone-number-field', async () => {
    const onChangeValueSpy = jest.fn();

    render(<FormPhoneNumberField label="Enter Phone" name="phone" onChangeValue={onChangeValueSpy} />);

    await userEvent.type(screen.getByLabelText('Enter Phone'), '+54 9 223 123-4567');

    expect(onChangeValueSpy).toHaveBeenLastCalledWith('5492231234567', '+54 9 223 123-4567');
});
