import * as React from 'react';
import Snackbar from '../snackbar';
import {render, screen, waitFor} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import * as bridge from '@tef-novum/webview-bridge';

const ComponentWithSnackbar: React.FC<{onClose: () => unknown}> = ({onClose}) => {
    const [count, setCount] = React.useState(0);
    return (
        <>
            {/* clicking on this button will force a render */}
            <button onClick={() => setCount(count + 1)}>count: {count}</button>
            <Snackbar
                message="any-message"
                onClose={() => onClose()} // intentional anonymous function
                duration={0}
                buttonText="any-button-text"
            />
        </>
    );
};

test('nativeMessage should be called once, even if the component re-renders', async () => {
    jest.spyOn(bridge, 'isWebViewBridgeAvailable').mockReturnValue(true);

    const onCloseMock = jest.fn();
    const nativeMessageMock = jest.spyOn(bridge, 'nativeMessage').mockResolvedValue();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ComponentWithSnackbar onClose={onCloseMock} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('count: 0')).toBeInTheDocument();

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledWith({
            duration: 0,
            buttonText: 'any-button-text',
            message: 'any-message',
            type: 'INFORMATIVE',
        });
    });

    await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    screen.getByRole('button').click();

    expect(await screen.findByText('count: 1')).toBeInTheDocument();

    await waitFor(() => {
        expect(nativeMessageMock).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
