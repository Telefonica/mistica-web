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
        id: 'components-tabs--default',
        device,
        args: {icon: withIcon},
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

test('Tabs with long text', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        args: {text: 'A long text in the tab'},
    });

    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tabs with long text and icon', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        args: {text: 'A long text in the tab', icon: true},
    });

    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tabs selected line appears properly', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    await page.evaluate(() => {
        const secondTab = document.querySelector<HTMLElement>('[data-tabindex="1"]');
        secondTab?.click();
    });

    const secondTabActive = await (await screen.findByRole('tablist')).screenshot();
    expect(secondTabActive).toMatchImageSnapshot();

    await page.evaluate(() => {
        const thirdTab = document.querySelector<HTMLElement>('[data-tabindex="2"]');
        thirdTab?.click();
    });

    const thirdTabActive = await (await screen.findByRole('tablist')).screenshot();
    expect(thirdTabActive).toMatchImageSnapshot();
});
