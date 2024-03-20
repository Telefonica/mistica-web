import * as React from 'react';
import {RowList, Row} from '../list';
import {RadioGroup} from '../radio-button';
import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ButtonPrimary,
    Form,
    IconPlayFilled,
    IconShopRegular,
    IconTrashCanRegular,
    ThemeContextProvider,
} from '..';
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

test('Row as a button', async () => {
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
    await userEvent.click(button);
    expect(spy).toHaveBeenCalled();
});

test('Row with switch', async () => {
    const spyOnChange = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" switch={{defaultValue: false, onChange: spyOnChange}} />
            </RowList>
        </ThemeContextProvider>
    );

    const switchEl = screen.getByRole('switch', {name: 'Title'});

    expect(switchEl).not.toBeChecked();

    await userEvent.click(switchEl);

    expect(switchEl).toBeChecked();
    expect(spyOnChange).toHaveBeenCalledWith(true);

    await userEvent.click(switchEl);

    expect(spyOnChange).toHaveBeenCalledWith(false);
});

test('Row with checkbox', async () => {
    const spyOnChange = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" checkbox={{defaultValue: false, onChange: spyOnChange}} />
            </RowList>
        </ThemeContextProvider>
    );

    const checkboxEl = screen.getByRole('checkbox', {name: 'Title'});

    expect(checkboxEl).not.toBeChecked();

    await userEvent.click(checkboxEl);

    expect(checkboxEl).toBeChecked();
    expect(spyOnChange).toHaveBeenCalledWith(true);

    await userEvent.click(checkboxEl);

    expect(spyOnChange).toHaveBeenCalledWith(false);
});

test('Row with custom right element', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" right={() => <div>custom</div>} />
            </RowList>
        </ThemeContextProvider>
    );

    expect(screen.getByText('custom')).toBeInTheDocument();
});

test('Row list with radio buttons', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RadioGroup name="radio-group">
                <RowList>
                    <Row title="Banana" subtitle="bananabanana" radioValue="banana" />
                    <Row title="Apple" subtitle="appleapple" radioValue="apple" />
                </RowList>
            </RadioGroup>
        </ThemeContextProvider>
    );

    const radioBanana = screen.getByRole('radio', {name: 'Banana'});
    // alternate accessible selector
    const radioApple = screen.getByLabelText('Apple');

    expect(radioBanana).not.toBeChecked();
    expect(radioApple).not.toBeChecked();

    await userEvent.click(radioBanana);

    expect(radioBanana).toBeChecked();
    expect(radioApple).not.toBeChecked();

    await userEvent.click(radioApple);

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

    await userEvent.click(screen.getByRole('radio', {name: 'Banana'}));
    await userEvent.click(screen.getByRole('checkbox', {name: 'Checkbox 1'}));
    await userEvent.click(screen.getByRole('switch', {name: 'Switch 1'}));
    await userEvent.click(screen.getByRole('button', {name: 'Submit'}));

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

test('Row list with icon buttons', async () => {
    const firstButtonSpy = jest.fn();
    const secondButtonSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    title="Banana"
                    subtitle="bananabanana"
                    iconButton={{
                        Icon: IconPlayFilled,
                        onPress: firstButtonSpy,
                        'aria-label': 'first-button',
                    }}
                />
                <Row
                    title="Apple"
                    subtitle="appleapple"
                    iconButton={{
                        Icon: IconPlayFilled,
                        onPress: secondButtonSpy,
                        'aria-label': 'second-button',
                    }}
                />
            </RowList>
        </ThemeContextProvider>
    );

    const firstButton = screen.getByRole('button', {name: 'first-button'});
    const secondButton = screen.getByRole('button', {name: 'second-button'});

    await userEvent.click(firstButton);
    await userEvent.click(secondButton);
    await userEvent.click(secondButton);

    expect(firstButtonSpy).toHaveBeenCalledTimes(1);
    expect(secondButtonSpy).toHaveBeenCalledTimes(2);
});

test('Row list with iconButton', async () => {
    const onPressSpy = jest.fn();
    const iconButtonOnPressSpy = jest.fn();
    const logEventSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <RowList>
                <Row
                    asset={<IconShopRegular />}
                    title="Title"
                    description="Description"
                    onPress={onPressSpy}
                    trackingEvent={{name: 'row-tracking-event'}}
                    iconButton={{
                        'aria-label': 'Remove',
                        Icon: IconTrashCanRegular,
                        small: true,
                        backgroundType: 'transparent',
                        type: 'neutral',
                        onPress: iconButtonOnPressSpy,
                        trackingEvent: {name: 'icon-button-tracking-event'},
                    }}
                />
            </RowList>
        </ThemeContextProvider>
    );

    const rowButton = screen.getByRole('button', {name: 'Title Description'});
    await userEvent.click(rowButton);
    expect(onPressSpy).toHaveBeenCalledTimes(1);
    expect(logEventSpy).toHaveBeenCalledWith({name: 'row-tracking-event'});

    const iconButton = screen.getByRole('button', {name: 'Remove'});
    await userEvent.click(iconButton);
    expect(iconButtonOnPressSpy).toHaveBeenCalledTimes(1);
    expect(logEventSpy).toHaveBeenCalledWith({name: 'icon-button-tracking-event'});
});
