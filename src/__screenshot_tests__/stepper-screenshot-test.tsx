import {test, expectScreenshot} from '../test-utils/playwright';
import {openStoryPage, screen, setRootFontSize} from '../test-utils';

import type {Device} from '../test-utils';

const TESTABLE_DEVICES: Array<Device> = ['MOBILE_IOS', 'DESKTOP'];

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`Stepper in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-stepper--default',
            device,
        });

        const stepper = await screen.findByTestId('stepper');

        await expectScreenshot(stepper);
    });
}

for (const testCase of TESTABLE_DEVICES) {
    const device = testCase;
    test(`Stepper with large fontSize in ${testCase}`, async () => {
        await openStoryPage({
            id: 'components-stepper--default',
            device,
        });

        await setRootFontSize(32);

        const stepper = await screen.findByTestId('stepper');

        await expectScreenshot(stepper);
    });
}
