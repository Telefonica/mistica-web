import * as React from 'react';
import {ButtonPrimary, ButtonSecondary, ButtonDanger, ButtonLink} from '../button';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import IconPhotoCameraRegular from '../generated/mistica-icons/icon-photo-camera-regular';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';

import type {ThemeConfig} from '../theme';
import type {TouchableElement} from '../touchable';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'someCategory', action: 'someAction', label: 'someLabel'};
const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;
const CurrentPath = () => <div>Current path: {useLocation().pathname}</div>;
export const Accessible = (): JSX.Element => (
    <ButtonPrimary onPress={() => {}} loadingText="Hello2">
        Hello
    </ButtonPrimary>
);
const CustomLink = () => <>(Link Component)</>;
export const CustomLinkComponent = (): JSX.Element => (
    <ThemeContextProvider theme={makeTheme({Link: CustomLink})}>
        <ButtonPrimary to="/test">test</ButtonPrimary>
    </ThemeContextProvider>
);
export const Anchor = (): JSX.Element => <ButtonPrimary to="/test">test</ButtonPrimary>;
export const Tracking = ({defaults = false}: {defaults?: boolean}): JSX.Element => {
    const [events, setEvents] = React.useState<Array<TrackingEvent>>([]);
    return (
        <ThemeContextProvider
            theme={makeTheme({
                analytics: {logEvent: async (event) => setEvents((events) => [...events, event])},
            })}
        >
            {defaults ? (
                <>
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
                </>
            ) : (
                <>
                    <ButtonPrimary trackingEvent={trackingEvent} href="#test">
                        button with href
                    </ButtonPrimary>
                    <ButtonPrimary trackingEvent={trackingEvent} to="#test">
                        button with to
                    </ButtonPrimary>
                    <ButtonPrimary trackingEvent={trackingEvent} onPress={() => {}}>
                        button with onPress
                    </ButtonPrimary>
                </>
            )}
            <input type="hidden" data-testid="events" value={JSON.stringify(events)} />
        </ThemeContextProvider>
    );
};
export const Refs = (): JSX.Element => {
    const refOnPress = React.useRef<TouchableElement>(null);
    const refHref = React.useRef<TouchableElement>(null);
    const refTo = React.useRef<TouchableElement>(null);
    const [refs, setRefs] = React.useState<unknown>();
    React.useEffect(() => {
        setRefs([refOnPress, refHref, refTo].map((ref) => [ref.current?.tagName, ref.current?.textContent]));
    }, []);
    return (
        <>
            <ButtonPrimary ref={refOnPress} onPress={() => {}}>
                onPress
            </ButtonPrimary>
            <ButtonSecondary ref={refHref} href="/">
                href
            </ButtonSecondary>
            <ButtonDanger ref={refTo} to="/">
                to
            </ButtonDanger>
            <input type="hidden" data-testid="refs" value={JSON.stringify(refs) ?? ''} />
        </>
    );
};
export const Navigation = ({
    variant,
    router = false,
    onNavigate,
    onTrack,
}: {
    variant: 'ButtonPrimary' | 'ButtonLink';
    router?: boolean;
    onNavigate: () => Promise<void> | void;
    onTrack: (event: TrackingEvent) => Promise<void>;
}): JSX.Element => {
    const Button = variant === 'ButtonPrimary' ? ButtonPrimary : ButtonLink;
    return (
        <ThemeContextProvider
            theme={makeTheme({Link: router ? Link : undefined, analytics: {logEvent: onTrack}})}
        >
            <MemoryRouter>
                <Button
                    {...(router ? {to: '/example/path'} : {href: 'https://example.org'})}
                    trackingEvent={trackingEvent}
                    onNavigate={onNavigate}
                >
                    Test
                </Button>
                <CurrentPath />
            </MemoryRouter>
        </ThemeContextProvider>
    );
};
export const Roles = ({variant}: {variant: 'ButtonPrimary' | 'ButtonLink'}): JSX.Element => {
    const Button = variant === 'ButtonPrimary' ? ButtonPrimary : ButtonLink;
    return (
        <>
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
        </>
    );
};
