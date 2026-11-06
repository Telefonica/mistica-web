import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

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

for (const testCase of BUTTONS) {
    const button = testCase;
    test(`Buttons - ${testCase} - normal`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: 'MOBILE_IOS',
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

for (const testCase of BUTTONS) {
    const button = testCase;
    test(`Buttons - ${testCase} - inverse`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: 'MOBILE_IOS',
            args: {variantOutside: 'brand'},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

for (const testCase of BUTTONS) {
    const button = testCase;
    test(`Buttons - ${testCase} - media`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: 'MOBILE_IOS',
            args: {variantOutside: 'media'},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

for (const testCase of BUTTONS) {
    const button = testCase;
    test(`Buttons - ${testCase} - disabled`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: 'MOBILE_IOS',
            args: {disabled: true},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

for (const testCase of BUTTONS) {
    const button = testCase;
    test(`Buttons - ${testCase} - small`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: 'MOBILE_IOS',
            args: {small: true},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

test('Buttons - Link button - small disabled on hover', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'DESKTOP',
        args: {small: true, disabled: true, action: 'onPress'},
    });

    const button = await screen.findByRole('button', {name: 'Example'});
    await button.hover();

    const story = await screen.findByTestId('content');

    await expectScreenshot(story);
});

for (const testCase of getCases()) {
    const [button, device] = testCase;
    test(`Buttons - ${testCase[0]} - spinner (${testCase[1]})`, async () => {
        await openStoryPage({
            id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
            device: device as Device,
            args: {showSpinner: true, loadingText: 'Loading text'},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

for (const testCase of [
    {device: 'MOBILE_IOS', small: true, showSpinner: true},
    {device: 'MOBILE_IOS', small: true, showSpinner: false},
    {device: 'MOBILE_IOS', small: false, showSpinner: true},
    {device: 'MOBILE_IOS', small: false, showSpinner: false},
    {device: 'MOBILE_ANDROID', small: true, showSpinner: true},
    {device: 'MOBILE_ANDROID', small: true, showSpinner: false},
    {device: 'MOBILE_ANDROID', small: false, showSpinner: true},
    {device: 'MOBILE_ANDROID', small: false, showSpinner: false},
] as const) {
    const {device, small, showSpinner} = testCase;
    test(`Buttons - ellipsis with small = ${testCase.small} and showSpinner = ${testCase.showSpinner} (${testCase.device})`, async () => {
        await openStoryPage({
            id: 'private-ellipsis-in-buttons--default',
            device,
            args: {small, showSpinner},
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

const BUTTON_LINK_ACTIONS = ['href', 'to', 'onPress'];
const BUTTON_LINK_CHEVRON_OPTIONS = ['default', 'true', 'false'];

const getLinkWithChevronCases = () => {
    const cases = [];
    for (const action of BUTTON_LINK_ACTIONS) {
        for (const chevron of BUTTON_LINK_CHEVRON_OPTIONS) {
            cases.push([action, chevron]);
        }
    }
    return cases;
};

for (const testCase of getLinkWithChevronCases()) {
    const [action, chevron] = testCase;
    test(`Buttons - Link button - ${testCase[0]} (chevron = ${testCase[1]})`, async () => {
        await openStoryPage({
            id: 'components-buttons--link-button',
            device: 'MOBILE_IOS',
            args: {
                action,
                chevron,
            },
        });

        const story = await screen.findByTestId('content');

        await expectScreenshot(story);
    });
}

test('Buttons - Link button - with chevron in Vivo', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        skin: 'Vivo',
        args: {
            chevron: true,
        },
    });

    const story = await screen.findByTestId('content');

    await expectScreenshot(story);
});

test('Buttons - Link button with chevron and big font size', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        args: {
            chevron: true,
        },
    });

    await setRootFontSize(32);

    const story = await screen.findByTestId('content');

    await expectScreenshot(story);
});

test('Buttons - Link button with chevron and big font size in Vivo', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        skin: 'Vivo',
        args: {
            chevron: true,
        },
    });

    await setRootFontSize(32);

    const story = await screen.findByTestId('content');

    await expectScreenshot(story);
});
