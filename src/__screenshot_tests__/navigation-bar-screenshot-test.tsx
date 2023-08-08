import {openStoryPage, screen} from '../test-utils';

test.each`
    inverse  | isDarkMode
    ${false} | ${false}
    ${false} | ${true}
    ${true}  | ${false}
    ${true}  | ${true}
`('MainNavigationBar desktop. inverse={$inverse} isDarkMode={$isDarkMode}', async ({inverse, isDarkMode}) => {
    await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'DESKTOP',
        args: {inverse},
        isDarkMode,
    });

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
});

test.each`
    inverse  | isDarkMode
    ${false} | ${false}
    ${false} | ${true}
    ${true}  | ${false}
    ${true}  | ${true}
`('MainNavigationBar mobile. inverse={$inverse} isDarkMode={$isDarkMode}', async ({inverse, isDarkMode}) => {
    const page = await openStoryPage({
        id: 'components-navigation-bars-mainnavigationbar--default',
        device: 'MOBILE_IOS',
        args: {inverse},
        isDarkMode,
    });

    const menuCloseImage = await page.screenshot();
    expect(menuCloseImage).toMatchImageSnapshot();

    await page.click(await screen.findByRole('button', {name: 'Abrir menú de navegación'}));

    const menuOpenImage = await page.screenshot();
    expect(menuOpenImage).toMatchImageSnapshot();
});

test.each`
    inverse  | isDarkMode | device
    ${false} | ${false}   | ${'DESKTOP'}
    ${false} | ${true}    | ${'DESKTOP'}
    ${true}  | ${false}   | ${'DESKTOP'}
    ${true}  | ${true}    | ${'DESKTOP'}
    ${false} | ${false}   | ${'MOBILE_IOS'}
    ${false} | ${true}    | ${'MOBILE_IOS'}
    ${true}  | ${false}   | ${'MOBILE_IOS'}
    ${true}  | ${true}    | ${'MOBILE_IOS'}
`(
    'NavigationBar. inverse={$inverse} isDarkMode={$isDarkMode} device={$device}',
    async ({inverse, isDarkMode, device}) => {
        await openStoryPage({
            id: 'components-navigation-bars-navigationbar--default',
            device,
            args: {inverse},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    inverse  | isDarkMode | device
    ${false} | ${false}   | ${'DESKTOP'}
    ${false} | ${true}    | ${'DESKTOP'}
    ${true}  | ${false}   | ${'DESKTOP'}
    ${true}  | ${true}    | ${'DESKTOP'}
    ${false} | ${false}   | ${'MOBILE_IOS'}
    ${false} | ${true}    | ${'MOBILE_IOS'}
    ${true}  | ${false}   | ${'MOBILE_IOS'}
    ${true}  | ${true}    | ${'MOBILE_IOS'}
`(
    'FunnelNavigationBar. inverse={$inverse} isDarkMode={$isDarkMode} device={$device}',
    async ({inverse, isDarkMode, device}) => {
        await openStoryPage({
            id: 'components-navigation-bars-funnelnavigationbar--default',
            device,
            args: {inverse},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);
