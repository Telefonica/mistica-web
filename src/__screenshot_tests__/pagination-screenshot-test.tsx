import {openStoryPage, screen} from '../test-utils';

import type {Device, StoryArgs} from '../test-utils';

const STORY_ID = 'components-pagination--default';

const CASES: ReadonlyArray<{name: string; args: StoryArgs}> = [
    {name: 'Default', args: {totalPages: 9, currentPage: 3}},
    {name: 'FirstPage', args: {totalPages: 10, currentPage: 1}},
    {name: 'LastPage', args: {totalPages: 10, currentPage: 10}},
    {name: 'WithEllipsis', args: {totalPages: 20, currentPage: 10}},
    {
        name: 'NavOnlyResponsive',
        args: {totalPages: 10, currentPage: 5, hidePageList: true},
    },
    {
        name: 'PagesOnly',
        args: {totalPages: 5, currentPage: 3, hideNavigationControls: true},
    },
    {
        name: 'IconOnlyControls',
        args: {totalPages: 10, currentPage: 5, mode: 'iconOnly', hidePageList: true},
    },
    {
        name: 'NextChapterLink',
        args: {
            totalPages: 10,
            currentPage: 1,
            hidePageList: true,
            navLeftLabel: 'Anterior capítulo',
            navRightLabel: 'Siguiente capítulo',
        },
    },
];

const DEVICES: ReadonlyArray<Device> = ['DESKTOP', 'MOBILE_IOS'];

const TABLE = CASES.flatMap((c) => DEVICES.map((device) => ({...c, device})));

test.each(TABLE)('Pagination $name - $device', async ({args, device}) => {
    await openStoryPage({id: STORY_ID, device, args});

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
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
