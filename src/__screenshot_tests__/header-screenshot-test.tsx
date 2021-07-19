import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

test.each`
    device          | isInverse | isErrorAmount
    ${'MOBILE_IOS'} | ${true}   | ${true}
    ${'MOBILE_IOS'} | ${false}  | ${true}
    ${'MOBILE_IOS'} | ${false}  | ${false}
    ${'DESKTOP'}    | ${true}   | ${true}
`(
    'Header in $device isInverse=$isInverse isErrorAmount=$isErrorAmount',
    async ({
        device,
        isInverse,
        isErrorAmount,
    }: {
        device: Device;
        isInverse: boolean;
        isErrorAmount: boolean;
    }) => {
        const {click} = await openStoryPage({
            id: 'components-headers-header--default',
            device,
        });

        if (!isInverse) {
            await click(await screen.findByText('Inverse'));
        }

        if (isErrorAmount) {
            await click(await screen.findByText('Error amount'));
        }

        const story = await screen.findByTestId('header-layout');
        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test('Header vertical extra in desktop', async () => {
    const {click} = await openStoryPage({
        id: 'components-headers-header--default',
        device: 'DESKTOP',
    });

    await click(await screen.findByLabelText('Extra content placed on the right in desktop'));

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
