// @flow
import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | withIcon | withIconCurrentColor
    ${'MOBILE_IOS'} | ${true}  | ${true}
    ${'TABLET'}     | ${true}  | ${true}
    ${'DESKTOP'}    | ${true}  | ${true}
    ${'MOBILE_IOS'} | ${true}  | ${false}
    ${'TABLET'}     | ${true}  | ${false}
    ${'DESKTOP'}    | ${true}  | ${false}
    ${'MOBILE_IOS'} | ${false} | ${false}
    ${'TABLET'}     | ${false} | ${false}
    ${'DESKTOP'}    | ${false} | ${false}
`(
    'Tabs in $device withIcon ($withIcon) and withIconCurrentColor ($withIconCurrentColor)',
    async ({device, withIcon, withIconCurrentColor}) => {
        const page = await openStoryPage({
            section: 'Components/Controls/Tabs',
            name: 'Default',
            device,
        });

        if (withIcon) {
            await page.click(await screen.findByText('With icons'));
        }

        if (withIconCurrentColor) {
            await page.click(await screen.findByText('With icon color="currentColor"'));
        }

        const image = await (await screen.findByRole('tablist')).screenshot();
        expect(image).toMatchImageSnapshot();
    }
);
