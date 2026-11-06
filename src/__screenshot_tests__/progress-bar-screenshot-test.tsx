import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen} from '../test-utils';

const COLORS = ['default', 'error'];

for (const testCase of COLORS) {
    const color = testCase;
    test(`ProgressBar - color={${testCase}}`, async () => {
        await openStoryPage({id: 'components-progress-bars--progress-bar-story', args: {color}});

        const stepper = await screen.findByTestId('progress-bar');

        await expectScreenshot(stepper);
    });
}

for (const testCase of COLORS) {
    const color = testCase;
    test(`ProgressBar - inverse and color={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-progress-bars--progress-bar-story',
            args: {color, variantOutside: 'brand'},
        });

        const stepper = await screen.findByTestId('progress-bar');

        await expectScreenshot(stepper);
    });
}

for (const testCase of COLORS) {
    const color = testCase;
    test(`ProgressBarStepped - color={${testCase}}`, async () => {
        await openStoryPage({id: 'components-progress-bars--progress-bar-stepped-story', args: {color}});

        const stepper = await screen.findByTestId('progress-bar-stepped');

        await expectScreenshot(stepper);
    });
}

for (const testCase of COLORS) {
    const color = testCase;
    test(`ProgressBarStepped - inverse and color={${testCase}}`, async () => {
        await openStoryPage({
            id: 'components-progress-bars--progress-bar-stepped-story',
            args: {color, variantOutside: 'brand'},
        });

        const stepper = await screen.findByTestId('progress-bar-stepped');

        await expectScreenshot(stepper);
    });
}
