import {openStoryPage, screen} from '../test-utils';

import type {Device, StoryArgs} from '../test-utils';

const STORY_ID = 'components-pagination--default';

const CASES: ReadonlyArray<{name: string; device: Device; args: StoryArgs}> = [
    {name: 'Default', device: 'DESKTOP', args: {totalPages: 9, currentPage: 3}},
    {name: 'Default', device: 'MOBILE_IOS', args: {totalPages: 9, currentPage: 3, mode: 'iconOnly'}},
    {name: 'FirstPage', device: 'DESKTOP', args: {totalPages: 10, currentPage: 1}},
    {name: 'FirstPage', device: 'MOBILE_IOS', args: {totalPages: 10, currentPage: 1, mode: 'iconOnly'}},
    {name: 'LastPage', device: 'DESKTOP', args: {totalPages: 10, currentPage: 10}},
    {name: 'LastPage', device: 'MOBILE_IOS', args: {totalPages: 10, currentPage: 10, mode: 'iconOnly'}},
    {name: 'WithEllipsis', device: 'DESKTOP', args: {totalPages: 20, currentPage: 10}},
    {name: 'WithEllipsis', device: 'MOBILE_IOS', args: {totalPages: 20, currentPage: 10, mode: 'iconOnly'}},
    {
        name: 'NavOnlyResponsive',
        device: 'DESKTOP',
        args: {totalPages: 10, currentPage: 5, hidePageList: true},
    },
    {
        name: 'NavOnlyResponsive',
        device: 'MOBILE_IOS',
        args: {totalPages: 10, currentPage: 5, hidePageList: true},
    },
    {
        name: 'PagesOnly',
        device: 'DESKTOP',
        args: {totalPages: 5, currentPage: 3, hideNavigationControls: true},
    },
    {
        name: 'PagesOnly',
        device: 'MOBILE_IOS',
        args: {totalPages: 5, currentPage: 3, hideNavigationControls: true},
    },
    {
        name: 'IconOnlyControls',
        device: 'DESKTOP',
        args: {totalPages: 10, currentPage: 5, mode: 'iconOnly', hidePageList: true},
    },
    {
        name: 'IconOnlyControls',
        device: 'MOBILE_IOS',
        args: {totalPages: 10, currentPage: 5, mode: 'iconOnly', hidePageList: true},
    },
    {
        name: 'NextChapterLink',
        device: 'DESKTOP',
        args: {
            totalPages: 10,
            currentPage: 1,
            hidePageList: true,
            navLeftLabel: 'Anterior capítulo',
            navRightLabel: 'Siguiente capítulo',
        },
    },
    {
        name: 'NextChapterLink',
        device: 'MOBILE_IOS',
        args: {
            totalPages: 10,
            currentPage: 1,
            hidePageList: true,
            navLeftLabel: 'Anterior capítulo',
            navRightLabel: 'Siguiente capítulo',
        },
    },
    {
        name: 'BrandContext',
        device: 'DESKTOP',
        args: {totalPages: 20, currentPage: 10, variantOutside: 'brand'},
    },
    {
        name: 'NegativeContext',
        device: 'DESKTOP',
        args: {totalPages: 20, currentPage: 10, variantOutside: 'negative'},
    },
    {
        name: 'AlternativeContext',
        device: 'DESKTOP',
        args: {totalPages: 20, currentPage: 10, variantOutside: 'alternative'},
    },
];

test.each(CASES)('Pagination $name - $device', async ({args, device}) => {
    await openStoryPage({id: STORY_ID, device, args});

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Pagination interactive items have 48px targets on mobile', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 9, currentPage: 3, mode: 'iconOnly'},
    });

    const previous = await screen.findByRole('button', {name: 'Página anterior'});
    const page = await screen.findByRole('button', {name: 'Ir a la página 2'});
    const currentPage = await screen.findByRole('button', {name: 'Página 3, página actual'});
    const next = await screen.findByRole('button', {name: 'Página siguiente'});
    const targets = [previous, page, currentPage, next];

    for (const target of targets) {
        expect(await target.boundingBox()).toMatchObject({width: 48, height: 48});
    }
});

test('Pagination ellipses are non-interactive and keep the mobile layout size', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        args: {totalPages: 20, currentPage: 10, mode: 'iconOnly'},
    });

    const pagination = await screen.findByTestId('Pagination');
    const ellipses = await pagination.$$('li[aria-hidden="true"]');

    expect(ellipses).toHaveLength(2);

    for (const ellipsis of ellipses) {
        const content = await ellipsis.$('span');

        expect(await ellipsis.boundingBox()).toMatchObject({width: 48, height: 48});
        expect(await content?.boundingBox()).toMatchObject({width: 32, height: 32});
        expect(await ellipsis.evaluate((element) => element.tabIndex)).toBe(-1);
    }
});

test.each`
    variantOutside   | color
    ${'default'}     | ${'rgb(96, 94, 92)'}
    ${'brand'}       | ${'rgb(255, 255, 255)'}
    ${'negative'}    | ${'rgb(255, 255, 255)'}
    ${'alternative'} | ${'rgb(96, 94, 92)'}
`('Pagination ellipsis color in $variantOutside context', async ({variantOutside, color}) => {
    await openStoryPage({
        id: STORY_ID,
        device: 'DESKTOP',
        args: {totalPages: 20, currentPage: 10, variantOutside},
    });

    const pagination = await screen.findByTestId('Pagination');
    const ellipsis = await pagination.$('li[aria-hidden="true"] span');

    expect(await ellipsis?.evaluate((element) => getComputedStyle(element).color)).toBe(color);
});

test('Pagination compact view fits at 360px', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS',
        viewport: {
            width: 360,
            height: 667,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true,
            isLandscape: false,
        },
        args: {totalPages: 9, currentPage: 3},
    });

    const pagination = await screen.findByTestId('Pagination');
    const previous = await screen.findByRole('button', {name: 'Página anterior'});
    const next = await screen.findByRole('button', {name: 'Página siguiente'});
    const pageList = await pagination.$('ol');

    expect(pageList).toBeNull();
    const previousBox = await previous.boundingBox();
    const nextBox = await next.boundingBox();
    const paginationBox = await pagination.boundingBox();

    expect(previousBox?.width).toBeGreaterThanOrEqual(48);
    expect(previousBox?.height).toBe(48);
    expect(nextBox?.width).toBeGreaterThanOrEqual(48);
    expect(nextBox?.height).toBe(48);
    expect(previousBox?.y).toBe(nextBox?.y);
    expect(paginationBox?.x + paginationBox?.width).toBeLessThanOrEqual(360);
});

test('Pagination CompactView - MOBILE_IOS_SMALL', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS_SMALL',
        args: {totalPages: 50, currentPage: 24},
    });

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
});
