import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';

const testDevices: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(testDevices)('ButtonLayout UI package, device: %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Layouts/ButtonLayout',
        name: 'ButtonLayout',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
