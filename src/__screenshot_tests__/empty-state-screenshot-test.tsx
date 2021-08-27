import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];

test.each(devices)('EmptyState with image', async (device) => {
    const page = await openStoryPage({
        id: 'components-others-emptystate--with-image',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyState with icon', async (device) => {
    const page = await openStoryPage({
        id: 'components-others-emptystate--with-icon',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyState with small image', async (device) => {
    const page = await openStoryPage({
        id: 'components-others-emptystate--with-small-image',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
