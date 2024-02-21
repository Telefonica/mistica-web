import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const BACKGROUND_TYPES = ['transparent', 'soft', 'solid'];
const MOBILE_DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];
const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each(BACKGROUND_TYPES)('IconButton - backgroundType = %s', async (backgroundType) => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device: 'MOBILE_IOS',
        args: {backgroundType},
    });

    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('IconButton - small in %s', async (device) => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device,
        args: {backgroundType: 'solid', small: true},
    });

    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('IconButton - disabled', async () => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device: 'MOBILE_IOS',
        args: {backgroundType: 'solid', disabled: true},
    });

    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(MOBILE_DEVICES)('IconButton - spinner in %s', async (device) => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device,
        args: {backgroundType: 'solid', showSpinner: true},
    });

    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('IconButton - big font size', async () => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device: 'MOBILE_IOS',
        args: {backgroundType: 'solid'},
    });

    await setRootFontSize(32);
    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('IconButton - small and big font size', async () => {
    await openStoryPage({
        id: 'components-buttons-iconbutton--default',
        device: 'MOBILE_IOS',
        args: {backgroundType: 'solid', small: true},
    });

    await setRootFontSize(32);
    const story = await screen.findByTestId('icon-button');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
