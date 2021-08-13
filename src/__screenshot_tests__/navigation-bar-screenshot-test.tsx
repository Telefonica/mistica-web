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
            id: 'components-others-mainnavigationbar--default',
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
            id: 'components-others-mainnavigationbar--default',
            device: 'MOBILE_IOS',
            args: {isInverse},
            isDarkMode,
        });

        const menuCloseImage = await page.screenshot();
        expect(menuCloseImage).toMatchImageSnapshot();

        await page.click(await screen.findByRole('button', {name: 'open navigation menu'}));

        const menuOpenImage = await page.screenshot();
        expect(menuOpenImage).toMatchImageSnapshot();
    }
);
