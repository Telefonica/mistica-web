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

// The name of the dialog panel when the panel itself holds the focus, and `null` when it does not.
const getFocusedPanelLabel = (page: PageApi): Promise<string | null> =>
    page.evaluate(() => {
        const active = document.activeElement;
        return active?.hasAttribute('data-sidenav-dialog-panel') ? active.getAttribute('aria-label') : null;
    });

// The name of the second column when the column itself holds the focus, and `null` when it does not.
const getFocusedColumnLabel = (page: PageApi): Promise<string | null> =>
    page.evaluate(() => {
        const active = document.activeElement;
        return active?.hasAttribute('data-sidenav-double-panel') ? active.getAttribute('aria-label') : null;
    });

// Whether a dialog panel stands in the document. The query helpers of this harness return a handle for a
// missing element too, so the test reads the DOM instead.
const isDialogPanelOpen = (page: PageApi): Promise<boolean> =>
    page.evaluate(() => document.querySelector('[data-sidenav-dialog-panel]') !== null);

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

// A boxed sidenav paints its edge on the root, so a root wider than its columns drew that edge far to the
// right of the items. `SidenavLayout` hid the defect, because a flex item measures its content: the bar
// only stretched under a plain block parent, which is what a consumer writes when it places the bar itself.
test('SidenavBar takes the width of its columns under a parent that constrains neither axis', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {boxed: true, width: 200},
    });

    await screen.findByRole('navigation', {name: 'Main navigation'});

    const sizes = await page.evaluate(() => {
        const nav = document.querySelector('[data-testid="SidenavBar"]') as HTMLElement;
        const host = document.createElement('div');
        document.body.appendChild(host);
        host.appendChild(nav);

        return {
            root: Math.round(nav.getBoundingClientRect().width),
            column: Math.round((nav.firstElementChild as HTMLElement).getBoundingClientRect().width),
            host: Math.round(host.getBoundingClientRect().width),
            // The bar fills the height of the viewport, minus the two 8px margins of the box, although
            // nothing above it carries a height.
            height: Math.round(nav.getBoundingClientRect().height),
            viewportHeight: window.innerHeight,
        };
    });

    expect(sizes.root).toBe(200);
    expect(sizes.column).toBe(200);
    expect(sizes.host).toBeGreaterThan(sizes.root);
    expect(sizes.height).toBe(sizes.viewportHeight - 16);
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

// The second column takes the focus when it opens, so a screen reader announces the group. It belongs to
// no item of the rail, so it answers the arrow keys itself, and it stays open while the focus steps out.
test('SidenavBar double panel moves the focus to the column, and steps in and out with the arrow keys', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('group', {name: 'Teams'});

    await waitFor(async () => {
        expect(await getFocusedColumnLabel(page)).toBe('Teams');
    });

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('eng');

    // One press of ArrowRight on a closed parent opens its column and lands on the first item.
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');
    await (await screen.findByRole('button', {name: 'Projects'})).press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('active');
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await waitFor(async () => {
        expect(await getFocusedColumnLabel(page)).toBe('Teams');
    });

    // ArrowRight on the trigger of an open column steps to the first item of that column.
    await (await screen.findByRole('button', {name: 'Teams'})).press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');
    await screen.findByRole('group', {name: 'Teams'});
});

// The spec of the reading order asks for item 1, the children that it opened, then item 2. Neither panel
// stands there in the document, so Tab walks that sequence by hand. "Projects" carries `defaultOpen`, so
// its children sit in the rail between "Search" and "Teams"; "Teams" is the parent that opens a column.
test('SidenavBar reads an item, then the children of its open panel, then the next item, with Tab', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('group', {name: 'Teams'});
    await waitFor(async () => {
        expect(await getFocusedColumnLabel(page)).toBe('Teams');
    });

    // From the column, back onto its trigger, and then forward through the whole sequence.
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    expect(await getFocusedItemId(page)).toBe('teams');

    await page.keyboard.press('Tab');
    expect(await getFocusedItemId(page)).toBe('eng');
    await page.keyboard.press('Tab');
    expect(await getFocusedItemId(page)).toBe('design');
    await page.keyboard.press('Tab');
    expect(await getFocusedItemId(page)).toBe('notifications');

    // And backwards: the item after the trigger steps to the last child of that trigger.
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    expect(await getFocusedItemId(page)).toBe('design');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    expect(await getFocusedItemId(page)).toBe('eng');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    expect(await getFocusedItemId(page)).toBe('teams');
});

// The arrows keep to one level. They travel the rail without the rows of the column, which stand at the
// end of the same landmark in the document.
test('SidenavBar travels the rail with the arrow keys while a column stands open', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('group', {name: 'Teams'});
    await waitFor(async () => {
        expect(await getFocusedColumnLabel(page)).toBe('Teams');
    });

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('notifications');

    await page.keyboard.press('End');
    expect(await getFocusedItemId(page)).toBe('settings');
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

    // The panel opens in a portal, at the end of the document, so a screen reader that reads the page in
    // order never reaches it from the trigger. The panel itself takes the focus as soon as it stands where
    // it belongs, which names the group to the user. It belongs to no item, so the first ArrowDown steps
    // into the panel, and the next one moves inside it.
    await waitFor(async () => {
        expect(await getFocusedPanelLabel(page)).toBe(sidenavSubmenu.es.replace('1$s', 'Teams'));
    });

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('eng');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('design');

    await page.keyboard.press('Escape');
    // The collapsed rail wraps the trigger row in a tooltip once the panel closes, so the focus returns to
    // the fresh trigger node one frame later.
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
});

// ArrowLeft leaves the group, and ArrowUp on its first item does the same: above that item stands its
// parent. Both close the panel and return the focus to the trigger.
test('SidenavBar closes the floating panel with ArrowLeft and with ArrowUp on its first item', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const panelName = sidenavSubmenu.es.replace('1$s', 'Teams');

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();
    await screen.findByRole('button', {name: EXPAND_LABEL});

    const openPanelAndStepIn = async () => {
        await (await screen.findByRole('button', {name: 'Teams'})).click();
        await screen.findByRole('group', {name: panelName});
        await waitFor(async () => {
            expect(await getFocusedPanelLabel(page)).toBe(panelName);
        });
        await page.keyboard.press('ArrowDown');
        expect(await getFocusedItemId(page)).toBe('eng');
    };

    await openPanelAndStepIn();
    await page.keyboard.press('ArrowLeft');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
    expect(await isDialogPanelOpen(page)).toBe(false);

    await openPanelAndStepIn();
    await page.keyboard.press('ArrowUp');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
    expect(await isDialogPanelOpen(page)).toBe(false);
});

// A parent that already stands open answers ArrowRight with its group, so the user steps back into the
// panel that they left instead of closing it and opening it again.
test('SidenavBar steps back into the open floating panel with ArrowRight', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    const panelName = sidenavSubmenu.es.replace('1$s', 'Teams');

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();
    await screen.findByRole('button', {name: EXPAND_LABEL});

    // ArrowRight opens the panel, and the panel takes the focus. Shift+Tab steps back onto the trigger
    // and leaves the panel open, which is the state that the second ArrowRight answers.
    const teams = await screen.findByRole('button', {name: 'Teams'});
    await teams.press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedPanelLabel(page)).toBe(panelName);
    });

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
    expect(await isDialogPanelOpen(page)).toBe(true);

    await page.keyboard.press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedPanelLabel(page)).toBe(panelName);
    });
});
