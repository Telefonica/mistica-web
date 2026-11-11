import {test as browserTest} from '@playwright/test';
import {test, expect, getComponentStyles} from '../test-utils/component';
import {sidenavCollapse, sidenavExpand} from '../text-tokens';

import type {Locator, Page} from '@playwright/test';

const COLLAPSE_LABEL = sidenavCollapse.es;
const EXPAND_LABEL = sidenavExpand.es;
test.use({viewport: {width: 1280, height: 720}, reducedMotion: 'reduce'});
const computedStyle = (locator: Locator) =>
    locator.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
            height: style.height,
            minHeight: style.minHeight,
            maxHeight: style.maxHeight,
            overflow: style.overflow,
            gap: style.gap,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            marginTop: style.marginTop,
            marginBottom: style.marginBottom,
        };
    });
const openDialogPanel = async (page: Page, parentLabel: string) => {
    const trigger = page.getByRole('button', {name: parentLabel, exact: true});
    await trigger.click();
    const panelId = await trigger.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = page.locator('[id="' + panelId + '"]');
    await expect(panel.locator(':focus')).toHaveCount(1);
    return panel;
};

test('SidenavBar renders a navigation landmark with its items', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario1', {});

    await expect(page.getByRole('navigation', {name: 'Main navigation'})).toHaveCount(1);
    await expect(page.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/home');
});
test('SidenavBar falls back to the height of the viewport when no parent constrains it', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario2', {});
    const style = await computedStyle(page.getByRole('navigation', {name: 'Main navigation'}));
    expect(style.height).toBe(`${await page.evaluate(() => window.innerHeight)}px`);
    expect(style.minHeight).toBe('100%');
    expect(style.maxHeight).toBe('100%');
});
test('SidenavBar keeps the same fallback when it is boxed, minus the inset of the box', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario3', {});

    const style = await computedStyle(page.getByRole('navigation', {name: 'Main navigation'}));
    expect(style.height).toBe(`${(await page.evaluate(() => window.innerHeight)) - 16}px`);
    expect(style.minHeight).toBe('calc(100% - 16px)');
    expect(style.maxHeight).toBe('calc(100% - 16px)');
});
test('SidenavLayout offsets the sticky rail by topOffset', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario4', {});
    const layoutStyles = (await getComponentStyles(page)).sidenavLayout;
    const topOffsetVarName = layoutStyles.topOffsetVar.slice('var('.length, -1);
    expect(
        await page
            .getByTestId('SidenavLayout')
            .evaluate(
                (element, name) => (element as HTMLElement).style.getPropertyValue(name),
                topOffsetVarName
            )
    ).toBe('64px');
});
test('SidenavLayout leaves the rail at the top of the viewport without topOffset', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario5', {});
    const layoutStyles = (await getComponentStyles(page)).sidenavLayout;

    const topOffsetVarName = layoutStyles.topOffsetVar.slice('var('.length, -1);
    expect(
        await page
            .getByTestId('SidenavLayout')
            .evaluate(
                (element, name) => (element as HTMLElement).style.getPropertyValue(name),
                topOffsetVarName
            )
    ).toBe('');
});
test('SidenavBar marks the selected item with aria-current="page"', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario6', {});

    await expect(page.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', {name: 'Active'})).not.toHaveAttribute('aria-current');
});
test('SidenavBar renders second-level items of an open item', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario7', {});

    await expect(page.getByRole('link', {name: 'Active'})).toHaveAttribute('href', '/active');
});
test('SidenavBar auto-expands a parent when one of its children is selected', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario8', {});
    await expect(page.getByRole('link', {name: 'Active'})).toHaveCount(1);
});
test('SidenavBar reopens a closed parent when the selection moves to a sibling child', async ({
    mount,
    page,
}) => {
    const component = await mount('sidenav-bar/Scenario9', {});

    await expect(page.getByRole('link', {name: 'Active'})).toHaveCount(1);

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect(page.getByRole('link', {name: 'Active'})).toHaveCount(0);

    await component.update({step: 1});

    await expect(page.getByRole('link', {name: 'Archived'})).toHaveCount(1);
});
test('SidenavBar collapse button toggles the accessible label', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario10', {});

    const collapseButton = page.getByRole('button', {name: COLLAPSE_LABEL});
    await collapseButton.click();

    await expect(page.getByRole('button', {name: EXPAND_LABEL})).toHaveCount(1);
});
test('SidenavBar hides the collapse button when showCollapseButton is false', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario11', {});

    await expect(
        page.getByRole('button', {name: new RegExp(`${COLLAPSE_LABEL}|${EXPAND_LABEL}`)})
    ).toHaveCount(0);
});
test('SidenavBar follows a change of collapsed when showCollapseButton is false', async ({mount, page}) => {
    const component = await mount('sidenav-bar/Scenario12', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(false);

    await component.update({step: 1});

    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(true);
});
test('SidenavBar ignores a change of defaultCollapsed when the user can toggle it', async ({mount, page}) => {
    const component = await mount('sidenav-bar/Scenario13', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await component.update({step: 1});

    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(false);
});
test('SidenavBar keeps the header slot when collapsed', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario14', {});

    await expect(page.getByText('header slot')).toHaveCount(1);
});
test('SidenavBar closes the section title when collapsed and keeps the name of its list', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario15', {});
    const styles = (await getComponentStyles(page)).sidenav;
    const titleBox = page
        .locator('.' + styles.sectionTitle)
        .filter({has: page.getByText('Workspace', {exact: true})});

    await expect(titleBox).toContainClass(styles.sectionTitleCollapsed);
    await expect(page.getByRole('list', {name: 'Workspace'})).toHaveCount(1);
});
test('SidenavBar hides the heading of a section and keeps the name of its list', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario16', {});
    const styles = (await getComponentStyles(page)).sidenav;
    const titleBox = page
        .locator('.' + styles.sectionTitle)
        .filter({has: page.getByText('Workspace', {exact: true})});

    await expect(titleBox).toContainClass(styles.sectionTitleHidden);
    await expect(titleBox).not.toContainClass(styles.sectionTitleCollapsed);
    await expect(page.getByRole('list', {name: 'Workspace'})).toHaveCount(1);
});
test('SidenavBar paints the heading of a section that declares a plain string title', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario17', {});
    const styles = (await getComponentStyles(page)).sidenav;
    const titleBox = page
        .locator('.' + styles.sectionTitle)
        .filter({has: page.getByText('Workspace', {exact: true})});

    await expect(titleBox).not.toContainClass(styles.sectionTitleHidden);
    await expect(page.getByRole('list', {name: 'Workspace'})).toHaveCount(1);
});
test('SidenavBar keeps the label of an item in the document when collapsed', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario18', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    const label = page.getByText('Home');

    await expect(label).toHaveCount(1);
    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemLabelCollapsed)).toBe(true);
    await expect(page.getByTestId('ScreenReaderOnly').getByText('Home', {exact: true})).toHaveCount(0);
});
test('SidenavBar folds the labels of an open group with the rail when it collapses', async ({
    mount,
    page,
}) => {
    await page.clock.install({time: new Date('2025-01-01T00:00:00Z')});
    await mount('sidenav-bar/Scenario19', {});
    await page.clock.pauseAt(new Date('2025-01-02T00:00:00Z'));
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelCollapsed)).toBe(false);
    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelKeepsWidth)).toBe(false);
    const label = queryItemRow('active').locator('.' + styles.itemLabel.split(' ')[0]);
    const expandedWidth = await label.evaluate((element) => element.getBoundingClientRect().width);
    expect(expandedWidth).toBeGreaterThan(0);

    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();
    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelCollapsed)).toBe(true);
    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelFrozenWidth)).toBe(true);
    await expect
        .poll(() => label.evaluate((element) => element.getBoundingClientRect().width))
        .toBeCloseTo(expandedWidth);
});
test('SidenavBar turns the chevron of a parent item that the user opens', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario20', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect.poll(() => hasStyle(queryItemRow('projects'), styles.itemChevronRotated)).toBe(false);

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect.poll(() => hasStyle(queryItemRow('projects'), styles.itemChevronRotated)).toBe(true);
});
test('SidenavBar renders the isotype of the skin by default', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario21', {});

    expect(await page.getByTestId('Logo').locator('svg').getAttribute('viewBox')).toBe('0 0 72 72');
});
test('SidenavBar keeps the isotype of the skin when it is collapsed', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario22', {});

    expect(await page.getByTestId('Logo').locator('svg').getAttribute('viewBox')).toBe('0 0 72 72');
});
test('SidenavBar renders the default logo when logo is true', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario23', {});

    expect(await page.getByTestId('Logo').locator('svg').getAttribute('viewBox')).toBe('0 0 72 72');
});
test('SidenavBar clips a logo larger than its slot', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario24', {});
    const slot = page.getByTestId('huge-logo').locator('..');

    expect((await computedStyle(slot)).overflow).toBe('hidden');
});
test('SidenavBar renders no logo when logo is false', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario25', {});

    await expect(page.getByTestId('Logo')).toHaveCount(0);
});
test('SidenavBar renders the element that logo carries', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario26', {});

    await expect(page.getByRole('img', {name: 'Brand of the product'})).toHaveCount(1);
    await expect(page.getByTestId('Logo')).toHaveCount(0);
});
test('SidenavBar gives the collapsed state to the function that logo carries', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario27', {});

    await expect(page.getByRole('img', {name: 'Mark and name of the product'})).toHaveCount(1);
});
test('SidenavBar gives the collapsed state to that function on the collapsed rail', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario28', {});

    await expect(page.getByRole('img', {name: 'Mark of the product'})).toHaveCount(1);
});
test('SidenavBar moves the logo of that function when the user collapses the sidenav', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario29', {});

    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();

    await expect(page.getByRole('img', {name: 'Mark of the product'})).toHaveCount(1);
});
test('SidenavBar skips the moving phases when motion is off', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario30', {});

    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();

    await expect(page.getByRole('img', {name: 'Logo collapsed'})).toHaveCount(1);
});
test('SidenavBar gives the collapse state to the functions that headerSlot and footerSlot carry', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario31', {});
    await expect(page.getByText('Header expanded false')).toHaveCount(1);
    await expect(page.getByText('Footer expanded false')).toHaveCount(1);

    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();

    await expect(page.getByText('Header collapsed true')).toHaveCount(1);
    await expect(page.getByText('Footer collapsed true')).toHaveCount(1);
});
test('SidenavBar supports controlled selection with selectedItemId prop', async ({mount, page}) => {
    const onSelectedItemIdChangeCalls: Array<Array<unknown>> = [];
    const onSelectedItemIdChange = (...args: Array<unknown>) => {
        onSelectedItemIdChangeCalls.push(args);
    };
    await mount('sidenav-bar/Scenario32', {onSelectedItemIdChange});

    await expect(page.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', {name: 'Projects'})).not.toHaveAttribute('aria-current');
    await expect(page.getByRole('link', {name: 'Active'})).not.toHaveAttribute('aria-current');
});
test('SidenavBar calls onSelectedItemIdChange when an item with id is clicked', async ({mount, page}) => {
    const onSelectedItemIdChangeCalls: Array<Array<unknown>> = [];
    const onSelectedItemIdChange = (...args: Array<unknown>) => {
        onSelectedItemIdChangeCalls.push(args);
    };
    const onPressCalls: Array<Array<unknown>> = [];
    const onPress = (...args: Array<unknown>) => {
        onPressCalls.push(args);
    };
    await mount('sidenav-bar/Scenario33', {onSelectedItemIdChange, onPress});

    const projectsButton = page.getByRole('button', {name: 'Projects'});
    await projectsButton.click();

    await expect.poll(() => onSelectedItemIdChangeCalls).toContainEqual(['projects']);
    await expect.poll(() => onPressCalls.length).toBeGreaterThan(0);
});
test('SidenavBar renders stand-alone items at the first level, outside any section', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario34', {});

    await expect(page.getByRole('link', {name: 'Standalone top'})).toHaveAttribute('href', '/standalone-top');
    await expect(page.getByRole('link', {name: 'Standalone bottom'})).toHaveAttribute(
        'href',
        '/standalone-bottom'
    );

    const workspace = page.getByRole('list', {name: 'Workspace'});
    await expect(workspace.locator(page.getByRole('link', {name: 'Home'}))).toHaveCount(1);
    await expect(workspace.locator(page.getByRole('link', {name: 'Standalone top'}))).toHaveCount(0);
    await expect(workspace.locator(page.getByRole('link', {name: 'Standalone bottom'}))).toHaveCount(0);
});
test('SidenavBar builds one list for the first level, with one item per entry', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario35', {});
    const getListItems = (list: Locator) => list.locator(':scope > [role="listitem"]');

    const nav = page.getByRole('navigation', {name: 'Main navigation'});
    const bodyList = nav.getByRole('list').first();
    const entries = getListItems(bodyList);

    await expect(entries).toHaveCount(3);
    await expect(entries.nth(0).locator(page.getByRole('link', {name: 'Standalone top'}))).toHaveCount(1);
    await expect(entries.nth(1).locator(page.getByRole('list', {name: 'Workspace'}))).toHaveCount(1);
    await expect(entries.nth(2).locator(page.getByRole('link', {name: 'Standalone bottom'}))).toHaveCount(1);
});
test('SidenavBar gives each section a list of its own, named by its title', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario36', {});
    const getListItems = (list: Locator) => list.locator(':scope > [role="listitem"]');

    const sectionList = page.getByRole('list', {name: 'Workspace'});

    await expect(getListItems(sectionList)).toHaveCount(1);
    await expect(sectionList.locator(page.getByRole('link', {name: 'Home'}))).toHaveCount(1);
});
test('SidenavBar gives a stand-alone entry a single list item', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario37', {});
    const getOwnListItem = (element: Locator) => element.locator('xpath=ancestor::*[@role="listitem"][1]');

    const entry = getOwnListItem(page.getByRole('link', {name: 'Standalone top'}));

    await expect(entry.getByRole('listitem')).toHaveCount(0);
});
test('SidenavBar keeps a parent item and its children in the same list item', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario38', {});
    const getOwnListItem = (element: Locator) => element.locator('xpath=ancestor::*[@role="listitem"][1]');

    const entry = getOwnListItem(page.getByRole('button', {name: 'Projects'}));
    const children = page.getByRole('list', {name: 'Projects'});

    await expect(entry.locator(children)).toHaveCount(1);
    await expect(children.locator(page.getByRole('link', {name: 'Active'}))).toHaveCount(1);
});
test('SidenavBar keeps every entry of the first level 8px from its neighbours and from the two ends', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario39', {});
    const getListItems = (list: Locator) => list.locator(':scope > [role="listitem"]');

    const nav = page.getByRole('navigation', {name: 'Main navigation'});
    const bodyList = nav.getByRole('list').first();
    const listStyle = await computedStyle(bodyList);

    expect(listStyle.gap).toBe('16px');
    expect(listStyle.paddingTop).toBe('8px');
    expect(listStyle.paddingBottom).toBe('8px');
    const marginTops = await getListItems(bodyList).evaluateAll((entries) =>
        entries.map((entry) => getComputedStyle(entry).marginTop)
    );
    expect(marginTops).toEqual(['0px', '0px', '0px', '0px']);
});
test('SidenavBar gives each section divider its 16px on the side of the items only', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario40', {});
    const styles = (await getComponentStyles(page)).sidenav;

    const nav = page.getByRole('navigation', {name: 'Main navigation'});
    const dividerBaseClass = styles.sectionDividerTop.split(' ').pop();
    const [topDivider, bottomDivider] = await nav.locator(`.${dividerBaseClass}`).all();

    expect((await computedStyle(topDivider)).marginTop || '0px').toBe('0px');
    expect((await computedStyle(topDivider)).marginBottom).toBe('16px');
    expect((await computedStyle(bottomDivider)).marginTop).toBe('16px');
    expect((await computedStyle(bottomDivider)).marginBottom || '0px').toBe('0px');
});
test('SidenavBar draws no divider above the first entry nor below the last one', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario41', {});
    const getListItems = (list: Locator) => list.locator(':scope > [role="listitem"]');
    const styles = (await getComponentStyles(page)).sidenav;

    const nav = page.getByRole('navigation', {name: 'Main navigation'});
    const bodyList = nav.getByRole('list').first();
    const entries = getListItems(bodyList);
    const dividerBaseClass = styles.sectionDividerTop.split(' ').pop();
    const countDividers = (entry: Locator) => entry.locator(`.${dividerBaseClass}`).count();
    expect(await Promise.all((await entries.all()).map(countDividers))).toEqual([1, 1, 0]);
});
test('SidenavBar shares one divider between a section with a bottom divider and a section with a top divider', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario42', {});
    const getListItems = (list: Locator) => list.locator(':scope > [role="listitem"]');
    const styles = (await getComponentStyles(page)).sidenav;

    const nav = page.getByRole('navigation', {name: 'Main navigation'});
    const bodyList = nav.getByRole('list').first();
    const entries = getListItems(bodyList);
    const dividerBaseClass = styles.sectionDividerTop.split(' ').pop();
    const countDividers = (entry: Locator) => entry.locator(`.${dividerBaseClass}`).count();

    expect(await Promise.all((await entries.all()).map(countDividers))).toEqual([1, 1, 0]);
});
test('SidenavBar keeps the declared order of entries and stand-alone items', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario43', {});

    const labels = await page.getByRole('link').allTextContents();

    expect(labels).toEqual(['Standalone top', 'Home', 'Standalone bottom']);
});
test('SidenavBar selects a stand-alone item at the first level', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario44', {});

    await expect(page.getByRole('link', {name: 'Standalone top'})).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', {name: 'Home'})).not.toHaveAttribute('aria-current');
});
test('SidenavBar double panel opens with the label of the parent item and its children', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario45', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await expect(getPanel('Projects')).toHaveCount(0);

    await page.getByRole('button', {name: 'Projects'}).click();

    const panel = getPanel('Projects');
    await expect(panel).toHaveCount(1);
    await expect(panel.locator(page.getByRole('button', {name: 'Active'}))).toHaveCount(1);
    await expect(panel.locator(page.getByRole('button', {name: 'Archived'}))).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Projects'})).toHaveAttribute('aria-expanded', 'true');
});
test('SidenavBar double panel moves the focus to the first item of the column when it opens', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario46', {});

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();
});
test('SidenavBar double panel steps into the column and back to its parent with the arrow keys', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario47', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();

    await page.getByRole('button', {name: 'Active'}).press('ArrowDown');
    await expect(page.getByRole('button', {name: 'Archived'})).toBeFocused();

    await page.getByRole('button', {name: 'Archived'}).press('ArrowUp');
    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();
    await page.getByRole('button', {name: 'Active'}).press('ArrowUp');
    await expect(page.getByRole('button', {name: 'Projects'})).toBeFocused();
    await expect(getPanel('Projects')).toHaveCount(1);
});
test('SidenavBar double panel opens the column and lands on its first item with one ArrowRight', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario48', {});

    const trigger = page.getByRole('button', {name: 'Projects', expanded: false});
    await trigger.focus();
    await trigger.press('ArrowRight');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();
});
test('SidenavBar double panel steps back into the open column with ArrowRight', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario49', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    const column = getPanel('Projects');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();

    const trigger = page.getByRole('button', {name: 'Projects'});
    await trigger.focus();
    await trigger.press('ArrowRight');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();
    await expect(column).toHaveCount(1);
});
test('SidenavBar double panel closes when the user presses one of its children', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario50', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await page.getByRole('button', {name: 'Active'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel closes when the user presses the same parent item again', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario51', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await page.getByRole('button', {name: 'Projects'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel closes when the user presses outside of the bar', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario52', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await expect(getPanel('Projects')).toHaveCount(1);

    await page.locator('body').click();

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel stays open when the user presses the background of the bar', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario53', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await page.getByText('Workspace').click();

    await expect(getPanel('Projects')).toHaveCount(1);
});
test('SidenavBar double panel stays open when the user collapses the sidenav', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario54', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await expect(getPanel('Projects')).toHaveCount(1);

    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();

    await expect(getPanel('Projects')).toHaveCount(1);
});
test('SidenavBar double panel stays open when the user presses outside of the bar and it holds the selection', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario55', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await expect(getPanel('Projects')).toHaveCount(1);

    await page.locator('body').click();
    await expect(page.getByRole('button', {name: 'Projects', exact: true})).toHaveAttribute(
        'aria-expanded',
        'true'
    );

    await expect(getPanel('Projects')).toHaveCount(1);
});
test('SidenavBar double panel closes when the user presses a first-level item without children', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario56', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await page.getByRole('button', {name: 'Home'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel refreshes when the user presses another parent item', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario57', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await page.getByRole('button', {name: 'Projects'}).click();
    await page.getByRole('button', {name: 'Documents'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);

    const panel = getPanel('Documents');
    await expect(panel).toHaveCount(1);
    await expect(panel.locator(page.getByRole('button', {name: 'Shared'}))).toHaveCount(1);
    await expect(page.getByRole('button', {name: 'Archived'})).toHaveCount(0);
});
test('SidenavBar double panel opens when the selection moves to one of its children', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario58', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    const panel = getPanel('Projects');
    await expect(panel).toHaveCount(1);
    await expect(panel.locator(page.getByRole('button', {name: 'Archived'}))).toHaveCount(1);
});
test('SidenavBar double panel closes when the selection moves to a first-level item without children', async ({
    mount,
    page,
}) => {
    const component = await mount('sidenav-bar/Scenario59', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await expect(getPanel('Projects')).toHaveCount(1);

    await component.update({step: 1});

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel closes when the user presses one of its children, with a controlled selection', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario60', {});
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await expect(getPanel('Projects')).toHaveCount(1);

    await page.getByRole('button', {name: 'Archived'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);
});
test('SidenavBar double panel moves to the parent of a child selected outside of the bar', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/ExternalSelection');
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});

    await expect(getPanel('Projects')).toHaveCount(1);

    await expect(page.getByRole('button', {name: 'Active', exact: true})).toBeVisible();
    await page.getByRole('button', {name: 'Select from the app'}).click();

    await expect(getPanel('Projects')).toHaveCount(0);

    await expect(page.getByRole('button', {name: 'Documents', exact: true})).toHaveAttribute(
        'aria-expanded',
        'true'
    );
    const panel = getPanel('Documents');
    await expect(panel).toHaveCount(1);
    await expect(panel.locator(page.getByRole('button', {name: 'Shared'}))).toHaveCount(1);
});
test('SidenavBar opens a closed double panel for a child selected outside the bar', async ({mount, page}) => {
    await mount('sidenav-bar/ExternalSelection', {initialSelection: 'home'});
    await expect(page.getByRole('list', {name: 'Documents', exact: true})).toHaveCount(0);

    await page.getByRole('button', {name: 'Select from the app'}).click();

    await expect(page.getByRole('button', {name: 'Documents', exact: true})).toHaveAttribute(
        'aria-expanded',
        'true'
    );
    await expect(page.getByRole('button', {name: 'Shared', exact: true})).toHaveAttribute(
        'aria-current',
        'page'
    );
});
test('SidenavBar collapsed double panel keeps the tooltips of the other items while a column is open', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario62', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const getPanel = (name: string) => page.getByRole('list', {name, exact: true});
    const hasTooltip = async (id: string) =>
        (await queryItemRow(id).locator('[aria-describedby]').count()) > 0;

    await expect.poll(() => hasTooltip('documents')).toBe(true);

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect(getPanel('Projects')).toHaveCount(1);
    await expect.poll(() => hasTooltip('documents')).toBe(true);
    await expect.poll(() => hasTooltip('home')).toBe(true);
    await expect.poll(() => hasTooltip('projects')).toBe(false);
});
test('SidenavBar collapsed drops the tooltips of the rail while the dialog panel is open', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario63', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasTooltip = async (id: string) =>
        (await queryItemRow(id).locator('[aria-describedby]').count()) > 0;

    await expect.poll(() => hasTooltip('documents')).toBe(true);

    await page.getByRole('button', {name: 'Projects'}).click();

    await expect.poll(() => hasTooltip('documents')).toBe(false);
    await expect.poll(() => hasTooltip('projects')).toBe(false);
});
test('SidenavBar collapsed moves the focus into the dialog panel and ties it to the trigger', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario64', {});

    await page.getByRole('button', {name: 'Projects'}).click();

    const panelId = await page
        .getByRole('button', {name: 'Projects', exact: true})
        .getAttribute('aria-controls');
    const panel = page.locator('[id="' + panelId + '"]');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();

    await expect(panel.locator(page.getByRole('button', {name: 'Active'}))).toHaveCount(1);
});
test('SidenavBar collapsed opens the dialog panel with the focus on its first item', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario65', {});

    await openDialogPanel(page, 'Projects');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();

    await page.getByRole('button', {name: 'Active'}).press('ArrowDown');

    await expect(page.getByRole('button', {name: 'Archived'})).toBeFocused();
});
test('SidenavBar collapsed keeps the labels of the dialog panel readable', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario66', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    const panel = await openDialogPanel(page, 'Projects');

    await expect(panel.locator(queryItemRow('active'))).toHaveCount(1);
    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelCollapsed)).toBe(false);
    await expect.poll(() => hasStyle(queryItemRow('active'), styles.itemLabelKeepsWidth)).toBe(false);
    const label = queryItemRow('active').locator('.' + styles.itemLabel.split(' ')[0]);
    const expandedWidth = await label.evaluate((element) => element.getBoundingClientRect().width);
    expect(expandedWidth).toBeGreaterThan(0);
});
test('SidenavBar collapsed reads the dialog panel between its trigger and the next item with Tab', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario67', {});

    await openDialogPanel(page, 'Projects');
    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();

    await page.getByRole('button', {name: 'Active'}).press('Tab');
    await expect(page.getByRole('button', {name: 'Archived'})).toBeFocused();
    await page.getByRole('button', {name: 'Archived'}).press('Tab');
    await expect(page.getByRole('button', {name: 'Documents'})).toBeFocused();
    await page.getByRole('button', {name: 'Documents'}).press('Shift+Tab');
    await expect(page.getByRole('button', {name: 'Archived'})).toBeFocused();
});
test('SidenavBar collapsed closes the dialog panel with ArrowLeft and returns to its parent', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario68', {});

    await openDialogPanel(page, 'Projects');

    await page.getByRole('button', {name: 'Active'}).press('ArrowLeft');

    await expect(page.getByRole('button', {name: 'Active'})).toHaveCount(0);

    await expect(page.getByRole('button', {name: 'Projects'})).toBeFocused();
});
test('SidenavBar collapsed closes the dialog panel with ArrowUp on its first item', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario69', {});

    await openDialogPanel(page, 'Projects');

    await page.getByRole('button', {name: 'Active'}).press('ArrowUp');

    await expect(page.getByRole('button', {name: 'Active'})).toHaveCount(0);

    await expect(page.getByRole('button', {name: 'Projects'})).toBeFocused();
});
test('SidenavBar collapsed steps back into the open dialog panel with ArrowRight', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario70', {});

    await openDialogPanel(page, 'Projects');

    const trigger = page.getByRole('button', {name: 'Projects'});
    await trigger.focus();

    await trigger.press('ArrowRight');

    await expect(page.getByRole('button', {name: 'Active'})).toBeFocused();
});
test('SidenavBar collapsed keeps the dialog panel open while the arrow keys travel the rail', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario71', {});

    await openDialogPanel(page, 'Projects');
    const trigger = page.getByRole('button', {name: 'Projects'});
    await trigger.focus();

    await trigger.press('ArrowDown');

    await expect(page.getByRole('button', {name: 'Documents'})).toBeFocused();
    await expect(page.getByRole('button', {name: 'Active'})).toHaveCount(1);
});
test('SidenavBar keeps the accent of a selected first-level item on the collapsed rail', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario72', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemAccent)).toBe(true);
    await expect.poll(() => hasStyle(queryItemRow('home'), styles.itemTouchableSelected.default)).toBe(true);
});
test('SidenavBar double panel gives the accent to the selected child, and the background to the parent', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario73', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    const parentRow = queryItemRow('projects');
    const childRow = queryItemRow('archived');

    await expect.poll(() => hasStyle(parentRow, styles.itemAccent)).toBe(false);
    await expect.poll(() => hasStyle(parentRow, styles.itemTouchableSelected.default)).toBe(true);
    await expect.poll(() => hasStyle(childRow, styles.itemAccent)).toBe(true);
});
test('SidenavBar double panel gives the background to the parent of the open column only', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario74', {});
    const queryItemRow = (id: string) => page.locator('[data-sidenav-item-id="' + id + '"]');
    const hasStyle = async (row: Locator, className: string) =>
        (await row.locator('.' + className.split(' ')[0]).count()) > 0;
    const styles = (await getComponentStyles(page)).sidenav;

    await expect
        .poll(() => hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default))
        .toBe(true);

    await page.getByRole('button', {name: 'Documents'}).click();

    await expect
        .poll(() => hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default))
        .toBe(false);
    await expect
        .poll(() => hasStyle(queryItemRow('documents'), styles.itemTouchableSelected.default))
        .toBe(true);

    await page.getByRole('button', {name: 'Documents'}).click();

    await expect
        .poll(() => hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default))
        .toBe(true);
    await expect
        .poll(() => hasStyle(queryItemRow('documents'), styles.itemTouchableSelected.default))
        .toBe(false);
});
test('SidenavBar expands the children inline when doublePanel is false', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario75', {});

    await page.getByRole('button', {name: 'Projects'}).click();
    const accordion = page.getByRole('list', {name: 'Projects'});
    await expect(accordion.locator(page.getByRole('button', {name: 'Active'}))).toHaveCount(1);
    await expect(accordion).not.toContainText('Projects');
});
test('SidenavBar renders a stand-alone item with children at the first level', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario76', {});

    await expect(page.getByRole('button', {name: 'Standalone parent'})).toHaveCount(1);
    await expect(page.getByRole('link', {name: 'Child'})).toHaveAttribute('href', '/child');
});
test('SidenavBar boxed drops its border when the sidenav carries a variant of its own', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario77', {});
    const sidenavBar = page.getByRole('navigation');
    const styles = (await getComponentStyles(page)).sidenav;

    await expect(sidenavBar).not.toContainClass(styles.boxedBorder);
});
test('SidenavBar boxed drops its border when the skin turns showBoxedBorder off', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario78', {});
    const sidenavBar = page.getByRole('navigation');
    const styles = (await getComponentStyles(page)).sidenav;

    await expect(sidenavBar).not.toContainClass(styles.boxedBorder);
});
test('SidenavBar collapse button reports its state through aria-expanded', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario79', {});

    const collapseButton = page.getByRole('button', {name: COLLAPSE_LABEL});
    await expect(collapseButton).toHaveAttribute('aria-expanded', 'true');

    await collapseButton.click();

    await expect(page.getByRole('button', {name: EXPAND_LABEL})).toHaveAttribute('aria-expanded', 'false');
});
test('SidenavBar moves the focus down and up with the arrow keys', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario80', {});

    const home = page.getByRole('link', {name: 'Home'});
    const search = page.getByRole('link', {name: 'Search'});

    await home.focus();
    await home.press('ArrowDown');
    await expect(search).toBeFocused();

    await search.press('ArrowUp');
    await expect(home).toBeFocused();
});
test('SidenavBar focuses the first and last items with Home and End', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario81', {});

    const home = page.getByRole('link', {name: 'Home'});
    const teams = page.getByRole('button', {name: 'Teams'});

    await home.focus();
    await home.press('End');
    await expect(teams).toBeFocused();

    await teams.press('Home');
    await expect(home).toBeFocused();
});
test('SidenavBar expands a closed parent with ArrowRight and collapses it with ArrowLeft', async ({
    mount,
    page,
}) => {
    await mount('sidenav-bar/Scenario82', {});

    const teams = page.getByRole('button', {name: 'Teams', expanded: false});

    await teams.focus();
    await teams.press('ArrowRight');

    await expect(page.getByRole('button', {name: 'Teams', expanded: true})).toHaveCount(1);
    await expect(page.getByRole('link', {name: 'Engineering'})).toHaveCount(1);

    await page.getByRole('button', {name: 'Teams'}).press('ArrowLeft');

    await expect(page.getByRole('link', {name: 'Engineering'})).toHaveCount(0);
});
test('SidenavBar steps into the group of an open parent with ArrowRight', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario83', {});

    const teams = page.getByRole('button', {name: 'Teams', expanded: false});

    await teams.focus();
    await teams.press('ArrowRight');
    await page.getByRole('button', {name: 'Teams'}).press('ArrowRight');

    await expect(page.getByRole('link', {name: 'Engineering'})).toBeFocused();
});
test('SidenavBar moves the focus to the parent with ArrowLeft from a child', async ({mount, page}) => {
    await mount('sidenav-bar/Scenario84', {});

    const teams = page.getByRole('button', {name: 'Teams'});
    await teams.focus();
    await teams.press('ArrowRight');

    const eng = page.getByRole('link', {name: 'Engineering'});
    await eng.focus();
    await eng.press('ArrowLeft');

    await expect(page.getByRole('button', {name: 'Teams'})).toBeFocused();
});

