import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import IconLightningRegular from '../generated/mistica-icons/icon-lightning-regular';
import {IconButton, ToggleIconButton} from '../icon-button';
import IconPauseFilled from '../generated/mistica-icons/icon-pause-filled';
import IconPlayFilled from '../generated/mistica-icons/icon-play-filled';

import type {TouchableElement} from '../touchable';

test('IconButton is accesible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <IconButton Icon={IconLightningRegular} aria-label="icon-button" onPress={() => {}} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'icon-button'})).toBeInTheDocument();
});

test('"to" uses a Link Component', () => {
    const Link = () => '(Link Component)' as any;

    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <IconButton Icon={IconLightningRegular} aria-label="icon-button" to="/test" />
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          (Link Component)
        </DocumentFragment>
    `);
});

test('<a> is rendered when using "to" prop', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <IconButton Icon={IconLightningRegular} aria-label="icon-button" to="/test" />
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'icon-button'});

    expect(anchor).toHaveAttribute('href', '/test');
});

test('IconButton can track events', async () => {
    const logEventSpy = jest.fn();
    const trackingEvent = {
        category: 'someCategory',
        action: 'someAction',
        label: 'someLabel',
    };

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <IconButton
                Icon={IconLightningRegular}
                trackingEvent={trackingEvent}
                onPress={() => {}}
                aria-label="icon-button"
            />
        </ThemeContextProvider>
    );

    const iconButton = await screen.findByRole('button', {name: 'icon-button'});

    await userEvent.click(iconButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(iconButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(2);
});

test('IconButton ref', () => {
    const TestComponent = () => {
        const refOnPress = React.useRef<TouchableElement>(null);
        const refHref = React.useRef<TouchableElement>(null);
        const refTo = React.useRef<TouchableElement>(null);

        React.useEffect(() => {
            expect(refOnPress.current?.tagName).toBe('BUTTON');
            expect(refHref.current?.tagName).toBe('A');
            expect(refTo.current?.tagName).toBe('A');
        });

        return (
            <ThemeContextProvider theme={makeTheme()}>
                <IconButton
                    Icon={IconLightningRegular}
                    aria-label="icon-button"
                    ref={refOnPress}
                    onPress={() => {}}
                />
                <IconButton Icon={IconLightningRegular} aria-label="icon-button" ref={refHref} href="/" />
                <IconButton Icon={IconLightningRegular} aria-label="icon-button" ref={refTo} to="/" />
            </ThemeContextProvider>
        );
    };

    render(<TestComponent />);
});

test('ToggleIconButton is accesible (uncontrolled)', async () => {
    const onChangeSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ToggleIconButton
                checkedProps={{
                    Icon: IconPauseFilled,
                    'aria-label': 'checked-icon-button',
                }}
                uncheckedProps={{
                    Icon: IconPlayFilled,
                    'aria-label': 'unchecked-icon-button',
                }}
                onChange={onChangeSpy}
            />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'unchecked-icon-button'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'checked-icon-button'})).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'unchecked-icon-button'}));

    expect(screen.queryByRole('button', {name: 'unchecked-icon-button'})).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'checked-icon-button'})).toBeInTheDocument();
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
});

test('ToggleIconButton is accesible (controlled)', async () => {
    const ToggleIconButtonWrapper = () => {
        const [checked, setChecked] = React.useState(false);
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <ToggleIconButton
                    checkedProps={{
                        Icon: IconPauseFilled,
                        'aria-label': 'checked-icon-button',
                    }}
                    uncheckedProps={{
                        Icon: IconPlayFilled,
                        'aria-label': 'unchecked-icon-button',
                    }}
                    checked={checked}
                    onChange={setChecked}
                />
            </ThemeContextProvider>
        );
    };

    render(<ToggleIconButtonWrapper />);

    expect(screen.getByRole('button', {name: 'unchecked-icon-button'})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'checked-icon-button'})).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'unchecked-icon-button'}));

    expect(screen.queryByRole('button', {name: 'unchecked-icon-button'})).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'checked-icon-button'})).toBeInTheDocument();
});

test("ToggleIconButton doesn't update its state until onChange promise is resolved", async () => {
    jest.useFakeTimers();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ToggleIconButton
                checkedProps={{
                    Icon: IconPauseFilled,
                    'aria-label': 'checked-icon-button',
                }}
                uncheckedProps={{
                    Icon: IconPlayFilled,
                    'aria-label': 'unchecked-icon-button',
                }}
                onChange={async () => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }}
            />
        </ThemeContextProvider>
    );

    fireEvent.click(screen.getByRole('button', {name: 'unchecked-icon-button'}));

    jest.advanceTimersByTime(500);

    await screen.findByRole('button', {name: 'unchecked-icon-button'});

    jest.runAllTimers();

    await screen.findByRole('button', {name: 'checked-icon-button'});
});
