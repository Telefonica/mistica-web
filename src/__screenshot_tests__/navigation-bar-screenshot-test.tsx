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

    expect(image).toMatchImageSnapshot({failureThreshold: 0.00001});
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
        args: {withBurgerMenuExtra: true},
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
        args: {withBorder: false},
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each(DEVICES)('MainNavigationBar without sections (%s)', async (device) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device,
        args: {withSections: false},
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});
