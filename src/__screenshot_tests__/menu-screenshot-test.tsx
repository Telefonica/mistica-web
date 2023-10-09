import {openStoryPage, screen} from '../test-utils';

const testCases = [
    ['top', 'left', 3, false],
    ['top', 'right', 3, false],
    ['bottom', 'left', 3, false],
    ['bottom', 'right', 3, false],
    ['top', 'left', 3, true],
    ['top', 'right', 3, true],
    ['bottom', 'left', 3, true],
    ['bottom', 'right', 3, true],
    ['top', 'left', 30, false],
    ['top', 'right', 30, false],
    ['bottom', 'left', 30, false],
    ['bottom', 'right', 30, false],
    ['top', 'left', 30, true],
    ['top', 'right', 30, true],
    ['bottom', 'left', 30, true],
    ['bottom', 'right', 30, true],
] as const;

const viewport = {
    width: 667,
    height: 375,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    isLandscape: true,
};

test.each`
    icon     | checkbox
    ${false} | ${false}
    ${false} | ${true}
    ${true}  | ${false}
    ${true}  | ${true}
`('Menu. icon={$icon} checkbox={$checkbox} ', async ({icon, checkbox}) => {
    const page = await openStoryPage({
        id: 'components-menu--default',
        device: 'MOBILE_IOS',
        viewport,
        args: {icon, checkbox},
    });

    await (await screen.findByRole('button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();
});

test.each(testCases)(
    'Menu positioned at %s,%s',
    async (verticalPosition, horizontalPosition, menuOptionsCount, isDarkMode) => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'MOBILE_IOS',
            viewport,
            isDarkMode,
            args: {menuOptionsCount, horizontalPosition, verticalPosition},
        });

        await (await screen.findByRole('button')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();
    }
);

const maxHeightTestCases = [
    ['top', 'left'],
    ['top', 'right'],
    ['bottom', 'left'],
    ['bottom', 'right'],
] as const;

test.each(maxHeightTestCases)(
    'Menu respect max height when options overflow and positioned at %s,%s',
    async (verticalPosition, horizontalPosition) => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'MOBILE_IOS',
            args: {menuOptionsCount: 30, horizontalPosition, verticalPosition},
        });

        await (await screen.findByRole('button')).click();
        expect(await page.screenshot()).toMatchImageSnapshot();
    }
);

test('Menu is rendered inside a datacard', async () => {
    const page = await openStoryPage({
        id: 'components-menu--inside-card',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByRole('button')).click();
    expect(await page.screenshot()).toMatchImageSnapshot();
});
