import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../../../theme-context-provider';
import {makeTheme} from '../../../__tests__/test-utils';
import SidenavBar from '../../index';

test('SidenavBar renders its children', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <SidenavBar aria-label="Main navigation">hola</SidenavBar>
        </ThemeContextProvider>
    );

    expect(screen.getByRole('navigation', {name: 'Main navigation'})).toBeInTheDocument();
    expect(screen.getByText('hola')).toBeInTheDocument();
});
