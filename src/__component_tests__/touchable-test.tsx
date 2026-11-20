import {test, expect} from '../test-utils/component';

import type {Basic, Navigation} from './touchable.story';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'test', action: 'test', label: 'test'};
test(`onNavigate is called before navigation when using "href" prop`, async ({mount, page}) => {
    const events: Array<string> = [];
    const tracked: Array<TrackingEvent> = [];
    let completeNavigation!: () => void;
    const pendingNavigation = new Promise<void>((resolve) => {
        completeNavigation = resolve;
    });
    await page.route('https://example.org/', (route) => route.fulfill({body: 'Destination'}));
    const component = await mount<typeof Navigation>('touchable/Navigation', {
        onNavigate: async () => {
            events.push('navigate');
            await pendingNavigation;
        },
        onTrack: async (event) => {
            tracked.push(event);
        },
    });
    await component.getByRole('link', {name: 'Test', exact: true}).click();
    await expect.poll(() => events).toEqual(['navigate']);
    expect(page.url()).toContain('/playwright/gallery/index.html');
    completeNavigation();
    await expect(page).toHaveURL('https://example.org/');
    expect(tracked).toEqual([trackingEvent]);
});
test(`onNavigate is called during navigation when using "to" prop`, async ({mount}) => {
    const events: Array<string> = [];
    const tracked: Array<TrackingEvent> = [];
    const component = await mount<typeof Navigation>('touchable/Navigation', {
        router: true,
        onNavigate: () => {
            events.push('navigate');
        },
        onTrack: async (event) => {
            tracked.push(event);
        },
    });
    await expect(component.getByText('Current path: /', {exact: true})).toHaveCount(1);
    await component.getByRole('link', {name: 'Test', exact: true}).click();
    await expect(component.getByText('Current path: /example/path', {exact: true})).toHaveCount(1);
    expect(events).toEqual(['navigate']);
    await expect.poll(() => tracked).toEqual([trackingEvent]);
});
test(`Touchable has the appropiate role`, async ({mount}) => {
    const component = await mount('touchable/Roles', {});
    for (const [role, name] of [
        ['link', 'to'],
        ['link', 'href'],
        ['button', 'onPress'],
        ['menuitem', 'to'],
        ['tab', 'href'],
        ['link', 'onPress'],
    ] as const) {
        await expect(component.getByRole(role, {name, exact: true})).toHaveCount(1);
    }
});

for (const {title, props, href} of [
    {
        title: '<Link> element is rendered when "to" prop is passed',
        props: {kind: 'to', target: '/to', router: true},
        href: '/to',
    },
    {
        title: '<a> element is rendered when "to" prop is used and no Link component injected via ThemeContextProvider',
        props: {kind: 'to', target: '/to'},
        href: '/to',
    },
    {
        title: '<a> element is rendered when "fullPageOnWebView" and "to" props are passed, inside App',
        props: {kind: 'to', target: 'href', fullPageOnWebView: true, insideApp: true},
        href: 'href',
    },
    {
        title: '<Link> element is rendered when "fullPageOnWebView" and "to" props are passed, outside App',
        props: {kind: 'to', target: 'href', fullPageOnWebView: true, router: true},
        href: '/href',
    },
    {title: '<a> element is rendered when "href" prop is passed', props: {kind: 'href'}, href: 'href'},
    {
        title: '"href" gets decorated',
        props: {kind: 'href', target: '/foo/bar/?param=123#hash', decorate: true},
        href: '/foo/bar/?param=123&utm_source=test#hash',
    },
    {
        title: '"to" paths are not decorated',
        props: {kind: 'to', target: '/foo/bar/?param=123#hash', decorate: true},
        href: '/foo/bar/?param=123#hash',
    },
    {
        title: '"to" paths with "fullPageOnWebView" are not decorated',
        props: {kind: 'to', target: '/foo/bar/?param=123#hash', decorate: true, fullPageOnWebView: true},
        href: '/foo/bar/?param=123#hash',
    },
] as const)
    test(title, async ({mount}) => {
        const component = await mount('touchable/Basic', props);
        await expect(component.getByRole('link', {name: 'Test', exact: true})).toHaveAttribute('href', href);
    });
