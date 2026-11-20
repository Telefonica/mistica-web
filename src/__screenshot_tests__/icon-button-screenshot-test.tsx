import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const BACKGROUND_TYPES = ['transparent', 'soft', 'solid'];
const MOBILE_DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];
const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of BACKGROUND_TYPES) {
    const backgroundType = testCase;
    test(`IconButton - backgroundType = ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-buttons--icon-button-story',
            device: 'MOBILE_IOS',
            args: {backgroundType},
        });

        const story = await screen.findByTestId('icon-button');

        await expectScreenshot(story);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`IconButton - small in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-buttons--icon-button-story',
            device,
            args: {backgroundType: 'solid', small: true},
        });

        const story = await screen.findByTestId('icon-button');

        await expectScreenshot(story);
    });
}

test('IconButton - disabled', async () => {
    await openStoryPage({
        id: 'components-buttons--icon-button-story',
        device: 'MOBILE_IOS',
        args: {backgroundType: 'solid', disabled: true},
    });

    const story = await screen.findByTestId('icon-button');

    await expectScreenshot(story);
});

for (const testCase of MOBILE_DEVICES) {
    const device = testCase;
    test(`IconButton - spinner in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-buttons--icon-button-story',
            device,
            args: {backgroundType: 'solid', spinner: true},
        });

        const story = await screen.findByTestId('icon-button');

        await expectScreenshot(story);
    });
}

test('IconButton - big font size', async () => {
    await openStoryPage({
        id: 'components-buttons--icon-button-story',
        device: 'MOBILE_IOS',
        args: {backgroundType: 'solid'},
    });

    await setRootFontSize(32);
    const story = await screen.findByTestId('icon-button');

    await expectScreenshot(story);
});

for (const testCase of DEVICES) {
    const device = testCase;
    test(`IconButton - small and big font size in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-buttons--icon-button-story',
            device,
            args: {backgroundType: 'solid', small: true},
        });

        await setRootFontSize(32);
        const story = await screen.findByTestId('icon-button');

        await expectScreenshot(story);
    });
}

test('ToggleIconButton - changes styles after pressing it', async () => {
    await openStoryPage({
        id: 'components-buttons--toggle-icon-button-story',
        device: 'MOBILE_IOS',
        args: {checkedType: 'danger', checkedBackgroundType: 'soft'},
    });

    const button = await screen.findByTestId('toggle-icon-button');

    await expectScreenshot(button);

    await button.click();

    await expectScreenshot(button);
});
