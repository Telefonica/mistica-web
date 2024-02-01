import * as React from 'react';
import {render, waitFor, screen, act, waitForElementToBeRemoved} from '@testing-library/react';
import {ThemeContextProvider, useDialog} from '..';
import {makeTheme} from './test-utils';
import * as webviewBridge from '@tef-novum/webview-bridge';
import userEvent from '@testing-library/user-event';

const onAcceptSpy = jest.fn();
const onCancelSpy = jest.fn();

const alertProps = {
    title: 'Title',
    message: 'Message',
    acceptText: 'Yay!',
    onAccept: onAcceptSpy,
};

const confirmProps = {
    title: 'Title',
    message: 'Message',
    acceptText: 'Yay!',
    cancelText: 'Nope!',
    onAccept: onAcceptSpy,
    onCancel: onCancelSpy,
};

let savedAlert: (params: any) => void | null = () => {
    throw Error('unset');
};

const TestComponent = () => {
    const {alert, confirm, dialog} = useDialog();
    React.useEffect(() => {
        savedAlert = alert;
        return () => {
            savedAlert = () => {
                throw Error('unset');
            };
        };
    }, [alert]);
    return (
        <>
            <button onClick={() => alert(alertProps)}>Alert</button>
            <button onClick={() => confirm(confirmProps)}>Confirm</button>
            <button onClick={() => confirm({...confirmProps, onCancel: undefined})}>
                Confirm without onCancel
            </button>
            <button onClick={() => dialog(confirmProps)}>Dialog</button>
        </>
    );
};

beforeEach(() => {
    // The history object is not cleared between tests. This way we put the history position at the end
    window.history.pushState({}, '', '/');
});

test('does not render anything initially', () => {
    const {asFragment} = render(<ThemeContextProvider theme={makeTheme()} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});

test('throws when we try to stack dialogs', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    expect(await screen.findByText(alertProps.message)).toBeInTheDocument();

    expect(() => {
        act(() => savedAlert(alertProps));
    }).toThrow('Tried to show a dialog on top of another dialog');
});

test("throws when we don't instantiate theme", async () => {
    render(<TestComponent />);

    expect(() => {
        act(() => savedAlert(alertProps));
    }).toThrow('Tried to show a dialog but the DialogRoot component was not mounted');
});

test('renders alert dialog correctly when alert function called', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    expect(await screen.findByText(alertProps.message)).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Yay!'})).toBeInTheDocument();
});

test('works with nested theme context providers', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ThemeContextProvider theme={makeTheme()}>
                <TestComponent />
            </ThemeContextProvider>
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    expect(await screen.findByText(alertProps.message)).toBeInTheDocument();
});

test('closes alert dialog when clicking on button', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    const acceptButton = await screen.findByRole('button', {name: 'Yay!'});
    expect(acceptButton).toBeInTheDocument();

    await userEvent.click(acceptButton);
    await waitFor(() => expect(onAcceptSpy).toHaveBeenCalledTimes(1));
});

test('renders confirm dialog correctly when confirm function called', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const confirmButton = await screen.findByRole('button', {name: 'Confirm'});
    await userEvent.click(confirmButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(confirmProps.message)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Nope!'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Yay!'})).toBeInTheDocument();
});

test('Closes a dialog on click outside', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const dialogButton = await screen.findByRole('button', {name: 'Dialog'});
    await userEvent.click(dialogButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Nope!'})).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('dialog-overlay'));

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));
    expect(onCancelSpy).toHaveBeenCalled();
});

test('closes confirm dialog when clicking on any button', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const confirmButton = await screen.findByRole('button', {name: 'Confirm'});
    await userEvent.click(confirmButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    const cancelButton = await screen.findByRole('button', {name: 'Nope!'});
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));
    expect(onCancelSpy).toHaveBeenCalled();

    const confirmWithoutOnCancelButton = await screen.findByRole('button', {
        name: 'Confirm without onCancel',
    });
    await userEvent.click(confirmWithoutOnCancelButton);

    // the cancel button should be visible even if the onCancel callback is not defined
    const cancelButton2 = await screen.findByRole('button', {name: 'Nope!'});
    expect(cancelButton2).toBeInTheDocument();

    const acceptButton = await screen.findByRole('button', {name: 'Yay!'});
    await userEvent.click(acceptButton);

    await waitFor(() => {
        expect(onAcceptSpy).toHaveBeenCalled();
    });
}, 10000);

test('closing a previous accepted dialog does not trigger onAccept callback', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const confirmButton = await screen.findByRole('button', {name: 'Confirm'});
    await userEvent.click(confirmButton);

    const acceptButton = await screen.findByRole('button', {name: 'Yay!'});
    await userEvent.click(acceptButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));
    expect(onAcceptSpy).toHaveBeenCalled();

    onAcceptSpy.mockClear();

    await userEvent.click(confirmButton);

    const cancelButton = await screen.findByRole('button', {name: 'Nope!'});
    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));
    expect(onAcceptSpy).not.toHaveBeenCalled();
}, 10000);

test('when webview bridge is available nativeAlert is shown', async () => {
    jest.spyOn(webviewBridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeAlertSpy = jest.spyOn(webviewBridge, 'nativeAlert').mockResolvedValue();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    await waitFor(() => {
        expect(nativeAlertSpy).toHaveBeenCalledWith({
            title: 'Title',
            message: 'Message',
            buttonText: 'Yay!',
        });
    });
});

test('when webview bridge is available nativeConfirm is shown', async () => {
    jest.spyOn(webviewBridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeAlertSpy = jest.spyOn(webviewBridge, 'nativeConfirm').mockResolvedValue(true);

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const confirmButton = await screen.findByRole('button', {name: 'Confirm'});
    await userEvent.click(confirmButton);

    await waitFor(() => {
        expect(nativeAlertSpy).toHaveBeenCalledWith({
            title: 'Title',
            message: 'Message',
            acceptText: 'Yay!',
            cancelText: 'Nope!',
        });
    });
});

test('history restored after closing a dialog using back', async () => {
    const pushStateSpy = jest.spyOn(window.history, 'pushState');
    const backSpy = jest.spyOn(window.history, 'back');
    const initialHistoryLength = window.history.length;

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(window.history.length).toBe(initialHistoryLength + 1);

    act(() => {
        window.history.back();
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));

    expect(pushStateSpy).toHaveBeenCalledTimes(1);
    expect(backSpy).toHaveBeenCalledTimes(1);
});

test('history restored after closing a dialog using a button', async () => {
    const pushStateSpy = jest.spyOn(window.history, 'pushState');
    const backSpy = jest.spyOn(window.history, 'back');
    const initialHistoryLength = window.history.length;

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const alertButton = await screen.findByRole('button', {name: 'Alert'});
    await userEvent.click(alertButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(window.history.length).toBe(initialHistoryLength + 1);

    const acceptButton = await screen.findByRole('button', {name: 'Yay!'});
    await userEvent.click(acceptButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog', {hidden: true}));

    expect(pushStateSpy).toHaveBeenCalledTimes(1);
    expect(backSpy).toHaveBeenCalledTimes(1);
});
