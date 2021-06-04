import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS_SMALL', 'MOBILE_IOS', 'DESKTOP'];

test.each(DEVICES)('Double Field', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Forms/DoubleField',
        name: 'Default',
        device,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test.each(DEVICES)('Double Field: Full width', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Forms/DoubleField',
        name: 'Full Width',
        device,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});
