import {openStoryPage, screen, waitFor} from '../test-utils';
import {sidenavCollapse, sidenavExpand} from '../text-tokens';

import type {PageApi} from '../test-utils';

const STORY_ID = 'components-sidenavbar-bar--default';

// Storybook renders in `es`, so the collapse action reads the Spanish text of these tokens.
const COLLAPSE_LABEL = sidenavCollapse.es;
const EXPAND_LABEL = sidenavExpand.es;

const getFocusedItemId = (page: PageApi): Promise<string | null> =>
    page.evaluate(
        () =>
            document.activeElement?.closest('[data-sidenav-item-id]')?.getAttribute('data-sidenav-item-id') ??
            null
    );

const isFocusInsideDialogPanel = (page: PageApi): Promise<boolean> =>
    page.evaluate(() => Boolean(document.activeElement?.closest('[data-sidenav-dialog-panel]')));

const isFocusInsideColumn = (page: PageApi): Promise<boolean> =>
    page.evaluate(() => Boolean(document.activeElement?.closest('[data-sidenav-double-panel]')));

// The query helpers return a handle for a missing element too, so this reads the DOM instead.
const isDialogPanelOpen = (page: PageApi): Promise<boolean> =>
    page.evaluate(() => document.querySelector('[data-sidenav-dialog-panel]') !== null);

test('SidenavBar renders its items', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    await screen.findByRole('navigation', {name: 'Main navigation'});
    await screen.findByRole('button', {name: 'Search (onPress)'});

    // The accessible name of a link carries the hidden hint that `Touchable` appends, so query the label.
    const homeLabel = await screen.findByText('Home (href)');
    const homeHref = await homeLabel.evaluate((element) => element.closest('a')?.getAttribute('href'));
    expect(homeHref).toBe('#home');
});

test('SidenavBar takes the width of its columns under a parent that constrains neither axis', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        // The box paints its edge on the root, so a stretched root shows the defect.
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
            height: Math.round(nav.getBoundingClientRect().height),
            viewportHeight: window.innerHeight,
        };
    });

    expect(sizes.root).toBe(200);
    expect(sizes.column).toBe(200);
    expect(sizes.host).toBeGreaterThan(sizes.root);
    // The viewport height minus the two 8px margins of the box.
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

// Regression: the collapse action swaps its icon on press, so the press target has left the document when
// the "press outside" listener runs, and that press counted as a press outside of the bar.
test('SidenavBar double panel stays open when the user collapses the sidenav', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('list', {name: 'Teams'});

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();

    await screen.findByRole('button', {name: EXPAND_LABEL});
    await screen.findByRole('list', {name: 'Teams'});
});

test('SidenavBar double panel moves the focus to the first item of the column, and steps in and out with the arrow keys', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('list', {name: 'Teams'});

    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });
    expect(await isFocusInsideColumn(page)).toBe(true);

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('design');

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');
    await (await screen.findByRole('button', {name: 'Projects'})).press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('active');
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });

    await (await screen.findByRole('button', {name: 'Teams'})).press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');
    await screen.findByRole('list', {name: 'Teams'});
});

// The column is not next to its trigger in the document, so the bar walks the reading order by hand.
test('SidenavBar reads an item, then the children of its open sub menu, then the next item, with Tab', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('list', {name: 'Teams'});
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });

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

test('SidenavBar travels the rail with the arrow keys while a column stands open', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {doublePanel: true},
    });

    await (await screen.findByRole('button', {name: 'Teams'})).click();
    await screen.findByRole('list', {name: 'Teams'});
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });

    await page.keyboard.press('ArrowLeft');
    expect(await getFocusedItemId(page)).toBe('teams');

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('notifications');

    await page.keyboard.press('End');
    expect(await getFocusedItemId(page)).toBe('settings');
    await screen.findByRole('list', {name: 'Teams'});
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
    await screen.findByRole('list', {name: 'Teams'});

    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });
    expect(await isFocusInsideDialogPanel(page)).toBe(true);

    await page.keyboard.press('ArrowDown');
    expect(await getFocusedItemId(page)).toBe('design');

    await page.keyboard.press('Escape');
    // The rail re-wraps the trigger in a tooltip when the panel closes, so the focus lands one frame later.
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
});

test('SidenavBar closes the floating panel with ArrowLeft and with ArrowUp on its first item', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();
    await screen.findByRole('button', {name: EXPAND_LABEL});

    const openPanelAndStepIn = async () => {
        await (await screen.findByRole('button', {name: 'Teams'})).click();
        await screen.findByRole('list', {name: 'Teams'});
        await waitFor(async () => {
            expect(await getFocusedItemId(page)).toBe('eng');
        });
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

test('SidenavBar steps back into the open floating panel with ArrowRight', async () => {
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
    });

    await (await screen.findByRole('button', {name: COLLAPSE_LABEL})).click();
    await screen.findByRole('button', {name: EXPAND_LABEL});

    const teams = await screen.findByRole('button', {name: 'Teams'});
    await teams.press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });
    expect(await isFocusInsideDialogPanel(page)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('teams');
    });
    expect(await isDialogPanelOpen(page)).toBe(true);

    await page.keyboard.press('ArrowRight');
    await waitFor(async () => {
        expect(await getFocusedItemId(page)).toBe('eng');
    });
    expect(await isFocusInsideDialogPanel(page)).toBe(true);
});
