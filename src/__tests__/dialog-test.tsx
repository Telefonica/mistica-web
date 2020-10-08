import * as React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import {alert, confirm} from '../dialog';
import ThemeContextProvider from '../theme-context-provider';
import {overrideTheme} from './test-utils';
import * as webviewBridge from '@tef-novum/webview-bridge';

const alertProps = {message: 'Message'};
const confirmProps = {message: 'Confirm', onAccept: () => {}};

test('does not render anything initially', () => {
    const {asFragment} = render(<ThemeContextProvider theme={overrideTheme({})} />);
    expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});

test('throws when we try to stack dialogs', async () => {
    render(<ThemeContextProvider theme={overrideTheme({})} />);
    alert(alertProps);
    await waitFor(() => {
        expect(screen.getByText(alertProps.message)).toBeInTheDocument();
    });
    expect(() => confirm(confirmProps)).toThrow('not currently supported');
});

test('throws when we dont instantiate theme', async () => {
    render(<></>);
    expect(() => alert(alertProps)).toThrow(
        'Tried to show a dialog but the DialogRoot component was not mounted'
    );
});

test('renders alert dialog correctly when alert function called', async () => {
    render(<ThemeContextProvider theme={overrideTheme({})} />);
    alert(alertProps);

    await waitFor(() => {
        expect(screen.getByText(alertProps.message)).toBeInTheDocument();
        expect(screen.getByText('Aceptar')).toBeInTheDocument();
    });
});

test('closes alert dialog when clicking on button', async () => {
    render(<ThemeContextProvider theme={overrideTheme({})} />);
    const onAcceptSpy = jest.fn();
    alert({...alertProps, onAccept: onAcceptSpy});

    await waitFor(() => {
        expect(screen.getByText('Aceptar')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Aceptar'));
    await waitFor(() => expect(onAcceptSpy).toHaveBeenCalled());
});

test('renders confirm dialog correctly when confirm function called', async () => {
    render(<ThemeContextProvider theme={overrideTheme({})} />);
    confirm(confirmProps);

    await waitFor(() => {
        expect(screen.getByText(confirmProps.message)).toBeInTheDocument();
    });
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
});

test('Closes a dialog on click outside', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={overrideTheme({})} />);

    const onCancelSpy = jest.fn();
    confirm({...confirmProps, onCancel: onCancelSpy});

    await waitFor(() => {
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('dialog')); // This is the opacity layer that appears over the underlying page.

    await waitFor(() => {
        expect(onCancelSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();
});

test('closes confirm dialog when clicking on any button', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={overrideTheme({})} />);

    const onCancelSpy = jest.fn();
    confirm({...confirmProps, onCancel: onCancelSpy});

    await waitFor(() => {
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Cancelar'));

    await waitFor(() => {
        expect(onCancelSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();

    const onAcceptSpy = jest.fn();
    confirm({...confirmProps, onAccept: onAcceptSpy});
    await waitFor(() => {
        expect(screen.getByText('Aceptar')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Aceptar'));
    await waitFor(() => {
        expect(onAcceptSpy).toHaveBeenCalled();
    });
});

test('closing a previous accepted dialog does not trigger onAccept callback', async () => {
    // We disable animations so dialogs get closed properly
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');

    render(<ThemeContextProvider theme={overrideTheme({})} />);

    const onAcceptSpy = jest.fn();
    confirm({...confirmProps, onAccept: onAcceptSpy, onCancel: undefined});

    const acceptButton = await screen.findByText('Aceptar');
    fireEvent.click(acceptButton);

    await waitFor(() => {
        expect(onAcceptSpy).toHaveBeenCalled();
    });
    expect(screen.queryByText('Aceptar')).not.toBeInTheDocument();

    onAcceptSpy.mockClear();

    confirm({...confirmProps, onAccept: onAcceptSpy, onCancel: undefined});

    const cancelButton = await screen.findByText('Cancelar');
    fireEvent.click(cancelButton);

    await waitFor(() => {
        expect(screen.queryByText('Cancelar')).not.toBeInTheDocument();
    });
    expect(onAcceptSpy).not.toHaveBeenCalled();
});

test('when webview bridge is available nativeAlert is shown', async () => {
    jest.spyOn(webviewBridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeAlertSpy = jest.spyOn(webviewBridge, 'nativeAlert').mockResolvedValue();

    render(<ThemeContextProvider theme={overrideTheme({})} />);
    alert({...confirmProps, title: 'lolo'});

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

    render(<ThemeContextProvider theme={overrideTheme({})} />);
    confirm({...confirmProps, title: 'lolo', acceptText: 'Cuco peludo'});

    await waitFor(() => {
        expect(nativeAlertSpy).toHaveBeenCalledWith({
            title: 'lolo',
            message: 'Confirm',
            acceptText: 'Cuco peludo',
            cancelText: 'Cancelar',
        });
    });
});
