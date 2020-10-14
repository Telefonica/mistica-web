import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../text-field';
import ThemeContextProvider from '../theme-context-provider';
import {overrideTheme} from './utils';

test('TextField uncontrolled', async () => {
    render(
        <ThemeContextProvider theme={overrideTheme({})}>
            <TextField label="Username" name="username" />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});

test('TextField controlled', async () => {
    const Component = () => {
        const [value, setValue] = React.useState('');

        return <TextField label="Username" name="username" value={value} onChangeValue={setValue} />;
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
