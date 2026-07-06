import {openStoryPage, screen} from '../test-utils';

import type {ElementHandle} from '../test-utils';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_EDGE_OFFSET = {x: 47, y: 24};

const getCenterBetweenElements = async (leftElement: ElementHandle, rightElement: ElementHandle) => {
    const leftBox = await leftElement.boundingBox();
    const rightBox = await rightElement.boundingBox();

    if (!leftBox || !rightBox) {
        throw Error('Elements should be visible');
    }

    return {
        x: (leftBox.x + leftBox.width + rightBox.x) / 2,
        y: leftBox.y + leftBox.height / 2,
    };
};

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
    const page = await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {
            totalPages: 20,
            defaultPage: 10,
            surroundingPageCount: 1,
            navigationControls: 'iconButton',
        },
    });

    const previousPage = await screen.findByRole('button', {name: 'Ir a la página 9'});
    const currentPage = await screen.findByRole('button', {name: 'Página 10, página actual'});
    const ellipsisPoint = await getCenterBetweenElements(
        await screen.findByRole('button', {name: 'Página anterior'}),
        previousPage
    );

    await page.mouse.click(ellipsisPoint.x, ellipsisPoint.y);

    expect(await currentPage.evaluate((element) => element.getAttribute('aria-current'))).toBe('page');
});
