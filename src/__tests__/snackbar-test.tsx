import * as React from 'react';
import Snackbar from '../snackbar';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import * as bridge from '@tef-novum/webview-bridge';

test('Snackbar', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="Some message" onClose={onCloseSpy} buttonText="Action" duration={Infinity} />
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

test('Snackbar with dismiss button', async () => {
    const onCloseSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar
                message="Some message"
                onClose={onCloseSpy}
                buttonText="Action"
                duration={Infinity}
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

test('Snackbar does not have dismiss button by default', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Snackbar message="Some message" buttonText="Action" duration={Infinity} />
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
                duration={Infinity}
                withDismiss={false} // even when setting this to false explicitly
            />
        </ThemeContextProvider>
    );
    const dismissButton = await screen.findByRole('button', {name: 'Cerrar'});
    expect(dismissButton).toBeInTheDocument();
});

test('nativeMessage is called when webview bridge is available', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue();

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
            duration: 'TEN_SECONDS',
        });
    });

    await waitFor(() => {
        expect(onCloseSpy).toHaveBeenCalledWith({action: 'DISMISS'});
    });
});

test('nativeMessage should be called once, even if the component re-renders', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);

    const onCloseMock = jest.fn();
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue();

    const ComponentWithSnackbar: React.FC<{onClose: () => unknown}> = ({onClose}) => {
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
            duration: 'TEN_SECONDS',
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
