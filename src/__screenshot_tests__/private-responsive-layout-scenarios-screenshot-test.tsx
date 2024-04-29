import {openStoryPage} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP', 'LARGE_DESKTOP'] as const;

test.each(DEVICES)('ResponsiveLayout scenarios (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'private-responsivelayout-scenarios--default',
        device,
    });

    const image = await page.screenshot({fullPage: true});
    expect(image).toMatchImageSnapshot();
});
