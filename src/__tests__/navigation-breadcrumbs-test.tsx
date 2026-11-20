import * as React from 'react';
import {render, screen} from '@testing-library/react';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import NavigationBreadcrumbs from '../navigation-breadcrumbs';
import userEvent from '@testing-library/user-event';

test('Breadcrumbs onNavigate is called when pressing a link', async () => {
    const navigateSpy = jest.fn();

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <NavigationBreadcrumbs
                title="Title"
                breadcrumbs={[
                    {title: 'breadcrumb 1', url: '#', onNavigate: () => navigateSpy('breadcrumb 1')},
                    {title: 'breadcrumb 2', url: '#', onNavigate: () => navigateSpy('breadcrumb 2')},
                ]}
            />
        </ThemeContextProvider>
    );

    const firstLink = await screen.findByRole('link', {name: 'breadcrumb 1'});
    const secondLink = await screen.findByRole('link', {name: 'breadcrumb 2'});

    await userEvent.click(firstLink);
    expect(navigateSpy).toHaveBeenLastCalledWith('breadcrumb 1');
    expect(navigateSpy).toHaveBeenCalledTimes(1);

    await userEvent.click(secondLink);
    expect(navigateSpy).toHaveBeenLastCalledWith('breadcrumb 2');
    expect(navigateSpy).toHaveBeenCalledTimes(2);
});
