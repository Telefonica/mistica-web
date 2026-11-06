import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of [
    {device: 'MOBILE_IOS', inverse: true},
    {device: 'MOBILE_IOS', inverse: false},
    {device: 'DESKTOP', inverse: true},
    {device: 'DESKTOP', inverse: false},
] as const) {
    const {device, inverse} = testCase as {device: Device; inverse: boolean};
    test(`Header in ${testCase.device} inverse=${testCase.inverse}`, async () => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {variant: inverse ? 'brand' : 'default'},
        });

        const story = await screen.findByTestId('header-layout');
        await expectScreenshot(story);
    });
}

test('Header vertical slot in desktop', async () => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device: 'DESKTOP',
        args: {sideBySideSlotOnDesktop: false},
    });

    const story = await screen.findByTestId('header-layout');
    await expectScreenshot(story);
});

test('Header small', async () => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device: 'MOBILE_IOS',
        args: {small: true},
    });

    const story = await screen.findByTestId('header-layout');
    await expectScreenshot(story);
});

for (const testCase of [
    {device: 'MOBILE_IOS', bleed: true, sideBySideSlotOnDesktop: false},
    {device: 'MOBILE_IOS', bleed: false, sideBySideSlotOnDesktop: false},
    {device: 'DESKTOP', bleed: true, sideBySideSlotOnDesktop: false},
    {device: 'DESKTOP', bleed: false, sideBySideSlotOnDesktop: false},
    {device: 'DESKTOP', bleed: true, sideBySideSlotOnDesktop: true},
    {device: 'DESKTOP', bleed: false, sideBySideSlotOnDesktop: true},
] as const) {
    const {device, bleed, sideBySideSlotOnDesktop} = testCase;
    test(`HeaderLayout without paddingY device=${testCase.device} bleed=${testCase.bleed} sideBySideSlotOnDesktop=${testCase.sideBySideSlotOnDesktop}`, async () => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {noPaddingY: true, bleed, sideBySideSlotOnDesktop, variant: 'brand'},
        });

        const story = await screen.findByTestId('header-layout');
        await expectScreenshot(story);
    });
}

for (const testCase of [
    {device: 'MOBILE_IOS', inverse: true},
    {device: 'MOBILE_IOS', inverse: false},
    {device: 'DESKTOP', inverse: true},
    {device: 'DESKTOP', inverse: false},
] as const) {
    const {device, inverse} = testCase as {device: Device; inverse: boolean};
    test(`MainSectionHeader in ${testCase.device} inverse=${testCase.inverse}`, async () => {
        await openStoryPage({
            id: 'components-headers-mainsectionheader--default',
            device,
            args: {variant: inverse ? 'brand' : 'default'},
        });

        const story = await screen.findByTestId('header-layout');

        await expectScreenshot(story);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Header with large text (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-headers-mainsectionheader--default',
            device,
        });

        await setRootFontSize(32);

        const story = await screen.findByTestId('header-layout');
        await expectScreenshot(story);
    });
}

test('Header with truncation and color overrides', async () => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device: 'MOBILE_IOS',
        args: {
            pretitle: Array(20).fill('more text').join(' - '),
            truncatePretitle: true,
        },
    });

    const story = await screen.findByTestId('header-layout');
    await expectScreenshot(story);
});

for (const testCase of DEVICES) {
    const device = testCase;
    test(`Header with bleed (${JSON.stringify(testCase)})`, async () => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {bleed: true, sideBySideSlotOnDesktop: false, variant: 'brand'},
        });

        const story = await screen.findByTestId('header-layout');

        await expectScreenshot(story);
    });
}

for (const testCase of [
    {device: 'MOBILE_IOS', titleSize: 'title1'},
    {device: 'MOBILE_IOS', titleSize: 'title2'},
    {device: 'DESKTOP', titleSize: 'title1'},
    {device: 'DESKTOP', titleSize: 'title2'},
] as const) {
    const {device, titleSize} = testCase as {device: Device; titleSize: string};
    test(`Header in ${testCase.device} titleSize=${testCase.titleSize}`, async () => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {titleSize},
        });

        const story = await screen.findByTestId('header-layout');

        await expectScreenshot(story);
    });
}
