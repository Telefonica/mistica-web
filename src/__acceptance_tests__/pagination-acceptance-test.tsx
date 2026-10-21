import {openStoryPage, screen} from '../test-utils';
import {mediaQueriesConfig} from '../media-queries.css';

import type {SerializedAXNode} from 'puppeteer';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_EDGE_OFFSET = {x: 47, y: 24};

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
    {currentPage: 3, desktop: ['1', '2', '3', '4', '5', '...', '20'], mobile: ['1', '2', '3', '4', '...']},
    {
        currentPage: 10,
        desktop: ['1', '...', '9', '10', '11', '...', '20'],
        mobile: ['...', '9', '10', '11', '...'],
    },
    {
        currentPage: 18,
        desktop: ['1', '...', '16', '17', '18', '19', '20'],
        mobile: ['...', '17', '18', '19', '20'],
    },
])(
    'Pagination keeps the same list when resizing at page $currentPage',
    async ({currentPage, desktop, mobile}) => {
        const page = await openStoryPage({
            id: STORY_ID,
            device: 'DESKTOP',
            args: {totalPages: 20, currentPage, hideNavigationControls: true},
        });
        const list = await screen.findByRole('list');
        const markup = await list.evaluate((element) => element.innerHTML);
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

        expect(await visibleItems()).toEqual(desktop);
        await expectAccessiblePages(desktop);

        const viewport = {
            width: mediaQueriesConfig.desktopMinWidth,
            height: mediaQueriesConfig.desktopOrTabletMinHeight,
        };
        await page.setViewport({...viewport, width: mediaQueriesConfig.desktopMinWidth - 1});
        expect(await visibleItems()).toEqual(mobile);
        await expectAccessiblePages(mobile);
        expect(await list.evaluate((element) => element.innerHTML)).toBe(markup);

        await page.setViewport(viewport);
        expect(await visibleItems()).toEqual(desktop);
        await expectAccessiblePages(desktop);
        expect(await list.evaluate((element) => element.innerHTML)).toBe(markup);
    }
);
