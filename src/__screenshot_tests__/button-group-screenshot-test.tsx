import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID', 'DESKTOP'];

test.each(DEVICES)('ButtonGroup (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-touchables-buttongroup--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
