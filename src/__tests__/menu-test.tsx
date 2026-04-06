import * as React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {ThemeContextProvider, Touchable, Text3, Menu, MenuSection, MenuItem} from '..';
import {makeTheme} from './test-utils';
import {redirect as redirectSpy} from '../utils/browser';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';

import type {ThemeConfig} from '../theme';

const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;

jest.mock('../utils/browser', () => ({
    ...jest.requireActual('../utils/browser'),
    redirect: jest.fn(),
}));

beforeEach(() => {
    (redirectSpy as any).mockReset();
});

const options = ['Option 1', 'Option 2', 'Option 3'];

test('Menu closes after pressing an option', async () => {
    const onPressSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Menu
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <Touchable ref={ref} onPress={onPress}>
                        <Text3 regular>{isMenuOpen ? 'menu is open' : 'menu is close'}</Text3>
                    </Touchable>
                )}
                renderMenu={({ref, className}) => (
                    <div ref={ref} className={className}>
                        <MenuSection>
                            {options.map((option) => (
                                <MenuItem key={option} label={option} action={{onPress: onPressSpy}} />
                            ))}
                        </MenuSection>
                    </div>
                )}
            />
        </ThemeContextProvider>
    );

    expect(screen.getByText('menu is close')).toBeInTheDocument();

    await userEvent.click(screen.getByText('menu is close'));

    expect(screen.getByText('menu is open')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Option 1'));

    expect(onPressSpy).toHaveBeenCalledTimes(1);

    /** We have to wait until the CSS transition finishes when closing the menu */
    await waitFor(() => {
        expect(screen.getByText('menu is close')).toBeInTheDocument();
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });
});

test('Menu closes after clicking an href option', async () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Menu
                renderTarget={({ref, onPress, isMenuOpen}) => (
                    <Touchable ref={ref} onPress={onPress}>
                        <Text3 regular>{isMenuOpen ? 'menu is open' : 'menu is close'}</Text3>
                    </Touchable>
                )}
                renderMenu={({ref, className}) => (
                    <div ref={ref} className={className}>
                        <MenuSection>
                            <MenuItem label="External link" action={{href: 'https://example.com'}} />
                        </MenuSection>
                    </div>
                )}
            />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByText('menu is close'));

    expect(screen.getByText('menu is open')).toBeInTheDocument();

    const menuItem = screen.getByRole('menuitem', {name: 'External link'});
    expect(menuItem.tagName).toBe('A');
    expect(menuItem).toHaveAttribute('href', 'https://example.com');

    await userEvent.click(menuItem);

    await waitFor(() => {
        expect(redirectSpy).toHaveBeenCalledWith('https://example.com', false, false);
    });

    /** We have to wait until the CSS transition finishes when closing the menu */
    await waitFor(() => {
        expect(screen.getByText('menu is close')).toBeInTheDocument();
    });
});

test('Menu closes after clicking a "to" option', async () => {
    const to = '/interna';

    const CurrentPath = () => <div>Current path: {useLocation().pathname}</div>;

    render(
        <ThemeContextProvider theme={makeTheme({Link})}>
            <MemoryRouter>
                <Menu
                    renderTarget={({ref, onPress, isMenuOpen}) => (
                        <Touchable ref={ref} onPress={onPress}>
                            <Text3 regular>{isMenuOpen ? 'menu is open' : 'menu is close'}</Text3>
                        </Touchable>
                    )}
                    renderMenu={({ref, className}) => (
                        <div ref={ref} className={className}>
                            <MenuSection>
                                <MenuItem label="Internal link" action={{to}} />
                            </MenuSection>
                        </div>
                    )}
                />
                <CurrentPath />
            </MemoryRouter>
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByText('menu is close'));

    expect(screen.getByText('menu is open')).toBeInTheDocument();

    const menuItem = screen.getByRole('menuitem', {name: 'Internal link'});
    expect(menuItem.tagName).toBe('A');
    expect(menuItem).toHaveAttribute('href', to);

    expect(screen.getByText('Current path: /')).toBeInTheDocument();

    await userEvent.click(menuItem);

    expect(screen.getByText(`Current path: ${to}`)).toBeInTheDocument();

    /** We have to wait until the CSS transition finishes when closing the menu */
    await waitFor(() => {
        expect(screen.getByText('menu is close')).toBeInTheDocument();
    });
});
