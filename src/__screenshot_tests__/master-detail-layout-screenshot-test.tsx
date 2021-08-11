import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('MasterDetailLayout in %s', async (device) => {
    const page = await openStoryPage({
        id: 'components-layouts-masterdetaillayout--default',
        device,
    });

    const masterImage = await page.screenshot();
    expect(masterImage).toMatchImageSnapshot();

    await page.click(await screen.findByText('Personal details'));

    await screen.findByText('You are inside Personal details section');

    const detailImage = await page.screenshot();
    expect(detailImage).toMatchImageSnapshot();
});
