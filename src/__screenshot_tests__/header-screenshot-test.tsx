import {openStoryPage, screen} from '../test-utils';

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
            section: 'Components/Headers/Header',
            name: 'Header',
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
        section: 'Components/Headers/Header',
        name: 'Header',
        device: 'DESKTOP',
    });

    await click(await screen.findByLabelText('Extra content placed on the right in desktop'));

    const story = await screen.findByTestId('header-layout');
    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('MainSectionHeader', async (device) => {
    await openStoryPage({
        section: 'Components/Headers/MainSectionHeader',
        name: 'MainSectionHeader',
        device,
    });

    const story = await screen.findByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
