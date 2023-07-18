import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each`
    device          | isInverse
    ${'MOBILE_IOS'} | ${true}
    ${'MOBILE_IOS'} | ${false}
    ${'DESKTOP'}    | ${true}
    ${'DESKTOP'}    | ${false}
`(
    'Header in $device isInverse=$isInverse',
    async ({device, isInverse}: {device: Device; isInverse: boolean}) => {
        await openStoryPage({
            id: 'components-headers-header--default',
            device,
            args: {isInverse},
        });

        const story = await screen.findByTestId('header-layout');
        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

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

test.each(DEVICES)('HeaderLayout without paddingY', async (device) => {
    await openStoryPage({
        id: 'components-headers-header--default',
        device,
        args: {noPaddingY: true},
    });

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

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
        id: 'components-headers-header--rich-texts',
        device: 'MOBILE_IOS',
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
