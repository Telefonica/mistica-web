import * as React from 'react';
import {render, screen, within} from '@testing-library/react';
import {ThemeContextProvider, Callout} from '..';
import userEvent from '@testing-library/user-event';
import {makeTheme} from './test-utils';

test('renders an accesible and closable Callout', async () => {
    const handleCloseSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Callout
                aria-label="some label"
                title={{text: 'some title', 'aria-label': 'some title aria label'}}
                description="some description"
                onClose={handleCloseSpy}
            />
        </ThemeContextProvider>
    );

    const callout = screen.getByRole('region', {name: 'some label'});
    expect(callout).toBeInTheDocument();

    const title = within(callout).getByRole('heading', {name: 'some title aria label'});
    expect(title).toBeInTheDocument();

    const closeButton = within(callout).getByRole('button', {name: 'Cerrar'});
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(handleCloseSpy).toHaveBeenCalledTimes(1);
});

test('renders an accesible and closable Callout with custom close button label', async () => {
    const handleCloseSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Callout
                aria-label="some label"
                title="some title"
                description="some description"
                onClose={handleCloseSpy}
                closeButtonLabel="custom close label"
            />
        </ThemeContextProvider>
    );

    const callout = screen.getByRole('region', {name: 'some label'});
    expect(callout).toBeInTheDocument();

    const closeButton = within(callout).getByRole('button', {name: 'custom close label'});
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(handleCloseSpy).toHaveBeenCalledTimes(1);
});
