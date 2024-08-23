import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each`
    device          | inverse
    ${'MOBILE_IOS'} | ${true}
    ${'MOBILE_IOS'} | ${false}
    ${'DESKTOP'}    | ${true}
    ${'DESKTOP'}    | ${false}
`('Header in $device inverse=$inverse', async ({device, inverse}: {device: Device; inverse: boolean}) => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device,
        args: {inverse},
    });

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Header vertical extra in desktop', async () => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device: 'DESKTOP',
        args: {sideBySideExtraOnDesktop: false},
    });

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Header small', async () => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device: 'MOBILE_IOS',
        args: {small: true},
    });

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each`
    device          | bleed    | sideBySideExtraOnDesktop
    ${'MOBILE_IOS'} | ${true}  | ${false}
    ${'MOBILE_IOS'} | ${false} | ${false}
    ${'DESKTOP'}    | ${true}  | ${false}
    ${'DESKTOP'}    | ${false} | ${false}
    ${'DESKTOP'}    | ${true}  | ${true}
    ${'DESKTOP'}    | ${false} | ${true}
`(
    'HeaderLayout without paddingY device=$device bleed=$bleed sideBySideExtraOnDesktop=$sideBySideExtraOnDesktop',
    async ({device, bleed, sideBySideExtraOnDesktop}) => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {noPaddingY: true, bleed, sideBySideExtraOnDesktop, inverse: true},
        });

        const story = await screen.findByTestId('header-layout');
        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    device          | inverse
    ${'MOBILE_IOS'} | ${true}
    ${'MOBILE_IOS'} | ${false}
    ${'DESKTOP'}    | ${true}
    ${'DESKTOP'}    | ${false}
`(
    'MainSectionHeader in $device inverse=$inverse',
    async ({device, inverse}: {device: Device; inverse: boolean}) => {
        await openStoryPage({
            id: 'components-headers-mainsectionheader--default',
            device,
            args: {inverse},
        });

        const story = await screen.findByTestId('header-layout');

        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(DEVICES)('Header with large text', async (device) => {
    await openStoryPage({
        id: 'components-headers-mainsectionheader--default',
        device,
    });

    await setRootFontSize(32);

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

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
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('Header with bleed', async (device) => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device,
        args: {bleed: true, sideBySideExtraOnDesktop: false, inverse: true},
    });

    const story = await screen.findByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
