import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import {SidenavBar} from '../../index';
import * as styles from '../../sidenav-bar.css';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';

import type {SidenavEntry, SidenavSection} from '../../sidenav-types';

class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

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

    expect(screen.queryByRole('link', {name: 'Active'})).not.toBeInTheDocument();

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

    const collapseButton = screen.getByRole('button', {name: 'Collapse navigation'});
    fireEvent.click(collapseButton);

    expect(screen.getByRole('button', {name: 'Expand navigation'})).toBeInTheDocument();
});

test('SidenavBar hides the collapse button when collapsible is false', async () => {
    await renderSidenav({collapsible: false});

    expect(screen.queryByRole('button', {name: /navigation/})).not.toBeInTheDocument();
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

// The logo is muted for assistive technology, so there is no semantic query for it.
test('SidenavBar renders the skin logo by default', async () => {
    await renderSidenav();

    expect(screen.getByTestId('Logo')).toBeInTheDocument();
});

test('SidenavBar renders no logo when logo is false', async () => {
    await renderSidenav({logo: false});

    expect(screen.queryByTestId('Logo')).not.toBeInTheDocument();
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

    await React.act(async () => {});

    expect(getPanel('Projects')).not.toBeInTheDocument();
});

test('SidenavBar double panel closes when the user presses the same parent item again', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(getPanel('Projects')).not.toBeInTheDocument();
});

test('SidenavBar double panel closes when the user presses outside of it', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    expect(getPanel('Projects')).toBeInTheDocument();

    fireEvent.click(document.body);

    expect(getPanel('Projects')).not.toBeInTheDocument();
});

test('SidenavBar double panel closes when the user presses a first-level item without children', async () => {
    await renderDoublePanelSidenav();

    fireEvent.click(screen.getByRole('button', {name: 'Projects'}));
    fireEvent.click(screen.getByRole('button', {name: 'Home'}));

    await React.act(async () => {});

    expect(getPanel('Projects')).not.toBeInTheDocument();
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

// The accent bar and the selected background are style-only marks, without any semantic query. The item id
// lives in a data attribute, and the two marks live in class names, so the test reads the DOM directly.
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

// The accent bar marks the selected item. The parent of the selected child shows the selected background
// only, so that the sidenav never displays two accent bars.
test('SidenavBar double panel gives the accent to the selected child, and the background to the parent', async () => {
    await renderDoublePanelSidenav({selectedItemId: 'archived'});

    const parentRow = queryItemRow('projects');
    const childRow = queryItemRow('archived');

    expect(hasStyle(parentRow, styles.itemAccent)).toBe(false);
    expect(hasStyle(parentRow, styles.itemTouchableSelected.true)).toBe(true);
    expect(hasStyle(childRow, styles.itemAccent)).toBe(true);
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