for (const eventCount of [1, 2]) {
    test(`<Link> element is rendered when "to" prop is passed with ${eventCount === 1 ? 'tracking' : 'multiple tracking events'}`, async ({
        mount,
    }) => {
        const events: Array<TrackingEvent> = [];
        const component = await mount<typeof Basic>('touchable/Basic', {
            kind: 'to',
            target: '/to',
            router: true,
            eventCount,
            onTrack: async (event) => {
                events.push(event);
            },
        });
        await component.getByRole('link', {name: 'Test', exact: true}).click();
        await expect.poll(() => events).toEqual(Array(eventCount).fill(trackingEvent));
        await expect(component.getByText('Current path: /to', {exact: true})).toHaveCount(1);
    });
    test(`<a> element is rendered when "href" prop is passed and ${eventCount === 1 ? 'trackingEvent' : 'multiple trackingEvent'}`, async ({
        mount,
        page,
        context,
    }) => {
        const events: Array<TrackingEvent> = [];
        await context.route('**/href', (route) => route.fulfill({body: 'Destination'}));
        const component = await mount<typeof Basic>('touchable/Basic', {
            kind: 'href',
            newTab: true,
            eventCount,
            onTrack: async (event) => {
                events.push(event);
            },
        });
        const popupPromise = page.waitForEvent('popup');
        await component.getByRole('link', {name: /^Test/}).click();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(/\/href$/);
        await expect.poll(() => events).toEqual(Array(eventCount).fill(trackingEvent));
        expect(context.pages()).toHaveLength(2);
    });
    test(`<button> element is rendered when "onPress" prop is passed and ${eventCount === 1 ? 'trackingEvent' : 'multiple trackingEvent'}`, async ({
        mount,
    }) => {
        const events: Array<TrackingEvent> = [];
        let presses = 0;
        const component = await mount<typeof Basic>('touchable/Basic', {
            kind: 'onPress',
            eventCount,
            onTrack: async (event) => {
                events.push(event);
            },
            onPress: () => {
                presses++;
            },
        });
        await component.getByRole('button', {name: 'Test', exact: true}).click();
        await expect.poll(() => events).toEqual(Array(eventCount).fill(trackingEvent));
        expect(presses).toBe(1);
    });
}
test('<button> element is rendered when "onPress" prop is passed', async ({mount}) => {
    const component = await mount('touchable/Basic', {kind: 'onPress'});
    await expect(component.getByRole('button', {name: 'Test'})).toHaveCount(1);
});
test('<a> element is rendered when "href" and "loadOnTop" props are passed', async ({mount, page}) => {
    const events: Array<TrackingEvent> = [];
    await page.route('**/href', (route) => route.fulfill({body: 'Destination'}));
    const component = await mount<typeof Basic>('touchable/Basic', {
        kind: 'href',
        loadOnTop: true,
        eventCount: 1,
        onTrack: async (event) => {
            events.push(event);
        },
    });
    await component.getByRole('link', {name: 'Test', exact: true}).click();
    await expect(page).toHaveURL(/\/href$/);
    expect(events).toEqual([trackingEvent]);
});
test('<a> component has click-like behaviour on "space" key press', async ({mount, page, context}) => {
    await context.route('**/href', (route) => route.fulfill({body: 'Destination'}));
    const component = await mount('touchable/Basic', {kind: 'href', newTab: true, eventCount: 1});
    const popupPromise = page.waitForEvent('popup');
    await component.getByRole('link', {name: /^Test/}).press('Space');
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/\/href$/);
    expect(context.pages()).toHaveLength(2);
});
test('<Link> component has click-like behaviour on "space" key press', async ({mount}) => {
    const component = await mount('touchable/Basic', {kind: 'to', target: '/to', router: true});
    await component.getByRole('link', {name: 'Test', exact: true}).press('Space');
    await expect(component.getByText('Current path: /to', {exact: true})).toHaveCount(1);
});
test('target="_blank" is set with newTab', async ({mount}) => {
    const component = await mount('touchable/Basic', {newTab: true});
    await expect(component.getByRole('link', {name: /^Test/})).toHaveAttribute('target', '_blank');
});
