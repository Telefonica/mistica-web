import {test, expect} from '../test-utils/component';

import type {Navigation, Tracking} from './text-link.story';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'someCategory', action: 'someAction', label: 'someLabel'};
test('TextLink can track events', async ({mount}) => {
    const events: Array<TrackingEvent> = [];
    const component = await mount<typeof Tracking>('text-link/Tracking', {
        onTrack: async (event) => {
            events.push(event);
        },
    });
    await component.getByRole('link', {name: /link without event/}).click();
    expect(events).toEqual([]);
    await component.getByRole('link', {name: /link with custom event/}).click();
    await expect.poll(() => events).toEqual([trackingEvent]);
    await component.getByRole('link', {name: /link with default event/}).click();
    await expect
        .poll(() => events)
        .toEqual([
            trackingEvent,
            {category: 'user_interaction', action: 'link_tapped', label: 'link with default event'},
        ]);
});
test(`onNavigate is called before navigation when using "href" prop`, async ({mount, page}) => {
    const events: Array<string> = [];
    const tracked: Array<TrackingEvent> = [];
    let completeNavigation!: () => void;
    const pendingNavigation = new Promise<void>((resolve) => {
        completeNavigation = resolve;
    });
    await page.route('https://example.org/', (route) => route.fulfill({body: 'Destination'}));
    const component = await mount<typeof Navigation>('text-link/Navigation', {
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
    const component = await mount<typeof Navigation>('text-link/Navigation', {
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
test(`Buttons have the appropiate role`, async ({mount}) => {
    const component = await mount('text-link/Roles', {});
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

test('TextLink indicates that opens in a new tab', async ({mount}) => {
    const component = await mount('text-link/Labels', {newTab: true});
    await expect(component.getByRole('link', {name: 'my link Se abre en ventana nueva'})).toHaveAttribute(
        'target',
        '_blank'
    );
});
test('TextLink indicates that opens in the same page', async ({mount}) => {
    const component = await mount('text-link/Labels');
    await expect(component.getByRole('link', {name: 'my link Página actual'})).toHaveCount(1);
});
test('TextLink allows customizing the aria-label', async ({mount}) => {
    const component = await mount('text-link/Labels', {customLabel: 'custom label'});
    await expect(component.getByRole('link', {name: 'custom label'})).toHaveCount(1);
});
