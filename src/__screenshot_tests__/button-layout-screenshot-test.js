// @flow
import {openStoryPage} from '../test-utils';

const testDevices = ['MOBILE_IOS', 'DESKTOP'];

test.each(testDevices)('ButtonLayout UI package, device: %s', async (device) => {
    const page = await openStoryPage({
        section: 'Components|Layouts/ButtonLayout',
        name: 'ButtonLayout',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
