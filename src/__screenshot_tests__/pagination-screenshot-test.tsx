import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const STORIES = [
    {id: 'components-pagination--default', name: 'Default'},
    {id: 'components-pagination--first-page', name: 'FirstPage'},
    {id: 'components-pagination--last-page', name: 'LastPage'},
    {id: 'components-pagination--with-ellipsis', name: 'WithEllipsis'},
    {id: 'components-pagination--nav-only-responsive', name: 'NavOnlyResponsive'},
    {id: 'components-pagination--pages-only', name: 'PagesOnly'},
    {id: 'components-pagination--icon-only-controls', name: 'IconOnlyControls'},
    {id: 'components-pagination--next-chapter-link', name: 'NextChapterLink'},
];
const DEVICES = ['DESKTOP', 'MOBILE_IOS'] as const;

const getCases = () => {
    const cases: Array<[string, string, Device]> = [];
    for (const story of STORIES) {
        for (const device of DEVICES) {
            cases.push([story.name, story.id, device]);
        }
    }
    return cases;
};

test.each(getCases())('Pagination %s - %s', async (_name, id, device) => {
    await openStoryPage({id, device});

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
});

// Compact view only renders below 375px viewport. We use MOBILE_IOS_SMALL (320px)
// to drive the vertical layout and the current ± 1 page reduction.
test('Pagination CompactView - MOBILE_IOS_SMALL', async () => {
    await openStoryPage({
        id: 'components-pagination--compact-view',
        device: 'MOBILE_IOS_SMALL',
    });

    const pagination = await screen.findByTestId('Pagination');
    const image = await pagination.screenshot();
    expect(image).toMatchImageSnapshot();
});
