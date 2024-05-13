import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'MOBILE_ANDROID'];
const BUTTONS = ['Primary button', 'Secondary button', 'Danger button', 'Link button', 'Link button danger'];
const SMALL_BUTTONS = ['Primary button', 'Secondary button', 'Danger button'];

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
        args: {inverse: true},
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

test.each(SMALL_BUTTONS)('Buttons - %s - small', async (button) => {
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

test.each(DEVICES)('Buttons - ellipsis (%s)', async (device) => {
    await openStoryPage({
        id: 'private-ellipsis-in-buttons--default',
        device,
    });

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

const BUTTON_LINK_ACTIONS = ['href', 'to', 'onPress'];
const BUTTON_LINK_CHEVRON_OPTIONS = ['default', 'true', 'false'];

const getLinkWithChevronCases = () => {
    const cases = [];
    for (const action of BUTTON_LINK_ACTIONS) {
        for (const withChevron of BUTTON_LINK_CHEVRON_OPTIONS) {
            cases.push([action, withChevron]);
        }
    }
    return cases;
};

test.each(getLinkWithChevronCases())(
    'Buttons - Link button - %s (chevron = %s)',
    async (action, withChevron) => {
        await openStoryPage({
            id: 'components-buttons--link-button',
            device: 'MOBILE_IOS',
            args: {
                action,
                withChevron,
            },
        });

        const story = await screen.findByTestId('content');

        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Buttons - Link button - with chevron in Vivo', async () => {
    await openStoryPage({
        id: 'components-buttons--link-button',
        device: 'MOBILE_IOS',
        skin: 'Vivo-new',
        args: {
            withChevron: true,
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
            withChevron: true,
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
            withChevron: true,
        },
    });

    await setRootFontSize(32);

    const story = await screen.findByTestId('content');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
