import * as React from 'react';
import {useDisableBodyScroll} from '../hooks';
import {render, screen, waitFor} from '@testing-library/react';
import {makeTheme} from './test-utils';
import ThemeContextProvider from '../theme-context-provider';
import userEvent from '@testing-library/user-event';

const INITIAL_BODY_STYLES = 'background: red;';

// "overscroll-behavior-y: contain" is not included because it's not supported by jsdom
const DISABLED_BODY_STYLES =
    INITIAL_BODY_STYLES +
    ' ' +
    'overflow: hidden; overflow-y: scroll; position: fixed; top: 0px; left: 0px; right: 0px;';

const DisableScroll = () => {
    useDisableBodyScroll(true);
    return <span>scroll is disabled</span>;
};

const getBodyElement = () => {
    // eslint-disable-next-line testing-library/no-node-access
    return document?.querySelector('body');
};

const ToggleComponent = ({children, toggleText}: any) => {
    const [show, setShow] = React.useState(false);
    React.useLayoutEffect(() => {
        document.body.style.cssText = INITIAL_BODY_STYLES;
    }, []);
    return (
        <>
            <button onClick={() => setShow((v) => !v)}>{toggleText}</button>
            {show && children}
        </>
    );
};

test('useDisableScroll: happy case', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ToggleComponent toggleText="toggle">
                <DisableScroll />
            </ToggleComponent>
        </ThemeContextProvider>
    );

    expect(screen.queryByText('scroll is disabled')).not.toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {name: 'toggle'});
    const body = getBodyElement();

    await userEvent.click(toggleButton);
    expect(await screen.findByText('scroll is disabled')).toBeInTheDocument();

    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    await userEvent.click(toggleButton);
    await waitFor(() => {
        expect(screen.queryByText('scroll is disabled')).not.toBeInTheDocument();
    });

    expect(body?.getAttribute('style')).toBe(INITIAL_BODY_STYLES);
});

test('useDisableScroll: nested instances - closing all at once', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ToggleComponent toggleText="toggle1">
                <DisableScroll />
                <ToggleComponent toggleText="toggle2">
                    <DisableScroll />
                </ToggleComponent>
            </ToggleComponent>
        </ThemeContextProvider>
    );

    const toggleButton1 = screen.getByRole('button', {name: 'toggle1'});
    const body = getBodyElement();

    await userEvent.click(toggleButton1);
    expect(await screen.findByText('scroll is disabled')).toBeInTheDocument();
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    const toggleButton2 = screen.getByRole('button', {name: 'toggle2'});
    await userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(2);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    // Close the first instance and both `useDisableScroll` hooks should call the cleanup function
    await userEvent.click(toggleButton1);
    await waitFor(async () => {
        expect(screen.queryAllByText('scroll is disabled')).toHaveLength(0);
    });
    expect(body?.getAttribute('style')).toBe(INITIAL_BODY_STYLES);
});

test('useDisableScroll: nested instances - closing ony by one', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ToggleComponent toggleText="toggle1">
                <DisableScroll />
                <ToggleComponent toggleText="toggle2">
                    <DisableScroll />
                </ToggleComponent>
            </ToggleComponent>
        </ThemeContextProvider>
    );

    const toggleButton1 = screen.getByRole('button', {name: 'toggle1'});
    const body = getBodyElement();

    await userEvent.click(toggleButton1);
    await waitFor(() => {
        expect(screen.getByText('scroll is disabled')).toBeInTheDocument();
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    const toggleButton2 = screen.getByRole('button', {name: 'toggle2'});
    await userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(2);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    await userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(1);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    await userEvent.click(toggleButton1);
    await waitFor(async () => {
        expect(screen.queryAllByText('scroll is disabled')).toHaveLength(0);
    });
    expect(body?.getAttribute('style')).toBe(INITIAL_BODY_STYLES);
});
