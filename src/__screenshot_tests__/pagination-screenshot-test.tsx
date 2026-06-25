import {openStoryPage, screen} from '../test-utils';

import type {Device, StoryArgs} from '../test-utils';

const STORY_ID = 'components-pagination--default';

const CASES: ReadonlyArray<{name: string; device: Device; args: StoryArgs}> = [
    {name: 'Default', device: 'DESKTOP', args: {totalPages: 9, currentPage: 3}},
    {name: 'Default', device: 'MOBILE_IOS', args: {totalPages: 9, currentPage: 3}},
    {name: 'FirstPage', device: 'DESKTOP', args: {totalPages: 10, currentPage: 1}},
    {name: 'FirstPage', device: 'MOBILE_IOS', args: {totalPages: 10, currentPage: 1}},
    {name: 'LastPage', device: 'DESKTOP', args: {totalPages: 10, currentPage: 10}},
    {name: 'LastPage', device: 'MOBILE_IOS', args: {totalPages: 10, currentPage: 10}},
    {name: 'WithEllipsis', device: 'DESKTOP', args: {totalPages: 20, currentPage: 10}},
    {name: 'WithEllipsis', device: 'MOBILE_IOS', args: {totalPages: 20, currentPage: 10}},
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

test('Pagination CompactView - MOBILE_IOS_SMALL', async () => {
    await openStoryPage({
        id: STORY_ID,
        device: 'MOBILE_IOS_SMALL',
        args: {totalPages: 50, currentPage: 24, hidePageList: true},
    });

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
});
