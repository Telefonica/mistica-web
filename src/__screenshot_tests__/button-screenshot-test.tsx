import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];
const BUTTONS = ['Primary button', 'Secondary button', 'Danger button', 'Link button', 'Link button danger'];

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
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: 'MOBILE_IOS',
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - inverse', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {variantOutside: 'inverse'},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - media', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {variantOutside: 'media'},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - disabled', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {disabled: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(BUTTONS)('Buttons - %s - small', async (button) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: 'MOBILE_IOS',
        args: {small: true},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(getCases())('Buttons - %s - spinner (%s)', async (button, device) => {
    await openStoryPage({
        id: `components-buttons--${button.toLowerCase().replaceAll(' ', '-')}`,
        device: device as Device,
        args: {showSpinner: true, loadingText: 'Loading text'},
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    device              | small    | showSpinner
    ${'MOBILE_IOS'}     | ${true}  | ${true}
    ${'MOBILE_IOS'}     | ${true}  | ${false}
    ${'MOBILE_IOS'}     | ${false} | ${true}
    ${'MOBILE_IOS'}     | ${false} | ${false}
    ${'MOBILE_ANDROID'} | ${true}  | ${true}
    ${'MOBILE_ANDROID'} | ${true}  | ${false}
    ${'MOBILE_ANDROID'} | ${false} | ${true}
    ${'MOBILE_ANDROID'} | ${false} | ${false}
`(
    'Buttons - ellipsis with small = $small and showSpinner = $showSpinner ($device)',
    async ({device, small, showSpinner}) => {
        await openStoryPage({
            id: 'private-ellipsis-in-buttons--default',
            device,
            args: {small, showSpinner},
        });

        const story = await screen.findByTestId('content');

        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

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

test.each(getLinkWithChevronCases())('Buttons - Link button - %s (chevron = %s)', async (action, chevron) => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        args: {
            action,
            chevron,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Buttons - Link button - with chevron in Vivo', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        skin: 'Vivo-new',
        args: {
            chevron: true,
        },
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
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

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Buttons - Link button with chevron and big font size in Vivo', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        skin: 'Vivo-new',
        args: {
            chevron: true,
        },
    });

    await setRootFontSize(32);

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
