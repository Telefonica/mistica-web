import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

test('Grid', async () => {
    const page = await openStoryPage({
        id: 'layout-grid--default',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});

const devices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(devices)('Grid auto columns %s', async (device) => {
    const page = await openStoryPage({
        id: 'layout-grid--auto-columns',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