for (const collapsed of [false, true])
    test(`SidenavBar gives a list to the ${collapsed ? 'dialog panel' : 'second column'}`, async ({
        mount,
        page,
    }) => {
        await mount('sidenav-bar/DoublePanel', {collapsed});
        await page.getByRole('button', {name: 'Projects', exact: true}).click();
        const panel = page.getByRole('list', {name: 'Projects', exact: true});
        await expect(panel.locator(':scope > [role="listitem"]')).toHaveCount(2);
        await expect(panel.getByRole('button', {name: 'Active', exact: true})).toHaveCount(1);
    });
for (const [pageVariant, expected] of [
    ['default', true],
    ['alternative', true],
    ['brand', false],
    ['negative', false],
    ['media', false],
] as const)
    test(`SidenavBar boxed over a ${pageVariant} page paints its border: ${expected}`, async ({
        mount,
        page,
    }) => {
        await mount('sidenav-bar/Boxed', {pageVariant});
        const styles = (await getComponentStyles(page)).sidenav;
        const nav = page.getByRole('navigation');
        await expect(nav).toContainClass(styles.boxed);
        if (expected) await expect(nav).toContainClass(styles.boxedBorder);
        else await expect(nav).not.toContainClass(styles.boxedBorder);
    });
test('SidenavBar reports the phase of the motion to the logo, and settles it when the rail stops', async ({
    mount,
    page,
}) => {
    await page.emulateMedia({reducedMotion: 'no-preference'});
    await page.clock.install({time: new Date('2025-01-01T00:00:00Z')});
    await mount('sidenav-bar/Motion');
    const styles = (await getComponentStyles(page)).sidenav;
    await expect(page.getByRole('img', {name: 'Logo expanded', exact: true})).toHaveCount(1);
    await page.clock.pauseAt(new Date('2025-01-02T00:00:00Z'));
    await page.getByRole('button', {name: COLLAPSE_LABEL}).click();
    await expect(page.getByRole('img', {name: 'Logo collapsing', exact: true})).toHaveCount(1);
    await page.clock.runFor(styles.COLLAPSE_DURATION_MS);
    await expect(page.getByRole('img', {name: 'Logo collapsed', exact: true})).toHaveCount(1);
    await page.getByRole('button', {name: EXPAND_LABEL}).click();
    await expect(page.getByRole('img', {name: 'Logo expanding', exact: true})).toHaveCount(1);
    await page.clock.runFor(styles.COLLAPSE_DURATION_MS);
    await expect(page.getByRole('img', {name: 'Logo expanded', exact: true})).toHaveCount(1);
});
browserTest(
    'SidenavBar reports a first-level item without an asset, and it accepts a second-level one',
    async ({mount, page}) => {
        const messages: Array<string> = [];
        const pageErrors: Array<string> = [];
        page.on('console', (message) => {
            if (['error', 'warning'].includes(message.type()) && message.args().length)
                messages.push(message.text());
        });
        page.on('pageerror', (error) => pageErrors.push(error.message));
        await mount('sidenav-bar/InvalidAsset');
        await expect.poll(() => messages).toEqual([expect.stringContaining('SidenavBar item "Home"')]);
        expect(messages[0]).toContain('is a first-level item without an asset');
        expect(pageErrors).toEqual([]);
    }
);
test('SidenavBar drops its scroll dividers when the screen goes narrow and back', async ({mount, page}) => {
    await mount('sidenav-bar/Scrollable');
    const styles = (await getComponentStyles(page)).sidenav;
    const dividers = page.locator('.' + styles.scrollSpacerDivider.split(' ').pop());
    const body = page.locator('.' + styles.bodyBase.split(' ')[0]);
    await expect(dividers).toHaveCount(1);
    await body.evaluate((element) => {
        element.scrollTop = (element.scrollHeight - element.clientHeight) / 2;
    });
    await expect(dividers).toHaveCount(2);
    await page.setViewportSize({width: 411, height: 731});
    await expect(page.getByRole('button', {name: 'Abrir menú de navegación'})).toBeVisible();
    await page.setViewportSize({width: 1280, height: 720});
    await expect(body).toHaveJSProperty('scrollTop', 0);
    await expect(dividers).toHaveCount(1);
});
