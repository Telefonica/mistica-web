import * as React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import {SidenavBar} from '../../index';
import * as styles from '../../sidenav-bar.css';
import {ThemeVariant} from '../../../theme-variant-context';
import {getMovistarSkin} from '../../../skins/movistar';
import {sidenavCollapse, sidenavExpand} from '../../../text-tokens';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';

import type {Variant} from '../../../theme-variant-context';
import type {Skin} from '../../../skins/types';
import type {SidenavEntry, SidenavSection} from '../../sidenav-types';

// The test theme resolves to `es-ES`, so the collapse action reads the Spanish text of these tokens.
const COLLAPSE_LABEL = sidenavCollapse.es;
const EXPAND_LABEL = sidenavExpand.es;

class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

// The group of a parent item and the second column both slide away instead of disappearing, so their node
// stays in the document until the movement ends. Motion is off in the tests, so the exit unmounts on a
// zero timeout; the browser still runs that unmount on a macrotask, which a heavy re-render of the bar can
// delay well past the default deadline on a busy CI machine. A generous timeout keeps the wait stable.
const waitForRemoval = (queryElement: () => HTMLElement | null): Promise<void> =>
    waitFor(
        () => {
            expect(queryElement()).not.toBeInTheDocument();
        },
        {timeout: 5000}
    );

const defaultSections: Array<SidenavSection> = [
    {
        title: 'Workspace',
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                defaultOpen: true,
                children: [{id: 'active', label: 'Active', href: '/active'}],
            },
        ],
    },
];

const renderSidenav = async (props: React.ComponentProps<typeof SidenavBar> = {}) => {
    const result = render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" sections={defaultSections} {...props} />
        </ThemeContextProvider>
    );

    // The default logo lazy loads its brand image, so let it settle before asserting.
    await React.act(async () => {});

    return result;
};

test('SidenavBar renders a navigation landmark with its items', async () => {
    await renderSidenav();

    expect(screen.getByRole('navigation', {name: 'Main navigation'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/home');
});

test('SidenavBar marks the selected item with aria-current="page"', async () => {
    await renderSidenav({selectedItemId: 'home'});

    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Active'})).not.toHaveAttribute('aria-current');
});

test('SidenavBar renders nested children of an open item', async () => {
    await renderSidenav();

    expect(screen.getByRole('link', {name: 'Active'})).toHaveAttribute('href', '/active');
});

test('SidenavBar auto-expands a parent when one of its children is selected', async () => {
    const sections: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    children: [{id: 'active', label: 'Active', href: '/active'}],
                },
            ],
        },
    ];

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" sections={sections} selectedItemId="active" />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    // The parent is not defaultOpen, so the child would be hidden unless the selection auto-expands it.
    expect(screen.getByRole('link', {name: 'Active'})).toBeInTheDocument();
});

test('SidenavBar reopens a closed parent when the selection moves to a sibling child', async () => {
    const sections: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {
                    id: 'projects',
                    label: 'Projects',
                    asset: IconFolderRegular,
                    children: [
                        {id: 'active', label: 'Active', href: '/active'},
                        {id: 'archived', label: 'Archived', href: '/archived'},
                    ],
                },
            ],
        },
    ];

    const {rerender} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" sections={sections} selectedItemId="active" />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    expect(screen.getByRole('link', {name: 'Active'})).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    await waitForRemoval(() => screen.queryByRole('link', {name: 'Active'}));

    rerender(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" sections={sections} selectedItemId="archived" />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    expect(screen.getByRole('link', {name: 'Archived'})).toBeInTheDocument();
});

test('SidenavBar collapse button toggles the accessible label', async () => {
    await renderSidenav();

    const collapseButton = screen.getByRole('button', {name: COLLAPSE_LABEL});
    fireEvent.click(collapseButton);

    expect(screen.getByRole('button', {name: EXPAND_LABEL})).toBeInTheDocument();
});

test('SidenavBar hides the collapse button when collapsible is false', async () => {
    await renderSidenav({collapsible: false});

    expect(
        screen.queryByRole('button', {name: new RegExp(`${COLLAPSE_LABEL}|${EXPAND_LABEL}`)})
    ).not.toBeInTheDocument();
});

const queryItemRow = (itemId: string): HTMLElement => {
    // eslint-disable-next-line testing-library/no-node-access
    const row = document.querySelector(`[data-sidenav-item-id="${itemId}"]`);
    if (!row) {
        throw new Error(`No sidenav item with id "${itemId}"`);
    }
    return row as HTMLElement;
};

