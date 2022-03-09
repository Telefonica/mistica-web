import * as React from 'react';
import {RowList, Row} from '../list';
import {RadioGroup} from '../radio-button';
import {screen, fireEvent, render, waitFor} from '@testing-library/react';
import {ButtonPrimary, Form, ThemeContextProvider} from '..';
import {makeTheme} from './test-utils';

test('Row which navigates', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" href="/some/url" />
            </RowList>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link');

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', '/some/url');
});

test('Row as a button', () => {
    const spy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" onPress={spy} />
            </RowList>
        </ThemeContextProvider>
    );

    const button = screen.getByRole('button', {name: 'Title'});
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
});

test('Row with switch', () => {
    const onChangeFn = (isChecked?: boolean) => {
        return isChecked;
    };

    const spyOnChange = jest.fn(onChangeFn);

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" switch={{defaultValue: false}} />
            </RowList>
        </ThemeContextProvider>
    );

    const switchEl = screen.getByRole('switch', {name: 'Title'});

    expect(switchEl).not.toBeChecked();

    fireEvent.click(switchEl);

    expect(switchEl).toBeChecked();

    expect(spyOnChange).toHaveBeenCalled();
});

test('Row with checkbox', () => {
    const onChangeFn = (isChecked?: boolean) => {
        return isChecked;
    };

    const spyOnChange = jest.fn(onChangeFn);

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" checkbox={{defaultValue: false, onChange: onChangeFn}} />
            </RowList>
        </ThemeContextProvider>
    );

    const checkboxEl = screen.getByRole('checkbox', {name: 'Title'});

    expect(checkboxEl).not.toBeChecked();

    fireEvent.click(checkboxEl);

    expect(checkboxEl).toBeChecked();

    expect(spyOnChange).toHaveBeenCalled();
});

test('Row with custom right element', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" right={<div>custom</div>} />
            </RowList>
        </ThemeContextProvider>
    );

    expect(screen.getByText('custom')).toBeInTheDocument();
});

test('Row list with radio buttons', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RadioGroup name="radio-group">
                <RowList>
                    <Row title="Banana" radioValue="banana" />
                    <Row title="Apple" radioValue="apple" />
                </RowList>
            </RadioGroup>
        </ThemeContextProvider>
    );

    const radioBanana = screen.getByRole('radio', {name: 'Banana'});
    const radioApple = screen.getByRole('radio', {name: 'Apple'});

    expect(radioBanana).not.toBeChecked();
    expect(radioApple).not.toBeChecked();

    fireEvent.click(radioBanana);

    expect(radioBanana).toBeChecked();
    expect(radioApple).not.toBeChecked();

    fireEvent.click(radioApple);

    expect(radioBanana).not.toBeChecked();
    expect(radioApple).toBeChecked();
});

test('RowList inside Form', async () => {
    const submitSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={submitSpy}>
                <RadioGroup name="radio">
                    <RowList>
                        <Row
                            dataAttributes={{testid: 'check1'}}
                            title="Checkbox 1"
                            checkbox={{name: 'checkbox1'}}
                        />
                        <Row
                            dataAttributes={{testid: 'check2'}}
                            title="Checkbox 2"
                            onPress={() => {}}
                            checkbox={{name: 'checkbox2'}}
                        />
                        <Row
                            dataAttributes={{testid: 'switch1'}}
                            title="Switch 1"
                            switch={{name: 'switch1'}}
                        />
                        <Row
                            dataAttributes={{testid: 'switch2'}}
                            title="Switch 2"
                            onPress={() => {}}
                            switch={{name: 'switch2'}}
                        />
                        <Row dataAttributes={{testid: 'banana'}} title="Banana" radioValue="banana" />
                        <Row dataAttributes={{testid: 'apple'}} title="Apple" radioValue="apple" />
                    </RowList>
                </RadioGroup>
                <ButtonPrimary submit>Submit</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    fireEvent.click(screen.getByRole('radio', {name: 'Banana'}));
    fireEvent.click(screen.getByRole('checkbox', {name: 'Checkbox 1'}));
    fireEvent.click(screen.getByRole('switch', {name: 'Switch 1'}));
    fireEvent.click(screen.getByRole('button', {name: 'Submit'}));

    expect(screen.getByTestId('check1')).toBeChecked();
    expect(screen.getByTestId('check2')).not.toBeChecked();
    expect(screen.getByTestId('switch1')).toBeChecked();
    expect(screen.getByTestId('switch2')).not.toBeChecked();
    expect(screen.getByTestId('banana')).toBeChecked();
    expect(screen.getByTestId('apple')).not.toBeChecked();

    await waitFor(() => {
        expect(submitSpy).toHaveBeenCalled();
        expect(submitSpy.mock.calls[0][0]).toEqual({
            checkbox1: true,
            checkbox2: false,
            switch1: true,
            switch2: false,
            radio: 'banana',
        });
    });
});
