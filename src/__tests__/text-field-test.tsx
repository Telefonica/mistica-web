import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from '../text-field';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import {ButtonPrimary} from '../button';
import Form from '../form';

test('TextField uncontrolled', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
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
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Username');
    await userEvent.type(field, 'pepito');

    expect(field).toHaveValue('pepito');
});

test('TextField maxLength', async () => {
    const onsubmitSpy = jest.fn();
    const Component = () => {
        const [value, setValue] = React.useState('');

        const setLongString = () => {
            setValue('1234567890');
        };

        return (
            <Form onSubmit={onsubmitSpy}>
                <TextField
                    label="Sort string"
                    name="sortstr"
                    value={value}
                    onChangeValue={setValue}
                    maxLength={5}
                />
                <ButtonPrimary onPress={setLongString}>Write long string</ButtonPrimary>
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Component />
        </ThemeContextProvider>
    );

    const field = screen.getByLabelText('Sort string');
    const button = screen.getByRole('button', {name: 'Write long string'});

    await userEvent.click(button);

    expect(field).toHaveValue('12345');

    const submitButton = screen.getByRole('button', {name: 'Submit'});
    await userEvent.click(submitButton);

    expect(onsubmitSpy).toHaveBeenCalledWith({sortstr: '12345'}, {sortstr: '12345'});
});
