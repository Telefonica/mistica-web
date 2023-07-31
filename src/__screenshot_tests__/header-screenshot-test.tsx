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
            args: {noPaddingY: true, bleed, sideBySideExtraOnDesktop},
        });

        const story = await screen.findByTestId('header-layout');
        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(DEVICES)('MainSectionHeader', async (device) => {
    await openStoryPage({
        id: 'components-headers-mainsectionheader--default',
        device,
    });

    const story = await screen.findByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

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
            pretitle: ' - more text'.repeat(20),
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
        args: {bleed: true, sideBySideExtraOnDesktop: false},
    });

    const story = await screen.findByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
