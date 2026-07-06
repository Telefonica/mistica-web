import {openStoryPage, screen} from '../test-utils';

import type {ElementHandle} from '../test-utils';

const STORY_ID = 'components-pagination--default';
const MOBILE_TARGET_EDGE_OFFSET = {x: 47, y: 24};

const getVisibleElements = async (elements: ReadonlyArray<ElementHandle>): Promise<Array<ElementHandle>> => {
    const visibleElements = [];

    for (const element of elements) {
        if (await element.boundingBox()) {
            visibleElements.push(element);
        }
    }

    return visibleElements;
};

test('Pagination page items are clickable across their mobile target area', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 9, defaultPage: 3, navigationControls: 'iconButton'},
    });

    const [page] = await getVisibleElements(await screen.findAllByRole('button', {name: 'Ir a la página 2'}));

    if (!page) {
        throw Error('Page 2 button should be visible');
    }

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

    const pagination = await screen.findByRole('navigation');
    const ellipses = await getVisibleElements(await pagination.$$('li[aria-hidden="true"]'));

    expect(ellipses).toHaveLength(2);

    await ellipses[0].click();

    await screen.findByRole('button', {name: 'Página 10, página actual'});
});
