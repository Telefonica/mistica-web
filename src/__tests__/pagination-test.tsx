import {test, expect} from '../test-utils/component';

import type {Pages} from './pagination.story';
import type {Locator} from '@playwright/test';

const getPageNumbers = async (list: Locator) =>
    (await list.getByRole('button', {includeHidden: true}).allTextContents()).map(Number);
test('renders pagination navigation landmark', async ({mount}) => {
    const component = await mount('pagination/Pages', {totalPages: 5, defaultPage: 1});
    await expect(component.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toHaveCount(1);
});
for (const givenCurrentPage of [1, 3, 4, 10, 17, 18, 20]) {
    test(`shares page buttons in a single list at page ${givenCurrentPage}`, async ({mount}) => {
        const component = await mount('pagination/Pages', {totalPages: 20, currentPage: givenCurrentPage});
        const list = component.getByRole('list', {includeHidden: true});
        const pages = await getPageNumbers(list);
        expect(new Set(pages).size).toBe(pages.length);
        await expect(list.locator('[aria-current="page"]')).toContainText(String(givenCurrentPage));
    });
}
for (const [totalPages, title] of [
    [1, 'does not render when there is a single page'],
    [-1, 'does not render when totalPages is not positive'],
] as const) {
    test(title, async ({mount}) => {
        const component = await mount('pagination/Pages', {totalPages});
        await expect(component.getByRole('navigation')).toHaveCount(0);
    });
}
test('keeps the selected page in range when page props are out of range', async ({mount}) => {
    const component = await mount('pagination/Pages', {
        totalPages: 5,
        defaultPage: -1,
        surroundingPageCount: -1,
    });
    await expect(component.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toHaveCount(1);
    await expect(component.getByRole('button', {name: 'Página 1, página actual'})).toHaveCount(1);
});
test('renders when optional props are explicitly undefined', async ({mount}) => {
    const component = await mount<typeof Pages>('pagination/Pages', {
        totalPages: 5,
        currentPage: undefined,
        defaultPage: undefined,
        surroundingPageCount: undefined,
        navLeftLabel: undefined,
        navRightLabel: undefined,
        onChange: undefined,
    });
    await expect(component.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toHaveCount(1);
});
test('calls onChange when a page button is clicked (uncontrolled)', async ({mount}) => {
    const component = await mount('pagination/Changes', {totalPages: 7, defaultPage: 2});
    await component.getByRole('button', {name: 'Ir a la página 4'}).click();
    await expect(component.getByTestId('calls')).toHaveValue('[4]');
});
test('calls onChange when Next is clicked', async ({mount}) => {
    const component = await mount('pagination/Changes', {totalPages: 8, defaultPage: 4});
    await component.getByRole('button', {name: 'Página siguiente'}).click();
    await expect(component.getByTestId('calls')).toHaveValue('[5]');
});
test('does not change page when disabled', async ({mount}) => {
    const component = await mount('pagination/Changes', {totalPages: 5, defaultPage: 1, disabled: true});
    const button = component.getByRole('button', {name: 'Ir a la página 3'});
    await expect(button).toBeDisabled();
    await button.click({force: true});
    await expect(component.getByTestId('calls')).toHaveValue('[]');
});
test('keeps Previous and Next visible at page boundaries (disabled)', async ({mount}) => {
    const component = await mount('pagination/Changes', {totalPages: 5, defaultPage: 1});
    const previous = component.getByRole('button', {name: 'Página anterior'});
    await expect(previous).toBeDisabled();
    await expect(component.getByRole('button', {name: 'Página siguiente'})).toBeEnabled();
    await previous.click({force: true});
    await expect(component.getByTestId('calls')).toHaveValue('[]');
});
test('honors controlled currentPage', async ({mount}) => {
    const component = await mount('pagination/Pages', {totalPages: 5, currentPage: 3});
    await expect(component.getByRole('button', {name: 'Ir a la página 3'})).toHaveCount(0);
    await expect(component.getByRole('button', {name: 'Página 3, página actual'})).toHaveCount(1);
    await expect(component.getByRole('button', {name: 'Ir a la página 2'})).toHaveCount(1);
});
const pageSweepCases = [2, 3, 4, 5, 7, 20].flatMap((givenTotalPages) =>
    [0, 1, 2, 10].flatMap((givenSurroundingPageCount) =>
        Array.from({length: givenTotalPages}, (_, index) => ({
            given: {
                totalPages: givenTotalPages,
                surroundingPageCount: givenSurroundingPageCount,
                currentPage: index + 1,
            },
            expected: {
                firstPage: 1,
                lastPage: givenTotalPages,
                currentPageLabel: `Página ${index + 1}, página actual`,
            },
        }))
    )
);

for (const {given, expected} of pageSweepCases) {
    test(`renders unique page buttons for ${given.totalPages} pages at page ${given.currentPage} with surrounding count ${given.surroundingPageCount}`, async ({
        mount,
    }) => {
        const component = await mount('pagination/Pages', given);
        const list = component.getByRole('list', {includeHidden: true});
        const pages = await getPageNumbers(list);
        expect(pages).toEqual([...new Set(pages)].sort((a, b) => a - b));
        expect(pages.every((page) => page >= expected.firstPage && page <= expected.lastPage)).toBe(true);
        await expect(list.locator('[aria-current="page"]')).toHaveAccessibleName(expected.currentPageLabel);
    });
}
for (const {given, expected} of [
    {given: {totalPages: 3, currentPage: 2, surroundingPageCount: 0}, expected: {pages: [1, 2, 3]}},
    {
        given: {totalPages: 5, currentPage: 3, surroundingPageCount: undefined},
        expected: {pages: [1, 2, 3, 4, 5]},
    },
    {
        given: {totalPages: 40, currentPage: 1, surroundingPageCount: 1},
        expected: {pages: [1, 2, 3, 4, 5, 40]},
    },
    {
        given: {totalPages: 40, currentPage: 31, surroundingPageCount: 1},
        expected: {pages: [1, 30, 31, 32, 40]},
    },
    {
        given: {totalPages: 40, currentPage: 40, surroundingPageCount: 1},
        expected: {pages: [1, 36, 37, 38, 39, 40]},
    },
    {given: {totalPages: 40, currentPage: 20, surroundingPageCount: 0}, expected: {pages: [1, 20, 40]}},
    {
        given: {totalPages: 40, currentPage: 20, surroundingPageCount: 2},
        expected: {pages: [1, 18, 19, 20, 21, 22, 40]},
    },
]) {
    test(`renders shared page buttons for ${given.totalPages} pages at page ${given.currentPage} with surrounding count ${given.surroundingPageCount}`, async ({
        mount,
    }) => {
        const component = await mount('pagination/Pages', given);
        expect(await getPageNumbers(component.getByRole('list', {includeHidden: true}))).toEqual(
            expected.pages
        );
    });
}
test('keeps a single current page after selecting a page with no surrounding pages', async ({mount}) => {
    const component = await mount('pagination/Pages', {
        totalPages: 3,
        surroundingPageCount: 0,
        hideNavigationControls: true,
    });
    await component.getByRole('button', {name: 'Ir a la página 2'}).click();
    const list = component.getByRole('list');
    expect(
        await list
            .getByRole('button')
            .evaluateAll((buttons) => buttons.map((button) => button.getAttribute('aria-label')))
    ).toEqual(['Ir a la página 1', 'Página 2, página actual', 'Ir a la página 3']);
    await expect(list.locator('[aria-current="page"]')).toHaveAccessibleName('Página 2, página actual');
    await expect(list.locator('[aria-current="page"]')).toHaveAttribute('aria-disabled', 'true');
});
