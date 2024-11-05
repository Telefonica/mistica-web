import * as React from 'react';
import {makeTheme} from './test-utils';
import {render, screen, waitFor} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {MainNavigationBar} from '../navigation-bar';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';
import {ButtonPrimary} from '../button';

test('MainNavigationBar section with interaction is accessible', async () => {
    const firstSectionOnPressSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <MainNavigationBar
                sections={[
                    // Section with custom interaction
                    {
                        title: 'section 1',
                        onPress: firstSectionOnPressSpy,
                        menu: {
                            columns: [
                                {
                                    title: 'column 1',
                                    items: [
                                        {title: 'item 1-1', onPress: () => {}},
                                        {title: 'item 1-2', href: '#'},
                                        {title: 'item 1-3', to: '/'},
                                    ],
                                },
                            ],
                        },
                    },
                    // Section without custom interaction
                    {
                        title: 'section 2',
                        menu: {
                            columns: [
                                {
                                    title: 'column 2',
                                    items: [{title: 'item 2-1', onPress: () => {}}],
                                },
                            ],
                        },
                    },
                ]}
            />
        </ThemeContextProvider>
    );

    const firstSectionButton = await screen.findByRole('button', {name: 'section 1'});

    // Section buttons that control menu should not have aria-expanded
    const firstSectionMenuButton = await screen.findByRole('button', {
        name: 'section 1, Abrir submenú',
        expanded: false,
    });

    // Menu is initially closed, no section should be visible
    expect(screen.queryByText('item 1-1')).not.toBeInTheDocument();
    expect(screen.queryByText('item 2-1')).not.toBeInTheDocument();

    // Focus arrow in order for it to appear in the screen
    await act(async () => {
        firstSectionMenuButton.focus();
    });

    await userEvent.click(firstSectionMenuButton);

    // First section should be visible, while second one shouldn't
    expect(screen.getByRole('button', {name: 'item 1-1'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /item 1-2/})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /item 1-3/})).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'item 2-1'})).not.toBeInTheDocument();

    // Remove mouse hover from section in order to close the menu
    await userEvent.unhover(firstSectionButton);

    // Section onPress shouldn't have been called
    expect(firstSectionOnPressSpy).toHaveBeenCalledTimes(0);

    // Click in the section's tab
    await userEvent.click(firstSectionButton);
    expect(firstSectionOnPressSpy).toHaveBeenCalledTimes(1);

    // The second section has no custom interaction, it should control the menu when pressed
    const secondSectionButton = await screen.findByRole('button', {
        name: 'section 2, Abrir submenú',
        expanded: false,
    });

    // Open second section's menu
    await userEvent.hover(secondSectionButton);

    await waitFor(() => {
        expect(firstSectionMenuButton).toHaveAttribute('aria-expanded', 'false');
        expect(secondSectionButton).toHaveAttribute('aria-expanded', 'true');

        // Second section should be visible, while first one shouldn't
        expect(screen.getByText('item 2-1')).toBeInTheDocument();
        expect(screen.queryByText('item 1-1')).not.toBeInTheDocument();
    });

    // Close the menu with ESC key
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
        expect(firstSectionMenuButton).toHaveAttribute('aria-expanded', 'false');
        expect(secondSectionButton).toHaveAttribute('aria-expanded', 'false');

        // Buttons that open the menu should have aria-haspopup
        expect(firstSectionMenuButton).toHaveAttribute('aria-haspopup', 'true');
        expect(secondSectionButton).toHaveAttribute('aria-haspopup', 'true');

        // Menu is closed, no section should be visible
        expect(screen.queryByText('item 1-1')).not.toBeInTheDocument();
        expect(screen.queryByText('item 2-1')).not.toBeInTheDocument();
    });
});

test('MainNavigationBar menu closeMenu callback closes the menu', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <MainNavigationBar
                sections={[
                    {
                        title: 'section 1',
                        menu: {
                            content: ({closeMenu}) => (
                                <ButtonPrimary onPress={closeMenu}>Close menu</ButtonPrimary>
                            ),
                        },
                    },
                ]}
            />
        </ThemeContextProvider>
    );

    // Open the menu
    const sectionButton = await screen.findByRole('button', {name: 'section 1, Abrir submenú'});
    await userEvent.hover(sectionButton);

    await waitFor(() => {
        expect(sectionButton).toHaveAttribute('aria-expanded', 'true');
    });

    // Close the menu with the closeMenu callback
    const closeButton = await screen.findByRole('button', {name: 'Close menu'});
    await userEvent.click(closeButton);

    await waitFor(() => {
        expect(sectionButton).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText('Close menu')).not.toBeInTheDocument();
    });
});
