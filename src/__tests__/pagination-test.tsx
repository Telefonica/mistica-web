import * as React from 'react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import Pagination from '../pagination';

test('renders pagination navigation landmark', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toBeInTheDocument();
});

test.each([
    {givenCurrentPage: 1, expectedCurrentPage: '1'},
    {givenCurrentPage: 3, expectedCurrentPage: '3'},
    {givenCurrentPage: 4, expectedCurrentPage: '4'},
    {givenCurrentPage: 10, expectedCurrentPage: '10'},
    {givenCurrentPage: 17, expectedCurrentPage: '17'},
    {givenCurrentPage: 18, expectedCurrentPage: '18'},
    {givenCurrentPage: 20, expectedCurrentPage: '20'},
])(
    'shares page buttons in a single list at page $givenCurrentPage',
    ({givenCurrentPage, expectedCurrentPage}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination totalPages={20} currentPage={givenCurrentPage} />
            </ThemeContextProvider>
        );

        const list = screen.getByRole('list', {hidden: true});
        const buttons = within(list).getAllByRole('button', {hidden: true});
        const pageNumbers = buttons.map((button) => button.textContent);

        expect(new Set(pageNumbers).size).toBe(pageNumbers.length);
        expect(within(list).getByRole('button', {current: 'page', hidden: true})).toHaveTextContent(
            expectedCurrentPage
        );
    }
);

test('does not render when there is a single page', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={1} />
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('does not render when totalPages is not positive', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={-1} />
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('keeps the selected page in range when page props are out of range', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={-1} surroundingPageCount={-1} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Página 1, página actual'})).toBeInTheDocument();
});

test('renders when optional props are explicitly undefined', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination
                totalPages={5}
                currentPage={undefined}
                defaultPage={undefined}
                surroundingPageCount={undefined}
                navLeftLabel={undefined}
                navRightLabel={undefined}
                onChange={undefined}
            />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toBeInTheDocument();
});

test('calls onChange when a page button is clicked (uncontrolled)', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={7} defaultPage={2} onChange={onChange} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Ir a la página 4'}));

    expect(onChange).toHaveBeenCalledWith(4);
});

test('calls onChange when Next is clicked', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={8} defaultPage={4} onChange={onChange} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Página siguiente'}));

    expect(onChange).toHaveBeenCalledWith(5);
});

test('does not change page when disabled', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} onChange={onChange} disabled />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Ir a la página 3'}));

    expect(onChange).not.toHaveBeenCalled();
});

test('keeps Previous and Next visible at page boundaries (disabled)', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} onChange={onChange} />
        </ThemeContextProvider>
    );

    const prev = screen.getByRole('button', {name: 'Página anterior'});
    const next = screen.getByRole('button', {name: 'Página siguiente'});
    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();

    await userEvent.click(prev);
    expect(onChange).not.toHaveBeenCalled();
});

test('honors controlled currentPage', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} currentPage={3} />
        </ThemeContextProvider>
    );
    expect(screen.queryByRole('button', {name: 'Ir a la página 3'})).not.toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Página 3, página actual'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Ir a la página 2'})).toBeInTheDocument();
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

test.each(pageSweepCases)(
    'renders unique page buttons for $given.totalPages pages at page $given.currentPage with surrounding count $given.surroundingPageCount',
    ({given, expected}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination {...given} />
            </ThemeContextProvider>
        );

        const list = screen.getByRole('list', {hidden: true});
        const buttons = within(list).getAllByRole('button', {hidden: true});
        const pages = buttons.map((button) => Number(button.textContent));

        expect(pages).toEqual([...new Set(pages)].sort((a, b) => a - b));
        expect(pages.every((page) => page >= expected.firstPage && page <= expected.lastPage)).toBe(true);
        expect(within(list).getByRole('button', {current: 'page', hidden: true})).toHaveAccessibleName(
            expected.currentPageLabel
        );
    }
);

test.each([
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
])(
    'renders shared page buttons for $given.totalPages pages at page $given.currentPage with surrounding count $given.surroundingPageCount',
    ({given, expected}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination {...given} />
            </ThemeContextProvider>
        );

        const list = screen.getByRole('list', {hidden: true});
        const buttons = within(list).getAllByRole('button', {hidden: true});
        expect(buttons.map((button) => Number(button.textContent))).toEqual(expected.pages);
    }
);

test('keeps a single current page after selecting a page with no surrounding pages', async () => {
    const given = {totalPages: 3, surroundingPageCount: 0, hideNavigationControls: true};
    const expectedLabels = ['Ir a la página 1', 'Página 2, página actual', 'Ir a la página 3'];
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination {...given} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Ir a la página 2'}));

    const list = screen.getByRole('list');
    const buttons = within(list).getAllByRole('button');
    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual(expectedLabels);
    expect(within(list).getByRole('button', {current: 'page'})).toHaveAccessibleName(
        'Página 2, página actual'
    );
    expect(within(list).getByRole('button', {current: 'page'})).toHaveAttribute('aria-disabled', 'true');
});
