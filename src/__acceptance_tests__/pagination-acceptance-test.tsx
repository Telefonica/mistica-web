import {openStoryPage, screen} from '../test-utils';

import type {SerializedAXNode} from 'puppeteer';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_EDGE_OFFSET = {x: 47, y: 24};
// Literal on purpose: changing the responsive breakpoint must fail these tests.
const DESKTOP_MIN_WIDTH = 1024;
const DESKTOP_MIN_HEIGHT = 550;
const DESKTOP_VIEWPORT = {width: DESKTOP_MIN_WIDTH, height: DESKTOP_MIN_HEIGHT};
const MOBILE_VIEWPORT = {width: DESKTOP_MIN_WIDTH - 1, height: DESKTOP_MIN_HEIGHT};

const getAccessibleButtons = (node: SerializedAXNode): Array<SerializedAXNode> =>
    node.role === 'button' ? [node] : (node.children ?? []).flatMap(getAccessibleButtons);

test('Pagination page items are clickable across their mobile target area', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 9, defaultPage: 3, navigationControls: 'iconButton'},
    });

    const page = await screen.findByRole('button', {name: 'Ir a la página 2'});

    await page.click({offset: MOBILE_TARGET_EDGE_OFFSET});

    await screen.findByRole('button', {name: 'Página 2, página actual'});
});

test('Pagination ellipses are non-interactive', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {
            totalPages: 20,
            defaultPage: 10,
            surroundingPageCount: 1,
            navigationControls: 'iconButton',
        },
    });

    await screen.findByRole('button', {
        name: 'Página 10, página actual',
        current: 'page',
    });
    const ellipses = await screen.findAllByText('...');
    let ellipsisClicked = false;

    for (const ellipsis of ellipses) {
        if (await ellipsis.isIntersectingViewport()) {
            await ellipsis.click();
            ellipsisClicked = true;
            break;
        }
    }

    expect(ellipsisClicked).toBe(true);

    await screen.findByRole('button', {name: 'Página 10, página actual', current: 'page'});
});

test.each([
    {
        totalPages: 2,
        currentPage: 1,
        surroundingPageCount: 0,
        expectedDesktop: ['1', '2'],
        expectedMobile: ['1', '2'],
    },
    {
        totalPages: 3,
        currentPage: 2,
        surroundingPageCount: 0,
        expectedDesktop: ['1', '2', '3'],
        expectedMobile: ['1', '2', '3'],
    },
    {
        totalPages: 4,
        currentPage: 2,
        surroundingPageCount: 0,
        expectedDesktop: ['1', '2', '3', '4'],
        expectedMobile: ['1', '2', '...'],
    },
    {
        totalPages: 5,
        currentPage: 3,
        expectedDesktop: ['1', '2', '3', '4', '5'],
        expectedMobile: ['1', '2', '3', '4', '5'],
    },
    {
        currentPage: 10,
        surroundingPageCount: 0,
        expectedDesktop: ['1', '...', '10', '...', '20'],
        expectedMobile: ['...', '10', '...'],
    },
    {
        currentPage: 10,
        surroundingPageCount: 2,
        expectedDesktop: ['1', '...', '8', '9', '10', '11', '12', '...', '20'],
        expectedMobile: ['...', '8', '9', '10', '11', '12', '...'],
    },
    {
        currentPage: 3,
        expectedDesktop: ['1', '2', '3', '4', '5', '...', '20'],
        expectedMobile: ['1', '2', '3', '4', '...'],
    },
    {
        currentPage: 10,
        expectedDesktop: ['1', '...', '9', '10', '11', '...', '20'],
        expectedMobile: ['...', '9', '10', '11', '...'],
    },
    {
        currentPage: 18,
        expectedDesktop: ['1', '...', '16', '17', '18', '19', '20'],
        expectedMobile: ['...', '17', '18', '19', '20'],
    },
])(
    'Pagination keeps the same list when resizing: %j',
    async ({totalPages = 20, currentPage, surroundingPageCount = 1, expectedDesktop, expectedMobile}) => {
        const page = await openStoryPage({
            id: STORY_ID,
            device: 'DESKTOP',
            viewport: DESKTOP_VIEWPORT,
            args: {totalPages, currentPage, surroundingPageCount, hideNavigationControls: true},
        });
        const list = await screen.findByRole('list');
        const expectedMarkup = await list.evaluate((element) => element.innerHTML);
        const visibleItems = () =>
            list.evaluate((element) =>
                Array.from(element.children)
                    .filter((item) => item.getBoundingClientRect().width > 0)
                    .map((item) => item.textContent)
            );

        const expectAccessiblePages = async (items: Array<string>) => {
            const tree = await page.accessibility.snapshot({root: list, interestingOnly: false});
            expect(tree).not.toBeNull();
            const buttons = tree ? getAccessibleButtons(tree) : [];
            expect(buttons.map(({name}) => name)).toEqual(
                items
                    .filter((item) => item !== '...')
                    .map((item) =>
                        Number(item) === currentPage
                            ? `Página ${item}, página actual`
                            : `Ir a la página ${item}`
                    )
            );
            expect(buttons.find(({name}) => name === `Página ${currentPage}, página actual`)).toMatchObject({
                disabled: true,
            });
        };

        expect(await visibleItems()).toEqual(expectedDesktop);
        await expectAccessiblePages(expectedDesktop);

        await page.setViewport(MOBILE_VIEWPORT);
        expect(await visibleItems()).toEqual(expectedMobile);
        await expectAccessiblePages(expectedMobile);
        expect(await list.evaluate((element) => element.innerHTML)).toBe(expectedMarkup);

        await page.setViewport(DESKTOP_VIEWPORT);
        expect(await visibleItems()).toEqual(expectedDesktop);
        await expectAccessiblePages(expectedDesktop);
        expect(await list.evaluate((element) => element.innerHTML)).toBe(expectedMarkup);
    }
);
