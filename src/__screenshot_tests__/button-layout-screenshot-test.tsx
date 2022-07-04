import {openStoryPage} from '../test-utils';

import type {Device} from '../test-utils';

const testDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(testDevices)('ButtonLayout UI package, device: %s', async (device) => {
    const page = await openStoryPage({
        id: 'layout-buttonlayout--default',
        device,
    });

    const image = await page.screenshot({fullPage: true, captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});
