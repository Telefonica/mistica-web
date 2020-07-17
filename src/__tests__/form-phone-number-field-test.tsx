import * as React from 'react';
import {TextField, PhoneInput} from '..';
import {render, waitFor, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('text-field of type phone', async () => {
    const onChangeValueSpy = jest.fn();

    render(
        <TextField label="Enter Phone" type="phone" Input={PhoneInput} onChangeValue={onChangeValueSpy} />
    );

    userEvent.type(screen.getByLabelText('Enter Phone (opcional)'), '+54 9 223 123-4567');

    await waitFor(() => {
        expect(onChangeValueSpy).toHaveBeenLastCalledWith('5492231234567', '+54 9 223 123-4567');
    });
});