const hasStyle = (row: HTMLElement, className: string): boolean =>
    // eslint-disable-next-line testing-library/no-node-access
    Boolean(row.querySelector(`.${className}`));

const renderCollapsible = (props: React.ComponentProps<typeof SidenavBar>) => (
    <ThemeContextProvider theme={makeTheme()}>
        <SidenavBar aria-label="Main navigation" sections={defaultSections} {...props} />
    </ThemeContextProvider>
);

// The user cannot toggle a sidenav with `collapsible: false`, so that sidenav keeps no state of its own,
// and a later change of `defaultCollapsed` moves it.
test('SidenavBar follows a change of defaultCollapsed when collapsible is false', async () => {
    const {rerender} = render(renderCollapsible({collapsible: false, defaultCollapsed: false}));
    await React.act(async () => {});

    expect(hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(false);

    rerender(renderCollapsible({collapsible: false, defaultCollapsed: true}));
    await React.act(async () => {});

    expect(hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(true);
});

// A sidenav that the user can toggle owns its collapsed state, so `defaultCollapsed` only seeds it: a later
// change of that prop does not overrule the choice of the user.
test('SidenavBar ignores a change of defaultCollapsed when the user can toggle it', async () => {
    const {rerender} = render(renderCollapsible({defaultCollapsed: false}));
    await React.act(async () => {});

    rerender(renderCollapsible({defaultCollapsed: true}));
    await React.act(async () => {});

    expect(hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(false);
});

// The consumer paints its own collapse action, which receives the props of the default one: the custom
// control then toggles the sidenav, and it reads the collapsed state to give its own label.
test('SidenavBar paints a custom collapse action that toggles the sidenav', async () => {
    await renderSidenav({
        renderCollapseAction: ({collapsed, onPress, 'aria-label': ariaLabel}) => (
            <button onClick={onPress} aria-label={ariaLabel}>
                {collapsed ? 'Show' : 'Hide'}
            </button>
        ),
    });

    // The custom control replaces the default icon button, it does not join it, and only it carries a text.
    expect(
        screen.getAllByRole('button', {name: new RegExp(`${COLLAPSE_LABEL}|${EXPAND_LABEL}`)})
    ).toHaveLength(1);

    const customAction = screen.getByRole('button', {name: COLLAPSE_LABEL});

    expect(customAction).toHaveTextContent('Hide');

    fireEvent.click(customAction);

    expect(screen.getByRole('button', {name: EXPAND_LABEL})).toHaveTextContent('Show');
    expect(hasStyle(queryItemRow('home'), styles.itemTouchableCollapsed)).toBe(true);
});

test('SidenavBar keeps the header slot when collapsed', async () => {
    await renderSidenav({headerSlot: <span>header slot</span>, defaultCollapsed: true});

    expect(screen.getByText('header slot')).toBeInTheDocument();
});

// Collapsed, the section title is hidden with CSS, but it stays in the layout to reserve its space.
// A screen-reader-only title would not reserve any space, so the test asserts that it is not one.
test('SidenavBar keeps the space of the section title when collapsed', async () => {
    await renderSidenav({defaultCollapsed: true});

    const title = screen.getByText('Workspace');

    expect(title).toBeInTheDocument();
    expect(screen.getByRole('group', {name: 'Workspace'})).toContainElement(title);
    screen.queryAllByTestId('ScreenReaderOnly').forEach((element) => {
        expect(element).not.toContainElement(title);
    });
});

// The spec keeps the label of every item in the DOM on the collapsed rail, and hides it with opacity and
// width alone. A screen-reader-only label would leave nothing to fade, and it would carry no box either.
test('SidenavBar keeps the label of an item in the document when collapsed', async () => {
    await renderSidenav({defaultCollapsed: true});

    const label = screen.getByText('Home');

    expect(label).toBeInTheDocument();
    expect(hasStyle(queryItemRow('home'), styles.itemLabelCollapsed)).toBe(true);
    screen.queryAllByTestId('ScreenReaderOnly').forEach((element) => {
        expect(element).not.toContainElement(label);
    });
});

// The chevron of a parent item turns half a turn, so that it reports the state of its group.
test('SidenavBar turns the chevron of a parent item that the user opens', async () => {
    await renderSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(hasStyle(queryItemRow('projects'), styles.itemChevronRotated)).toBe(false);

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(hasStyle(queryItemRow('projects'), styles.itemChevronRotated)).toBe(true);
});

// The logo is muted for assistive technology, so there is no semantic query for it. The type of the
// default logo shows up in the viewBox of its svg: the isotype of Movistar is a square of 72 units.
const getLogoViewBox = (): string | null =>
    // eslint-disable-next-line testing-library/no-node-access
    screen.getByTestId('Logo').querySelector('svg')?.getAttribute('viewBox') ?? null;

test('SidenavBar renders the isotype of the skin by default', async () => {
    await renderSidenav();

    expect(getLogoViewBox()).toBe('0 0 72 72');
});

test('SidenavBar keeps the isotype of the skin when it is collapsed', async () => {
    await renderSidenav({collapsed: true, onCollapse: jest.fn()});

    expect(getLogoViewBox()).toBe('0 0 72 72');
});

test('SidenavBar renders the default logo when logo is true', async () => {
    await renderSidenav({logo: true});

    expect(getLogoViewBox()).toBe('0 0 72 72');
});

test('SidenavBar renders no logo when logo is false', async () => {
    await renderSidenav({logo: false});

    expect(screen.queryByTestId('Logo')).not.toBeInTheDocument();
});

test('SidenavBar renders the element that logo carries', async () => {
    await renderSidenav({logo: <img src="/brand.svg" alt="Brand of the product" />});

    expect(screen.getByRole('img', {name: 'Brand of the product'})).toBeInTheDocument();
    expect(screen.queryByTestId('Logo')).not.toBeInTheDocument();
});

// A logo of the consumer follows the collapsed state through the function form of the prop, even though
// the default logo keeps the isotype in both states.
const renderLogoByState = ({collapsed}: {collapsed: boolean}) => (
    <img src="/brand.svg" alt={collapsed ? 'Mark of the product' : 'Mark and name of the product'} />
);

test('SidenavBar gives the collapsed state to the function that logo carries', async () => {
    await renderSidenav({logo: renderLogoByState});

    expect(screen.getByRole('img', {name: 'Mark and name of the product'})).toBeInTheDocument();
});

test('SidenavBar gives the collapsed state to that function on the collapsed rail', async () => {
    await renderSidenav({logo: renderLogoByState, collapsed: true, onCollapse: jest.fn()});

    expect(screen.getByRole('img', {name: 'Mark of the product'})).toBeInTheDocument();
});

test('SidenavBar moves the logo of that function when the user collapses the sidenav', async () => {
    await renderSidenav({logo: renderLogoByState});

    await React.act(async () => {
        fireEvent.click(screen.getByRole('button', {name: COLLAPSE_LABEL}));
    });

    expect(screen.getByRole('img', {name: 'Mark of the product'})).toBeInTheDocument();
});

test('SidenavBar supports controlled selection with selectedItemId prop', async () => {
    const onSelectedItemIdChange = jest.fn();

    const sections: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
                {id: 'projects', label: 'Projects', asset: IconFolderRegular, href: '/projects'},
                {id: 'active', label: 'Active', asset: IconHomeRegular, href: '/active'},
            ],
        },
    ];

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                aria-label="Main navigation"
                sections={sections}
                selectedItemId="home"
                onSelectedItemIdChange={onSelectedItemIdChange}
            />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Projects'})).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', {name: 'Active'})).not.toHaveAttribute('aria-current');
});

