import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS_SMALL', 'MOBILE_IOS', 'DESKTOP'];

test.each(DEVICES)('Double Field', async (device) => {
    const page = await openStoryPage({
        id: 'components-forms-doublefield--default',
        device,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});

test.each(DEVICES)('Double Field: Full width', async (device) => {
    const page = await openStoryPage({
        id: 'components-forms-doublefield--full-width',
        device,
    });

    expect(await page.screenshot({fullPage: true})).toMatchImageSnapshot();
});
