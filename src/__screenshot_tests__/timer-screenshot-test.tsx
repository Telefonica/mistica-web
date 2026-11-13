import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

const DEVICE = ['DESKTOP', 'MOBILE_IOS'] as const;

for (const [caseIndex, testCase] of (
    [
        {minTimeUnit: 'seconds', maxTimeUnit: 'hours'},
        {minTimeUnit: 'minutes', maxTimeUnit: 'days'},
        {minTimeUnit: 'seconds', maxTimeUnit: 'days'},
        {minTimeUnit: 'minutes', maxTimeUnit: 'days'},
        {minTimeUnit: 'seconds', maxTimeUnit: 'seconds'},
    ] as const
).entries()) {
    const {minTimeUnit, maxTimeUnit} = testCase;
    test(`TextTimer - minTimeUnit = ${testCase.minTimeUnit}, maxTimeUnit = ${testCase.maxTimeUnit} (case ${caseIndex + 1})`, async () => {
        await openStoryPage({
            id: 'components-timer--text-timer-story',
            args: {minTimeUnit, maxTimeUnit},
        });

        const timer = await screen.findByTestId('timer');

        await expectScreenshot(timer);
    });
}

for (const [caseIndex, testCase] of (
    [
        {minTimeUnit: 'seconds', maxTimeUnit: 'hours'},
        {minTimeUnit: 'minutes', maxTimeUnit: 'days'},
        {minTimeUnit: 'seconds', maxTimeUnit: 'days'},
        {minTimeUnit: 'minutes', maxTimeUnit: 'days'},
        {minTimeUnit: 'seconds', maxTimeUnit: 'seconds'},
    ] as const
).entries()) {
    const {minTimeUnit, maxTimeUnit} = testCase;
    test(`Timer - minTimeUnit = ${testCase.minTimeUnit}, maxTimeUnit = ${testCase.maxTimeUnit} (case ${caseIndex + 1})`, async () => {
        await openStoryPage({
            id: 'components-timer--timer-story',
            args: {minTimeUnit, maxTimeUnit},
        });

        const timer = await screen.findByTestId('timer');

        await expectScreenshot(timer);
    });
}

for (const [caseIndex, testCase] of DEVICE.entries()) {
    const device = testCase;
    test(`Timer - boxed (${testCase}) (case ${caseIndex + 1})`, async () => {
        await openStoryPage({
            id: 'components-timer--timer-story',
            device,
            args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
        });

        const timer = await screen.findByTestId('timer');

        await expectScreenshot(timer);
    });
}

test('Timer - boxed over media', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        device: 'MOBILE_IOS',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true, themeVariant: 'media'},
    });

    const timer = await screen.findByTestId('timer');

    await expectScreenshot(timer);
});

test('Timer - boxed with big fontSize', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
    });

    await setRootFontSize(32);

    const timer = await screen.findByTestId('timer');

    await expectScreenshot(timer);
});

test('Timer - wraps if needed', async () => {
    await openStoryPage({
        id: 'components-timer--timer-story',
        args: {minTimeUnit: 'seconds', maxTimeUnit: 'days', boxed: true},
    });

    await setRootFontSize(72);

    const timer = await screen.findByTestId('timer');

    await expectScreenshot(timer);
});
