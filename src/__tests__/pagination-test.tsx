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

describe('getPaginationItems', () => {
    test('returns an empty array for a single page', () => {
        expect(getPaginationItems({totalPages: 1, currentPage: 1})).toEqual([]);
    });

    test('returns all pages when total fits without ellipsis', () => {
        const items = getPaginationItems({totalPages: 5, currentPage: 3});
        expect(items.filter((i) => i.type === 'ellipsis')).toHaveLength(0);
        expect(items).toHaveLength(5);
    });

    test('includes the hidden page instead of rendering an unnecessary mobile ellipsis', () => {
        expect(getPaginationItems({totalPages: 4, currentPage: 3, includeBoundaryPages: false})).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'page', page: 2, current: false},
            {type: 'page', page: 3, current: true},
            {type: 'page', page: 4, current: false},
        ]);
    });

    test('uses one surrounding page by default', () => {
        const items = getPaginationItems({totalPages: 20, currentPage: 10});
        expect(items).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 9, current: false},
            {type: 'page', page: 10, current: true},
            {type: 'page', page: 11, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 20, current: false},
        ]);
    });

    test('uses surroundingPageCount to insert ellipsis when middle pages are skipped', () => {
        const items = getPaginationItems({totalPages: 20, currentPage: 10, surroundingPageCount: 1});
        expect(items.some((i) => i.type === 'ellipsis')).toBe(true);
        expect(items[0]).toMatchObject({type: 'page', page: 1});
        expect(items[items.length - 1]).toMatchObject({type: 'page', page: 20});
    });

    test('fills the leading slots with pages on desktop', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 3, surroundingPageCount: 1})).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'page', page: 2, current: false},
            {type: 'page', page: 3, current: true},
            {type: 'page', page: 4, current: false},
            {type: 'page', page: 5, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 40, current: false},
        ]);
    });

    test('keeps configured surrounding pages centered on desktop', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 31, surroundingPageCount: 1})).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 30, current: false},
            {type: 'page', page: 31, current: true},
            {type: 'page', page: 32, current: false},
            {type: 'ellipsis'},
            {type: 'page', page: 40, current: false},
        ]);
    });

    test('allows configuring more surrounding pages on desktop', () => {
        expect(getPaginationItems({totalPages: 40, currentPage: 31, surroundingPageCount: 2})).toEqual([
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
            (currentPage) => getPaginationItems({totalPages: 40, currentPage, surroundingPageCount: 1}).length
        );

        expect(itemCounts).toEqual([7, 7, 7, 7, 7]);
    });

    test('hides boundary pages when configured for mobile', () => {
        expect(
            getPaginationItems({
                totalPages: 40,
                currentPage: 3,
                includeBoundaryPages: false,
                surroundingPageCount: 1,
            })
        ).toEqual([
            {type: 'page', page: 1, current: false},
            {type: 'page', page: 2, current: false},
            {type: 'page', page: 3, current: true},
            {type: 'page', page: 4, current: false},
            {type: 'ellipsis'},
        ]);
    });

    test('keeps mobile item slots stable without fixed boundary pages', () => {
        expect(
            getPaginationItems({
                totalPages: 40,
                currentPage: 33,
                includeBoundaryPages: false,
                surroundingPageCount: 1,
            })
        ).toEqual([
            {type: 'ellipsis'},
            {type: 'page', page: 32, current: false},
            {type: 'page', page: 33, current: true},
            {type: 'page', page: 34, current: false},
            {type: 'ellipsis'},
        ]);

        expect(
            getPaginationItems({
                totalPages: 40,
                currentPage: 1,
                includeBoundaryPages: false,
                surroundingPageCount: 1,
            })
        ).toEqual([
            {type: 'page', page: 1, current: true},
            {type: 'page', page: 2, current: false},
            {type: 'page', page: 3, current: false},
            {type: 'page', page: 4, current: false},
            {type: 'ellipsis'},
        ]);

        expect(
            [1, 3, 20, 38, 40].map(
                (currentPage) =>
                    getPaginationItems({
                        totalPages: 40,
                        currentPage,
                        includeBoundaryPages: false,
                        surroundingPageCount: 1,
                    }).length
            )
        ).toEqual([5, 5, 5, 5, 5]);
    });
});
