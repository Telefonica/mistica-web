import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';
import {normalizeVariant} from '../theme-variant-context';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

for (const testCase of [
    {variant: 'default', isDarkMode: false},
    {variant: 'default', isDarkMode: true},
    {variant: 'inverse', isDarkMode: false},
    {variant: 'inverse', isDarkMode: true},
    {variant: 'alternative', isDarkMode: false},
    {variant: 'alternative', isDarkMode: true},
] as const) {
    const {variant, isDarkMode} = testCase;
    test(`MainNavigationBar desktop. variant={${testCase.variant}} isDarkMode={${testCase.isDarkMode}}`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device: 'DESKTOP',
            args: {variant: normalizeVariant(variant)},
            isDarkMode,
        });

        await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00002}});
    });
}

for (const testCase of [
    {variant: 'default', isDarkMode: false},
    {variant: 'default', isDarkMode: true},
    {variant: 'inverse', isDarkMode: false},
    {variant: 'inverse', isDarkMode: true},
    {variant: 'alternative', isDarkMode: false},
    {variant: 'alternative', isDarkMode: true},
] as const) {
    const {variant, isDarkMode} = testCase;
    test(`MainNavigationBar mobile. variant={${testCase.variant}} isDarkMode={${testCase.isDarkMode}}`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device: 'MOBILE_IOS',
            args: {variant: normalizeVariant(variant)},
            isDarkMode,
        });

        await expectScreenshot(page);

        await (await screen.findByRole('button', {name: 'Abrir menú de navegación'})).click();

        await expectScreenshot(page);
    });
}

test('MainNavigationBar mobile with burger menu slot', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {burgerMenuSlot: true},
    });

    await (await screen.findByRole('button', {name: 'Abrir menú de navegación'})).click();

    await expectScreenshot(page);
});

test('MainNavigationBar large', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {large: true},
    });

    await expectScreenshot(page);
});

test('MainNavigationBar wide', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {wide: true, desktopLargeMenu: true, menu: 'default'},
    });

    await expectScreenshot(page);

    // Open menu
    await (await screen.findByRole('button', {name: 'Start'})).click();
    await expectScreenshot(page);
});

test('MainNavigationBar desktop with topSlot', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {topSlot: true, desktopLargeMenu: true, menu: 'default'},
    });

    await expectScreenshot(page);

    await (await screen.findByRole('button', {name: 'Start'})).click();
    await expectScreenshot(page);
});

test('MainNavigationBar mobile with topSlot', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {topSlot: true},
    });

    await expectScreenshot(page);

    await (await screen.findByRole('button', {name: 'Abrir menú de navegación'})).click();
    await expectScreenshot(page);
});

test('MainNavigationBar desktop with topSlot and custom background', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {topSlot: true, topSlotBackgroundColor: '#FABADA'},
    });

    await expectScreenshot(page);
});

for (const testCase of [
    {variant: 'default', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'default', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'inverse', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'inverse', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'alternative', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'alternative', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'default', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'default', isDarkMode: true, device: 'MOBILE_IOS'},
    {variant: 'inverse', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'inverse', isDarkMode: true, device: 'MOBILE_IOS'},
    {variant: 'alternative', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'alternative', isDarkMode: true, device: 'MOBILE_IOS'},
] as const) {
    const {variant, isDarkMode, device} = testCase;
    test(`NavigationBar. variant={${testCase.variant}} isDarkMode={${testCase.isDarkMode}} device={${testCase.device}}`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-navigationbar--default',
            device,
            args: {variant: normalizeVariant(variant)},
            isDarkMode,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of [
    {variant: 'default', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'default', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'inverse', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'inverse', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'alternative', isDarkMode: false, device: 'DESKTOP'},
    {variant: 'alternative', isDarkMode: true, device: 'DESKTOP'},
    {variant: 'default', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'default', isDarkMode: true, device: 'MOBILE_IOS'},
    {variant: 'inverse', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'inverse', isDarkMode: true, device: 'MOBILE_IOS'},
    {variant: 'alternative', isDarkMode: false, device: 'MOBILE_IOS'},
    {variant: 'alternative', isDarkMode: true, device: 'MOBILE_IOS'},
] as const) {
    const {variant, isDarkMode, device} = testCase;
    test(`FunnelNavigationBar. variant={${testCase.variant}} isDarkMode={${testCase.isDarkMode}} device={${testCase.device}}`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-funnelnavigationbar--default',
            device,
            args: {variant: normalizeVariant(variant)},
            isDarkMode,
        });

        await expectScreenshot(page);
    });
}

