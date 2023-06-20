import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];

test.each(DEVICES)('Buttons - normal (%s)', async (device) => {
    await openStoryPage({
        id: 'components-buttons--type-of-buttons',
        device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - disabled (%s)', async (device) => {
    await openStoryPage({
        id: 'components-buttons--type-of-buttons',
        device,
        args: {
            disabled: true,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - spinner (%s)', async (device) => {
    await openStoryPage({
        id: 'components-buttons--type-of-buttons',
        device,
        args: {
            showSpinner: true,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - small (%s)', async (device) => {
    await openStoryPage({
        id: 'components-buttons--type-of-buttons',
        device,
        args: {
            small: true,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - ellipsis (%s)', async (device) => {
    await openStoryPage({
        id: 'components-buttons--ellipsis-in-buttons',
        device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Buttons with icon', async () => {
    const page = await openStoryPage({
        id: 'components-buttons--with-icon',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
});
