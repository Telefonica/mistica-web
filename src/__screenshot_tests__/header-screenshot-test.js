// @flow
import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'];

test.each`
    device          | isInverse | isErrorAmount
    ${'MOBILE_IOS'} | ${true}   | ${true}
    ${'MOBILE_IOS'} | ${false}  | ${true}
    ${'MOBILE_IOS'} | ${false}  | ${false}
    ${'DESKTOP'}    | ${true}   | ${true}
`(
    'Device ($device) isInverse ($isInverse) isErrorAmount($isErrorAmount)',
    async ({
        device,
        isInverse,
        isErrorAmount,
    }: {
        device: 'MOBILE_IOS' | 'DESKTOP',
        isInverse: Boolean,
        isErrorAmount: boolean,
    }) => {
        const {click} = await openStoryPage({
            section: 'Components|Headers/Header',
            name: 'Header',
            device,
        });

        if (!isInverse) {
            await click(screen.getByText('Inverse'));
        }

        if (isErrorAmount) {
            await click(screen.getByText('Error amount'));
        }

        const story = await screen.getByTestId('header-layout');
        const image = await story.screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

test.each(DEVICES)('Header', async (device) => {
    await openStoryPage({
        section: 'Components|Headers/MainSectionHeader',
        name: 'MainSectionHeader',
        device,
    });

    const story = await screen.getByTestId('header-layout');

    const image = await story.screenshot();
    expect(image).toMatchImageSnapshot();
});
