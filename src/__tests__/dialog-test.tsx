import * as React from 'react';
import {render, waitFor, screen, act} from '@testing-library/react';
import {ThemeContextProvider, useDialog, RowList, Row} from '..';
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
    closeButtonLabel: 'custom close label',
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

    await waitFor(
        () => {
            expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

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

    await waitFor(() => {
        expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
    });

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
});

test('closing a previous accepted dialog does not trigger onAccept callback', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const confirmButton = await screen.findByRole('button', {name: 'Confirm'});
    await userEvent.click(confirmButton);

    await screen.findByRole('dialog');
    const acceptButton = await screen.findByRole('button', {name: 'Yay!'});

    await userEvent.click(acceptButton);

    await waitFor(() => {
        expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
    });

    expect(onAcceptSpy).toHaveBeenCalled();

    onAcceptSpy.mockClear();

    await userEvent.click(confirmButton);

    const cancelButton = await screen.findByRole('button', {name: 'Nope!'});
    await userEvent.click(cancelButton);

    await waitFor(() => {
        expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
    });

    expect(onAcceptSpy).not.toHaveBeenCalled();
});

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

test('dialog close button is accessible', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <TestComponent />
        </ThemeContextProvider>
    );

    const dialogButton = await screen.findByRole('button', {name: 'Dialog'});
    await userEvent.click(dialogButton);

    await screen.findByRole('button', {name: 'custom close label'});
});

describe('focus return after dialog close', () => {
    test('returns focus to the trigger button after alert closes', async () => {
        const TriggerComponent = () => {
            const {alert} = useDialog();
            return <button onClick={() => alert({message: 'Alert!', acceptText: 'OK'})}>Trigger</button>;
        };

        render(
            <ThemeContextProvider theme={makeTheme()}>
                <TriggerComponent />
            </ThemeContextProvider>
        );

        const triggerButton = screen.getByRole('button', {name: 'Trigger'});
        triggerButton.focus();
        expect(triggerButton).toHaveFocus();

        await userEvent.click(triggerButton);
        await screen.findByRole('dialog');

        const acceptButton = screen.getByRole('button', {name: 'OK'});
        await userEvent.click(acceptButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(triggerButton).toHaveFocus();
        });
    });

    test('returns focus to the switch inside a row after confirm closes', async () => {
        // Disable animations so dialogs close immediately
        jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

        const SwitchInRowComponent = () => {
            const {confirm} = useDialog();
            const [checked, setChecked] = React.useState(false);

            const handleChange = (value: boolean) => {
                setChecked(value);
                if (value) {
                    confirm({
                        message: 'Are you sure?',
                        acceptText: 'Yes',
                        cancelText: 'No',
                        onAccept: () => {},
                        onCancel: () => setChecked(false),
                    });
                }
            };

            return (
                <RowList>
                    <Row
                        title="Enable feature"
                        switch={{name: 'feature', value: checked, onChange: handleChange}}
                    />
                </RowList>
            );
        };

        render(
            <ThemeContextProvider theme={makeTheme()}>
                <SwitchInRowComponent />
            </ThemeContextProvider>
        );

        const switchEl = screen.getByRole('switch', {name: 'Enable feature'});
        switchEl.focus();
        expect(switchEl).toHaveFocus();

        await userEvent.click(switchEl);
        await screen.findByRole('dialog');

        const cancelButton = screen.getByRole('button', {name: 'No'});
        await userEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(switchEl).toHaveFocus();
        });
    });

    test('returns focus to the switch after alert closes (keyboard activation)', async () => {
        const SwitchWithAlertComponent = () => {
            const {alert} = useDialog();
            const [checked, setChecked] = React.useState(false);

            const handleChange = (value: boolean) => {
                setChecked(value);
                if (value) {
                    alert({message: 'Feature enabled!', acceptText: 'OK'});
                }
            };

            return (
                <RowList>
                    <Row title="Toggle" switch={{name: 'toggle', value: checked, onChange: handleChange}} />
                </RowList>
            );
        };

        render(
            <ThemeContextProvider theme={makeTheme()}>
                <SwitchWithAlertComponent />
            </ThemeContextProvider>
        );

        const switchEl = screen.getByRole('switch', {name: 'Toggle'});
        switchEl.focus();
        expect(switchEl).toHaveFocus();

        // Activate switch via Space key
        await userEvent.keyboard(' ');

        await screen.findByRole('dialog');

        const acceptButton = screen.getByRole('button', {name: 'OK'});
        await userEvent.click(acceptButton);

        await waitFor(() => {
            expect(screen.queryByRole('dialog', {hidden: true})).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(switchEl).toHaveFocus();
        });
    });
});
