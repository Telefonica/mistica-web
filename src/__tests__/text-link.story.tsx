import * as React from 'react';
import TextLink from '../text-link';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';

import type {ThemeConfig} from '../theme';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'someCategory', action: 'someAction', label: 'someLabel'};
const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;
const CurrentPath = () => <div>Current path: {useLocation().pathname}</div>;
export const Tracking = ({onTrack}: {onTrack: (event: TrackingEvent) => Promise<void>}): JSX.Element => (
    <ThemeContextProvider theme={makeTheme({analytics: {logEvent: onTrack}})}>
        <TextLink href="#test">link without event</TextLink>
        <TextLink trackingEvent={trackingEvent} href="#test">
            link with custom event
        </TextLink>
        <TextLink trackEvent href="#test">
            link with default event
        </TextLink>
    </ThemeContextProvider>
);
export const Labels = ({
    newTab = false,
    customLabel,
}: {
    newTab?: boolean;
    customLabel?: string;
}): JSX.Element => (
    <TextLink newTab={newTab} aria-label={customLabel} href="#test">
        my link
    </TextLink>
);
export const Navigation = ({
    router = false,
    onNavigate,
    onTrack,
}: {
    router?: boolean;
    onNavigate: () => Promise<void> | void;
    onTrack: (event: TrackingEvent) => Promise<void>;
}): JSX.Element => {
    return (
        <ThemeContextProvider
            theme={makeTheme({Link: router ? Link : undefined, analytics: {logEvent: onTrack}})}
        >
            <MemoryRouter>
                <TextLink
                    {...(router ? {to: '/example/path'} : {href: 'https://example.org'})}
                    trackingEvent={trackingEvent}
                    onNavigate={onNavigate}
                >
                    Test
                </TextLink>
                <CurrentPath />
            </MemoryRouter>
        </ThemeContextProvider>
    );
};
export const Roles = (): JSX.Element => {
    return (
        <>
            <TextLink to="/to">to</TextLink>
            <TextLink href="/href">href</TextLink>
            <TextLink onPress={() => {}}>onPress</TextLink>
            <TextLink to="/to" role="menuitem">
                to
            </TextLink>
            <TextLink href="/href" role="tab">
                href
            </TextLink>
            <TextLink onPress={() => {}} role="link">
                onPress
            </TextLink>
        </>
    );
};
