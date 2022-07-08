import {openStoryPage, screen} from '../test-utils';

test.each`
    isInverse | isDarkMode
    ${false}  | ${false}
    ${false}  | ${true}
    ${true}   | ${false}
    ${true}   | ${true}
`(
    'MainNavigationBar desktop. isInverse={$isInverse} isDarkMode={$isDarkMode}',
    async ({isInverse, isDarkMode}) => {
        await openStoryPage({
            id: 'components-navigation-bars-main-navigation-bar--default',
            device: 'DESKTOP',
            args: {isInverse},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    isInverse | isDarkMode
    ${false}  | ${false}
    ${false}  | ${true}
    ${true}   | ${false}
    ${true}   | ${true}
`(
    'MainNavigationBar mobile. isInverse={$isInverse} isDarkMode={$isDarkMode}',
    async ({isInverse, isDarkMode}) => {
        const page = await openStoryPage({
            id: 'components-navigation-bars-main-navigation-bar--default',
            device: 'MOBILE_IOS',
            args: {isInverse},
            isDarkMode,
        });

        const menuCloseImage = await page.screenshot();
        expect(menuCloseImage).toMatchImageSnapshot();

        await page.click(await screen.findByRole('button', {name: 'Abrir menú de navegación'}));

        const menuOpenImage = await page.screenshot();
        expect(menuOpenImage).toMatchImageSnapshot();
    }
);

test.each`
    isInverse | isDarkMode | device
    ${false}  | ${false}   | ${'DESKTOP'}
    ${false}  | ${true}    | ${'DESKTOP'}
    ${true}   | ${false}   | ${'DESKTOP'}
    ${true}   | ${true}    | ${'DESKTOP'}
    ${false}  | ${false}   | ${'MOBILE_IOS'}
    ${false}  | ${true}    | ${'MOBILE_IOS'}
    ${true}   | ${false}   | ${'MOBILE_IOS'}
    ${true}   | ${true}    | ${'MOBILE_IOS'}
`(
    'NavigationBar. isInverse={$isInverse} isDarkMode={$isDarkMode} device={$device}',
    async ({isInverse, isDarkMode, device}) => {
        await openStoryPage({
            id: 'components-navigation-bars-navigation-bar--default',
            device,
            args: {isInverse},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);

test.each`
    isInverse | isDarkMode | device
    ${false}  | ${false}   | ${'DESKTOP'}
    ${false}  | ${true}    | ${'DESKTOP'}
    ${true}   | ${false}   | ${'DESKTOP'}
    ${true}   | ${true}    | ${'DESKTOP'}
    ${false}  | ${false}   | ${'MOBILE_IOS'}
    ${false}  | ${true}    | ${'MOBILE_IOS'}
    ${true}   | ${false}   | ${'MOBILE_IOS'}
    ${true}   | ${true}    | ${'MOBILE_IOS'}
`(
    'FunnelNavigationBar. isInverse={$isInverse} isDarkMode={$isDarkMode} device={$device}',
    async ({isInverse, isDarkMode, device}) => {
        await openStoryPage({
            id: 'components-navigation-bars-funnel-navigation-bar--default',
            device,
            args: {isInverse},
            isDarkMode,
        });

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    }
);
