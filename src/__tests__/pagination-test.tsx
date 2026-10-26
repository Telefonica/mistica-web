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

test.each([1, 3, 4, 10, 17, 18, 20])('shares page buttons in a single list at page %s', (currentPage) => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={20} currentPage={currentPage} />
        </ThemeContextProvider>
    );

    const list = screen.getByRole('list', {hidden: true});
    const buttons = within(list).getAllByRole('button', {hidden: true});
    const pageNumbers = buttons.map((button) => button.textContent);

    expect(new Set(pageNumbers).size).toBe(pageNumbers.length);
    expect(within(list).getByRole('button', {current: 'page', hidden: true})).toHaveTextContent(
        String(currentPage)
    );
});

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

test.each([2, 3, 4, 5, 7, 20])('renders unique page buttons with %s total pages', (totalPages) => {
    const {rerender} = render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={totalPages} />
        </ThemeContextProvider>
    );

    for (const surroundingPageCount of [0, 1, 2, 10]) {
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            rerender(
                <ThemeContextProvider theme={makeTheme()}>
                    <Pagination {...{totalPages, currentPage, surroundingPageCount}} />
                </ThemeContextProvider>
            );
            const list = screen.getByRole('list', {hidden: true});
            const buttons = within(list).getAllByRole('button', {hidden: true});
            const pages = buttons.map((button) => Number(button.textContent));

            expect(pages).toEqual([...new Set(pages)].sort((a, b) => a - b));
            expect(pages.every((page) => page >= 1 && page <= totalPages)).toBe(true);
            expect(within(list).getByRole('button', {current: 'page', hidden: true})).toHaveAccessibleName(
                `Página ${currentPage}, página actual`
            );
        }
    }
});

test.each([
    {totalPages: 3, currentPage: 2, surroundingPageCount: 0, expectedPages: [1, 2, 3]},
    {totalPages: 5, currentPage: 3, surroundingPageCount: undefined, expectedPages: [1, 2, 3, 4, 5]},
    {totalPages: 40, currentPage: 1, surroundingPageCount: 1, expectedPages: [1, 2, 3, 4, 5, 40]},
    {totalPages: 40, currentPage: 31, surroundingPageCount: 1, expectedPages: [1, 30, 31, 32, 40]},
    {totalPages: 40, currentPage: 40, surroundingPageCount: 1, expectedPages: [1, 36, 37, 38, 39, 40]},
    {totalPages: 40, currentPage: 20, surroundingPageCount: 0, expectedPages: [1, 20, 40]},
    {totalPages: 40, currentPage: 20, surroundingPageCount: 2, expectedPages: [1, 18, 19, 20, 21, 22, 40]},
])(
    'renders shared page buttons for $totalPages pages at page $currentPage with surrounding count $surroundingPageCount',
    ({expectedPages, ...props}) => {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination {...props} />
            </ThemeContextProvider>
        );

        const list = screen.getByRole('list', {hidden: true});
        const buttons = within(list).getAllByRole('button', {hidden: true});
        expect(buttons.map((button) => Number(button.textContent))).toEqual(expectedPages);
    }
);
