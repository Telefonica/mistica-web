import * as React from 'react';
import {RowList, Row, BoxedRowList, BoxedRow} from '../list';
import {RadioGroup} from '../radio-button';
import {screen, render, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ButtonPrimary,
    Form,
    IconPlayFilled,
    IconShopRegular,
    IconTrashCanRegular,
    Stack,
    Tag,
    Text2,
    ThemeContextProvider,
} from '..';
import {makeTheme} from './test-utils';

test('RowList has a list role by default', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" to="/somewhere" />
                <Row title="Title 2" />
            </RowList>
        </ThemeContextProvider>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
});

test('BoxedRowList has a list role by default', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <BoxedRow title="Title" to="/somewhere" />
                <BoxedRow title="Title 2" />
            </BoxedRowList>
        </ThemeContextProvider>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
});

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

test('Row, keeping its listitem role, containing a button reporting link role', async () => {
    const spy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row title="Title" onPress={spy} touchableRole="link" />
            </RowList>
        </ThemeContextProvider>
    );

    const rowDiv = screen.getByRole('listitem');
    expect(rowDiv).toBeInTheDocument();

    const button = within(rowDiv).getByRole('link', {name: 'Title'});
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

    const radioBanana = screen.getByRole('radio', {name: 'Banana bananabanana'});
    const radioApple = screen.getByRole('radio', {name: 'Apple appleapple'});

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
                        <Row title="Checkbox 1" checkbox={{name: 'checkbox1'}} />
                        <Row title="Checkbox 2" onPress={() => {}} checkbox={{name: 'checkbox2'}} />
                        <Row title="Switch 1" switch={{name: 'switch1'}} />
                        <Row title="Switch 2" onPress={() => {}} switch={{name: 'switch2'}} />
                        <Row title="Banana" radioValue="banana" />
                        <Row title="Apple" radioValue="apple" />
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

    expect(screen.getByRole('checkbox', {name: 'Checkbox 1'})).toBeChecked();
    expect(screen.getByRole('checkbox', {name: 'Checkbox 2'})).not.toBeChecked();
    expect(screen.getByRole('switch', {name: 'Switch 1'})).toBeChecked();
    expect(screen.getByRole('switch', {name: 'Switch 2'})).not.toBeChecked();
    expect(screen.getByRole('radio', {name: 'Banana'})).toBeChecked();
    expect(screen.getByRole('radio', {name: 'Apple'})).not.toBeChecked();

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
}, 30000);

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

test('BoxedRow, keeping its listitem role, containing a button reporting link role', async () => {
    const spy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <BoxedRowList>
                <BoxedRow title="Title" onPress={spy} touchableRole="link" />
            </BoxedRowList>
        </ThemeContextProvider>
    );

    const rowDiv = screen.getByRole('listitem');
    expect(rowDiv).toBeInTheDocument();

    const button = within(rowDiv).getByRole('link', {name: 'Title'});
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(spy).toHaveBeenCalled();
});

test('Text content is read by screen readers in the right order in Rows with link', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    detail="Detail"
                    right="right"
                    asset={<IconShopRegular />}
                    extra={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    href="/"
                />
            </RowList>
        </ThemeContextProvider>
    );

    const row = screen.getByRole('link', {
        // WARN: There should be a space between the extra lines, but jsdom doesn't support .innerText method, so we fallback to .textContent https://github.com/jsdom/jsdom/issues/1245
        name: 'Title Headline Subtitle Description Extra line 1Extra line 2 Detail right',
    });
    expect(row).toBeInTheDocument();
});

test('Text content is read by screen readers in the right order in Rows with button', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    detail="Detail"
                    right="right"
                    asset={<IconShopRegular />}
                    extra={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    onPress={() => {}}
                />
            </RowList>
        </ThemeContextProvider>
    );

    const row = screen.getByRole('button', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 Detail right',
    });
    expect(row).toBeInTheDocument();
});

test('Text content is read by screen readers in the right order in Rows with checkbox', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    extra={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    detail="detail"
                    right="right"
                    asset={<IconShopRegular />}
                    checkbox={{defaultValue: false}}
                />
            </RowList>
        </ThemeContextProvider>
    );

    const row = screen.getByRole('checkbox', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    expect(row).toBeInTheDocument();
});

test('Text content is read by screen readers in the right order in Rows with switch', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    subtitle="Subtitle"
                    description="Description"
                    extra={
                        <Stack space={4}>
                            <Text2 regular>Extra line 1</Text2>
                            <Text2 regular>Extra line 2</Text2>
                        </Stack>
                    }
                    detail="detail"
                    right="right"
                    asset={<IconShopRegular />}
                    switch={{defaultValue: false}}
                />
            </RowList>
        </ThemeContextProvider>
    );

    const row = screen.getByRole('switch', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    expect(row).toBeInTheDocument();
});

test('Text content is read by screen readers in the right order in Rows with radio', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RadioGroup name="radio-group">
                <RowList>
                    <Row
                        headline={<Tag type="promo">Headline</Tag>}
                        title="Title"
                        subtitle="Subtitle"
                        description="Description"
                        extra={
                            <Stack space={4}>
                                <Text2 regular>Extra line 1</Text2>
                                <Text2 regular>Extra line 2</Text2>
                            </Stack>
                        }
                        detail="detail"
                        right="right"
                        asset={<IconShopRegular />}
                        radioValue="radio1"
                    />
                </RowList>
            </RadioGroup>
        </ThemeContextProvider>
    );

    const row = screen.getByRole('radio', {
        name: 'Title Headline Subtitle Description Extra line 1 Extra line 2 detail right',
    });
    expect(row).toBeInTheDocument();
});

test('aria-label is read by screen readers in informative rows', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <RowList>
                <Row
                    aria-label="Some custom label"
                    headline={<Tag type="promo">Headline</Tag>}
                    title="Title"
                    description="Description"
                />
            </RowList>
        </ThemeContextProvider>
    );

    expect(screen.getByText('Some custom label')).toBeInTheDocument();
});