for (const testCase of [
    {type: 'NavigationBar', device: 'DESKTOP'},
    {type: 'MainNavigationBar', device: 'DESKTOP'},
    {type: 'FunnelNavigationBar', device: 'DESKTOP'},
    {type: 'NavigationBar', device: 'MOBILE_IOS'},
    {type: 'MainNavigationBar', device: 'MOBILE_IOS'},
    {type: 'FunnelNavigationBar', device: 'MOBILE_IOS'},
] as const) {
    const {type, device} = testCase;
    test(`${testCase.type} without border. device={${testCase.device}}`, async () => {
        const page = await openStoryPage({
            id: `components-navigation-bars-${type.toLowerCase()}--default`,
            device,
            args: {border: false},
        });

        await expectScreenshot(page);
    });
}

for (const testCase of DEVICES) {
    const device = testCase;
    test(`MainNavigationBar without sections (${testCase})`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device,
            args: {sections: false},
        });

        await expectScreenshot(page);
    });
}

// These test cases have been skipped because they produce different results in UI and headless mode.
// In headless mode, the menu gets rendered in an unexpected position
// https://jira.tid.es/browse/WEB-2365
// ${'small'} | ${'default'}
// ${'small'} | ${'custom'}
for (const testCase of [
    {menuType: 'large', content: 'default'},
    {menuType: 'large', content: 'custom'},
] as const) {
    const {menuType, content} = testCase;
    test(`MainNavigationBar with ${testCase.menuType} menu and ${testCase.content} content in DESKTOP`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device: 'DESKTOP',
            args: {sections: true, desktopLargeMenu: menuType === 'large', menu: content},
        });

        // first section opened
        await (await screen.findByRole('button', {name: 'Start'})).click();
        await expectScreenshot(page);

        // second section opened
        await (await screen.findByRole('button', {name: 'Account'})).click();
        await expectScreenshot(page);

        // close menu with ESC key
        await page.keyboard.press('Escape');
        await expectScreenshot(page);
    });
}

for (const testCase of ['default', 'custom']) {
    const menu = testCase;
    test(`MainNavigationBar with menu and ${testCase} content in MOBILE_IOS`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device: 'MOBILE_IOS',
            args: {sections: true, menu},
        });

        await (await screen.findByRole('button', {name: 'Abrir menú de navegación'})).click();

        // open first section
        await (await screen.findByRole('button', {name: 'Start'})).click();
        await expectScreenshot(page);

        // go back
        await (await screen.findByRole('button', {name: 'Atrás'})).click();
        await expectScreenshot(page);

        // open second section
        await (await screen.findByRole('button', {name: 'Account'})).click();
        await expectScreenshot(page);

        // close menu
        await (await screen.findByRole('button', {name: 'Cerrar menú de navegación'})).click();
        await expectScreenshot(page);
    });
}

// Test case skipped because it produces different results in UI and headless mode.
// In headless mode, the menu gets rendered in an unexpected position
// https://jira.tid.es/browse/WEB-2365
for (const testCase of ['large' /* 'small' */]) {
    const menuType = testCase;
    test(`MainNavigationBar inverse with ${testCase} menu in DESKTOP`, async () => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-mainnavigationbar--default',
            device: 'DESKTOP',
            args: {sections: true, desktopLargeMenu: menuType === 'large', menu: 'default', variant: 'brand'},
        });

        const startButton = await screen.findByRole('button', {name: 'Start'});
        await startButton.click();
        await expectScreenshot(page, {...{maxDiffPixelRatio: 0.00002}});
    });
}

test('MainNavigationBar large with expanded right slot', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {
            large: true,
            expandedRightSlot: true,
        },
    });

    await expectScreenshot(page);
});
