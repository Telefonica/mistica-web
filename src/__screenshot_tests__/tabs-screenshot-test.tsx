// @flow
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test.each`
    device          | withIcon
    ${'MOBILE_IOS'} | ${true}
    ${'MOBILE_IOS'} | ${false}
    ${'TABLET'}     | ${true}
    ${'TABLET'}     | ${false}
    ${'DESKTOP'}    | ${true}
    ${'DESKTOP'}    | ${false}
`('Tabs in $device withIcon ($withIcon)', async ({device, withIcon}) => {
    await openStoryPage({
        section: 'Components/Controls/Tabs',
        name: 'Tabs',
        device,
        args: {withIcon},
    });
    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tabs with large fontSize', async () => {
    await openStoryPage({
        section: 'Components/Controls/Tabs',
        name: 'Tabs',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});
