import * as React from 'react';
import {render, waitFor, screen, act, waitForElementToBeRemoved} from '@testing-library/react';
import {alert, confirm, dialog} from '../dialog';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import * as webviewBridge from '@tef-novum/webview-bridge';
import userEvent from '@testing-library/user-event';

const alertProps = {message: 'Message'};
const confirmProps = {message: 'Confirm', onAccept: () => {}};

test('does not render anything initially', () => {
    const {asFragment} = render(<ThemeContextProvider theme={makeTheme()} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});

test('throws when we try to stack dialogs', async () => {
    render(<ThemeContextProvider theme={makeTheme()} />);
    act(() => {
        alert(alertProps);
    });
    expect(await screen.findByText(alertProps.message)).toBeInTheDocument();
    expect(() => confirm(confirmProps)).toThrow('not currently supported');
});

test('throws when we dont instantiate theme', async () => {
    render(<></>);
    expect(() => alert(alertProps)).toThrow(
        'Tried to show a dialog but the DialogRoot component was not mounted'
    );
});

test('renders alert dialog correctly when alert function called', async () => {
    render(<ThemeContextProvider theme={makeTheme()} />);
    act(() => {
        alert(alertProps);
    });

    expect(await screen.findByText(alertProps.message)).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Aceptar'})).toBeInTheDocument();
});

test('closes alert dialog when clicking on button', async () => {
    render(<ThemeContextProvider theme={makeTheme()} />);
    const onAcceptSpy = jest.fn();
    act(() => {
        alert({...alertProps, onAccept: onAcceptSpy});
    });

    const acceptButton = await screen.findByRole('button', {name: 'Aceptar'});
    expect(acceptButton).toBeInTheDocument();

    await userEvent.click(acceptButton);
    await waitFor(() => expect(onAcceptSpy).toHaveBeenCalled());
});

test('renders confirm dialog correctly when confirm function called', async () => {
    render(<ThemeContextProvider theme={makeTheme()} />);
    act(() => {
        confirm(confirmProps);
    });

    expect(screen.getByText(confirmProps.message)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cancelar'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Aceptar'})).toBeInTheDocument();
});

test('Closes a dialog on click outside', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={makeTheme()} />);

    const onCancelSpy = jest.fn();
    act(() => {
        dialog({...confirmProps, onCancel: onCancelSpy, showCancel: true});
    });

    expect(await screen.findByRole('button', {name: 'Cancelar'})).toBeInTheDocument();

    await userEvent.click(screen.getByRole('dialog')); // This is the opacity layer that appears over the underlying page.

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(onCancelSpy).toHaveBeenCalled();
});

test('closes confirm dialog when clicking on any button', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={makeTheme()} />);

    const onCancelSpy = jest.fn();
    act(() => {
        confirm({...confirmProps, onCancel: onCancelSpy});
    });

    const cancelButton = await screen.findByRole('button', {name: 'Cancelar'});
    expect(cancelButton).toBeInTheDocument();

    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(onCancelSpy).toHaveBeenCalled();

    const onAcceptSpy = jest.fn();
    act(() => {
        confirm({...confirmProps, onAccept: onAcceptSpy});
    });
    const acceptButton = await screen.findByRole('button', {name: 'Aceptar'});
    expect(acceptButton).toBeInTheDocument();
    await userEvent.click(acceptButton);
    await waitFor(() => {
        expect(onAcceptSpy).toHaveBeenCalled();
    });
}, 10000);

test('closing a previous accepted dialog does not trigger onAccept callback', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={makeTheme()} />);

    const onAcceptSpy = jest.fn();
    act(() => {
        confirm({...confirmProps, onAccept: onAcceptSpy, onCancel: undefined});
    });

    const acceptButton = await screen.findByRole('button', {name: 'Aceptar'});
    await userEvent.click(acceptButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(onAcceptSpy).toHaveBeenCalled();

    onAcceptSpy.mockClear();

    act(() => {
        confirm({...confirmProps, onAccept: onAcceptSpy, onCancel: undefined});
    });

    const cancelButton = await screen.findByRole('button', {name: 'Cancelar'});
    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(onAcceptSpy).not.toHaveBeenCalled();
}, 10000);

test('when webview bridge is available nativeAlert is shown', async () => {
    jest.spyOn(webviewBridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeAlertSpy = jest.spyOn(webviewBridge, 'nativeAlert').mockResolvedValue();

    render(<ThemeContextProvider theme={makeTheme()} />);
    act(() => {
        alert({...confirmProps, title: 'lolo'});
    });

    await waitFor(() => {
        expect(nativeAlertSpy).toHaveBeenCalledWith({
            title: 'lolo',
            message: 'Confirm',
            buttonText: 'Aceptar',
        });
    });
});

test('when webview bridge is available nativeConfirm is shown', async () => {
    jest.spyOn(webviewBridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeAlertSpy = jest.spyOn(webviewBridge, 'nativeConfirm').mockResolvedValue(true);

    render(<ThemeContextProvider theme={makeTheme()} />);
    act(() => {
        confirm({...confirmProps, title: 'lolo', acceptText: 'Cuco peludo'});
    });

    await waitFor(() => {
        expect(nativeAlertSpy).toHaveBeenCalledWith({
            title: 'lolo',
            message: 'Confirm',
            acceptText: 'Cuco peludo',
            cancelText: 'Cancelar',
        });
    });
});
