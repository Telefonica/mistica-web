import * as React from 'react';
import {ButtonDanger, ButtonLink, ButtonPrimary, ButtonSecondary} from '../button';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';
import IconPhotoCameraRegular from '../generated/mistica-icons/icon-photo-camera-regular';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';
import {redirect as redirectSpy} from '../utils/browser';

import type {TouchableElement} from '../touchable';
import type {ThemeConfig} from '../theme';

jest.mock('../utils/browser', () => ({
    ...jest.requireActual('../utils/browser'),
    redirect: jest.fn(),
}));

beforeEach(() => {
    (redirectSpy as any).mockReset();
});

const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;

const trackingEvent = {
    category: 'someCategory',
    action: 'someAction',
    label: 'someLabel',
};

test('button is accesible', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary onPress={() => {}} loadingText="Hello2">
                Hello
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('button', {name: 'Hello'})).toBeInTheDocument();
});

test('"to" uses a Link Component', () => {
    const Link = () => '(Link Component)' as any;

    const {asFragment} = render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <ButtonPrimary to="/test">test</ButtonPrimary>
        </ThemeContextProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          (Link Component)
        </DocumentFragment>
    `);
});

test('<a> is rendered when using "to" prop', () => {
    const to = '/test';
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <ButtonPrimary to={to}>test</ButtonPrimary>
        </ThemeContextProvider>
    );

    const anchor = screen.getByRole('link', {name: 'test'});

    expect(anchor).toHaveAttribute('href', to);
});

test('buttons can track events', async () => {
    const logEventSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary trackingEvent={trackingEvent} href="#test">
                button with href
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} to="#test">
                button with to
            </ButtonPrimary>
            <ButtonPrimary trackingEvent={trackingEvent} onPress={() => {}}>
                button with onPress
            </ButtonPrimary>
        </ThemeContextProvider>
    );

    const hrefButton = await screen.findByRole('link', {name: /button with href/});
    const toButton = await screen.findByRole('link', {name: /button with to/});
    const onPressButton = await screen.findByRole('button', {name: 'button with onPress'});

    await userEvent.click(hrefButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(toButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    await userEvent.click(onPressButton);
    expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
    expect(logEventSpy).toHaveBeenCalledTimes(3);
});

test('buttons track default events', async () => {
    const logEventSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
            <ButtonPrimary href="#test">no track button</ButtonPrimary>
            <ButtonPrimary trackEvent href="#test">
                primary
            </ButtonPrimary>
            <ButtonSecondary trackEvent to="#test">
                secondary
            </ButtonSecondary>
            <ButtonDanger trackEvent onPress={() => {}}>
                danger
            </ButtonDanger>
            <ButtonPrimary trackEvent onPress={() => {}}>
                <IconPhotoCameraRegular color="currentColor" />
                Take a photo
            </ButtonPrimary>
            <ButtonLink href="#">no track link</ButtonLink>
            <ButtonLink trackEvent href="#">
                link
            </ButtonLink>
        </ThemeContextProvider>
    );

    const noTrackButton = await screen.findByRole('link', {name: /no track button/});
    const primaryButton = await screen.findByRole('link', {name: /primary/});
    const secondaryButton = await screen.findByRole('link', {name: /secondary/});
    const dangerButton = await screen.findByRole('button', {name: /danger/});
    const buttonWithIcon = await screen.findByRole('button', {name: /Take a photo/});
    const noTrackLink = await screen.findByRole('link', {name: /no track link/});
    const link = await screen.findByRole('link', {name: /^link/});

    await userEvent.click(noTrackButton);
    await userEvent.click(noTrackLink);
    expect(logEventSpy).not.toHaveBeenCalled();

    await userEvent.click(primaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'primary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(secondaryButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'secondary_button_tapped',
        label: 'secondary',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);

    await userEvent.click(dangerButton);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'danger_button_tapped',
        label: 'danger',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(3);

    await userEvent.click(buttonWithIcon);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'primary_button_tapped',
        label: 'Take a photo',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(4);

    await userEvent.click(link);
    expect(logEventSpy).toHaveBeenCalledWith({
        category: 'user_interaction',
        action: 'link_tapped',
        label: 'link',
    });
    expect(logEventSpy).toHaveBeenCalledTimes(5);
});

test('Button ref', () => {
    const TestComponent = () => {
        const refOnPress = React.useRef<TouchableElement>(null);
        const refHref = React.useRef<TouchableElement>(null);
        const refTo = React.useRef<TouchableElement>(null);

        React.useEffect(() => {
            expect(refOnPress.current?.tagName).toBe('BUTTON');
            expect(refOnPress.current?.textContent).toBe('onPress');

            expect(refHref.current?.tagName).toBe('A');
            expect(refHref.current?.textContent).toBe('href');

            expect(refTo.current?.tagName).toBe('A');
            expect(refTo.current?.textContent).toBe('to');
        });

        return (
            <ThemeContextProvider theme={makeTheme()}>
                <ButtonPrimary ref={refOnPress} onPress={() => {}}>
                    onPress
                </ButtonPrimary>

                <ButtonSecondary ref={refHref} href="/">
                    href
                </ButtonSecondary>

                <ButtonDanger ref={refTo} to="/">
                    to
                </ButtonDanger>
            </ThemeContextProvider>
        );
    };

    render(<TestComponent />);
});

test.each`
    Button           | name
    ${ButtonPrimary} | ${'ButtonPrimary'}
    ${ButtonLink}    | ${'ButtonLink'}
`(
    'onNavigate is called before navigation when using "href" prop - $name',
    async ({Button}: {Button: typeof ButtonLink | typeof ButtonPrimary}) => {
        const onNavigateSpy = jest.fn().mockResolvedValue(undefined);
        const logEventSpy = jest.fn();
        const href = 'https://example.org';

        render(
            <ThemeContextProvider theme={makeTheme({analytics: {logEvent: logEventSpy}})}>
                <Button href={href} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                    Test
                </Button>
            </ThemeContextProvider>
        );

        const link = screen.getByRole('link', {name: 'Test'});
        fireEvent.click(link);

        expect(onNavigateSpy).toHaveBeenCalledTimes(1);

        expect(redirectSpy).not.toHaveBeenCalled();

        await waitFor(() => {
            expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
        });

        await waitFor(() => {
            expect(redirectSpy).toHaveBeenCalledWith(href, false, false);
        });
    }
);

test.each`
    Button           | name
    ${ButtonPrimary} | ${'ButtonPrimary'}
    ${ButtonLink}    | ${'ButtonLink'}
`(
    'onNavigate is called during navigation when using "to" prop - $name',
    async ({Button}: {Button: typeof ButtonLink | typeof ButtonPrimary}) => {
        const onNavigateSpy = jest.fn();
        const logEventSpy = jest.fn();
        const to = '/example/path';

        const CurrentPath = () => {
            return <div>Current path: {useLocation().pathname}</div>;
        };

        render(
            <ThemeContextProvider theme={makeTheme({Link, analytics: {logEvent: logEventSpy}})}>
                <MemoryRouter>
                    <Button to={to} trackingEvent={trackingEvent} onNavigate={onNavigateSpy}>
                        Test
                    </Button>
                    <CurrentPath />
                </MemoryRouter>
            </ThemeContextProvider>
        );

        expect(screen.getByText('Current path: /')).toBeInTheDocument();

        const link = screen.getByRole('link', {name: 'Test'});
        fireEvent.click(link);

        expect(screen.getByText(`Current path: ${to}`)).toBeInTheDocument();

        expect(onNavigateSpy).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(logEventSpy).toHaveBeenCalledWith(trackingEvent);
        });
    }
);

test.each`
    Button           | name
    ${ButtonPrimary} | ${'ButtonPrimary'}
    ${ButtonLink}    | ${'ButtonLink'}
`(
    'Buttons have the appropiate role - $name',
    async ({Button}: {Button: typeof ButtonLink | typeof ButtonPrimary}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Button to="/to">to</Button>
                <Button href="/href">href</Button>
                <Button onPress={() => {}}>onPress</Button>

                <Button to="/to" role="menuitem">
                    to
                </Button>
                <Button href="/href" role="tab">
                    href
                </Button>
                <Button onPress={() => {}} role="link">
                    onPress
                </Button>
            </ThemeContextProvider>
        );

        expect(screen.getByRole('link', {name: 'to'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'href'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'onPress'})).toBeInTheDocument();
        expect(screen.getByRole('menuitem', {name: 'to'})).toBeInTheDocument();
        expect(screen.getByRole('tab', {name: 'href'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'onPress'})).toBeInTheDocument();
    }
);
