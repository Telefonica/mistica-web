import * as React from 'react';
import {Menu, MenuSection, MenuItem, Touchable, Text3, ThemeContextProvider} from '..';
import {makeTheme} from '../test-utils/theme';
import {MemoryRouter, useLocation, Link as ReactRouterLink} from 'react-router-dom';

import type {ThemeConfig} from '../theme';

const Link: ThemeConfig['Link'] = ({innerRef, ...props}) => <ReactRouterLink {...props} ref={innerRef} />;
const CurrentPath = () => <div>Current path: {useLocation().pathname}</div>;
export const Options = ({
    kind = 'press',
    onPress = () => {},
}: {
    kind?: 'press' | 'href' | 'to';
    onPress?: () => void;
}): JSX.Element => (
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
                            {kind === 'press' ? (
                                ['Option 1', 'Option 2', 'Option 3'].map((option) => (
                                    <MenuItem key={option} label={option} onPress={onPress} />
                                ))
                            ) : kind === 'href' ? (
                                <MenuItem label="External link" href="https://example.com" />
                            ) : (
                                <MenuItem label="Internal link" to="/interna" />
                            )}
                        </MenuSection>
                    </div>
                )}
            />
            <CurrentPath />
        </MemoryRouter>
    </ThemeContextProvider>
);
