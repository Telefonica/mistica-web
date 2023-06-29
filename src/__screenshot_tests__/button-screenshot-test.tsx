import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];
const BUTTONS = ['Primary button', 'Secondary button', 'Danger button', 'Link button'];

const getCases = () => {
    const cases = [];
    for (const device of DEVICES) {
        for (const button of BUTTONS) {
            cases.push([button, device]);
        }
    }
    return cases;
};

test.each(BUTTONS)('Buttons - %s - normal', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - inverse', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {isInverse: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - disabled', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - small', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {small: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - spinner (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
        args: {showSpinner: true, loadingText: 'Loading text'},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Buttons - ellipsis (%s)', async (device) => {
    await openStoryPage({
        id: 'private-ellipsis-in-buttons--default',
        device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Buttons - Link button - href and no chevron', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        args: {
            noChevron: true,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
