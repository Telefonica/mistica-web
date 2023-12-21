import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const THEME_VARIANTS = ['default', 'inverse', 'alternative'] as const;

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
    const page = await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    // We need to wait until tab elements are added to the DOM
    // https://stackoverflow.com/a/50676074
    await page.waitForSelector('[data-tabindex="0"]');

    await page.evaluate(() => {
        document.querySelector<HTMLElement>('[data-tabindex="1"]')?.click();
    });

    const secondTabActive = await (await screen.findByRole('tablist')).screenshot();
    expect(secondTabActive).toMatchImageSnapshot();

    await page.evaluate(() => {
        document.querySelector<HTMLElement>('[data-tabindex="2"]')?.click();
    });

    const thirdTabActive = await (await screen.findByRole('tablist')).screenshot();
    expect(thirdTabActive).toMatchImageSnapshot();
});

test.each(THEME_VARIANTS)('Tabs in %s theme', async (theme) => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        args: {theme},
    });
    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});

test('Tabs in dark mode', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        isDarkMode: true,
    });
    const image = await (await screen.findByRole('tablist')).screenshot();
    expect(image).toMatchImageSnapshot();
});
