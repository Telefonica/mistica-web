import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import {SidenavBar, SidenavSection, SidenavItem} from '../../index';
import IconHomeRegular from '../../../generated/mistica-icons/icon-home-regular';
import IconFolderRegular from '../../../generated/mistica-icons/icon-folder-regular';

const renderSidenav = (props: React.ComponentProps<typeof SidenavBar> = {}) =>
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation" {...props}>
                <SidenavSection title="Workspace">
                    <SidenavItem label="Home" Icon={IconHomeRegular} href="/home" selected />
                    <SidenavItem label="Projects" Icon={IconFolderRegular} defaultOpen>
                        <SidenavItem label="Active" href="/active" />
                    </SidenavItem>
                </SidenavSection>
            </SidenavBar>
        </ThemeContextProvider>
    );

test('SidenavBar renders a navigation landmark with its items', () => {
    renderSidenav();

    expect(screen.getByRole('navigation', {name: 'Main navigation'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/home');
});

test('SidenavBar marks the selected item with aria-current="page"', () => {
    renderSidenav();

    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', {name: 'Active'})).not.toHaveAttribute('aria-current');
});

test('SidenavBar renders nested children of an open item', () => {
    renderSidenav();

    expect(screen.getByRole('link', {name: 'Active'})).toHaveAttribute('href', '/active');
});

test('SidenavBar collapse button toggles the accessible label', () => {
    renderSidenav();

    const collapseButton = screen.getByRole('button', {name: 'Collapse navigation'});
    fireEvent.click(collapseButton);

    expect(screen.getByRole('button', {name: 'Expand navigation'})).toBeInTheDocument();
});

test('SidenavBar hides the collapse button when collapsible is false', () => {
    renderSidenav({collapsible: false});

    expect(screen.queryByRole('button', {name: /navigation/})).not.toBeInTheDocument();
});
