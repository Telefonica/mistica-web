import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormTextField from '../form-text-field';
import ThemeContextProvider from '../theme-context-provider';
import {overrideTheme} from './test-utils';

test('FormTextField uncontrolled', async () => {
    render(
        <ThemeContextProvider theme={overrideTheme({})}>
            <FormTextField label="Username" name="username" />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});

test('FormTextField controlled', async () => {
    const Component = () => {
        const [value, setValue] = React.useState('');

        return <FormTextField label="Username" name="username" value={value} onChangeValue={setValue} />;
    };

    render(
        <ThemeContextProvider theme={overrideTheme({})}>
            <Component />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});
