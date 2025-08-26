import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(TESTABLE_DEVICES)('MediaCard in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device,
    });

    const mediaCard = await screen.findByTestId('media-card');

    const image = await mediaCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('MediaCard with large fontSize in %s', async (device) => {
    await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device,
    });

    await setRootFontSize(32);

    const mediaCard = await screen.findByTestId('media-card');

    const image = await mediaCard.screenshot({captureBeyondViewport: true});

    expect(image).toMatchImageSnapshot();
});

test('MediaCard group', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--group',
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('MediaCard with body ', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            extra: true,
            actions: 'button and link',
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('MediaCard with body closeable', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            extra: true,
            actions: 'button and link',
            closable: true,
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test('MediaCard with top actions', async () => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device: 'MOBILE_IOS',
        args: {
            extra: true,
            actions: 'button and link',
            topAction: true,
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});

test.each(TESTABLE_DEVICES)('MediaCard with asset in %s', async (device) => {
    const page = await openStoryPage({
        id: 'private-deprecated-card-stories-mediacard--default',
        device,
        args: {
            asset: 'circle with icon',
        },
    });

    const image = await page.screenshot({fullPage: true});

    expect(image).toMatchImageSnapshot();
});
