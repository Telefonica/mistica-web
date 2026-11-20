import {test, expect} from '../test-utils/component';

const DEFAULT_SUGGESTIONS = ['Alpha', 'Bravo', 'Charlie'];
test('shows options on focus and on input', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    const listbox = page.getByRole('listbox', {includeHidden: true});
    await expect(listbox).not.toBeVisible();
    await page.getByRole('combobox', {name: 'City'}).click();
    await expect(page.getByRole('listbox', {includeHidden: true})).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(DEFAULT_SUGGESTIONS.length);
    await page.getByRole('combobox', {name: 'City'}).pressSequentially('A');
    await expect(page.getByRole('listbox', {includeHidden: true})).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(DEFAULT_SUGGESTIONS.length);
});
test('keyboard navigation: ArrowDown/ArrowUp set active option and aria-activedescendant', async ({
    mount,
    page,
}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.keyboard.press('ArrowDown');
    const options1 = page.getByRole('option');
    await expect(options1.nth(0)).toHaveAttribute('aria-selected', 'true');
    const listbox = page.getByRole('listbox', {includeHidden: true});
    const input = page.getByRole('combobox', {name: 'City'});
    const firstOptionId = `${await listbox.getAttribute('id')}-option-0`;
    await expect(input).toHaveAttribute('aria-activedescendant', firstOptionId);
    await page.keyboard.press('ArrowDown');
    const options2 = page.getByRole('option');
    await expect(options2.nth(1)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowUp');
    const options3 = page.getByRole('option');
    await expect(options3.nth(0)).toHaveAttribute('aria-selected', 'true');
});
test('Enter selects focused option and hides list', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue(DEFAULT_SUGGESTIONS[0]);
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
});
test('Tab with focused option selects it and hides list', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue(DEFAULT_SUGGESTIONS[0]);
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
});
test('Tab with no focused option clears invalid input', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.getByRole('combobox', {name: 'City'}).pressSequentially('zzz');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue('');
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
});
test('Escape hides list when open, clears when closed', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.getByRole('combobox', {name: 'City'}).pressSequentially('A');
    await expect(page.getByRole('listbox', {includeHidden: true})).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue('A');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue('');
});
test('click outside hides list and clears invalid input', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    await page.getByRole('combobox', {name: 'City'}).pressSequentially('zzz');
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue('zzz');
    await page.mouse.click(0, 700);
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue('');
});
test('clicking an option selects it and hides list', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    await page.getByRole('combobox', {name: 'City'}).click();
    const options = page.getByRole('option');
    await expect(options).toHaveCount(DEFAULT_SUGGESTIONS.length);
    await options.nth(1).click();
    await expect(page.getByRole('combobox', {name: 'City'})).toHaveValue(DEFAULT_SUGGESTIONS[1]);
    await expect(page.getByRole('listbox', {includeHidden: true})).not.toBeVisible();
});
test('ARIA attributes: roles, controls and expanded/activedescendant toggling', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {});
    const input = page.getByRole('combobox', {name: 'City'});
    const listbox = page.getByRole('listbox', {includeHidden: true});
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(listbox).toHaveAttribute('role', 'listbox');
    const listboxId = await listbox.getAttribute('id');
    if (!listboxId) {
        throw new Error('The listbox must have an id');
    }
    await expect(input).toHaveAttribute('aria-controls', listboxId);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await input.click();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('ArrowDown');
    const expectedId = `${await page.getByRole('listbox', {includeHidden: true}).getAttribute('id')}-option-0`;
    await expect(input).toHaveAttribute('aria-activedescendant', expectedId);
});
test('empty case message: uses prop suggestionEmptyCase when provided', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {empty: true, suggestionEmptyCase: 'No results'});
    await page.getByRole('combobox', {name: 'City'}).click();
    await expect(page.getByRole('status', {name: 'No results'})).toHaveCount(1);
});
test('empty case message: falls back to theme texts.autocompleteEmptyCase', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {empty: true, themeEmptyCase: 'FromTheme'});
    await page.getByRole('combobox', {name: 'City'}).click();
    await expect(page.getByText('FromTheme')).toHaveCount(1);
});
test('empty case message: falls back to tokens when theme text missing', async ({mount, page}) => {
    await mount('autocomplete/Suggestions', {empty: true});
    await page.getByRole('combobox', {name: 'City'}).click();
    await expect(page.getByText('Sin opciones')).toHaveCount(1);
});
