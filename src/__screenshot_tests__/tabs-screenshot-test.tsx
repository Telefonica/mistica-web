import {within} from '@telefonica/acceptance-testing';
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
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    const tabslist = await screen.findByRole('tablist');
    const tabs = await within(tabslist).findAllByRole('tab');

    await tabs[1].click();

    const secondTabActive = await tabslist.screenshot();
    expect(secondTabActive).toMatchImageSnapshot();

    await tabs[2].click();

    const thirdTabActive = await tabslist.screenshot();
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
