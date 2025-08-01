import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Chip from '../chip';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

test('Chip can be closed', async () => {
    const closeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onClose={closeSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const closeButton = screen.getByRole('button', {name: 'Cerrar'});

    await userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('Chip can be closed when using custom close label', async () => {
    const closeSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onClose={closeSpy} closeButtonLabel="custom close label">
                some text
            </Chip>
        </ThemeContextProvider>
    );

    const closeButton = screen.getByRole('button', {name: 'custom close label'});

    await userEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
});

test('Chip can be clicked', async () => {
    const clickSpy = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip onPress={clickSpy}>some text</Chip>
        </ThemeContextProvider>
    );

    const chip = screen.getByText('some text');

    await userEvent.click(chip);

    expect(clickSpy).toHaveBeenCalledTimes(1);
});

test('Active chip displays checkmark icon for accessibility', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip active>Active chip</Chip>
        </ThemeContextProvider>
    );

    // The checkmark icon should be present but hidden from screen readers
    const checkmarkIcon = screen.getByRole('presentation', {hidden: true});
    expect(checkmarkIcon).toBeInTheDocument();

    // Verify it's the checkmark icon by checking the path content
    expect(checkmarkIcon).toContainHTML('M9.016 20a1 1 0 0 1-.77-.353l-5.033-6.065');
});

test('Inactive chip does not display checkmark icon', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip>Inactive chip</Chip>
        </ThemeContextProvider>
    );

    // No checkmark icon should be present for inactive chips
    const checkmarkIcon = screen.queryByRole('presentation', {hidden: true});
    expect(checkmarkIcon).not.toBeInTheDocument();
});

test('Active chip with custom icon does not display checkmark', () => {
    const CustomIcon = () => <svg role="img" aria-label="custom icon" />;

    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Chip active Icon={CustomIcon}>
                Active chip with icon
            </Chip>
        </ThemeContextProvider>
    );

    // Should only have the custom icon, not the checkmark
    const customIcon = screen.getByRole('img', {name: 'custom icon'});
    expect(customIcon).toBeInTheDocument();

    // Should not have multiple icons
    const allIcons = screen.getAllByRole('img');
    expect(allIcons).toHaveLength(1);
});
