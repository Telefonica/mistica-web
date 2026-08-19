import {openStoryPage, screen} from '../../../test-utils';

const STORY_ID = 'components-sidenavbar-bar--default';

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

// An item with children only expands, so a real press is the single proof that it opens its group and that
// it moves `aria-expanded`. "Teams" starts closed, while "Projects" carries `defaultOpen`.
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

    const collapseAction = await screen.findByRole('button', {name: 'Collapse navigation'});

    await collapseAction.click();

    const expandAction = await screen.findByRole('button', {name: 'Expand navigation'});

    await expandAction.click();

    await screen.findByRole('button', {name: 'Collapse navigation'});
});
