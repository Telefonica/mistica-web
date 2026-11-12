import * as React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import {ButtonPrimary, Form, Checkbox, ThemeContextProvider, TextLink} from '..';
import userEvent from '@testing-library/user-event';
import {makeTheme} from './test-utils';

test('renders accesible checkbox', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Checkbox name="checkbox" defaultChecked={false} />
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement).toBeInTheDocument();
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
});

test('controlled mode', async () => {
    const Component = () => {
        const [checked, setChecked] = React.useState(false);
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <Checkbox name="checkbox" onChange={setChecked} checked={checked} />
            </ThemeContextProvider>
        );
    };

    render(<Component />);

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
});

test('uncontrolled mode', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Checkbox name="checkbox" defaultChecked />
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
});

test('uncontrolled mode with onChange handler', async () => {
    const onChangeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Checkbox name="checkbox" onChange={onChangeSpy} defaultChecked />
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');

    await waitFor(() => expect(onChangeSpy).toHaveBeenCalledWith(false));
});

test('form controlled mode', async () => {
    const handleSubmitSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy} initialValues={{checkbox: true}}>
                <Checkbox name="checkbox" />
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({checkbox: false}, {checkbox: false}));
});

test('form uncontrolled mode', async () => {
    const handleSubmitSpy = jest.fn();

    const ControlledSwitch = () => {
        const [checked, setChecked] = React.useState(false);
        return <Checkbox checked={checked} onChange={setChecked} name="checkbox" />;
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Form onSubmit={handleSubmitSpy} initialValues={{switch: true}}>
                <ControlledSwitch />
                <ButtonPrimary submit>done!</ButtonPrimary>
            </Form>
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('true');
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleSubmitSpy).toHaveBeenCalledWith({checkbox: true}, {checkbox: true}));
});

test("with link. Clicking the link doesn't check the checkbox", async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Checkbox name="checkbox">
                Accept <TextLink href="#terms-and-conditions">terms and conditions</TextLink>
            </Checkbox>
        </ThemeContextProvider>
    );

    const checkBoxElement = screen.getByRole('checkbox');
    const linkElement = screen.getByRole('link');

    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(linkElement);
    expect(checkBoxElement.getAttribute('aria-checked')).toBe('false');
});

test('Checkbox onClick event is not propagated', async () => {
    const onPressHandler = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <button onClick={onPressHandler}>
                <Checkbox name="checkbox" />
            </button>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onPressHandler).not.toHaveBeenCalled();
});
