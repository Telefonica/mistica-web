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

    expect(screen.getByRole('navigation', {name: 'Pagination'})).toBeInTheDocument();
});

test('does not render when there is a single page', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={1} />
        </ThemeContextProvider>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
});

test('calls onChange when a page button is clicked (uncontrolled)', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} onChange={onChange} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Page 3'}));

    expect(onChange).toHaveBeenCalledWith(3);
});

test('calls onChange when Next is clicked', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={2} onChange={onChange} />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Next'}));

    expect(onChange).toHaveBeenCalledWith(3);
});

test('does not change page when disabled', async () => {
    const onChange = jest.fn();
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} defaultPage={1} onChange={onChange} disabled />
        </ThemeContextProvider>
    );

    await userEvent.click(screen.getByRole('button', {name: 'Page 3'}));

    expect(onChange).not.toHaveBeenCalled();
});

test('honors controlled currentPage', () => {
    render(
        <ThemeContextProvider theme={makeTheme()}>
            <Pagination totalPages={5} currentPage={3} />
        </ThemeContextProvider>
    );

    expect(screen.getByText('3').closest('[aria-current="page"]')).toBeInTheDocument();
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
});
