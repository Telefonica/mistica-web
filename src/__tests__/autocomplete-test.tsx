import * as React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../autocomplete';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';

type GetSuggestions = (value: string) => ReadonlyArray<string>;

const DEFAULT_SUGGESTIONS = ['Alpha', 'Bravo', 'Charlie'] as const;

const defaultGetSuggestions: GetSuggestions = (value) => {
    if (value.toLowerCase().startsWith('no') || value.toLowerCase().startsWith('zzz')) return [];
    return DEFAULT_SUGGESTIONS as unknown as Array<string>;
};

const AutocompleteWrapper = ({
    getSuggestions = defaultGetSuggestions,
    suggestionEmptyCase,
    label = 'City',
}: {
    getSuggestions?: GetSuggestions;
    suggestionEmptyCase?: string;
    label?: string;
}) => {
    const [value, setValue] = React.useState('');
    return (
        <Autocomplete
            label={label}
            value={value}
            onChangeValue={(val) => setValue(val)}
            getSuggestions={getSuggestions}
            suggestionEmptyCase={suggestionEmptyCase}
            name="city"
        />
    );
};

const renderWithTheme = (ui: React.ReactElement, themeOverrides?: Parameters<typeof makeTheme>[0]) => {
    return render(<ThemeContextProvider theme={makeTheme(themeOverrides)}>{ui}</ThemeContextProvider>);
};

const getInput = () => screen.getByRole('combobox', {name: 'City'}) as HTMLInputElement;

const getListbox = (opts?: {hidden?: boolean}) =>
    screen.getByRole('listbox', {hidden: opts?.hidden ?? true}) as HTMLUListElement;

const getOptions = () => screen.getAllByRole('option') as Array<HTMLLIElement>;

beforeAll(() => {
    (Element.prototype as any).scrollIntoView = () => {};
});

test('shows options on focus and on input', async () => {
    renderWithTheme(<AutocompleteWrapper />);

    const listbox = getListbox({hidden: true});
    expect(listbox).not.toBeVisible();

    await userEvent.click(getInput());
    expect(getListbox()).toBeVisible();
    expect(getOptions()).toHaveLength(DEFAULT_SUGGESTIONS.length);

    await userEvent.type(getInput(), 'A');
    expect(getListbox()).toBeVisible();
    expect(getOptions()).toHaveLength(DEFAULT_SUGGESTIONS.length);
});

test('keyboard navigation: ArrowDown/ArrowUp set active option and aria-activedescendant', async () => {
    renderWithTheme(<AutocompleteWrapper />);

    await userEvent.click(getInput());

    await userEvent.keyboard('{ArrowDown}');
    const options1 = getOptions();
    expect(options1[0]).toHaveAttribute('aria-selected', 'true');

    const listbox = getListbox();
    const input = getInput();
    const firstOptionId = `${listbox.id}-option-0`;
    expect(input).toHaveAttribute('aria-activedescendant', firstOptionId);

    await userEvent.keyboard('{ArrowDown}');
    const options2 = getOptions();
    expect(options2[1]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowUp}');
    const options3 = getOptions();
    expect(options3[0]).toHaveAttribute('aria-selected', 'true');
});

test('Enter selects focused option and hides list', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());
    await userEvent.keyboard('{ArrowDown}');

    await userEvent.keyboard('{Enter}');

    expect(getInput()).toHaveValue(DEFAULT_SUGGESTIONS[0]);
    expect(getListbox({hidden: true})).not.toBeVisible();
});

test('Tab with focused option selects it and hides list', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());
    await userEvent.keyboard('{ArrowDown}');

    await userEvent.keyboard('{Tab}');
    expect(getInput()).toHaveValue(DEFAULT_SUGGESTIONS[0]);
    expect(getListbox({hidden: true})).not.toBeVisible();
});

test('Tab with no focused option clears invalid input', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());
    await userEvent.type(getInput(), 'zzz');

    await userEvent.keyboard('{Tab}');
    expect(getInput()).toHaveValue('');
    expect(getListbox({hidden: true})).not.toBeVisible();
});

test('Escape hides list when open, clears when closed', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());
    await userEvent.type(getInput(), 'A');

    expect(getListbox()).toBeVisible();
    await userEvent.keyboard('{Escape}');
    expect(getListbox({hidden: true})).not.toBeVisible();
    expect(getInput()).toHaveValue('A');

    await userEvent.keyboard('{Escape}');
    expect(getInput()).toHaveValue('');
});

test('click outside hides list and clears invalid input', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());
    await userEvent.type(getInput(), 'zzz');
    expect(getInput()).toHaveValue('zzz');

    fireEvent.pointerUp(document.body);

    expect(getListbox({hidden: true})).not.toBeVisible();
    expect(getInput()).toHaveValue('');
});

test('clicking an option selects it and hides list', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    await userEvent.click(getInput());

    const options = getOptions();
    expect(options).toHaveLength(DEFAULT_SUGGESTIONS.length);

    await userEvent.click(options[1]);

    expect(getInput()).toHaveValue(DEFAULT_SUGGESTIONS[1]);
    expect(getListbox({hidden: true})).not.toBeVisible();
});

test('ARIA attributes: roles, controls and expanded/activedescendant toggling', async () => {
    renderWithTheme(<AutocompleteWrapper />);
    const input = getInput();
    const listbox = getListbox({hidden: true});

    expect(input).toHaveAttribute('role', 'combobox');
    expect(listbox).toHaveAttribute('role', 'listbox');

    expect(input).toHaveAttribute('aria-controls', listbox.id);

    expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{ArrowDown}');
    const expectedId = `${getListbox().id}-option-0`;
    expect(input).toHaveAttribute('aria-activedescendant', expectedId);
});

test('empty case message: uses prop suggestionEmptyCase when provided', async () => {
    const noSuggestions: GetSuggestions = () => [];
    renderWithTheme(<AutocompleteWrapper getSuggestions={noSuggestions} suggestionEmptyCase="No results" />);

    await userEvent.click(getInput());
    expect(screen.getByRole('status', {name: 'No results'})).toBeInTheDocument();
});

test('empty case message: falls back to theme texts.autocompleteEmptyCase', async () => {
    const noSuggestions: GetSuggestions = () => [];
    renderWithTheme(<AutocompleteWrapper getSuggestions={noSuggestions} />, {
        texts: {autocompleteEmptyCase: 'FromTheme'},
    });

    await userEvent.click(getInput());
    expect(screen.getByText('FromTheme')).toBeInTheDocument();
});

test('empty case message: falls back to tokens when theme text missing', async () => {
    const noSuggestions: GetSuggestions = () => [];
    renderWithTheme(<AutocompleteWrapper getSuggestions={noSuggestions} />);

    await userEvent.click(getInput());
    expect(screen.getByText('Sin opciones')).toBeInTheDocument();
});
