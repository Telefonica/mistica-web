import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('MediaCard in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Cards/MediaCard',
        name: 'MediaCard',
        device,
    });

    const mediaCard = await screen.findByTestId('media-card');

    const image = await mediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('MediaCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        section: 'Components/Cards/MediaCard',
        name: 'MediaCard',
        device,
    });

    await setRootFontSize(32);

    const mediaCard = await screen.findByTestId('media-card');

    const image = await mediaCard.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('MediaCard group', async () => {
    const page = await openStoryPage({
        section: 'Components/Cards/MediaCard',
        name: 'MediaCard group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('MediaCard with body ', async () => {
    const page = await openStoryPage({
        section: 'Components/Cards/MediaCard',
        name: 'MediaCard with body',
        device: 'MOBILE_IOS',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
