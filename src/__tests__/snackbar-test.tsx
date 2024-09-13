import * as React from 'react';
import Snackbar from '../snackbar';
import {useSnackbar} from '../snackbar-context';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import * as bridge from '@tef-novum/webview-bridge';

test('Snackbar', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="Some message" onClose={onCloseSpy} buttonText="Action" duration="PERSISTENT" />
        </ThemeContextProvider>
    );
    expect(screen.getByText('Some message')).toBeInTheDocument();
    const actionButton = await screen.findByRole('button', {name: 'Action'});
    expect(actionButton).toBeInTheDocument();

    await userEvent.click(actionButton);

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'BUTTON'});
    });
});

test('Snackbar auto dismisses', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="Some message" onClose={onCloseSpy} />
        </ThemeContextProvider>
    );

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Some message')).toBeInTheDocument();

    await waitFor(
        () => {
            expect(onCloseSpy).toHaveBeenCalledWith({action: 'TIMEOUT'});
        },
        {
            // the Snackbar should dismiss after 5 seconds, so giving it a bit more to prevent test flakiness
            // we could use jest fake timers here, but that makes tests more complicated and less black-box
            timeout: 6000,
        }
    );

    expect(screen.queryByRole('alert')).toBeNull();
});

test('Snackbar with dismiss button', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="Some message"
                onClose={onCloseSpy}
                buttonText="Action"
                duration="PERSISTENT"
                withDismiss
            />
        </ThemeContextProvider>
    );
    expect(screen.getByText('Some message')).toBeInTheDocument();
    const dismissButton = await screen.findByRole('button', {name: 'Cerrar'});
    expect(dismissButton).toBeInTheDocument();

    await userEvent.click(dismissButton);

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'DISMISS'});
    });
});

test('Snackbar with dismiss button and custom label', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="Some message"
                onClose={onCloseSpy}
                buttonText="Action"
                closeButtonLabel="custom close label"
                duration="PERSISTENT"
                withDismiss
            />
        </ThemeContextProvider>
    );
    expect(screen.getByText('Some message')).toBeInTheDocument();
    const dismissButton = await screen.findByRole('button', {name: 'custom close label'});
    expect(dismissButton).toBeInTheDocument();

    await userEvent.click(dismissButton);

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'DISMISS'});
    });
});

test('Snackbar does not have dismiss button by default', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="Some message" buttonText="Action" duration="PERSISTENT" />
        </ThemeContextProvider>
    );
    const actionButton = await screen.findByRole('button', {name: 'Action'});
    expect(actionButton).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Cerrar'})).toBe(null);
});

test('Snackbar always has dismiss button if it does not have action button and duration is Infinity', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="Some message"
                duration="PERSISTENT"
                withDismiss={false} // even when setting this to false explicitly
            />
        </ThemeContextProvider>
    );
    const dismissButton = await screen.findByRole('button', {name: 'Cerrar'});
    expect(dismissButton).toBeInTheDocument();
});

test('nativeMessage is called when webview bridge is available', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue({action: 'DISMISS'});

    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="any-message" onClose={onCloseSpy} buttonText="any-button-text" />
        </ThemeContextProvider>
    );

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledWith({
            buttonText: 'any-button-text',
            message: 'any-message',
            type: 'INFORMATIVE',
        });
    });

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'DISMISS'});
    });
});

test('nativeMessage is called with duration PERSISTENT when duration is Infinity', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue({action: 'DISMISS'});

    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="any-message"
                onClose={onCloseSpy}
                buttonText="any-button-text"
                duration="PERSISTENT"
            />
        </ThemeContextProvider>
    );

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledWith({
            buttonText: 'any-button-text',
            message: 'any-message',
            type: 'INFORMATIVE',
            duration: 'PERSISTENT',
        });
    });

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'DISMISS'});
    });
});

test('nativeMessage should be called once, even if the component re-renders', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);

    const onCloseMock = jest.fn();
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue({action: 'DISMISS'});

    const ComponentWithSnackbar = ({onClose}: {onClose: () => unknown}) => {
        const [count, setCount] = React.useState(0);
        return (
            <>
                {/* clicking on this button will force a render */}
                <button onClick={() => setCount(count + 1)}>count: {count}</button>
                <Snackbar
                    message="any-message"
                    onClose={() => onClose()} // intentional anonymous function
                    buttonText="any-button-text"
                />
            </>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ComponentWithSnackbar onClose={onCloseMock} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('count: 0')).toBeInTheDocument();

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledWith({
            buttonText: 'any-button-text',
            message: 'any-message',
            type: 'INFORMATIVE',
        });
    });

    await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
    await userEvent.click(screen.getByRole('button'));
    expect(await screen.findByText('count: 1')).toBeInTheDocument();

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});

test('useSnackbar: happy case', async () => {
    const ComponentWithSnackbar = () => {
        const {openSnackbar} = useSnackbar();
        return (
            <button
                onClick={() => {
                    openSnackbar({message: 'any-message'});
                }}
            >
                Open Snackbar
            </button>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ComponentWithSnackbar />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Open Snackbar'}));

    expect(await screen.findByText('any-message')).toBeInTheDocument();
});

test('useSnackbar: openSnackbar closes already opened one', async () => {
    const handleOnClose = jest.fn();

    const ComponentWithSnackbar = () => {
        const {openSnackbar} = useSnackbar();
        return (
            <button
                onClick={() => {
                    openSnackbar({
                        message: 'any-message',
                        buttonText: 'action',
                        onClose: handleOnClose,
                    });
                }}
            >
                Open Snackbar
            </button>
        );
    };

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ComponentWithSnackbar />
        </ThemeContextProvider>
    );

    const openSnackbarButton = screen.getByRole('button', {name: 'Open Snackbar'});

    await userEvent.click(openSnackbarButton);
    await userEvent.click(openSnackbarButton);
    await userEvent.click(openSnackbarButton);

    await userEvent.click(await screen.findByRole('button', {name: 'action'}));

    expect(handleOnClose.mock.calls).toEqual([
        [{action: 'CONSECUTIVE'}],
        [{action: 'CONSECUTIVE'}],
        [{action: 'BUTTON'}],
    ]);
});

test('Snackbar with button aria-label', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="Some message"
                onClose={onCloseSpy}
                buttonText="Action"
                buttonAccessibilityLabel="some a11y label"
                duration="PERSISTENT"
            />
        </ThemeContextProvider>
    );
    expect(screen.getByText('Some message')).toBeInTheDocument();
    const actionButton = await screen.findByRole('button', {name: 'some a11y label'});
    expect(actionButton).toBeInTheDocument();

    await userEvent.click(actionButton);

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'BUTTON'});
    });
});
