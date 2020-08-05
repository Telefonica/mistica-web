import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTextField from '../form-text-field';

test('FormTextField uncontrolled', async () => {
    render(<FormTextField label="Username" name="username" />);

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});

test('FormTextField controlled', async () => {
    const Component = () => {
        const [value, setValue] = React.useState('');

        return <FormTextField label="Username" name="username" value={value} onChangeValue={setValue} />;
    };

    render(<Component />);

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});
