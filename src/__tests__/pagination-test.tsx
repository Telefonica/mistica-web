import * as React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeContextProvider from '../theme-context-provider';
import {makeTheme} from './test-utils';
import Pagination, {getPaginationItems} from '../pagination';

test('renders pagination navigation landmark', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} />
        </ThemeContextProvider>
    );

    expect(screen.getByRole('navigation', {name: 'Paginación - Página 1 de 5'})).toBeInTheDocument();
});

test('does not render when there is a single page', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={1} />
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('throws when totalPages is not positive', () => {
    expect(() =>
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination totalPages={-1} />
            </ThemeContextProvider>
        )
    ).toThrow('Pagination: totalPages must be greater than or equal to 1');
});

test('renders when optional props are explicitly undefined', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination
                totalPages={5}
                currentPage={undefined}
                defaultPage={undefined}
                maxPages={undefined}
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

    await userEvent.click(screen.getByRole('button', {name: 'Ir a la página 6'}));

    expect(onChange).toHaveBeenCalledWith(6);
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

test('hides the page list by default below 375px', () => {
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {configurable: true, writable: true, value: 360});

    try {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination totalPages={9} defaultPage={3} />
            </ThemeContextProvider>
        );

        expect(screen.getByRole('button', {name: 'Página anterior'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Página siguiente'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Ir a la página 2'})).not.toBeInTheDocument();
    } finally {
        Object.defineProperty(window, 'innerWidth', {configurable: true, writable: true, value: originalWidth});
    }
});

test('keeps the page list below 375px when hidePageList is explicitly false', () => {
    const originalWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {configurable: true, writable: true, value: 360});

    try {
        render(
            <ThemeContextProvider theme={makeTheme()}>
                <Pagination totalPages={9} defaultPage={3} hidePageList={false} />
            </ThemeContextProvider>
        );

        expect(screen.getByRole('button', {name: 'Ir a la página 2'})).toBeInTheDocument();
    } finally {
        Object.defineProperty(window, 'innerWidth', {configurable: true, writable: true, value: originalWidth});
    }
});

describe('getPaginationItems', () => {
    test('returns an empty array for a single page', () => {
        expect(getPaginationItems({totalPages: 1, currentPage: 1})).toEqual([]);
    });

    test('returns all pages when total fits without ellipsis', () => {
        const items = getPaginationItems({totalPages: 5, currentPage: 3});
        expect(items.filter((i) => i.type === 'ellipsis')).toHaveLength(0);
        expect(items).toHaveLength(5);
    });

    test('inserts ellipsis when middle pages are skipped', () => {
        const items = getPaginationItems({totalPages: 20, currentPage: 10});
        expect(items.some((i) => i.type === 'ellipsis')).toBe(true);
        expect(items[0]).toMatchObject({type: 'page', page: 1});
        expect(items[items.length - 1]).toMatchObject({type: 'page', page: 20});
    });

    test('fills the leading slots with pages on desktop', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 3})).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'page', page: 2, current: false},
            {type: 'page', page: 3, current: true},
            {type: 'page', page: 4, current: false},
            {type: 'page', page: 5, current: false},
            {type: 'page', page: 6, current: false},
            {type: 'page', page: 7, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 40, current: false},
        ]);
    });

    test('keeps five centered dynamic pages on desktop', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 31})).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 29, current: false},
            {type: 'page', page: 30, current: false},
            {type: 'page', page: 31, current: true},
            {type: 'page', page: 32, current: false},
            {type: 'page', page: 33, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 40, current: false},
        ]);
    });

    test('keeps the number of desktop items stable while changing pages', () => {
        const itemCounts = [1, 3, 20, 38, 40].map(
            (currentPage) => getPaginationItems({totalPages: 40, currentPage}).length
        );

        expect(itemCounts).toEqual([9, 9, 9, 9, 9]);
    });

    test('hides boundary pages when configured for mobile', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 33, includeBoundaryPages: false})).toEqual([
            {type: 'ellipsis'},
            {type: 'page', page: 32, current: false},
            {type: 'page', page: 33, current: true},
            {type: 'page', page: 34, current: false},
            {type: 'ellipsis'},
        ]);
    });

    test('keeps the number of mobile items stable while changing pages', () => {
        const itemCounts = [1, 3, 20, 38, 40].map(
            (currentPage) =>
                getPaginationItems({totalPages: 40, currentPage, includeBoundaryPages: false}).length
        );

        expect(itemCounts).toEqual([5, 5, 5, 5, 5]);
    });
});