test('SidenavBar calls onSelectedItemIdChange when an item with id is clicked', async () => {
    const onSelectedItemIdChange = jest.fn();
    const onPress = jest.fn();

    const sections: Array<SidenavSection> = [
        {
            title: 'Workspace',
            items: [
                {id: 'home', label: 'Home', asset: IconHomeRegular, onPress: () => {}},
                {id: 'projects', label: 'Projects', asset: IconFolderRegular, onPress},
            ],
        },
    ];

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                aria-label="Main navigation"
                sections={sections}
                selectedItemId="home"
                onSelectedItemIdChange={onSelectedItemIdChange}
            />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    const projectsButton = screen.getByRole('button', {name: 'Projects'});
    fireEvent.click(projectsButton);

    expect(onSelectedItemIdChange).toHaveBeenCalledWith('projects');
    expect(onPress).toHaveBeenCalled();
});

const mixedFirstLevel: Array<SidenavEntry> = [
    {id: 'standalone-top', label: 'Standalone top', asset: IconHomeRegular, href: '/standalone-top'},
    {
        title: 'Workspace',
        items: [{id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'}],
    },
    {
        id: 'standalone-bottom',
        label: 'Standalone bottom',
        asset: IconFolderRegular,
        href: '/standalone-bottom',
    },
];

test('SidenavBar renders stand-alone items at the first level, outside any section', async () => {
    await renderSidenav({sections: mixedFirstLevel});

    expect(screen.getByRole('link', {name: 'Standalone top'})).toHaveAttribute('href', '/standalone-top');
    expect(screen.getByRole('link', {name: 'Standalone bottom'})).toHaveAttribute(
        'href',
        '/standalone-bottom'
    );

    const workspace = screen.getByRole('group', {name: 'Workspace'});
    expect(workspace).toContainElement(screen.getByRole('link', {name: 'Home'}));
    expect(workspace).not.toContainElement(screen.getByRole('link', {name: 'Standalone top'}));
    expect(workspace).not.toContainElement(screen.getByRole('link', {name: 'Standalone bottom'}));
});

test('SidenavBar keeps the declared order of sections and stand-alone items', async () => {
    await renderSidenav({sections: mixedFirstLevel});

    const labels = screen
        .getAllByRole('link')
        .map((link) => link.textContent)
        .filter(Boolean);

    expect(labels).toEqual(['Standalone top', 'Home', 'Standalone bottom']);
});

test('SidenavBar selects a stand-alone item at the first level', async () => {
    await renderSidenav({sections: mixedFirstLevel, selectedItemId: 'standalone-top'});

    expect(screen.getByRole('link', {name: 'Standalone top'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Home'})).not.toHaveAttribute('aria-current');
});

const doublePanelSections: Array<SidenavSection> = [
    {
        title: 'Workspace',
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, onPress: () => {}},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                children: [
                    {id: 'active', label: 'Active', onPress: () => {}},
                    {id: 'archived', label: 'Archived', onPress: () => {}},
                ],
            },
            {
                id: 'documents',
                label: 'Documents',
                asset: IconFolderRegular,
                children: [{id: 'shared', label: 'Shared', onPress: () => {}}],
            },
        ],
    },
];

const renderDoublePanelSidenav = async (props: Record<string, unknown> = {}) => {
    const result = render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                {...({
                    'aria-label': 'Main navigation',
                    sections: doublePanelSections,
                    doublePanel: true,
                    ...props,
                } as any)}
            />
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    return result;
};

const getPanel = (parentLabel: string) => screen.queryByRole('group', {name: parentLabel});

test('SidenavBar double panel opens with the label of the parent item and its children', async () => {
    await renderDoublePanelSidenav();

    expect(getPanel('Projects')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    const panel = getPanel('Projects');
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent('Projects');
    expect(panel).toContainElement(screen.getByRole('button', {name: 'Active'}));
    expect(panel).toContainElement(screen.getByRole('button', {name: 'Archived'}));
    expect(screen.getByRole('button', {name: 'Projects'})).toHaveAttribute('aria-expanded', 'true');
});

test('SidenavBar double panel closes when the user presses one of its children', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Active'}));

    await waitForRemoval(() => getPanel('Projects'));
});

test('SidenavBar double panel closes when the user presses the same parent item again', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    await waitForRemoval(() => getPanel('Projects'));
});

test('SidenavBar double panel closes when the user presses outside of the bar', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(document.body);

    await waitForRemoval(() => getPanel('Projects'));
});

