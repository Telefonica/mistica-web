import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import {SidenavBar} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';

import type {SidenavEntry} from '../../sidenav-types';

class MockIntersectionObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
}

// A tablet takes the mobile treatment as well, so every test of this file runs below the desktop
// breakpoint.
const resizeToMobile = () => {
    window.innerWidth = 411;
    window.innerHeight = 731;
    window.dispatchEvent(new Event('resize'));
};

beforeAll(() => {
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

beforeEach(() => {
    resizeToMobile();
    // The panel animates over 300ms with real timers, whose late updates make these tests slow and flaky.
    // An acceptance-test user agent zeroes that duration, so the panel transitions resolve synchronously.
    jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue('acceptance-test');
});

const onSettingsPress = jest.fn();

const entries: Array<SidenavEntry> = [
    {id: 'dashboard', label: 'Dashboard', asset: IconHomeRegular, href: '/dashboard'},
    {
        title: 'Workspace',
        dividerTop: true,
        dividerBottom: true,
        items: [
            {id: 'home', label: 'Home', asset: IconHomeRegular, href: '/home'},
            {
                id: 'projects',
                label: 'Projects',
                asset: IconFolderRegular,
                children: [
                    {id: 'active', label: 'Active', href: '/active'},
                    {id: 'archived', label: 'Archived', href: '/archived'},
                ],
            },
            {id: 'settings', label: 'Settings', asset: IconFolderRegular, onPress: onSettingsPress},
        ],
    },
];

// The accessible names of the burger and of the back bar come from the text tokens of the navigation bar,
// so the theme takes an English locale and the assertions below read those names in English.
const theme = makeTheme({i18n: {locale: 'en-GB', phoneNumberFormattingRegionCode: 'GB'}});

const renderSidenav = async (props: React.ComponentProps<typeof SidenavBar> = {}) => {
    const result = render(
        <ThemeContextProvider theme={theme}>
            <SidenavBar aria-label="Main navigation" sections={entries} {...props} />
        </ThemeContextProvider>
    );

    // The default logo lazy loads its brand image, so let it settle before asserting.
    await React.act(async () => {});

    return result;
};

const openMenu = async () => {
    await userEvent.click(screen.getByRole('button', {name: 'Open navigation menu'}));
    return waitFor(() => screen.getByRole('navigation', {name: 'Main navigation'}));
};

beforeEach(() => {
    onSettingsPress.mockClear();
});

test('SidenavBar mobile shows a top bar with the burger, and no panel', async () => {
    await renderSidenav();

    expect(screen.getByRole('button', {name: 'Open navigation menu'})).toBeInTheDocument();
    expect(screen.queryByRole('navigation', {name: 'Main navigation'})).not.toBeInTheDocument();
});

// The spec relocates the header slot to the top bar, where it reads before the burger opens the panel.
test('SidenavBar mobile puts the header slot in the top bar', async () => {
    await renderSidenav({headerSlot: <button type="button">Header action</button>});

    expect(screen.getByRole('button', {name: 'Header action'})).toBeInTheDocument();
});

test('SidenavBar mobile opens the panel with one row per first-level item', async () => {
    await renderSidenav();
    await openMenu();

    expect(screen.getByRole('link', {name: 'Dashboard'})).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/home');
    expect(screen.getByRole('button', {name: 'Projects'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Workspace'})).toBeInTheDocument();
});

// The mobile panel builds its rows from `Row`, so it renders none of the items of the desktop rail.
test('SidenavBar mobile renders no item of the desktop rail', async () => {
    await renderSidenav();
    await openMenu();

    expect(screen.queryAllByTestId('SidenavItem')).toHaveLength(0);
    expect(screen.queryAllByTestId('SidenavSection')).toHaveLength(0);
});

test('SidenavBar mobile renders the footer slot inside the panel', async () => {
    await renderSidenav({footerSlot: <button type="button">Footer action</button>});

    expect(screen.queryByRole('button', {name: 'Footer action'})).not.toBeInTheDocument();

    await openMenu();

    expect(screen.getByRole('button', {name: 'Footer action'})).toBeInTheDocument();
});

test('SidenavBar mobile opens the second level of a parent item, and returns from it', async () => {
    await renderSidenav();
    await openMenu();

    await userEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(await screen.findByRole('link', {name: 'Active'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Archived'})).toHaveAttribute('href', '/archived');
    expect(screen.getByRole('heading', {name: 'Projects'})).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Back'}));

    expect(await screen.findByRole('button', {name: 'Projects'})).toBeInTheDocument();
});

test('SidenavBar mobile closes the panel when the user presses an item that navigates', async () => {
    const onSelectedItemIdChange = jest.fn();
    await renderSidenav({onSelectedItemIdChange});
    await openMenu();

    await userEvent.click(screen.getByRole('button', {name: 'Settings'}));

    expect(onSelectedItemIdChange).toHaveBeenCalledWith('settings');
    expect(onSettingsPress).toHaveBeenCalled();
    await waitFor(() =>
        expect(screen.queryByRole('navigation', {name: 'Main navigation'})).not.toBeInTheDocument()
    );
});

// A parent item reveals its children, so it never navigates and never moves the selection.
test('SidenavBar mobile keeps the panel open when the user presses a parent item', async () => {
    const onSelectedItemIdChange = jest.fn();
    await renderSidenav({onSelectedItemIdChange});
    await openMenu();

    await userEvent.click(screen.getByRole('button', {name: 'Projects'}));

    expect(onSelectedItemIdChange).not.toHaveBeenCalled();
    expect(screen.getByRole('navigation', {name: 'Main navigation'})).toBeInTheDocument();
});

// The selected item paints no indicator on mobile, and it still reports itself to a screen reader.
test('SidenavBar mobile marks the selected item for a screen reader only', async () => {
    await renderSidenav({selectedItemId: 'home'});
    await openMenu();

    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Dashboard'})).not.toHaveAttribute('aria-current');
});

test('SidenavBar mobile closes the panel from the burger', async () => {
    await renderSidenav();
    await openMenu();

    await userEvent.click(screen.getByRole('button', {name: 'Close navigation menu'}));

    await waitFor(() =>
        expect(screen.queryByRole('navigation', {name: 'Main navigation'})).not.toBeInTheDocument()
    );
});
