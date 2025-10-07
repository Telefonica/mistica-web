import {openStoryPage, screen} from '../test-utils';

const DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;

test.each`
    variant          | isDarkMode
    ${'default'}     | ${false}
    ${'default'}     | ${true}
    ${'inverse'}     | ${false}
    ${'inverse'}     | ${true}
    ${'alternative'} | ${false}
    ${'alternative'} | ${true}
`('MainNavigationBar desktop. variant={$variant} isDarkMode={$isDarkMode}', async ({variant, isDarkMode}) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {variant},
        isDarkMode,
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({failureThreshold: 0.00002});
});

test.each`
    variant          | isDarkMode
    ${'default'}     | ${false}
    ${'default'}     | ${true}
    ${'inverse'}     | ${false}
    ${'inverse'}     | ${true}
    ${'alternative'} | ${false}
    ${'alternative'} | ${true}
`('MainNavigationBar mobile. variant={$variant} isDarkMode={$isDarkMode}', async ({variant, isDarkMode}) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {variant},
        isDarkMode,
    });

    const menuCloseImage = await page.screenshot();
    expect(menuCloseImage).toMatchImageSnapshot();

    await page.click(await screen.findByRole('button', {name: 'Abrir menú de navegación'}));

    const menuOpenImage = await page.screenshot();
    expect(menuOpenImage).toMatchImageSnapshot();
});

test('MainNavigationBar mobile with burger menu extra', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {burgerMenuExtra: true},
    });

    await page.click(await screen.findByRole('button', {name: 'Abrir menú de navegación'}));

    const menuOpenImage = await page.screenshot();
    expect(menuOpenImage).toMatchImageSnapshot();
});

test('MainNavigationBar large', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {large: true},
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test('MainNavigationBar wide', async () => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {wide: true, desktopLargeMenu: true, menu: 'default'},
    });

    expect(await page.screenshot()).toMatchImageSnapshot();

    // Open menu
    await page.click(await screen.findByRole('button', {name: 'Start'}));
    expect(await page.screenshot()).toMatchImageSnapshot();
});

test.each`
    variant          | isDarkMode | device
    ${'default'}     | ${false}   | ${'DESKTOP'}
    ${'default'}     | ${true}    | ${'DESKTOP'}
    ${'inverse'}     | ${false}   | ${'DESKTOP'}
    ${'inverse'}     | ${true}    | ${'DESKTOP'}
    ${'alternative'} | ${false}   | ${'DESKTOP'}
    ${'alternative'} | ${true}    | ${'DESKTOP'}
    ${'default'}     | ${false}   | ${'MOBILE_IOS'}
    ${'default'}     | ${true}    | ${'MOBILE_IOS'}
    ${'inverse'}     | ${false}   | ${'MOBILE_IOS'}
    ${'inverse'}     | ${true}    | ${'MOBILE_IOS'}
    ${'alternative'} | ${false}   | ${'MOBILE_IOS'}
    ${'alternative'} | ${true}    | ${'MOBILE_IOS'}
`(
    'NavigationBar. variant={$variant} isDarkMode={$isDarkMode} device={$device}',
    async ({variant, isDarkMode, device}) => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-navigationbar--default',
            device,
            args: {variant},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    variant          | isDarkMode | device
    ${'default'}     | ${false}   | ${'DESKTOP'}
    ${'default'}     | ${true}    | ${'DESKTOP'}
    ${'inverse'}     | ${false}   | ${'DESKTOP'}
    ${'inverse'}     | ${true}    | ${'DESKTOP'}
    ${'alternative'} | ${false}   | ${'DESKTOP'}
    ${'alternative'} | ${true}    | ${'DESKTOP'}
    ${'default'}     | ${false}   | ${'MOBILE_IOS'}
    ${'default'}     | ${true}    | ${'MOBILE_IOS'}
    ${'inverse'}     | ${false}   | ${'MOBILE_IOS'}
    ${'inverse'}     | ${true}    | ${'MOBILE_IOS'}
    ${'alternative'} | ${false}   | ${'MOBILE_IOS'}
    ${'alternative'} | ${true}    | ${'MOBILE_IOS'}
`(
    'FunnelNavigationBar. variant={$variant} isDarkMode={$isDarkMode} device={$device}',
    async ({variant, isDarkMode, device}) => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-funnelnavigationbar--default',
            device,
            args: {variant},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    type                     | device
    ${'NavigationBar'}       | ${'DESKTOP'}
    ${'MainNavigationBar'}   | ${'DESKTOP'}
    ${'FunnelNavigationBar'} | ${'DESKTOP'}
    ${'NavigationBar'}       | ${'MOBILE_IOS'}
    ${'MainNavigationBar'}   | ${'MOBILE_IOS'}
    ${'FunnelNavigationBar'} | ${'MOBILE_IOS'}
`('$type without border. device={$device}', async ({type, device}) => {
    const page = await openStoryPage({
        id: `components-navigation-bars-${type.toLowerCase()}--default`,
        device,
        args: {border: false},
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('MainNavigationBar without sections (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device,
        args: {sections: false},
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    menuType   | content
    ${'large'} | ${'default'}
    ${'large'} | ${'custom'}
    ${'small'} | ${'default'}
    ${'small'} | ${'custom'}
`('MainNavigationBar with $menuType menu and $content content in DESKTOP', async ({menuType, content}) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {sections: true, desktopLargeMenu: menuType === 'large', menu: content},
    });

    // first section opened
    await page.click(await screen.findByRole('button', {name: 'Start'}));
    expect(await page.screenshot()).toMatchImageSnapshot();

    // second section opened
    await page.click(await screen.findByRole('button', {name: 'Account'}));
    expect(await page.screenshot()).toMatchImageSnapshot();

    // close menu with ESC key
    await page.keyboard.press('Escape');
    expect(await page.screenshot()).toMatchImageSnapshot();
});

test.each(['default', 'custom'])('MainNavigationBar with menu and %s content in MOBILE_IOS', async (menu) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {sections: true, menu},
    });

    await page.click(await screen.findByRole('button', {name: 'Abrir menú de navegación'}));

    // open first section
    await page.click(await screen.findByRole('button', {name: 'Start'}));
    expect(await page.screenshot()).toMatchImageSnapshot();

    // go back
    await page.click(await screen.findByRole('button', {name: 'Atrás'}));
    expect(await page.screenshot()).toMatchImageSnapshot();

    // open second section
    await page.click(await screen.findByRole('button', {name: 'Account'}));
    expect(await page.screenshot()).toMatchImageSnapshot();

    // close menu
    await page.click(await screen.findByRole('button', {name: 'Cerrar menú de navegación'}));
    expect(await page.screenshot()).toMatchImageSnapshot();
});

test.each(['large', 'small'])('MainNavigationBar inverse with %s menu in DESKTOP', async (menuType) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {sections: true, desktopLargeMenu: menuType === 'large', menu: 'default', variant: 'inverse'},
    });

    // first section opened
    await page.click(await screen.findByRole('button', {name: 'Start'}));
    expect(await page.screenshot()).toMatchImageSnapshot({failureThreshold: 0.00002});
});
