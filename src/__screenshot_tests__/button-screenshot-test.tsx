import {openStoryPage, screen} from '../test-utils';

import type {Device} from '../test-utils';

// DISABLED, SPINNER SMALL

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

test.each(getCases())('Buttons - %s - normal (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - inverse (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
        args: {isInverse: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - disabled (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
        args: {disabled: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - spinner (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
        args: {showSpinner: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - small (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replace(' ', '-')}`,
        device: device as Device,
        args: {small: true},
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
