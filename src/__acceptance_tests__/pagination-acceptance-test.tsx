import {openStoryPage, screen} from '../test-utils';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_EDGE_OFFSET = {x: 47, y: 24};

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
