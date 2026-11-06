import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const TESTABLE_DEVICES = ['MOBILE_IOS', 'DESKTOP'] as const;
const TESTABLE_DEVICES_WITH_LARGE_DESKTOP = [...TESTABLE_DEVICES, 'LARGE_DESKTOP'] as const;

for (const testCase of TESTABLE_DEVICES_WITH_LARGE_DESKTOP) {
    const device = testCase;
    test(`Sheet in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'components-modals-sheet--default',
            device,
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`ActionsListSheet in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--actions-list',
            device,
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`RadioListSheet in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--radio-list',
            device,
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`InfoSheet in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--info',
            device,
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

test('InfoSheet with multiple description paragraphs', async () => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--info',
        device: 'MOBILE_IOS',
        args: {
            description: 'Description paragraph',
            multiparagraphDescription: true,
        },
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    await expectScreenshot(page);
});

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`InfoSheet with dismiss button in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--info',
            device,
            args: {buttonText: 'Dismiss'},
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`InfoSheet after scrolling in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--info',
            device,
            args: {buttonText: 'Dismiss', numItems: 10},
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');
        const listItems = await screen.findAllByRole('listitem');
        await listItems[2].evaluate((el) => el.scrollIntoView());

        await expectScreenshot(page);
    });
}

for (const testCase of TESTABLE_DEVICES_WITH_LARGE_DESKTOP) {
    const device = testCase;
    test(`ActionsSheet in ${testCase}`, async () => {
        const page = await openStoryPage({
            id: 'private-sheet-presets--actions',
            device,
        });

        const button = await screen.findByRole('button', {name: 'Open'});
        await button.click();

        await screen.findByRole('dialog');

        await expectScreenshot(page);
    });
}

test('ActionsSheet with safe inset at the bottom', async () => {
    const page = await openStoryPage({
        id: 'private-sheet-presets--actions',
        device: 'MOBILE_IOS_INSET',
    });

    const button = await screen.findByRole('button', {name: 'Open'});
    await button.click();

    await screen.findByRole('dialog');

    await expectScreenshot(page);
});
