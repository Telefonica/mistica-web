import {test, expectScreenshot} from '../test-utils/playwright';
import {within, openStoryPage, screen, setRootFontSize} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

const THEME_VARIANTS = ['default', 'inverse', 'alternative'] as const;

for (const testCase of [
    {device: 'MOBILE_IOS', withIcon: true},
    {device: 'MOBILE_IOS', withIcon: false},
    {device: 'TABLET', withIcon: true},
    {device: 'TABLET', withIcon: false},
    {device: 'DESKTOP', withIcon: true},
    {device: 'DESKTOP', withIcon: false},
] as const) {
    const {device, withIcon} = testCase;
    test(`Tabs in ${testCase.device} withIcon (${testCase.withIcon})`, async () => {
        await openStoryPage({
            id: 'components-tabs--default',
            device,
            args: {icon: withIcon},
        });
        await expectScreenshot(await screen.findByRole('tablist'));
    });
}

test('Tabs with large fontSize', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    await setRootFontSize(32);

    await expectScreenshot(await screen.findByRole('tablist'));
});

test('Tabs with long text', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        args: {text: 'A long text in the tab'},
    });

    await expectScreenshot(await screen.findByRole('tablist'));
});

test('Tabs with long text and icon', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        args: {text: 'A long text in the tab', icon: true},
    });

    await expectScreenshot(await screen.findByRole('tablist'));
});

test('Tabs selected line appears properly', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
    });

    const tabslist = await screen.findByRole('tablist');
    const tabs = await within(tabslist).findAllByRole('tab');

    await tabs[1].click();

    await expectScreenshot(tabslist);

    await tabs[2].click();

    await expectScreenshot(tabslist);
});

for (const testCase of THEME_VARIANTS) {
    const variant = testCase;
    test(`Tabs in ${testCase} theme`, async () => {
        await openStoryPage({
            id: 'components-tabs--default',
            device: 'MOBILE_IOS',
            args: {variantOutside: normalizeVariant(variant)},
        });
        await expectScreenshot(await screen.findByRole('tablist'));
    });
}

test('Tabs in dark mode', async () => {
    await openStoryPage({
        id: 'components-tabs--default',
        device: 'MOBILE_IOS',
        isDarkMode: true,
    });
    await expectScreenshot(await screen.findByRole('tablist'));
});