// The second column is a column of the bar, not a floating dialog, so a press that lands on the bar
// itself (the background of a column, a section title) leaves it open.
test('SidenavBar double panel stays open when the user presses the background of the bar', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByText('Workspace'));

    expect(getPanel('Projects')).toBeInTheDocument();
});

// The rail keeps its open column when the user collapses it. A real browser also needs the listener that
// watches for a press outside of the bar to read the path of that press, because the collapse action
// swaps its icon and the node that the press started on leaves the document. jsdom keeps that node, so
// the acceptance test of the same name is the one that guards the fix.
test('SidenavBar double panel stays open when the user collapses the sidenav', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: COLLAPSE_LABEL}));

    expect(getPanel('Projects')).toBeInTheDocument();
});

// A column that holds the current selection survives a press outside of the bar: the app selects a child
// with a press of its own, and dismissing the column would hide the new selection.
test('SidenavBar double panel stays open when the user presses outside of the bar and it holds the selection', async () => {
    await renderDoublePanelSidenav({selectedItemId: 'active'});

    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(getPanel('Projects')).toBeInTheDocument();
});

test('SidenavBar double panel closes when the user presses a first-level item without children', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Home'}));

    await waitForRemoval(() => getPanel('Projects'));
});

test('SidenavBar double panel refreshes when the user presses another parent item', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Documents'}));

    expect(getPanel('Projects')).not.toBeInTheDocument();

    const panel = getPanel('Documents');
    expect(panel).toBeInTheDocument();
    expect(panel).toContainElement(screen.getByRole('button', {name: 'Shared'}));
    expect(screen.queryByRole('button', {name: 'Archived'})).not.toBeInTheDocument();
});

