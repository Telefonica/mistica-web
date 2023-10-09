import * as React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {ThemeContextProvider, Touchable, Text3, Menu, MenuSection, MenuItem} from '..';
import {makeTheme} from './test-utils';

const options = ['Option 1', 'Option 2', 'Option 3'];

test('Menu closes after pressing an option', async () => {
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
                                <MenuItem key={option} label={option} onPress={() => {}} />
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

    /** We have to wait until the CSS transition finishes when closing the menu */
    await waitFor(() => {
        expect(screen.getByText('menu is close')).toBeInTheDocument();
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });
});
