// @flow
import * as React from 'react';
import {render, screen, within} from '@testing-library/react';
import {ThemeContextProvider, Callout} from '..';
import userEvent from '@testing-library/user-event';
import {makeTheme} from './test-utils';

test('renders an accesible and clossable Callout', () => {
    const handleCloseSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Callout title="some title" description="some description" onClose={handleCloseSpy} />
        </ThemeContextProvider>
    );

    const callout = screen.getByRole('alert');
    expect(callout).toBeInTheDocument();

    const closeButton = within(callout).getByRole('button', {name: 'Cerrar'});
    expect(closeButton).toBeInTheDocument();

    userEvent.click(closeButton);

    expect(handleCloseSpy).toHaveBeenCalledTimes(1);
});
