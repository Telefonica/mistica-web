import * as React from 'react';
import {act, render, screen} from '@testing-library/react';
import SearchField from '../search-field';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import userEvent from '@testing-library/user-event';

const getSuggestions = (value: string) => {
    const allSuggestions = ['Apple', 'Banana', 'Orange'];
    return allSuggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
};

test('Show show suggestions on focus when shouldShowSuggestions is "focus"', async () => {
    await act(async () =>
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <SearchField
                    getSuggestions={getSuggestions}
                    shouldShowSuggestions="focus"
                    label="Search"
                    name="search"
                />
            </ThemeContextProvider>
        )
    );

    expect(screen.queryByRole('menuitem', {name: 'Apple'})).not.toBeInTheDocument();

    await userEvent.click(await screen.findByLabelText('Search'));

    expect(await screen.findByRole('menuitem', {name: 'Apple'})).toBeInTheDocument();
});

test('Should show suggestions on type when shouldShowSuggestions is 2', async () => {
    await act(async () =>
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <SearchField
                    getSuggestions={getSuggestions}
                    shouldShowSuggestions={2}
                    label="Search"
                    name="search"
                />
            </ThemeContextProvider>
        )
    );

    await userEvent.click(await screen.findByLabelText('Search'));
    expect(screen.queryByRole('menuitem', {name: 'Apple'})).not.toBeInTheDocument();

    await userEvent.type(await screen.findByLabelText('Search'), 'A');
    expect(screen.queryByRole('menuitem', {name: 'Apple'})).not.toBeInTheDocument();

    await userEvent.type(await screen.findByLabelText('Search'), 'p');
    expect(await screen.findByRole('menuitem', {name: 'Apple'})).toBeInTheDocument();
});

test('Should reload suggestions when clearing the field', async () => {
    await act(async () =>
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <SearchField
                    getSuggestions={getSuggestions}
                    shouldShowSuggestions="focus"
                    label="Search"
                    name="search"
                />
            </ThemeContextProvider>
        )
    );

    await userEvent.type(await screen.findByLabelText('Search'), 'invent');

    expect(screen.queryByRole('menuitem', {name: 'Apple'})).not.toBeInTheDocument();

    await userEvent.click(await screen.findByRole('button', {name: 'Borrar búsqueda'}));

    expect(screen.getByRole('menuitem', {name: 'Apple'})).toBeInTheDocument();
});
