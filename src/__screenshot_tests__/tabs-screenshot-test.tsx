import {openStoryPage, screen, setRootFontSize} from '../test-utils';

// TODO: #649 Restore tests withIcon after bug will be fixed
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
        id: withIcon ? 'components-tabs--with-icon' : 'components-tabs--default',
        device,
    });
    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tabs with large fontSize', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});