test('SidenavBar double panel opens when the selection moves to one of its children', async () => {
    await renderDoublePanelSidenav({selectedItemId: 'archived'});

    const panel = getPanel('Projects');
    expect(panel).toBeInTheDocument();
    expect(panel).toContainElement(screen.getByRole('button', {name: 'Archived'}));
});

test('SidenavBar double panel closes when the selection moves to a first-level item without children', async () => {
    const renderWithSelection = (selectedItemId: string) => (
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar
                {...({
                    'aria-label': 'Main navigation',
                    sections: doublePanelSections,
                    doublePanel: true,
                    selectedItemId,
                } as any)}
            />
        </ThemeContextProvider>
    );

    const {rerender} = render(renderWithSelection('active'));
    await React.act(async () => {});

    expect(getPanel('Projects')).toBeInTheDocument();

    rerender(renderWithSelection('home'));

    await waitForRemoval(() => getPanel('Projects'));
});

// A press inside the second column moves the selection and closes the column at the same time. The
// selection of that press must not reopen the column, so the press wins over the selection.
test('SidenavBar double panel closes when the user presses one of its children, with a controlled selection', async () => {
    const ControlledSidenav = (): JSX.Element => {
        const [selectedItemId, setSelectedItemId] = React.useState<string | null>('active');
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <SidenavBar
                    {...({
                        'aria-label': 'Main navigation',
                        sections: doublePanelSections,
                        doublePanel: true,
                        selectedItemId,
                        onSelectedItemIdChange: setSelectedItemId,
                    } as any)}
                />
            </ThemeContextProvider>
        );
    };

    render(<ControlledSidenav />);
    await React.act(async () => {});

    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Archived'}));

    await waitForRemoval(() => getPanel('Projects'));
});

// The press that selects a child of the app lands outside of the bar, so it is both a new selection and a
// press outside of the bar. The new selection wins, and the column moves to the parent of that child.
test('SidenavBar double panel moves to the parent of a child selected outside of the bar', async () => {
    const ControlledSidenav = (): JSX.Element => {
        const [selectedItemId, setSelectedItemId] = React.useState<string | null>('active');
        return (
            <ThemeContextProvider theme={makeTheme()}>
                <SidenavBar
                    {...({
                        'aria-label': 'Main navigation',
                        sections: doublePanelSections,
                        doublePanel: true,
                        selectedItemId,
                        onSelectedItemIdChange: setSelectedItemId,
                    } as any)}
                />
                <button onClick={() => setSelectedItemId('shared')}>Select from the app</button>
            </ThemeContextProvider>
        );
    };

    render(<ControlledSidenav />);
    await React.act(async () => {});

    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', {name: 'Select from the app'}));
    await React.act(async () => {});

    expect(getPanel('Projects')).not.toBeInTheDocument();

    const panel = getPanel('Documents');
    expect(panel).toBeInTheDocument();
    expect(panel).toContainElement(screen.getByRole('button', {name: 'Shared'}));
});

// The tooltip of the collapsed rail wraps the row of the item, and the wrapper carries `aria-describedby`.
const hasTooltip = (itemId: string): boolean =>
    // eslint-disable-next-line testing-library/no-node-access
    Boolean(document.querySelector(`[data-sidenav-item-id="${itemId}"] [aria-describedby]`));

