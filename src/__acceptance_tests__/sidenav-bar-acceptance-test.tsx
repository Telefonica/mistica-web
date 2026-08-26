import {openStoryPage, screen, waitFor} from '../test-utils';
import {sidenavCollapse, sidenavExpand, sidenavSubmenu} from '../text-tokens';

import type {PageApi} from '../test-utils';

const STORY_ID = 'components-sidenavbar-bar--default';

// Storybook renders in `es`, so the collapse action reads the Spanish text of these tokens.
const COLLAPSE_LABEL = sidenavCollapse.es;
const EXPAND_LABEL = sidenavExpand.es;

// The id of the item that holds the focus, read from the row that wraps the focused control. It gives a
// stable target for the keyboard tests, regardless of the tag that each item renders.
const getFocusedItemId = (page: PageApi): Promise<string | null> =>
    page.evaluate(
        () =>
            document.activeElement?.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id') ??
            null
    );

test('SidenavBar renders its items', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    await screen.findByRole('navigation', {name: 'Main navigation'});
    await screen.findByRole('button', {name: 'Search (onPress)'});

    // An item with `href` renders an anchor. Its accessible name also carries the hidden hint that
    // `Touchable` appends to every link, so this reads the anchor of the label instead of that name.
    const homeLabel = await screen.findByText('Home (href)');
    const homeHref = await homeLabel.evaluate((element) => element.closest('a')?.getAttribute('href'));
    expect(homeHref).toBe('#home');
});

test('SidenavBar expands a parent item on press', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const parent = await screen.findByRole('button', {name: 'Teams', expanded: false});

    await parent.click();

    await screen.findByRole('button', {name: 'Teams', expanded: true});

    await screen.findByRole('button', {name: 'Engineering'});
});

test('SidenavBar collapses and expands again from its collapse action', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const collapseAction = await screen.findByRole('button', {name: COLLAPSE_LABEL});

    await collapseAction.click();

    const expandAction = await screen.findByRole('button', {name: EXPAND_LABEL});

    await expandAction.click();

    await screen.findByRole('button', {name: COLLAPSE_LABEL});
});

// The collapse action swaps its icon when the user presses it, so the node that the press started on has
// already left the document when the listener that watches for a press outside of the bar runs. Reading
// `event.target` there counted that press as a press outside, and the second column closed with it.
test('SidenavBar double panel stays open when the user collapses the sidenav', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('group', {name: 'Teams'});

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();

    await screen.findByRole('button', {name: EXPAND_LABEL});
    await screen.findByRole('group', {name: 'Teams'});
});

test('SidenavBar collapse action reports its state through aria-expanded', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const collapseAction = await screen.findByRole('button', {name: COLLAPSE_LABEL});
    expect(await collapseAction.evaluate((element) => element.getAttribute('aria-expanded'))).toBe('true');

    await collapseAction.click();

    const expandAction = await screen.findByRole('button', {name: EXPAND_LABEL});
    expect(await expandAction.evaluate((element) => element.getAttribute('aria-expanded'))).toBe('false');
});

// "Projects" carries `defaultOpen`, so its children sit between "Search" and "Teams".
test('SidenavBar moves the focus between items with the arrow keys, Home, and End', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const search = await screen.findByRole('button', {name: 'Search (onPress)'});

    await search.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('projects');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('active');

    await page.keyboard.press('ArrowUp');
    expect(await getFocusedItemId(page)).toBe('projects');

    await page.keyboard.press('Home');
    expect(await getFocusedItemId(page)).toBe('home');

    await page.keyboard.press('End');
    expect(await getFocusedItemId(page)).toBe('settings');
});

test('SidenavBar expands, collapses, and steps out of a group with the arrow keys', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const teams = await screen.findByRole('button', {name: 'Teams', expanded: false});

    await teams.press('ArrowRight');
    await screen.findByRole('button', {name: 'Teams', expanded: true});
    expect(await getFocusedItemId(page)).toBe('teams');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('eng');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');

    await page.keyboard.press('ArrowLeft');
    await screen.findByRole('button', {name: 'Teams', expanded: false});
});

test('SidenavBar carries the focus into the floating panel and back on Escape', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();
    await screen.findByRole('button', {name: EXPAND_LABEL});

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('group', {name: sidenavSubmenu.es.replace('1$s', 'Teams')});

    // Opening the panel drops the tooltips of the rail, which replaces the trigger row with a fresh node
    // and returns the focus to it one frame later. ArrowDown reads the focus, so it waits for that node to
    // hold it again; otherwise it would run against the document body and move nothing.
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('eng');

    await page.keyboard.press('Escape');
    // The collapsed rail wraps the trigger row in a tooltip once the panel closes, so the focus returns to
    // the fresh trigger node one frame later.
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
});
