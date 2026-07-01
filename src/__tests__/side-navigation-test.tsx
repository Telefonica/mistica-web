import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    IconEyeRegular,
    IconListRegular,
    SideNavigation,
    SideNavigationItem,
    SideNavigationSection,
    ThemeContextProvider,
} from '..';
import {makeTheme} from './test-utils';

const renderWithTheme = (children: React.ReactNode) =>
    render(<ThemeContextProvider theme={makeTheme()}>{children}</ThemeContextProvider>);

test('SideNavigation renders navigation items', () => {
    renderWithTheme(
        <SideNavigation aria-label="Backoffice">
            <SideNavigationItem label="Explore" Icon={IconEyeRegular} href="/explore" />
            <SideNavigationItem label="Entrypoint List" Icon={IconListRegular} selected href="/entrypoint" />
        </SideNavigation>
    );

    expect(screen.getByRole('navigation', {name: 'Backoffice'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Explore'})).toHaveAttribute('href', '/explore');
    expect(screen.getByRole('link', {name: 'Entrypoint List'})).toHaveAttribute('aria-current', 'page');
});

test('SideNavigationItem supports button actions', async () => {
    const onPress = jest.fn();

    renderWithTheme(
        <SideNavigation>
            <SideNavigationItem label="Alerts" Icon={IconEyeRegular} onPress={onPress} />
        </SideNavigation>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Alerts'}));

    expect(onPress).toHaveBeenCalledTimes(1);
});

test('SideNavigationSection expands and collapses items', async () => {
    renderWithTheme(
        <SideNavigation>
            <SideNavigationSection label="Explore" Icon={IconEyeRegular}>
                <SideNavigationItem label="Overview" onPress={() => {}} />
            </SideNavigationSection>
        </SideNavigation>
    );

    const section = screen.getByRole('button', {name: 'Explore'});
    expect(section).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('button', {name: 'Overview'})).not.toBeInTheDocument();

    await userEvent.click(section);

    expect(section).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', {name: 'Overview'})).toBeVisible();
});

test('SideNavigation collapsed items keep accessible labels', () => {
    renderWithTheme(
        <SideNavigation collapsed>
            <SideNavigationItem label="Entrypoint List" Icon={IconListRegular} href="/entrypoint" />
        </SideNavigation>
    );

    expect(screen.getByRole('link', {name: 'Entrypoint List'})).toHaveAttribute('href', '/entrypoint');
});
