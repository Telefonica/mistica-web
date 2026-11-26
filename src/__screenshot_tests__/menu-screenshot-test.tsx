import {test, expectScreenshot} from '../test-utils/playwright';
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

for (const [caseIndex, testCase] of (
    [
        {icon: false, checkbox: false},
        {icon: false, checkbox: true},
        {icon: true, checkbox: false},
        {icon: true, checkbox: true},
    ] as const
).entries()) {
    const {icon, checkbox} = testCase;
    test(`Menu. icon={${testCase.icon}} checkbox={${testCase.checkbox}}  (case ${caseIndex + 1})`, async () => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'MOBILE_IOS',
            viewport,
            args: {icon, checkbox},
        });

        await (await screen.findByRole('button')).click();
        await expectScreenshot(page);
    });
}

for (const [caseIndex, testCase] of testCases.entries()) {
    const [verticalPosition, horizontalPosition, menuOptionsCount, isDarkMode] = testCase;
    test(`Menu positioned at ${testCase[0]},${testCase[1]} (case ${caseIndex + 1})`, async () => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'MOBILE_IOS',
            viewport,
            isDarkMode,
            args: {menuOptionsCount, horizontalPosition, verticalPosition},
        });

        await (await screen.findByRole('button')).click();
        await expectScreenshot(page);
    });
}

const maxHeightTestCases = [
    ['top', 'left'],
    ['top', 'right'],
    ['bottom', 'left'],
    ['bottom', 'right'],
] as const;

for (const [caseIndex, testCase] of maxHeightTestCases.entries()) {
    const [verticalPosition, horizontalPosition] = testCase;
    test(`Menu respect max height when options overflow and positioned at ${testCase[0]},${testCase[1]} (case ${caseIndex + 1})`, async () => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'MOBILE_IOS',
            args: {menuOptionsCount: 30, horizontalPosition, verticalPosition},
        });

        await (await screen.findByRole('button')).click();
        await expectScreenshot(page);
    });
}

test('Menu is rendered inside a datacard', async () => {
    const page = await openStoryPage({
        id: 'components-menu--inside-card',
        device: 'MOBILE_IOS',
    });

    await (await screen.findByRole('button')).click();
    await expectScreenshot(page);
});

test('Menu with item description', async () => {
    const page = await openStoryPage({
        id: 'components-menu--default',
        device: 'MOBILE_IOS',
        viewport,
        args: {
            description: true,
        },
    });

    await (await screen.findByRole('button')).click();
    await expectScreenshot(page);
});

test('Menu with asset', async () => {
    const page = await openStoryPage({
        id: 'components-menu--default',
        device: 'MOBILE_IOS',
        viewport,
        args: {
            asset: true,
        },
    });

    await (await screen.findByRole('button')).click();
    await expectScreenshot(page);
});

for (const [caseIndex, testCase] of ['top', 'bottom', 'left', 'right'].entries()) {
    const placement = testCase;
    test(`Menu placement=${testCase} (case ${caseIndex + 1})`, async () => {
        const page = await openStoryPage({
            id: 'components-menu--default',
            device: 'DESKTOP',
            args: {
                placement,
                alignment: 'middle',
                horizontalPosition: 'center',
                verticalPosition: 'center',
                menuOptionsCount: 3,
            },
        });

        await (await screen.findByRole('button', {name: 'Open'})).click();
        await expectScreenshot(page);
    });
}
