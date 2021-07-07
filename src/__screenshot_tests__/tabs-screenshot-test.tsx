// @flow
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

test.each`
    device          | withIcon | useCurrentColorInIcon
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
    'Tabs in $device withIcon ($withIcon) and useCurrentColorInIcon ($useCurrentColorInIcon)',
    async ({device, withIcon, useCurrentColorInIcon}) => {
        await openStoryPage({
            section: 'Components/Controls/Tabs',
            name: 'Tabs',
            device,
            args: {withIcon, useCurrentColorInIcon},
        });
        const image = await (await screen.findByRole('tablist')).screenshot();
        expect(image).toMatchImageSnapshot();
    }
);

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
