// @flow
import {openStoryPage, screen} from '../test-utils';

test.each`
    device          | withIcon
    ${'MOBILE_IOS'} | ${true}
    ${'TABLET'}     | ${true}
    ${'DESKTOP'}    | ${true}
    ${'MOBILE_IOS'} | ${false}
    ${'TABLET'}     | ${false}
    ${'DESKTOP'}    | ${false}
`('Tabs in $device withIcon ($withIcon)', async ({device, withIcon}) => {
    const page = await openStoryPage({
        section: 'Components|Controls/Tabs',
        name: 'Default',
        device,
    });

    if (withIcon) {
        await page.click(screen.getByText('With icons'));
    }

    const image = await (await screen.getByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});