// The second column sits beside the collapsed rail, so it hides no item: the other items of the rail keep
// their tooltip, which gives the label of an item that shows only its icon.
test('SidenavBar collapsed double panel keeps the tooltips of the other items while a column is open', async () => {
    await renderDoublePanelSidenav({collapsed: true, onCollapse: () => {}});

    expect(hasTooltip('documents')).toBe(true);

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(getPanel('Projects')).toBeInTheDocument();
    expect(hasTooltip('documents')).toBe(true);
    expect(hasTooltip('home')).toBe(true);
    // The column already shows the label of this item as its title.
    expect(hasTooltip('projects')).toBe(false);
});

// The dialog panel of the collapsed rail floats over the items, so a tooltip would overlap it.
test('SidenavBar collapsed drops the tooltips of the rail while the dialog panel is open', async () => {
    await renderDoublePanelSidenav({doublePanel: false, collapsed: true, onCollapse: () => {}});

    expect(hasTooltip('documents')).toBe(true);

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(hasTooltip('documents')).toBe(false);
    expect(hasTooltip('projects')).toBe(false);
});

// The accent bar and the selected background are style-only marks, without any semantic query. The item id
// lives in a data attribute, and the two marks live in class names, so the test reads the DOM directly.
// The accent bar marks the selected item. The parent of the selected child shows the selected background
// only, so that the sidenav never displays two accent bars.
test('SidenavBar double panel gives the accent to the selected child, and the background to the parent', async () => {
    await renderDoublePanelSidenav({selectedItemId: 'archived'});

    const parentRow = queryItemRow('projects');
    const childRow = queryItemRow('archived');

    expect(hasStyle(parentRow, styles.itemAccent)).toBe(false);
    expect(hasStyle(parentRow, styles.itemTouchableSelected.default)).toBe(true);
    expect(hasStyle(childRow, styles.itemAccent)).toBe(true);
});

// Only one parent at a time carries the selected background. The parent of the open column takes it, and
// the parent of the selected child takes it back when that column closes, with no change of the selection.
test('SidenavBar double panel gives the background to the parent of the open column only', async () => {
    await renderDoublePanelSidenav({selectedItemId: 'archived'});

    expect(hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default)).toBe(true);

    fireEvent.click(screen.getByRole('button', {name: 'Documents'}));
    await React.act(async () => {});

    expect(hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default)).toBe(false);
    expect(hasStyle(queryItemRow('documents'), styles.itemTouchableSelected.default)).toBe(true);

    fireEvent.click(screen.getByRole('button', {name: 'Documents'}));
    await React.act(async () => {});

    expect(hasStyle(queryItemRow('projects'), styles.itemTouchableSelected.default)).toBe(true);
    expect(hasStyle(queryItemRow('documents'), styles.itemTouchableSelected.default)).toBe(false);
});

test('SidenavBar expands the children inline when doublePanel is false', async () => {
    await renderDoublePanelSidenav({doublePanel: false});

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    // Without the double panel mode, the children expand inline, inside a group of the parent item.
    const nestedGroup = screen.getByRole('group', {name: 'Projects'});
    expect(nestedGroup).toContainElement(screen.getByRole('button', {name: 'Active'}));
    expect(nestedGroup).not.toHaveTextContent('Projects');
});

