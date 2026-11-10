import * as React from 'react';
import Touchable from '../touchable';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from '../test-utils/theme';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';

import type {ThemeConfig} from '../theme';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'test', action: 'test', label: 'test'};
const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;
const CurrentPath = () => <div>Current path: {useLocation().pathname}</div>;
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
                <Touchable
                    {...(router ? {to: '/example/path'} : {href: 'https://example.org'})}
                    trackingEvent={trackingEvent}
                    onNavigate={onNavigate}
                >
                    Test
                </Touchable>
                <CurrentPath />
            </MemoryRouter>
        </ThemeContextProvider>
    );
};
export const Roles = (): JSX.Element => {
    return (
        <>
            <Touchable to="/to">to</Touchable>
            <Touchable href="/href">href</Touchable>
            <Touchable onPress={() => {}}>onPress</Touchable>
            <Touchable to="/to" role="menuitem">
                to
            </Touchable>
            <Touchable href="/href" role="tab">
                href
            </Touchable>
            <Touchable onPress={() => {}} role="link">
                onPress
            </Touchable>
        </>
    );
};

const useHrefDecorator = () => (href: string) => {
    const url = new URL(href, 'https://x');
    const search = new URLSearchParams(url.search);
    search.set('utm_source', 'test');
    return `${url.pathname}?${search.toString()}${url.hash}`;
};
export const Basic = ({
    kind = 'href',
    router = false,
    insideApp = false,
    fullPageOnWebView = false,
    decorate = false,
    target = 'href',
    newTab = false,
    loadOnTop = false,
    eventCount = 0,
    onTrack = async () => {},
    onPress = () => {},
}: {
    kind?: 'href' | 'to' | 'onPress';
    router?: boolean;
    insideApp?: boolean;
    fullPageOnWebView?: boolean;
    decorate?: boolean;
    target?: string;
    newTab?: boolean;
    loadOnTop?: boolean;
    eventCount?: number;
    onTrack?: (event: TrackingEvent) => Promise<void>;
    onPress?: () => void;
}): JSX.Element => (
    <ThemeContextProvider
        theme={makeTheme({
            Link: router ? Link : undefined,
            platformOverrides: {insideNovumNativeApp: insideApp},
            useHrefDecorator: decorate ? useHrefDecorator : undefined,
            analytics: {logEvent: onTrack},
        })}
    >
        <MemoryRouter>
            <Touchable
                {...(kind === 'href'
                    ? {href: target, newTab, loadOnTop}
                    : kind === 'to'
                      ? {to: target, fullPageOnWebView}
                      : {onPress})}
                trackingEvent={
                    eventCount === 1
                        ? trackingEvent
                        : eventCount > 1
                          ? [trackingEvent, trackingEvent]
                          : undefined
                }
            >
                Test
            </Touchable>
            <CurrentPath />
        </MemoryRouter>
    </ThemeContextProvider>
);
