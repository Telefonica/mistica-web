import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';

import type {SidenavSection} from '../../sidenav-types';

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
