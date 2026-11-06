import {test, expect} from '../test-utils/component';

import type {Navigation} from './button.story';
import type {TrackingEvent} from '../utils/types';

const trackingEvent = {category: 'someCategory', action: 'someAction', label: 'someLabel'};
test('button is accesible', async ({mount}) => {
    const component = await mount('button/Accessible');
    await expect(component.getByRole('button', {name: 'Hello', exact: true})).toHaveCount(1);
});
test('"to" uses a Link Component', async ({mount}) => {
    const component = await mount('button/CustomLinkComponent');
    await expect(component).toHaveText('(Link Component)');
    await expect(component.getByRole('link')).toHaveCount(0);
});
test('<a> is rendered when using "to" prop', async ({mount}) => {
    const component = await mount('button/Anchor');
    await expect(component.getByRole('link', {name: 'test', exact: true})).toHaveAttribute('href', '/test');
});
test('buttons can track events', async ({mount}) => {
    const component = await mount('button/Tracking');
    const expected = [];
    for (const [role, name] of [
        ['link', 'button with href'],
        ['link', 'button with to'],
        ['button', 'button with onPress'],
    ] as const) {
        await component.getByRole(role, {name, exact: role === 'button'}).click();
        expected.push(trackingEvent);
        await expect(component.getByTestId('events')).toHaveValue(JSON.stringify(expected));
    }
});
test('buttons track default events', async ({mount}) => {
    const component = await mount('button/Tracking', {defaults: true});
    await component.getByRole('link', {name: /^no track button/}).click();
    await component.getByRole('link', {name: /^no track link/}).click();
    await expect(component.getByTestId('events')).toHaveValue('[]');
    const expected = [];
    for (const [role, label, action] of [
        ['link', 'primary', 'primary_button_tapped'],
        ['link', 'secondary', 'secondary_button_tapped'],
        ['button', 'danger', 'danger_button_tapped'],
        ['button', 'Take a photo', 'primary_button_tapped'],
        ['link', 'link', 'link_tapped'],
    ] as const) {
        await component.getByRole(role, {name: new RegExp(`^${label}(?: Página actual)?$`)}).click();
        expected.push({category: 'user_interaction', action, label});
        await expect(component.getByTestId('events')).toHaveValue(JSON.stringify(expected));
    }
});
test('Button ref', async ({mount}) => {
    const component = await mount('button/Refs');
    await expect(component.getByTestId('refs')).toHaveValue(
        JSON.stringify([
            ['BUTTON', 'onPress'],
            ['A', 'href'],
            ['A', 'to'],
        ])
    );
});
for (const variant of ['ButtonPrimary', 'ButtonLink'] as const) {
    test(`onNavigate is called before navigation when using "href" prop - ${variant}`, async ({
        mount,
        page,
    }) => {
        const events: Array<string> = [];
        const tracked: Array<TrackingEvent> = [];
        let completeNavigation!: () => void;
        const pendingNavigation = new Promise<void>((resolve) => {
            completeNavigation = resolve;
        });
        await page.route('https://example.org/', (route) => route.fulfill({body: 'Destination'}));
        const component = await mount<typeof Navigation>('button/Navigation', {
            variant,
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
    test(`onNavigate is called during navigation when using "to" prop - ${variant}`, async ({mount}) => {
        const events: Array<string> = [];
        const tracked: Array<TrackingEvent> = [];
        const component = await mount<typeof Navigation>('button/Navigation', {
            variant,
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
    test(`Buttons have the appropiate role - ${variant}`, async ({mount}) => {
        const component = await mount('button/Roles', {variant});
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
}
