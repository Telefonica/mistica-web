import {openStoryPage} from '../test-utils';
import type {Device} from '../test-utils';

const devices: Array<Device> = ['MOBILE_IOS', 'TABLET', 'DESKTOP'];

test.each(devices)('EmptyStateScreen with image', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Screens/EmptyStateScreen',
        name: 'With image',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyStateScreen with icon', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Screens/EmptyStateScreen',
        name: 'With icon',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyStateScreen with small image', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Screens/EmptyStateScreen',
        name: 'With small image',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(devices)('EmptyStateScreen with link', async (device) => {
    const page = await openStoryPage({
        section: 'Components/Screens/EmptyStateScreen',
        name: 'With link',
        device,
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
