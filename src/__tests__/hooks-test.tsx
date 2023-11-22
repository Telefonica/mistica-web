import * as React from 'react';
import {useDisableBodyScroll} from '../hooks';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import {makeTheme} from './test-utils';
import ThemeContextProvider from '../theme-context-provider';
import userEvent from '@testing-library/user-event';

const DisableScroll = () => {
    useDisableBodyScroll(true);
    return <span>scroll is disabled</span>;
};

const ToggleComponent = ({children, toggleText}: any) => {
    const [show, setShow] = React.useState(false);
    return (
        <>
            <button onClick={() => setShow((v) => !v)}>{toggleText}</button>
            {show && children}
        </>
    );
};

const DISABLED_BODY_STYLES =
    'overflow: hidden; overflow-y: scroll; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px;';

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
    const body = toggleButton.parentElement?.parentElement;

    userEvent.click(toggleButton);
    expect(await screen.findByText('scroll is disabled')).toBeInTheDocument();

    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    userEvent.click(toggleButton);
    await waitForElementToBeRemoved(() => screen.queryByText('scroll is disabled'));

    expect(body?.getAttribute('style')).toBe('');
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
    const body = toggleButton1.parentElement?.parentElement;

    userEvent.click(toggleButton1);
    expect(await screen.findByText('scroll is disabled')).toBeInTheDocument();
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    const toggleButton2 = screen.getByRole('button', {name: 'toggle2'});
    userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(2);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    // Close the first instance and both `useDisableScroll` hooks should call the cleanup function
    userEvent.click(toggleButton1);
    await waitFor(async () => {
        expect(screen.queryAllByText('scroll is disabled')).toHaveLength(0);
    });
    expect(body?.getAttribute('style')).toBe('');
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
    const body = toggleButton1.parentElement?.parentElement;

    userEvent.click(toggleButton1);
    expect(await screen.findByText('scroll is disabled')).toBeInTheDocument();
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    const toggleButton2 = screen.getByRole('button', {name: 'toggle2'});
    userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(2);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    userEvent.click(toggleButton2);
    await waitFor(async () => {
        expect(screen.getAllByText('scroll is disabled')).toHaveLength(1);
    });
    expect(body?.getAttribute('style')).toBe(DISABLED_BODY_STYLES);

    userEvent.click(toggleButton1);
    await waitFor(async () => {
        expect(screen.queryAllByText('scroll is disabled')).toHaveLength(0);
    });
    expect(body?.getAttribute('style')).toBe('');
});