test('SidenavBar renders a stand-alone item with children at the first level', async () => {
    const sections: Array<SidenavEntry> = [
        {
            id: 'standalone-parent',
            label: 'Standalone parent',
            asset: IconFolderRegular,
            defaultOpen: true,
            children: [{id: 'child', label: 'Child', href: '/child'}],
        },
    ];

    await renderSidenav({sections});

    expect(screen.getByRole('button', {name: 'Standalone parent'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Child'})).toHaveAttribute('href', '/child');
});

const renderBoxedSidenav = async ({
    variant,
    pageVariant,
    skin = getMovistarSkin(),
}: {
    variant?: Variant;
    pageVariant?: Variant;
    skin?: Skin;
} = {}) => {
    render(
        <ThemeContextProvider theme={makeTheme({skin})}>
            <ThemeVariant variant={pageVariant ?? 'default'}>
                <SidenavBar aria-label="Main navigation" sections={defaultSections} variant={variant} boxed />
            </ThemeVariant>
        </ThemeContextProvider>
    );

    await React.act(async () => {});

    return screen.getByRole('navigation');
};

// The border of the box follows `shouldShowBoxedBorder`, the rule that `Boxed` also follows: it reads over a
// default and over an alternative page, and it does not over a brand, a negative or a media page.
test.each([
    ['default', true],
    ['alternative', true],
    ['brand', false],
    ['negative', false],
    ['media', false],
] as const)('SidenavBar boxed over a %s page paints its border: %s', async (pageVariant, expected) => {
    const sidenavBar = await renderBoxedSidenav({pageVariant});

    expect(sidenavBar).toHaveClass(styles.boxed);
    expect(sidenavBar.classList.contains(styles.boxedBorder)).toBe(expected);
});

// A box that paints its own variant carries its own background, which the border would cut across.
test('SidenavBar boxed drops its border when the sidenav carries a variant of its own', async () => {
    const sidenavBar = await renderBoxedSidenav({variant: 'brand'});

    expect(sidenavBar).not.toHaveClass(styles.boxedBorder);
});

test('SidenavBar boxed drops its border when the skin turns showBoxedBorder off', async () => {
    const movistarSkin = getMovistarSkin();
    const skin: Skin = {
        ...movistarSkin,
        componentProperties: {
            ...movistarSkin.componentProperties,
            showBoxedBorder: {
                default: false,
                alternative: false,
                brand: false,
                negative: false,
                media: false,
            },
        },
    };

    const sidenavBar = await renderBoxedSidenav({skin});

    expect(sidenavBar).not.toHaveClass(styles.boxedBorder);
});

// The spec asks the collapse action to report its disclosure state through `aria-expanded`: true while the
// sidenav is expanded, false while it is collapsed.
test('SidenavBar collapse button reports its state through aria-expanded', async () => {
    await renderSidenav();

    const collapseButton = screen.getByRole('button', {name: COLLAPSE_LABEL});
    expect(collapseButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(collapseButton);

    expect(screen.getByRole('button', {name: EXPAND_LABEL})).toHaveAttribute('aria-expanded', 'false');
});

const keyboardSections: Array<SidenavSection> = [
    {
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {id: 'search', label: 'Search', asset: IconHomeRegular, href: '/search'},
            {
                id: 'teams',
                label: 'Teams',
                asset: IconFolderRegular,
                children: [{id: 'eng', label: 'Engineering', href: '/eng'}],
            },
        ],
    },
];

const renderKeyboardSidenav = async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" sections={keyboardSections} />
        </ThemeContextProvider>
    );
    await React.act(async () => {});
};

test('SidenavBar moves the focus down and up with the arrow keys', async () => {
    await renderKeyboardSidenav();

    const home = screen.getByRole('link', {name: 'Home'});
    const search = screen.getByRole('link', {name: 'Search'});

    home.focus();
    fireEvent.keyDown(home, {key: 'ArrowDown'});
    expect(search).toHaveFocus();

    fireEvent.keyDown(search, {key: 'ArrowUp'});
    expect(home).toHaveFocus();
});

test('SidenavBar focuses the first and last items with Home and End', async () => {
    await renderKeyboardSidenav();

    const home = screen.getByRole('link', {name: 'Home'});
    const teams = screen.getByRole('button', {name: 'Teams'});

    home.focus();
    fireEvent.keyDown(home, {key: 'End'});
    expect(teams).toHaveFocus();

    fireEvent.keyDown(teams, {key: 'Home'});
    expect(home).toHaveFocus();
});

test('SidenavBar expands a closed parent with ArrowRight and collapses it with ArrowLeft', async () => {
    await renderKeyboardSidenav();

    const teams = screen.getByRole('button', {name: 'Teams', expanded: false});

    teams.focus();
    fireEvent.keyDown(teams, {key: 'ArrowRight'});

    expect(screen.getByRole('button', {name: 'Teams', expanded: true})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Engineering'})).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('button', {name: 'Teams'}), {key: 'ArrowLeft'});

    await waitForRemoval(() => screen.queryByRole('link', {name: 'Engineering'}));
});

test('SidenavBar moves the focus to the parent with ArrowLeft from a child', async () => {
    await renderKeyboardSidenav();

    const teams = screen.getByRole('button', {name: 'Teams'});
    teams.focus();
    fireEvent.keyDown(teams, {key: 'ArrowRight'});

    const eng = screen.getByRole('link', {name: 'Engineering'});
    eng.focus();
    fireEvent.keyDown(eng, {key: 'ArrowLeft'});

    expect(screen.getByRole('button', {name: 'Teams'})).toHaveFocus();
});
